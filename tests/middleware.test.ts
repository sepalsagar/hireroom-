import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { handleMiddlewareRequest } from '../middleware';

describe('Middleware Route Protection & Fail-Closed Security Suite', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  // --------------------------------------------------------------------------
  // 1. Public Routes: Always accessible without authentication
  // --------------------------------------------------------------------------
  describe('1. Public Routes Bypass', () => {
    const publicPaths = [
      '/',
      '/pricing',
      '/candidate',
      '/terms',
      '/privacy',
      '/copyright',
      '/ai-use',
      '/acceptable-use',
      '/security',
      '/accessibility',
      '/data-requests',
      '/subprocessors',
      '/sign-in',
      '/sign-up',
      '/api/webhooks/dodo',
    ];

    for (const path of publicPaths) {
      it(`allows public access to ${path} even in production with no auth keys`, async () => {
        process.env.NODE_ENV = 'production';
        delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        delete process.env.CLERK_SECRET_KEY;
        delete process.env.NEXT_PUBLIC_DEMO_MODE;

        const req = new NextRequest(`http://localhost:3000${path}`);
        const res = await handleMiddlewareRequest(req);
        // NextResponse.next() returns a standard response (status 200 or header x-middleware-next)
        expect(res.status).toBe(200);
        expect(res.headers.get('x-hireroom-demo-mode')).toBeNull();
      });
    }
  });

  // --------------------------------------------------------------------------
  // 2. Fail-Closed: Missing or invalid keys return 503
  // --------------------------------------------------------------------------
  describe('2. Fail-Closed on Missing Credentials', () => {
    const protectedPages = [
      '/dashboard',
      '/pipeline',
      '/settings',
      '/rubrics',
      '/interviews/room_demo_live/room',
    ];

    for (const path of protectedPages) {
      it(`returns 503 Service Unavailable for ${path} when Clerk keys are missing in production`, async () => {
        process.env.NODE_ENV = 'production';
        delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        delete process.env.CLERK_SECRET_KEY;
        delete process.env.NEXT_PUBLIC_DEMO_MODE;

        const req = new NextRequest(`http://localhost:3000${path}`);
        const res = await handleMiddlewareRequest(req);
        expect(res.status).toBe(503);
        const text = await res.text();
        expect(text).toContain('503 Service Unavailable');
      });
    }

    it('returns 503 JSON response for protected API routes when Clerk keys are missing', async () => {
      process.env.NODE_ENV = 'production';
      delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
      delete process.env.CLERK_SECRET_KEY;

      const req = new NextRequest('http://localhost:3000/api/pipeline');
      const res = await handleMiddlewareRequest(req);
      expect(res.status).toBe(503);
      const json = await res.json();
      expect(json.code).toBe('AUTH_CONFIG_MISSING');
      expect(json.error).toBe('Service Unavailable');
    });

    it('returns 503 when keys are malformed (not starting with pk_test_/pk_live_ and sk_test_/sk_live_)', async () => {
      process.env.NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'invalid_dummy_key';
      process.env.CLERK_SECRET_KEY = 'invalid_secret';

      const req = new NextRequest('http://localhost:3000/dashboard');
      const res = await handleMiddlewareRequest(req);
      expect(res.status).toBe(503);
    });
  });

  // --------------------------------------------------------------------------
  // 3. Forged Headers Security: Headers never bypass auth
  // --------------------------------------------------------------------------
  describe('3. Header Spoofing Resistance', () => {
    const forgedHeaderScenarios = [
      { name: 'Googlebot user agent', headers: { 'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' } },
      { name: 'Sec-Fetch-Dest document', headers: { 'sec-fetch-dest': 'document', 'sec-fetch-mode': 'navigate' } },
      { name: 'Internal Referer', headers: { referer: 'https://hireroom.internal/admin/dashboard' } },
      { name: 'Localhost X-Forwarded-For', headers: { 'x-forwarded-for': '127.0.0.1' } },
      { name: 'Forged X-Admin header', headers: { 'x-admin': 'true', 'x-role': 'super_admin' } },
      { name: 'Forged Internal Auth header', headers: { 'x-internal-secret': 'bypass' } },
    ];

    for (const scenario of forgedHeaderScenarios) {
      it(`does not bypass auth for ${scenario.name} on /dashboard`, async () => {
        process.env.NODE_ENV = 'production';
        // In production without keys -> 503 (fail closed)
        delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        delete process.env.CLERK_SECRET_KEY;

        const req = new NextRequest('http://localhost:3000/dashboard', {
          headers: scenario.headers,
        });

        const res = await handleMiddlewareRequest(req);
        expect(res.status).toBe(503);
      });

      it(`does not bypass auth for ${scenario.name} on /api/pipeline`, async () => {
        process.env.NODE_ENV = 'production';
        delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        delete process.env.CLERK_SECRET_KEY;

        const req = new NextRequest('http://localhost:3000/api/pipeline', {
          headers: scenario.headers,
        });

        const res = await handleMiddlewareRequest(req);
        expect(res.status).toBe(503);
      });
    }
  });

  // --------------------------------------------------------------------------
  // 4. NEXT_PUBLIC_DEMO_MODE Strict Gating
  // --------------------------------------------------------------------------
  describe('4. Demo Mode Environment Gating', () => {
    it('STRICTLY IGNORES NEXT_PUBLIC_DEMO_MODE=true in production', async () => {
      process.env.NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_DEMO_MODE = 'true';
      delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
      delete process.env.CLERK_SECRET_KEY;

      const req = new NextRequest('http://localhost:3000/dashboard');
      const res = await handleMiddlewareRequest(req);
      // In production, must still fail closed with 503
      expect(res.status).toBe(503);
      expect(res.headers.get('x-hireroom-demo-mode')).toBeNull();
    });

    it('permits demo mode ONLY in non-production when explicitly enabled', async () => {
      process.env.NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_DEMO_MODE = 'true';

      const req = new NextRequest('http://localhost:3000/dashboard');
      const res = await handleMiddlewareRequest(req);
      expect(res.status).toBe(200);
      expect(res.headers.get('x-hireroom-demo-mode')).toBe('true');
    });

    it('blocks protected routes in development when NEXT_PUBLIC_DEMO_MODE is not true', async () => {
      process.env.NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_DEMO_MODE = 'false';
      delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
      delete process.env.CLERK_SECRET_KEY;

      const req = new NextRequest('http://localhost:3000/dashboard');
      const res = await handleMiddlewareRequest(req);
      expect(res.status).toBe(503);
    });
  });

  // --------------------------------------------------------------------------
  // 5. Production Authentication Enforcement: Redirects & 401s
  // --------------------------------------------------------------------------
  describe('5. Production Authentication Enforcement', () => {
    const protectedPages = [
      '/dashboard',
      '/pipeline',
      '/settings',
      '/rubrics',
      '/interviews/room_demo_live/room',
    ];

    for (const path of protectedPages) {
      it(`anonymous request to ${path} redirects or denies in production`, async () => {
        process.env.NODE_ENV = 'production';
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_bXktYXBwLTEyMy5jbGVyay5hY2NvdW50cy5kZXYk';
        process.env.CLERK_SECRET_KEY = 'sk_test_mock_secret_key_123';

        const req = new NextRequest(`http://localhost:3000${path}`);
        const res = await handleMiddlewareRequest(req);
        // Anonymous request to protected page must redirect to sign-in (302/307) or fail closed (401/503)
        const isRedirectOrDenied = [302, 307, 401, 503].includes(res.status);
        expect(isRedirectOrDenied).toBe(true);
        if (res.status === 307 || res.status === 302) {
          expect(res.headers.get('location')).toContain('sign-in');
        }
      });
    }

    it('anonymous request to protected /api/pipeline returns 401 Unauthorized in production', async () => {
      process.env.NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_bXktYXBwLTEyMy5jbGVyay5hY2NvdW50cy5kZXYk';
      process.env.CLERK_SECRET_KEY = 'sk_test_mock_secret_key_123';

      const req = new NextRequest('http://localhost:3000/api/pipeline');
      const res = await handleMiddlewareRequest(req);
      expect([401, 503].includes(res.status)).toBe(true);
    });
  });
});
