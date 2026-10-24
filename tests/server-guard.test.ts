import { describe, it, expect, vi, beforeEach } from 'vitest';

const clerk = vi.hoisted(() => ({ auth: vi.fn(), currentUser: vi.fn() }));
vi.mock('@clerk/nextjs/server', () => clerk);
vi.mock('@/lib/auth/membership', () => ({ getMembership: vi.fn(async () => null) }));

import { verifyServerSession } from '@/lib/auth/server-guard';
import { getMembership } from '@/lib/auth/membership';

const signedIn = (id: string, email: string, verified = true) => {
  clerk.auth.mockResolvedValue({ userId: id });
  clerk.currentUser.mockResolvedValue({
    primaryEmailAddressId: 'e1',
    emailAddresses: [{ id: 'e1', emailAddress: email, verification: { status: verified ? 'verified' : 'unverified' } }],
  });
};

beforeEach(() => {
  vi.clearAllMocks();
  process.env.SUPER_ADMIN_EMAIL = 'admin@example.com';
  vi.mocked(getMembership).mockResolvedValue(null);
});

describe('verifyServerSession', () => {
  it('401 when anonymous', async () => {
    clerk.auth.mockResolvedValue({ userId: null });
    expect((await verifyServerSession(new Request('http://x'))).errorResponse?.status).toBe(401);
  });
  it('ignores forged identity/role headers', async () => {
    signedIn('user_real', 'someone@example.com');
    const forged = new Request('http://x', { headers: { 'x-clerk-user-id': 'usr_super_admin_01', 'x-test-role': 'super_admin' } });
    expect((await verifyServerSession(forged)).errorResponse?.status).toBe(403);
  });
  it('403 for a candidate on recruiter routes', async () => {
    signedIn('user_c', 'c@example.com');
    vi.mocked(getMembership).mockResolvedValue({ role: 'candidate', organizationId: 'o1' });
    expect((await verifyServerSession(new Request('http://x'))).errorResponse?.status).toBe(403);
  });
  it('allows an interviewer member', async () => {
    signedIn('user_i', 'i@example.com');
    vi.mocked(getMembership).mockResolvedValue({ role: 'interviewer', organizationId: 'o1' });
    expect((await verifyServerSession(new Request('http://x'))).user?.role).toBe('interviewer');
  });
  it('super admin only with a VERIFIED matching email', async () => {
    signedIn('user_a', 'admin@example.com');
    expect((await verifyServerSession(new Request('http://x'))).user?.role).toBe('super_admin');
    signedIn('user_a', 'admin@example.com', false);
    expect((await verifyServerSession(new Request('http://x'))).errorResponse?.status).toBe(403);
  });
  it('503 when Clerk is unavailable', async () => {
    clerk.auth.mockRejectedValue(new Error('down'));
    expect((await verifyServerSession(new Request('http://x'))).errorResponse?.status).toBe(503);
  });
});