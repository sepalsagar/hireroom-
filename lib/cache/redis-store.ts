export interface CacheStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds: number): Promise<void>;
  incrementRate(key: string, windowSeconds: number): Promise<number>;
}

// In-Memory LRU Cache with TTL Eviction for local development & test
class InMemoryCacheStore implements CacheStore {
  private cache = new Map<string, { value: string; expiresAt: number }>();
  private rateWindows = new Map<string, { count: number; resetAt: number }>();
  private readonly maxSize: number;

  constructor(maxSize = 200) {
    this.maxSize = maxSize;
  }

  async get(key: string): Promise<string | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    // Evict oldest if exceeding max size
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async incrementRate(key: string, windowSeconds: number): Promise<number> {
    const now = Date.now();
    const existing = this.rateWindows.get(key);

    if (!existing || now > existing.resetAt) {
      this.rateWindows.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
      return 1;
    }

    existing.count += 1;
    return existing.count;
  }
}

// Upstash Redis implementation for production environment
class UpstashRedisStore implements CacheStore {
  private url: string;
  private token: string;

  constructor(url: string, token: string) {
    this.url = url.replace(/\/$/, '');
    this.token = token;
  }

  private async fetchRedis(command: any[]): Promise<any> {
    const res = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });
    if (!res.ok) throw new Error(`Redis error: ${res.statusText}`);
    const data = await res.json();
    return data.result;
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.fetchRedis(['GET', key]);
    } catch {
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    try {
      await this.fetchRedis(['SET', key, value, 'EX', ttlSeconds]);
    } catch {}
  }

  async incrementRate(key: string, windowSeconds: number): Promise<number> {
    try {
      const count = await this.fetchRedis(['INCR', key]);
      if (count === 1) {
        await this.fetchRedis(['EXPIRE', key, windowSeconds]);
      }
      return count;
    } catch {
      return 1;
    }
  }
}

let activeStore: CacheStore | null = null;

export function getCacheStore(): CacheStore {
  if (activeStore) return activeStore;

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    activeStore = new UpstashRedisStore(redisUrl, redisToken);
  } else {
    activeStore = new InMemoryCacheStore(200);
  }
  return activeStore;
}
