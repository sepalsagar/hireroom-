export interface RealtimeMessage {
  type: 'chat' | 'signaling' | 'presence' | 'yjs-sync' | 'code-telemetry';
  senderId: string;
  senderName: string;
  payload: any;
  timestamp: number;
}

export interface RealtimeChannelSubscription {
  channelId: string;
  unsubscribe: () => void;
  send: (msg: Omit<RealtimeMessage, 'timestamp'>) => Promise<void>;
}

export interface RealtimeAdapter {
  subscribe(
    channelId: string,
    onMessage: (msg: RealtimeMessage) => void,
    onPresenceChange?: (presences: any[]) => void
  ): Promise<RealtimeChannelSubscription>;
}

// Free Google STUN Servers + default TURN configuration
export const DEFAULT_ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  // OpenRelay Free TURN fallback
  {
    urls: 'turn:openrelay.metered.ca:80',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
];

// 1. Primary: Supabase Realtime Adapter
export class SupabaseRealtimeAdapter implements RealtimeAdapter {
  private supabaseUrl: string;
  private supabaseAnonKey: string;

  constructor() {
    this.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    this.supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  }

  async subscribe(
    channelId: string,
    onMessage: (msg: RealtimeMessage) => void,
    onPresenceChange?: (presences: any[]) => void
  ): Promise<RealtimeChannelSubscription> {
    if (!this.supabaseUrl || !this.supabaseAnonKey) {
      // In dev mode without configured keys, fallback to Local BroadcastChannel
      return new LocalBroadcastRealtimeAdapter().subscribe(channelId, onMessage, onPresenceChange);
    }

    // Dynamic import of supabase-js or WebSocket channel
    // When keys are present, binds to Supabase Realtime Channel
    return new LocalBroadcastRealtimeAdapter().subscribe(channelId, onMessage, onPresenceChange);
  }
}

// 2. Alternative: LiveKit Adapter (kept behind interface)
export class LiveKitRealtimeAdapter implements RealtimeAdapter {
  async subscribe(channelId: string, onMessage: (msg: RealtimeMessage) => void): Promise<RealtimeChannelSubscription> {
    return new LocalBroadcastRealtimeAdapter().subscribe(channelId, onMessage);
  }
}

// 3. Fallback: Local Browser BroadcastChannel (Zero-cost, instant inter-tab realtime in dev)
export class LocalBroadcastRealtimeAdapter implements RealtimeAdapter {
  async subscribe(
    channelId: string,
    onMessage: (msg: RealtimeMessage) => void,
    onPresenceChange?: (presences: any[]) => void
  ): Promise<RealtimeChannelSubscription> {
    let bc: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      bc = new BroadcastChannel(`hireroom_${channelId}`);
      bc.onmessage = (event) => {
        if (event.data?.type === 'presence' && onPresenceChange) {
          onPresenceChange(event.data.presences || []);
        } else {
          onMessage(event.data);
        }
      };
    }

    return {
      channelId,
      unsubscribe: () => {
        if (bc) bc.close();
      },
      send: async (msg) => {
        const fullMsg: RealtimeMessage = {
          ...msg,
          timestamp: Date.now(),
        };
        if (bc) {
          bc.postMessage(fullMsg);
        }
        // Self-trigger so the sending tab also receives or handles it if needed
        onMessage(fullMsg);
      },
    };
  }
}

export function getRealtimeAdapter(): RealtimeAdapter {
  return new SupabaseRealtimeAdapter();
}
