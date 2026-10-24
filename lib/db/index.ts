import * as schema from './schema';

export * from './schema';

// Database connection state check
export const isDatabaseConfigured = Boolean(
  typeof process !== 'undefined' && process.env.DATABASE_URL
);

export interface MockStore {
  users: Array<typeof schema.users.$inferSelect>;
  organizations: Array<typeof schema.organizations.$inferSelect>;
  jobs: Array<typeof schema.jobs.$inferSelect>;
  candidates: Array<typeof schema.candidates.$inferSelect>;
  applications: Array<typeof schema.applications.$inferSelect>;
  interviews: Array<typeof schema.interviews.$inferSelect>;
  rubrics: Array<typeof schema.rubrics.$inferSelect>;
}

// In-memory demo data with realistic technical hiring records labeled clearly
export const initialMockStore: MockStore = {
  organizations: [
    {
      id: 'org_hireroom_demo',
      name: 'HireRoom Engineering Demo',
      slug: 'hireroom-demo',
      planTier: 'free_academic',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  users: [
    {
      id: 'usr_super_admin_01',
      email: 'sepalsagar1234@gmail.com',
      fullName: 'Sepal Sagar',
      role: 'super_admin',
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'usr_hiring_manager_01',
      email: 'marcus.vance@techcorp.internal',
      fullName: 'Marcus Vance',
      role: 'hiring_manager',
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'usr_interviewer_01',
      email: 'elena.rostova@techcorp.internal',
      fullName: 'Elena Rostova',
      role: 'interviewer',
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  jobs: [
    {
      id: 'job_01',
      organizationId: 'org_hireroom_demo',
      title: 'Senior Distributed Systems Engineer',
      department: 'Infrastructure',
      location: 'Remote (Global)',
      jobType: 'Full-time',
      status: 'active',
      description: 'Design and operate low-latency consensus and stream processing pipelines with Go and Rust.',
      requirements: ['Distributed Consensus (Raft/Paxos)', 'Go or Rust', 'PostgreSQL Internals', 'Kubernetes'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'job_02',
      organizationId: 'org_hireroom_demo',
      title: 'Staff Full-Stack Frontend Architect',
      department: 'Product Platform',
      location: 'Bengaluru / Hybrid',
      jobType: 'Full-time',
      status: 'active',
      description: 'Lead architecture of real-time collaborative web applications, WebRTC streams, and high-performance WebWorkers.',
      requirements: ['Next.js 15 App Router', 'WebRTC & Yjs', 'TypeScript', 'Web Workers & WASM'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  candidates: [
    {
      id: 'cand_01',
      fullName: 'Alex Chen',
      anonymizedName: 'Candidate C-812',
      email: 'alex.chen.candidate@gmail.com',
      phone: '+1 (555) 382-9012',
      location: 'San Francisco, CA',
      githubUrl: 'https://github.com/alexchen-dev',
      linkedinUrl: 'https://linkedin.com/in/alexchen',
      createdAt: new Date(),
    },
    {
      id: 'cand_02',
      fullName: 'Priya Sharma',
      anonymizedName: 'Candidate P-449',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      location: 'Bengaluru, India',
      githubUrl: 'https://github.com/priyasharma',
      linkedinUrl: 'https://linkedin.com/in/priyasharma',
      createdAt: new Date(),
    },
  ],
  applications: [
    {
      id: 'app_01',
      jobId: 'job_02',
      candidateId: 'cand_01',
      stage: 'interview',
      matchScore: 94,
      matchExplanation: 'Deep expertise in Next.js, WebRTC, real-time sync via Yjs, and WebAssembly compilation.',
      blindModeEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'app_02',
      jobId: 'job_01',
      candidateId: 'cand_02',
      stage: 'screening',
      matchScore: 89,
      matchExplanation: 'Strong systems background in Go and distributed consensus protocols.',
      blindModeEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  interviews: [
    {
      id: 'room_demo_live',
      jobId: 'job_02',
      applicationId: 'app_01',
      title: 'Live Technical Architecture & Live Coding',
      scheduledAt: new Date(Date.now() + 3600000),
      durationMinutes: 60,
      status: 'scheduled',
      hostUserId: 'usr_interviewer_01',
      guestLinkToken: 'token_guest_demo_772',
      guestLinkExpiresAt: new Date(Date.now() + 86400000),
      createdAt: new Date(),
    },
  ],
  rubrics: [
    {
      id: 'rubric_system_design_01',
      organizationId: 'org_hireroom_demo',
      title: 'Senior Technical Architecture Standard Rubric',
      roleCategory: 'Engineering',
      isTemplate: true,
      createdAt: new Date(),
    },
  ],
};
