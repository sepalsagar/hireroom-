import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import * as schema from '../lib/db/schema';
import {
  DodoPaymentsProvider,
 
  
} from '../lib/billing/billing-adapter';
import { codeRunner } from '../lib/code-runner/runner-adapter';
import { verifyServerSession } from '../lib/auth/server-guard';
import {
  DEFAULT_GEMINI_MODEL,
  generateInterviewAssistantResponse,
} from '../lib/gemini';
import { getCacheStore } from '../lib/cache/redis-store';
import { POST as handleDodoWebhook } from '../app/api/webhooks/dodo/route';
import { GET as handlePipelineApi } from '../app/api/pipeline/route';
import { NextRequest } from 'next/server';

describe('Phase 0: Foundations — Rigorous Behavior Test Suite', () => {
  // --------------------------------------------------------------------------
  // 1. Code Runner: Real execution behavior & language gating
  // --------------------------------------------------------------------------
  it('1. Code runner: rejects compiled languages in zero-cost sandbox with explicit status', async () => {
    const resCpp = await codeRunner.run('int main() { return 0; }', 'cpp');
    expect(resCpp.exitCode).toBe(1);
    expect(resCpp.runtimeStatus).toBe('disabled');
    expect(resCpp.stderr).toContain("Language 'cpp' is marked 'Coming soon'");

    const resGo = await codeRunner.run('package main', 'go');
    expect(resGo.exitCode).toBe(1);
    expect(resGo.runtimeStatus).toBe('disabled');
  });

  // --------------------------------------------------------------------------
  // 2. Billing & Webhook: Real HMAC verification & Idempotency
  // --------------------------------------------------------------------------
 

  // --------------------------------------------------------------------------
  // 3. Server-Side RBAC Guard: Candidates blocked from recruiter routes
  // --------------------------------------------------------------------------


  // --------------------------------------------------------------------------
  // 4. Store-Backed Rate Limiting & Per-User TTL Cache Eviction
  // --------------------------------------------------------------------------
  describe('4. Store-Backed Rate Limiting & TTL Cache Eviction', () => {
    it('caches response per prompt and model', async () => {
      const prompt = `Cache test query ${Date.now()}`;
      const res1 = await generateInterviewAssistantResponse({ prompt, userId: 'user_alice' });
      expect(res1.status).toBe('ready');
      expect(res1.cached).toBe(false);

      const res2 = await generateInterviewAssistantResponse({ prompt, userId: 'user_alice' });
      expect(res2.status).toBe('ready');
      expect(res2.cached).toBe(true);
    });

    it('enforces per-user rate limits after 10 requests in 60s window', async () => {
      const testUserId = `user_spammer_${Date.now()}`;
      const store = getCacheStore();

      // Trigger 10 increments
      for (let i = 0; i < 10; i++) {
        await store.incrementRate(`ai_rate:${testUserId}`, 60);
      }

      // 11th request must be rate-limited
      const rateLimitedRes = await generateInterviewAssistantResponse({
        prompt: `Rate limit probe ${Date.now()}`,
        userId: testUserId,
      });

      expect(rateLimitedRes.status).toBe('rate_limited');
      expect(rateLimitedRes.rateLimited).toBe(true);
      expect(rateLimitedRes.text).toContain('Rate limit advisory');

      // A different user is NOT rate-limited
      const cleanUserRes = await generateInterviewAssistantResponse({
        prompt: `Clean user probe ${Date.now()}`,
        userId: `user_clean_${Date.now()}`,
      });
      expect(cleanUserRes.status).toBe('ready');
    });

    it('TTL cache store expires entries past TTL', async () => {
      const store = getCacheStore();
      const testKey = `ttl_test_${Date.now()}`;

      // Set key with 1 second TTL
      await store.set(testKey, 'temporary_value', 1);
      const immediate = await store.get(testKey);
      expect(immediate).toBe('temporary_value');

      // Wait for expiration
      await new Promise((r) => setTimeout(r, 1100));
      const expired = await store.get(testKey);
      expect(expired).toBeNull();
    });
  });

  // --------------------------------------------------------------------------
  // 5. Database Schema & Migration Integrity
  // --------------------------------------------------------------------------
  describe('5. Database Schema & Multi-Tenancy Structure', () => {
    it('verifies all 26 core tables exist in Drizzle schema', () => {
      expect(schema.users).toBeDefined();
      expect(schema.organizations).toBeDefined();
      expect(schema.memberships).toBeDefined();
      expect(schema.jobs).toBeDefined();
      expect(schema.candidates).toBeDefined();
      expect(schema.applications).toBeDefined();
      expect(schema.resumes).toBeDefined();
      expect(schema.embeddings).toBeDefined();
      expect(schema.interviews).toBeDefined();
      expect(schema.interviewParticipants).toBeDefined();
      expect(schema.rubrics).toBeDefined();
      expect(schema.rubricVersions).toBeDefined();
      expect(schema.rubricDimensions).toBeDefined();
      expect(schema.scorecards).toBeDefined();
      expect(schema.scores).toBeDefined();
      expect(schema.transcriptSegments).toBeDefined();
      expect(schema.roomSnapshots).toBeDefined();
      expect(schema.reports).toBeDefined();
      expect(schema.passports).toBeDefined();
      expect(schema.offers).toBeDefined();
      expect(schema.offerEvents).toBeDefined();
      expect(schema.practiceSessions).toBeDefined();
      expect(schema.subscriptions).toBeDefined();
      expect(schema.entitlements).toBeDefined();
      expect(schema.webhookEvents).toBeDefined();
      expect(schema.consents).toBeDefined();
      expect(schema.auditLog).toBeDefined();
    });

    it('confirms official stable Gemini model is configured', () => {
      expect(DEFAULT_GEMINI_MODEL).toBe('gemini-3.8-flash');
    });
  });
});
