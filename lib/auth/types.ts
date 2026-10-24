export type UserRole = 'super_admin' | 'hiring_manager' | 'interviewer' | 'candidate';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  organizationId: string;
  organizationName: string;
  isDemoUser?: boolean;
}

export interface AuthSession {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  provider: 'clerk' | 'mock-dev';
}

export interface AuthContextType extends AuthSession {
  loginAs: (role: UserRole) => void;
  logout: () => void;
  switchOrganization: (orgId: string, orgName: string) => void;
}
