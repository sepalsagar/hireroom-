export type UserRole = 'super_admin' | 'hiring_manager' | 'interviewer' | 'candidate';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole | null;
  avatarUrl?: string;
  organizationId: string | null;
  organizationName: string | null;
}

export interface AuthSession {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  provider: 'clerk';
}

export interface AuthContextType extends AuthSession {
  logout: () => Promise<void>;
}
