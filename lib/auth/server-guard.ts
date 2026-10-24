import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import type { UserRole } from './types';
import { getMembership } from './membership';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  organizationId: string | null;
}
type GuardResult =
  | { user: AuthenticatedUser; errorResponse: null }
  | { user: null; errorResponse: NextResponse };

const deny = (status: number, code: string, error: string): GuardResult => ({
  user: null,
  errorResponse: NextResponse.json({ error, code }, { status }),
});

/** Identity comes ONLY from Clerk's verified session. Headers, cookies and bodies are never trusted.
 *  The first parameter is kept so existing call sites compile; it is intentionally ignored. */
export async function verifyServerSession(
  _req?: Request,
  allowedRoles: UserRole[] = ['super_admin', 'hiring_manager', 'interviewer'],
): Promise<GuardResult> {
  let userId: string | null = null;
  try {
    ({ userId } = await auth());
    } catch (err) {
    console.error('Clerk auth() failed:', err instanceof Error ? err.message : 'unknown');
    return deny(503, 'AUTH_UNAVAILABLE', 'Authentication service unavailable');
  }
  if (!userId) return deny(401, 'UNAUTHORIZED', 'Authentication required');

  const user = await currentUser();
  const primary = user?.emailAddresses.find((e) => e.id === user.primaryEmailAddressId);
  const email = primary?.verification?.status === 'verified' ? primary.emailAddress.toLowerCase() : null;

  const adminEmail = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  let role: UserRole | null = null;
  let organizationId: string | null = null;
  if (adminEmail && email === adminEmail) {
    role = 'super_admin';
  } else {
    const m = await getMembership(userId);
    if (m) { role = m.role; organizationId = m.organizationId; }
  }
  if (!role) return deny(403, 'NOT_A_MEMBER', 'Forbidden');
  if (!allowedRoles.includes(role)) return deny(403, 'FORBIDDEN_ROLE', 'Forbidden');

  return { user: { id: userId, email: email ?? '', role, organizationId }, errorResponse: null };
}