-- ============================================================================
-- HireRoom Row Level Security (RLS) Policies
-- Designed for Supabase PostgreSQL with JWT Claims & Multi-Tenancy
-- ============================================================================

-- 1. Enable RLS on core tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE scorecards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;

-- 2. Organizations Isolation Policies
-- Members can only select organizations they belong to
CREATE POLICY "org_members_select" ON organizations
  FOR SELECT
  USING (
    auth.uid()::text IN (
      SELECT user_id FROM memberships WHERE organization_id = organizations.id
    )
  );

-- 3. Jobs Visibility Policies
-- Active jobs are readable publicly for candidates; full management restricted to organization recruiters
CREATE POLICY "jobs_public_read_active" ON jobs
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "jobs_recruiter_all" ON jobs
  FOR ALL
  USING (
    auth.uid()::text IN (
      SELECT user_id FROM memberships
      WHERE organization_id = jobs.organization_id
      AND role IN ('super_admin', 'hiring_manager', 'interviewer')
    )
  );

-- 4. Applications Policies
-- Candidates can view only their own application; recruiters can view all in their organization
CREATE POLICY "applications_candidate_read" ON applications
  FOR SELECT
  USING (
    auth.uid()::text IN (
      SELECT user_id FROM interview_participants WHERE candidate_id = applications.candidate_id
    )
  );

CREATE POLICY "applications_recruiter_manage" ON applications
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      JOIN memberships ON jobs.organization_id = memberships.organization_id
      WHERE jobs.id = applications.job_id
      AND memberships.user_id = auth.uid()::text
      AND memberships.role IN ('super_admin', 'hiring_manager', 'interviewer')
    )
  );

-- 5. Scorecards & Reports Policies
-- Scorecards and draft reports are visible ONLY to organization interviewers and managers (NEVER candidates)
CREATE POLICY "scorecards_recruiters_only" ON scorecards
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM interviews
      JOIN jobs ON interviews.job_id = jobs.id
      JOIN memberships ON jobs.organization_id = memberships.organization_id
      WHERE interviews.id = scorecards.interview_id
      AND memberships.user_id = auth.uid()::text
      AND memberships.role IN ('super_admin', 'hiring_manager', 'interviewer')
    )
  );

-- 6. Offers Policies
-- Candidates can view and digitally sign their own offers
CREATE POLICY "offers_candidate_read_sign" ON offers
  FOR SELECT
  USING (
    candidate_id IN (
      SELECT id FROM candidates WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "offers_candidate_update_sign" ON offers
  FOR UPDATE
  USING (
    candidate_id IN (
      SELECT id FROM candidates WHERE email = auth.jwt()->>'email'
    )
  )
  WITH CHECK (
    status IN ('accepted', 'declined')
  );
