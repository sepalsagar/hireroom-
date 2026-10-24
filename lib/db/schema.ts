import { pgTable, text, timestamp, integer, boolean, jsonb, decimal, uuid, index } from 'drizzle-orm/pg-core';

// 1. Users
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull().default('interviewer'), // super_admin, hiring_manager, interviewer, candidate
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2. Organizations
export const organizations = pgTable('organizations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  planTier: text('plan_tier').notNull().default('starter'), // starter, growth, enterprise
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 3. Memberships
export const memberships = pgTable('memberships', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  organizationId: text('organization_id').references(() => organizations.id).notNull(),
  role: text('role').notNull().default('interviewer'), // super_admin, hiring_manager, interviewer, candidate
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

// 4. Jobs
export const jobs = pgTable('jobs', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').references(() => organizations.id).notNull(),
  title: text('title').notNull(),
  department: text('department').notNull(),
  location: text('location').notNull(),
  jobType: text('job_type').notNull().default('Full-time'), // Full-time, Contract, Remote
  status: text('status').notNull().default('active'), // draft, active, closed
  description: text('description').notNull(),
  requirements: jsonb('requirements').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 5. Candidates
export const candidates = pgTable('candidates', {
  id: text('id').primaryKey(),
  fullName: text('full_name').notNull(),
  anonymizedName: text('anonymized_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  location: text('location'),
  githubUrl: text('github_url'),
  linkedinUrl: text('linkedin_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 6. Applications
export const applications = pgTable('applications', {
  id: text('id').primaryKey(),
  jobId: text('job_id').references(() => jobs.id).notNull(),
  candidateId: text('candidate_id').references(() => candidates.id).notNull(),
  stage: text('stage').notNull().default('applied'), // applied, screening, interview, offer, hired, rejected
  matchScore: integer('match_score').default(0),
  matchExplanation: text('match_explanation'),
  blindModeEnabled: boolean('blind_mode_enabled').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 7. Resumes
export const resumes = pgTable('resumes', {
  id: text('id').primaryKey(),
  candidateId: text('candidate_id').references(() => candidates.id).notNull(),
  rawText: text('raw_text').notNull(),
  parsedSkills: jsonb('parsed_skills').$type<string[]>().default([]),
  parsedExperience: jsonb('parsed_experience').$type<any[]>().default([]),
  fileUrl: text('file_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 8. Embeddings (pgvector compatible representation)
export const embeddings = pgTable('embeddings', {
  id: text('id').primaryKey(),
  entityType: text('entity_type').notNull(), // job, resume, rubric_dimension
  entityId: text('entity_id').notNull(),
  vector: jsonb('vector').$type<number[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 9. Interviews
export const interviews = pgTable('interviews', {
  id: text('id').primaryKey(),
  jobId: text('job_id').references(() => jobs.id).notNull(),
  applicationId: text('application_id').references(() => applications.id).notNull(),
  title: text('title').notNull(),
  scheduledAt: timestamp('scheduled_at').notNull(),
  durationMinutes: integer('duration_minutes').notNull().default(60),
  status: text('status').notNull().default('scheduled'), // scheduled, in_progress, completed, cancelled
  hostUserId: text('host_user_id').references(() => users.id).notNull(),
  guestLinkToken: text('guest_link_token').notNull().unique(),
  guestLinkExpiresAt: timestamp('guest_link_expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 10. Interview Participants
export const interviewParticipants = pgTable('interview_participants', {
  id: text('id').primaryKey(),
  interviewId: text('interview_id').references(() => interviews.id).notNull(),
  userId: text('user_id').references(() => users.id),
  candidateId: text('candidate_id').references(() => candidates.id),
  role: text('role').notNull(), // interviewer, candidate, observer
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  leftAt: timestamp('left_at'),
  talkTimeSeconds: integer('talk_time_seconds').default(0),
});

// 11. Rubrics
export const rubrics = pgTable('rubrics', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').references(() => organizations.id).notNull(),
  title: text('title').notNull(),
  roleCategory: text('role_category').notNull(),
  isTemplate: boolean('is_template').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 12. Rubric Versions
export const rubricVersions = pgTable('rubric_versions', {
  id: text('id').primaryKey(),
  rubricId: text('rubric_id').references(() => rubrics.id).notNull(),
  versionNumber: integer('version_number').notNull().default(1),
  changelog: text('changelog'),
  createdByUserId: text('created_by_user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 13. Rubric Dimensions
export const rubricDimensions = pgTable('rubric_dimensions', {
  id: text('id').primaryKey(),
  rubricVersionId: text('rubric_version_id').references(() => rubricVersions.id).notNull(),
  name: text('name').notNull(),
  weight: integer('weight').notNull().default(20), // percentage
  description: text('description').notNull(),
  criteriaScoringJson: jsonb('criteria_scoring_json').default({}),
});

// 14. Scorecards
export const scorecards = pgTable('scorecards', {
  id: text('id').primaryKey(),
  interviewId: text('interview_id').references(() => interviews.id).notNull(),
  rubricVersionId: text('rubric_version_id').references(() => rubricVersions.id).notNull(),
  interviewerUserId: text('interviewer_user_id').references(() => users.id).notNull(),
  finalRecommendation: text('final_recommendation'), // strong_yes, yes, weak, no
  overallNotes: text('overall_notes'),
  submittedAt: timestamp('submitted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 15. Scores
export const scores = pgTable('scores', {
  id: text('id').primaryKey(),
  scorecardId: text('scorecard_id').references(() => scorecards.id).notNull(),
  dimensionId: text('dimension_id').references(() => rubricDimensions.id).notNull(),
  scoreValue: integer('score_value').notNull(), // 1 to 5
  notes: text('notes'),
  evidenceTimestamp: integer('evidence_timestamp'), // seconds into interview
  evidenceSnippet: text('evidence_snippet'),
});

// 16. Transcript Segments (strictly objective audio transcription)
export const transcriptSegments = pgTable('transcript_segments', {
  id: text('id').primaryKey(),
  interviewId: text('interview_id').references(() => interviews.id).notNull(),
  speakerName: text('speaker_name').notNull(),
  speakerRole: text('speaker_role').notNull(),
  startTimeSeconds: integer('start_time_seconds').notNull(),
  endTimeSeconds: integer('end_time_seconds').notNull(),
  text: text('text').notNull(),
  isObjectiveTelemetryFlagged: boolean('is_objective_telemetry_flagged').default(false),
});

// 17. Room Snapshots
export const roomSnapshots = pgTable('room_snapshots', {
  id: text('id').primaryKey(),
  interviewId: text('interview_id').references(() => interviews.id).notNull(),
  codeContent: text('code_content').notNull(),
  language: text('language').notNull().default('javascript'),
  whiteboardJson: jsonb('whiteboard_json').default({}),
  snapshotType: text('snapshot_type').notNull().default('periodic'), // periodic, run, submit
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 18. Reports (Human verified & signed)
export const reports = pgTable('reports', {
  id: text('id').primaryKey(),
  interviewId: text('interview_id').references(() => interviews.id).notNull().unique(),
  scorecardConsensus: text('scorecard_consensus').notNull(),
  aiSummaryNotes: text('ai_summary_notes').notNull(),
  isSignedByHuman: boolean('is_signed_by_human').default(false),
  signedByUserId: text('signed_by_user_id').references(() => users.id),
  signedAt: timestamp('signed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 19. Passports (Verified Candidate Skills)
export const passports = pgTable('passports', {
  id: text('id').primaryKey(),
  candidateId: text('candidate_id').references(() => candidates.id).notNull().unique(),
  verificationCode: text('verification_code').notNull().unique(),
  skillsJson: jsonb('skills_json').$type<any[]>().default([]),
  aggregateScore: integer('aggregate_score').default(0),
  isPublic: boolean('is_public').default(true),
  issueDate: timestamp('issue_date').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

// 20. Offers
export const offers = pgTable('offers', {
  id: text('id').primaryKey(),
  applicationId: text('application_id').references(() => applications.id).notNull(),
  candidateId: text('candidate_id').references(() => candidates.id).notNull(),
  jobTitle: text('job_title').notNull(),
  baseSalary: decimal('base_salary', { precision: 12, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('USD'),
  equityPercentage: text('equity_percentage').default('0.0%'),
  signBonus: decimal('sign_bonus', { precision: 12, scale: 2 }).default('0'),
  startDate: timestamp('start_date').notNull(),
  status: text('status').notNull().default('draft'), // draft, sent, accepted, declined, expired
  expiresAt: timestamp('expires_at').notNull(),
  digitalSignatureName: text('digital_signature_name'),
  digitalSignedAt: timestamp('digital_signed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 21. Offer Events
export const offerEvents = pgTable('offer_events', {
  id: text('id').primaryKey(),
  offerId: text('offer_id').references(() => offers.id).notNull(),
  eventType: text('event_type').notNull(), // created, sent, viewed, signed, declined
  metadataJson: jsonb('metadata_json').default({}),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// 22. Practice Sessions
export const practiceSessions = pgTable('practice_sessions', {
  id: text('id').primaryKey(),
  candidateId: text('candidate_id').references(() => candidates.id).notNull(),
  roleTrack: text('role_track').notNull(), // frontend, backend, fullstack, algorithms
  durationMinutes: integer('duration_minutes').notNull().default(45),
  problemsAttempted: integer('problems_attempted').notNull().default(0),
  score: integer('score').notNull().default(0),
  feedbackJson: jsonb('feedback_json').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 23. Subscriptions & Entitlements
export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').references(() => organizations.id).notNull(),
  provider: text('provider').notNull().default('dodo'), // dodo, polar, mock
  externalSubscriptionId: text('external_subscription_id'),
  planId: text('plan_id').notNull().default('free_academic'),
  status: text('status').notNull().default('active'),
  currentPeriodEnd: timestamp('current_period_end'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const entitlements = pgTable('entitlements', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').references(() => organizations.id).notNull().unique(),
  maxInterviewsPerMonth: integer('max_interviews_per_month').notNull().default(10),
  currentUsage: integer('current_usage').notNull().default(0),
  canUseAiCopilot: boolean('can_use_ai_copilot').default(true),
  canUseWhiteboard: boolean('can_use_whiteboard').default(true),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 24. Webhook Events (Idempotency)
export const webhookEvents = pgTable('webhook_events', {
  id: text('id').primaryKey(),
  provider: text('provider').notNull(),
  externalEventId: text('external_event_id').notNull().unique(),
  eventType: text('event_type').notNull(),
  payloadJson: jsonb('payload_json').notNull(),
  status: text('status').notNull().default('processed'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 25. Consents
export const consents = pgTable('consents', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  candidateId: text('candidate_id'),
  consentType: text('consent_type').notNull(), // video_recording, transcript_ai, data_retention
  isGranted: boolean('is_granted').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// 26. Audit Log
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  actorUserId: text('actor_user_id').notNull(),
  action: text('action').notNull(),
  resourceType: text('resource_type').notNull(),
  resourceId: text('resource_id').notNull(),
  detailsJson: jsonb('details_json').default({}),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});
