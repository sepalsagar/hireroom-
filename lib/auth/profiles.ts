import { UserProfile, UserRole } from './types';

export const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  super_admin: {
    id: 'usr_super_admin_01',
    email: 'sepalsagar1234@gmail.com',
    fullName: 'Sepal Sagar (Super Admin)',
    role: 'super_admin',
    organizationId: 'org_hireroom_demo',
    organizationName: 'HireRoom Engineering Demo',
    isDemoUser: true,
  },
  hiring_manager: {
    id: 'usr_hiring_manager_01',
    email: 'marcus.vance@techcorp.internal',
    fullName: 'Marcus Vance',
    role: 'hiring_manager',
    organizationId: 'org_hireroom_demo',
    organizationName: 'HireRoom Engineering Demo',
    isDemoUser: true,
  },
  interviewer: {
    id: 'usr_interviewer_01',
    email: 'elena.rostova@techcorp.internal',
    fullName: 'Elena Rostova',
    role: 'interviewer',
    organizationId: 'org_hireroom_demo',
    organizationName: 'HireRoom Engineering Demo',
    isDemoUser: true,
  },
  candidate: {
    id: 'usr_candidate_01',
    email: 'alex.chen.candidate@gmail.com',
    fullName: 'Alex Chen',
    role: 'candidate',
    organizationId: 'org_hireroom_demo',
    organizationName: 'HireRoom Engineering Demo',
    isDemoUser: true,
  },
};
