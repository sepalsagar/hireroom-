import { NextRequest, NextResponse } from 'next/server';
import { verifyServerSession } from '@/lib/auth/server-guard';
import { initialMockStore } from '@/lib/db';

export async function GET(req: NextRequest) {
  // Only recruiters (super_admin, hiring_manager, interviewer) can view candidate pipeline data
  const { user, errorResponse } = await verifyServerSession(req, [
    'super_admin',
    'hiring_manager',
    'interviewer',
  ]);

  if (errorResponse) {
    return errorResponse;
  }

  return NextResponse.json({
    organizationId: user?.organizationId,
    applications: initialMockStore.applications,
    jobs: initialMockStore.jobs,
  });
}
