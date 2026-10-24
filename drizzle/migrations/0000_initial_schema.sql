-- Enable pgvector extension for AI semantic candidate matching
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'interviewer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. Organizations
CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  plan_tier TEXT NOT NULL DEFAULT 'starter',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 3. Memberships
CREATE TABLE IF NOT EXISTS memberships (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'interviewer',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 4. Jobs
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'Full-time',
  status TEXT NOT NULL DEFAULT 'active',
  description TEXT NOT NULL,
  requirements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 5. Candidates
CREATE TABLE IF NOT EXISTS candidates (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  anonymized_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 6. Applications
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id TEXT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  stage TEXT NOT NULL DEFAULT 'applied',
  match_score INTEGER DEFAULT 0,
  match_explanation TEXT,
  blind_mode_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 7. Resumes
CREATE TABLE IF NOT EXISTS resumes (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  raw_text TEXT NOT NULL,
  parsed_skills JSONB DEFAULT '[]'::jsonb,
  parsed_experience JSONB DEFAULT '[]'::jsonb,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 8. Embeddings
CREATE TABLE IF NOT EXISTS embeddings (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  vector JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 9. Interviews
CREATE TABLE IF NOT EXISTS interviews (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'scheduled',
  host_user_id TEXT NOT NULL REFERENCES users(id),
  guest_link_token TEXT NOT NULL UNIQUE,
  guest_link_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 10. Interview Participants
CREATE TABLE IF NOT EXISTS interview_participants (
  id TEXT PRIMARY KEY,
  interview_id TEXT NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id),
  candidate_id TEXT REFERENCES candidates(id),
  role TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  left_at TIMESTAMP WITH TIME ZONE,
  talk_time_seconds INTEGER DEFAULT 0
);

-- 11. Rubrics
CREATE TABLE IF NOT EXISTS rubrics (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  role_category TEXT NOT NULL,
  is_template BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 12. Rubric Versions
CREATE TABLE IF NOT EXISTS rubric_versions (
  id TEXT PRIMARY KEY,
  rubric_id TEXT NOT NULL REFERENCES rubrics(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL DEFAULT 1,
  changelog TEXT,
  created_by_user_id TEXT NOT NULL REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 13. Rubric Dimensions
CREATE TABLE IF NOT EXISTS rubric_dimensions (
  id TEXT PRIMARY KEY,
  rubric_version_id TEXT NOT NULL REFERENCES rubric_versions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  weight INTEGER NOT NULL DEFAULT 20,
  description TEXT NOT NULL,
  criteria_scoring_json JSONB DEFAULT '{}'::jsonb
);

-- 14. Scorecards
CREATE TABLE IF NOT EXISTS scorecards (
  id TEXT PRIMARY KEY,
  interview_id TEXT NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
  rubric_version_id TEXT NOT NULL REFERENCES rubric_versions(id),
  interviewer_user_id TEXT NOT NULL REFERENCES users(id),
  final_recommendation TEXT,
  overall_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 15. Scores
CREATE TABLE IF NOT EXISTS scores (
  id TEXT PRIMARY KEY,
  scorecard_id TEXT NOT NULL REFERENCES scorecards(id) ON DELETE CASCADE,
  dimension_id TEXT NOT NULL REFERENCES rubric_dimensions(id),
  score_value INTEGER NOT NULL,
  notes TEXT,
  evidence_timestamp INTEGER,
  evidence_snippet TEXT
);

-- 16. Transcript Segments (Strictly objective audio transcription)
CREATE TABLE IF NOT EXISTS transcript_segments (
  id TEXT PRIMARY KEY,
  interview_id TEXT NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
  speaker_name TEXT NOT NULL,
  speaker_role TEXT NOT NULL,
  start_time_seconds INTEGER NOT NULL,
  end_time_seconds INTEGER NOT NULL,
  text TEXT NOT NULL,
  is_objective_telemetry_flagged BOOLEAN DEFAULT FALSE
);

-- 17. Room Snapshots
CREATE TABLE IF NOT EXISTS room_snapshots (
  id TEXT PRIMARY KEY,
  interview_id TEXT NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
  code_content TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'javascript',
  whiteboard_json JSONB DEFAULT '{}'::jsonb,
  snapshot_type TEXT NOT NULL DEFAULT 'periodic',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 18. Reports (Human verified & signed)
CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  interview_id TEXT NOT NULL UNIQUE REFERENCES interviews(id) ON DELETE CASCADE,
  scorecard_consensus TEXT NOT NULL,
  ai_summary_notes TEXT NOT NULL,
  is_signed_by_human BOOLEAN DEFAULT FALSE,
  signed_by_user_id TEXT REFERENCES users(id),
  signed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 19. Passports
CREATE TABLE IF NOT EXISTS passports (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL UNIQUE REFERENCES candidates(id) ON DELETE CASCADE,
  verification_code TEXT NOT NULL UNIQUE,
  skills_json JSONB DEFAULT '[]'::jsonb,
  aggregate_score INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 20. Offers
CREATE TABLE IF NOT EXISTS offers (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  candidate_id TEXT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  base_salary NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  equity_percentage TEXT DEFAULT '0.0%',
  sign_bonus NUMERIC(12, 2) DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  digital_signature_name TEXT,
  digital_signed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 21. Offer Events
CREATE TABLE IF NOT EXISTS offer_events (
  id TEXT PRIMARY KEY,
  offer_id TEXT NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  metadata_json JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 22. Practice Sessions
CREATE TABLE IF NOT EXISTS practice_sessions (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  role_track TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 45,
  problems_attempted INTEGER NOT NULL DEFAULT 0,
  score INTEGER NOT NULL DEFAULT 0,
  feedback_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 23. Subscriptions & Entitlements
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'dodo',
  external_subscription_id TEXT,
  plan_id TEXT NOT NULL DEFAULT 'free_academic',
  status TEXT NOT NULL DEFAULT 'active',
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS entitlements (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL UNIQUE REFERENCES organizations(id) ON DELETE CASCADE,
  max_interviews_per_month INTEGER NOT NULL DEFAULT 10,
  current_usage INTEGER NOT NULL DEFAULT 0,
  can_use_ai_copilot BOOLEAN DEFAULT TRUE,
  can_use_whiteboard BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 24. Webhook Events (Idempotency)
CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  external_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  payload_json JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'processed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 25. Consents
CREATE TABLE IF NOT EXISTS consents (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  candidate_id TEXT REFERENCES candidates(id),
  consent_type TEXT NOT NULL,
  is_granted BOOLEAN NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 26. Audit Log
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  actor_user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  details_json JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
