import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { Webhook } from 'standardwebhooks';
import { POST } from '@/app/api/webhooks/dodo/route';

const SECRET = 'whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw';
const completed = new Set<string>();
const upserts: Array<Record<string, unknown>> = [];
let failNext = false;

vi.mock('@/lib/billing/stores', () => ({
  StoreUnavailableError: class extends Error {},
  getWebhookStore: () => ({
    claim: async (id: string) => (completed.has(id) ? 'duplicate' : 'new'),
    complete: async (id: string) => { completed.add(id); },
    release: async () => {},
  }),
  getSubscriptionStore: () => ({
    upsert: async (i: Record<string, unknown>) => {
      if (failNext) { failNext = false; throw new Error('db down'); }
      upserts.push(i);
    },
  }),
}));

const body = { type: 'subscription.active', data: { product_id: 'prod_pro', subscription_id: 'sub_1', metadata: { organization_id: 'org_1' } } };

function req(o: { id?: string; ts?: Date; tamper?: boolean; noHeaders?: boolean; payload?: object } = {}) {
  const id = o.id ?? 'msg_1';
  const ts = o.ts ?? new Date();
  const raw = JSON.stringify(o.payload ?? body);
  const sig = new Webhook(SECRET).sign(id, ts, raw);
  return new NextRequest('http://localhost/api/webhooks/dodo', {
    method: 'POST',
    headers: o.noHeaders ? {} : {
      'webhook-id': id,
      'webhook-timestamp': String(Math.floor(ts.getTime() / 1000)),
      'webhook-signature': sig,
    },
    body: o.tamper ? raw.replace('org_1', 'org_2') : raw,
  });
}

beforeEach(() => {
  completed.clear(); upserts.length = 0; failNext = false;
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = SECRET;
  process.env.PLAN_PRODUCT_IDS = JSON.stringify({ prod_pro: 'pro' });
});

describe('Dodo webhook (Standard Webhooks)', () => {
  it('accepts a correctly signed event and stores plan + status', async () => {
    expect((await POST(req())).status).toBe(200);
    expect(upserts[0]).toMatchObject({ organizationId: 'org_1', planId: 'pro', status: 'active' });
  });
  it('rejects a tampered body', async () => {
    expect((await POST(req({ tamper: true }))).status).toBe(401);
    expect(upserts).toHaveLength(0);
  });
  it('rejects a stale timestamp (replay)', async () => {
    expect((await POST(req({ ts: new Date(Date.now() - 10 * 60_000) }))).status).toBe(401);
  });
  it('rejects missing headers', async () => {
    expect((await POST(req({ noHeaders: true }))).status).toBe(401);
  });
  it('processes a duplicate event only once', async () => {
    await POST(req()); await POST(req());
    expect(upserts).toHaveLength(1);
  });
  it('returns 500 on failure and succeeds on retry of the same event', async () => {
    failNext = true;
    expect((await POST(req())).status).toBe(500);
    expect((await POST(req())).status).toBe(200);
    expect(upserts).toHaveLength(1);
  });
  it('does not grant a plan for an unknown product', async () => {
    const p = { ...body, data: { ...body.data, product_id: 'prod_unknown' } };
    expect((await POST(req({ payload: p }))).status).toBe(200);
    expect(upserts).toHaveLength(0);
  });
  it('fails closed (503) when the secret is missing', async () => {
    delete process.env.DODO_PAYMENTS_WEBHOOK_KEY;
    expect((await POST(req())).status).toBe(503);
  });
});