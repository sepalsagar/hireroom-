export type SubscriptionStatus = 'active' | 'past_due' | 'canceled';
export class StoreUnavailableError extends Error {}

export interface WebhookEventStore {
  /** 'duplicate' only for events already completed. Insert with a UNIQUE event id. */
  claim(eventId: string): Promise<'new' | 'duplicate'>;
  complete(eventId: string): Promise<void>;
  release(eventId: string): Promise<void>;
}
export interface SubscriptionStore {
  upsert(input: {
    organizationId: string; planId: string; status: SubscriptionStatus;
    currentPeriodEnd: Date | null; provider: 'dodo'; externalSubscriptionId: string | null;
  }): Promise<void>;
}

export function getWebhookStore(): WebhookEventStore {
  throw new StoreUnavailableError('Webhook store not implemented: connect the database');
}
export function getSubscriptionStore(): SubscriptionStore {
  throw new StoreUnavailableError('Subscription store not implemented: connect the database');
}