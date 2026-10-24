import type { UserRole } from './types';
export interface Membership { role: UserRole; organizationId: string }
// TODO: replace with a Drizzle query on the memberships table once Supabase is connected.
export async function getMembership(_clerkUserId: string): Promise<Membership | null> {
  return null;
}
