import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'standardwebhooks';
import {
  getWebhookStore, getSubscriptionStore, StoreUnavailableError, type SubscriptionStatus,
} from '@/lib/billing/stores';

export const dynamic = 'force-dynamic';

type DodoEvent = {
  type?: string;
  data?: {
    product_id?: unknown; subscription_id?: unknown; next_billing_date?: unknown;
    metadata?: { organization_id?: unknown };
  };
};

// Confirm event names and field names against Dodo's webhook docs.
const STATUS_BY_EVENT: Record<string, SubscriptionStatus> = {
  'subscription.active': 'active',
  'subscription.renewed': 'active',
  'subscription.on_hold': 'past_due',
  'subscription.failed': 'past_due',
  'subscription.cancelled': 'canceled',
  'subscription.canceled': 'canceled',
  'subscription.expired': 'canceled',
};

function planForProduct(productId: unknown): string | null {
  if (typeof productId !== 'string') return null;
  try {
    const map = JSON.parse(process.env.PLAN_PRODUCT_IDS ?? '{}') as Record<string, string>;
    return map[productId] ?? null;
  } catch { return null; }
}

export async function POST(req: NextRequest) {
  const secret = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  if (!secret) return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });

  const rawBody = await req.text();
  const id = req.headers.get('webhook-id');
  const timestamp = req.headers.get('webhook-timestamp');
  const signature = req.headers.get('webhook-signature');
  if (!id || !timestamp || !signature) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
  }
  try {
    new Webhook(secret).verify(rawBody, {
      'webhook-id': id, 'webhook-timestamp': timestamp, 'webhook-signature': signature,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
  }

  let event: DodoEvent;
  try { event = JSON.parse(rawBody) as DodoEvent; }
  catch { return NextResponse.json({ error: 'Malformed JSON' }, { status: 400 }); }

  const status = event.type ? STATUS_BY_EVENT[event.type] : undefined;
  if (!status) return NextResponse.json({ received: true, ignored: true });

  const data = event.data ?? {};
  const organizationId = data.metadata?.organization_id;
  const planId = planForProduct(data.product_id);
  if (typeof organizationId !== 'string' || !planId) {
    console.error('Webhook ignored: missing organization or unknown product', { id, type: event.type });
    return NextResponse.json({ received: true, ignored: true });
  }
  const end = typeof data.next_billing_date === 'string' ? new Date(data.next_billing_date) : null;
  const currentPeriodEnd = end && !Number.isNaN(end.getTime()) ? end : null;

  try {
    const events = getWebhookStore();
    if ((await events.claim(id)) === 'duplicate') {
      return NextResponse.json({ received: true, duplicate: true });
    }
    try {
      await getSubscriptionStore().upsert({
        organizationId, planId, status, currentPeriodEnd, provider: 'dodo',
        externalSubscriptionId: typeof data.subscription_id === 'string' ? data.subscription_id : null,
      });
      await events.complete(id);
    } catch (err) {
      await events.release(id);
      throw err;
    }
  } catch (err) {
    console.error('Webhook processing failed', { id, message: err instanceof Error ? err.message : 'unknown' });
    return NextResponse.json({ error: 'Processing failed' },
      { status: err instanceof StoreUnavailableError ? 503 : 500 });
  }
  return NextResponse.json({ received: true });
}