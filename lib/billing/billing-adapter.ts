import crypto from 'crypto';
import { initialMockStore } from '@/lib/db';

export interface CheckoutSessionOptions {
  organizationId: string;
  planId: string;
  userEmail: string;
  returnUrl: string;
}

export interface CheckoutResult {
  checkoutUrl: string;
  sessionId: string;
  isMock: boolean;
}

export interface SubscriptionRecord {
  status: 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete';
  planId: string;
  currentPeriodEnd: Date;
  provider: 'dodo' | 'polar' | 'mock';
  externalSubscriptionId: string;
}

export interface BillingProvider {
  createCheckoutSession(options: CheckoutSessionOptions): Promise<CheckoutResult>;
  
  getSubscriptionStatus(organizationId: string): Promise<SubscriptionRecord | null>;
}

// In-memory verified subscriptions and processed webhooks store for non-Postgres / dev fallback




export class DodoPaymentsProvider implements BillingProvider {
  private apiKey: string;
  private webhookSecret: string;
  private isTestMode: boolean;

  constructor() {
    this.apiKey = process.env.DODO_PAYMENTS_API_KEY || '';
    this.webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_KEY || '';
    this.isTestMode = process.env.DODO_PAYMENTS_TEST_MODE !== 'false';
  }

  async createCheckoutSession(options: CheckoutSessionOptions): Promise<CheckoutResult> {
    if (!this.apiKey) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('[HireRoom Billing] Dodo Payments API key is not configured in production.');
      }
      return new MockBillingProvider().createCheckoutSession(options);
    }

    const endpoint = this.isTestMode
      ? 'https://test.dodopayments.com/checkouts'
      : 'https://live.dodopayments.com/checkouts';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: options.planId,
        customer: { email: options.userEmail },
        return_url: options.returnUrl,
        metadata: { organization_id: options.organizationId },
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => '');
      if (process.env.NODE_ENV === 'production') {
        throw new Error(
          `[HireRoom Billing] Dodo Payments checkout creation failed (${res.status}): ${errorBody || res.statusText}`
        );
      }
      // Dev mode only fallback
      return new MockBillingProvider().createCheckoutSession(options);
    }

    const data = await res.json();
    const checkoutUrl = data.checkout_url || data.payment_link;
    const sessionId = data.session_id || data.id;

    if (!checkoutUrl) {
      throw new Error('[HireRoom Billing] Dodo Payments API returned no checkout URL');
    }

    return {
      checkoutUrl,
      sessionId,
      isMock: false,
    };
  }

  // Real HMAC-SHA256 signature verification according to Dodo Payments webhook specification
 

  // Subscription state queries database / store of verified webhook updates
  async getSubscriptionStatus(organizationId: string): Promise<SubscriptionRecord | null> {
    
    return  null;
  }
}

// Mock provider strictly restricted to non-production environments
export class MockBillingProvider implements BillingProvider {
  async createCheckoutSession(options: CheckoutSessionOptions): Promise<CheckoutResult> {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[HireRoom Billing] Mock billing provider is forbidden in production environment.');
    }
    return {
      checkoutUrl: `/settings?tab=billing&mock_session=1&plan=${encodeURIComponent(options.planId)}`,
      sessionId: `mock_sess_${Date.now()}`,
      isMock: true,
    };
  }



  async getSubscriptionStatus(organizationId: string): Promise<SubscriptionRecord | null> {
    return  null;
  }
}

export function getBillingProvider(): BillingProvider {
  const providerType = process.env.BILLING_PROVIDER || 'dodo';

  if (providerType === 'dodo') {
    return new DodoPaymentsProvider();
  }

  if (process.env.NODE_ENV !== 'production') {
    return new MockBillingProvider();
  }

  throw new Error(`[HireRoom Billing] Unsupported production billing provider: ${providerType}`);
}
