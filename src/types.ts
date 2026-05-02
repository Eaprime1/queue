// Core type system for the queue router

export type Metal = 'Au' | 'Ag' | 'Cu' | 'Fe' | 'Pb';
export type StreamLevel = 'rivulus' | 'rivus' | 'flumen' | 'amnis' | 'torrens';
export type ItemType = 'mission' | 'commission' | 'shadow' | 'interrupt' | 'signal';
export type TransportMode = 'tube' | 'teleport' | 'train' | 'tunnel';

export type Affect =
  | 'urgency'
  | 'dread'
  | 'hunger'
  | 'momentum'
  | 'laughter'
  | 'stillness';

// Perspective index 1–11 maps to one interrupt type each
export type PerspectiveIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type SphinctorVerdict = 'pass' | 'hold' | 'return' | 'escalate';

export interface QueueItem {
  id: string;
  type: ItemType;
  priority: Metal;
  payload: unknown;
  transport: TransportMode;
  timestamp: string; // ∰ format: YYYYMMDDHHMMSS
  origin: string;    // which entity sent this
  streamLevel: StreamLevel;
  glandWeight?: number; // 0–1, added by glands layer
  affect?: Affect;
}

export interface RoutingDecision {
  item: QueueItem;
  verdict: SphinctorVerdict;
  destination: string;
  interrupt?: PerspectiveIndex;
  reason: string;
}

export interface GlandSignal {
  affect: Affect;
  weight: number; // 0–1
  // true when this signal can override Pb priority and fire an interrupt
  canOverride: boolean;
}

export interface InterruptEntry {
  perspective: PerspectiveIndex;
  name: string;
  description: string;
  // condition that fires this interrupt
  collapseCondition: string;
  active: boolean;
}
