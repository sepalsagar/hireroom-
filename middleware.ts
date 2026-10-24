import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';

export const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing(.*)',
  '/candidate(.*)',
  '/terms(.*)',
  '/privacy(.*)',
  '/candidate-consent(.*)',
  '/cookie-policy(.*)',
  '/copyright(.*)',
  '/ai-use(.*)',
  '/acceptable-use(.*)',
  '/security(.*)',
  '/accessibility(.*)',
  '/data-requests(.*)',
  '/subprocessors(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/dodo(.*)',
]);

export function isProtectedRoute(req: NextRequest): boolean {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/api/webhooks/dodo')) {
    return false;
  }
  return (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/pipeline') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/rubrics') ||
    pathname.startsWith('/interviews') ||
    pathname.startsWith('/api/')
  );
}

export async function handleMiddlewareRequest(
  req: NextRequest,
  ev?: any
): Promise<NextResponse> {
  const pathname = req.nextUrl.pathname;

  // 1. Explicitly public routes always pass through
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // 2. Demo mode check: ONLY active in non-production AND when explicitly set to 'true'.
  // STRICTLY IGNORED in production builds (NODE_ENV === 'production').
  const isProduction = process.env.NODE_ENV === 'production';
  const isDemoMode = !isProduction && process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (isDemoMode) {
    const res = NextResponse.next();
    res.headers.set('x-hireroom-demo-mode', 'true');
    return res;
  }

  // 3. Fail Closed: In production (or when demo mode is inactive),
  // missing or invalid Clerk credentials must return HTTP 503 Service Unavailable, NEVER pass through.
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;

  const hasValidPublishableKey = Boolean(
    publishableKey && (publishableKey.startsWith('pk_test_') || publishableKey.startsWith('pk_live_'))
  );
  const hasValidSecretKey = Boolean(
    secretKey && (secretKey.startsWith('sk_test_') || secretKey.startsWith('sk_live_'))
  );

  if (!hasValidPublishableKey || !hasValidSecretKey) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        {
          error: 'Service Unavailable',
          code: 'AUTH_CONFIG_MISSING',
          message: 'Authentication service configuration is missing or invalid. Protected API routes fail closed.',
        },
        { status: 503 }
      );
    }
    return new NextResponse(
      '503 Service Unavailable: Authentication service configuration is missing or invalid. Access to protected routes is blocked.',
      {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  }

  // 4. Authenticate session with Clerk.
  // Note: No header bypasses (User-Agent, Referer, Sec-Fetch-Dest, etc.) are permitted.
  // Anonymous API requests receive 401 Unauthorized; web pages redirect to sign-in.
  const clerkHandler = clerkMiddleware(
    async (auth, request) => {
      const session = await auth();
      if (!session.userId) {
        if (request.nextUrl.pathname.startsWith('/api/')) {
          return NextResponse.json(
            {
              error: 'Unauthorized',
              code: 'UNAUTHORIZED',
              message: 'Authentication required. No active session found.',
            },
            { status: 401 }
          );
        }
        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('redirect_url', request.nextUrl.pathname);
        return NextResponse.redirect(signInUrl);
      }
      return NextResponse.next();
    },
    { publishableKey, secretKey }
  );

  try {
    return (await clerkHandler(req, ev)) as NextResponse;
  } catch {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        {
          error: 'Service Unavailable',
          code: 'AUTH_SERVICE_ERROR',
          message: 'Authentication service encountered an error. Protected routes fail closed.',
        },
        { status: 503 }
      );
    }
    return new NextResponse(
      '503 Service Unavailable: Authentication service encountered an error. Access to protected routes is blocked.',
      {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  }
}

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  return handleMiddlewareRequest(req, ev);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
