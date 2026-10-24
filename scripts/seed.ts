import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../lib/db/schema';

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is not defined.');
    console.log('To seed in development mode, define DATABASE_URL in .env.local.');
    process.exit(1);
  }

  console.log('Connecting to Supabase PostgreSQL database...');
  const client = postgres(databaseUrl, { max: 1 });
  const db = drizzle(client, { schema });

  try {
    console.log('1. Seeding Organizations...');
    await db.insert(schema.organizations).values({
      id: 'org_hireroom_demo',
      name: 'HireRoom Engineering Demo',
      slug: 'hireroom-demo',
      planTier: 'free_academic',
    }).onConflictDoNothing();

    console.log('2. Seeding Users (Sepal Sagar super_admin, managers, interviewers)...');
    await db.insert(schema.users).values([
      {
        id: 'usr_super_admin_01',
        email: 'sepalsagar1234@gmail.com',
        fullName: 'Sepal Sagar',
        role: 'super_admin',
      },
      {
        id: 'usr_hiring_manager_01',
        email: 'marcus.vance@techcorp.internal',
        fullName: 'Marcus Vance',
        role: 'hiring_manager',
      },
      {
        id: 'usr_interviewer_01',
        email: 'elena.rostova@techcorp.internal',
        fullName: 'Elena Rostova',
        role: 'interviewer',
      },
      {
        id: 'usr_candidate_01',
        email: 'alex.chen.candidate@gmail.com',
        fullName: 'Alex Chen',
        role: 'candidate',
      },
    ]).onConflictDoNothing();

    console.log('3. Seeding Memberships...');
    await db.insert(schema.memberships).values([
      {
        id: 'mem_01',
        userId: 'usr_super_admin_01',
        organizationId: 'org_hireroom_demo',
        role: 'super_admin',
      },
      {
        id: 'mem_02',
        userId: 'usr_hiring_manager_01',
        organizationId: 'org_hireroom_demo',
        role: 'hiring_manager',
      },
      {
        id: 'mem_03',
        userId: 'usr_interviewer_01',
        organizationId: 'org_hireroom_demo',
        role: 'interviewer',
      },
    ]).onConflictDoNothing();

    console.log('4. Seeding Entitlements...');
    await db.insert(schema.entitlements).values({
      id: 'ent_demo_01',
      organizationId: 'org_hireroom_demo',
      maxInterviewsPerMonth: 50,
      currentUsage: 1,
      canUseAiCopilot: true,
      canUseWhiteboard: true,
    }).onConflictDoNothing();

    console.log('5. Seeding Standard Technical Jobs...');
    await db.insert(schema.jobs).values([
      {
        id: 'job_01',
        organizationId: 'org_hireroom_demo',
        title: 'Senior Distributed Systems Engineer',
        department: 'Infrastructure',
        location: 'Remote (Global)',
        jobType: 'Full-time',
        status: 'active',
        description: 'Design and operate low-latency consensus and stream processing pipelines with Go and Rust.',
        requirements: ['Distributed Consensus (Raft/Paxos)', 'Go or Rust', 'PostgreSQL Internals'],
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
      },
    ]).onConflictDoNothing();

    console.log('Database seeding successfully completed!');
  } catch (err) {
    console.error('Error during database seed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
