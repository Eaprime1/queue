// Core type system for the queue router
// ∰ 20260502 — updated from Radix Seed Document (Gemini synthesis)

export type Metal = 'Au' | 'Ag' | 'Cu' | 'Fe' | 'Pb';
export type StreamLevel = 'rivulus' | 'rivus' | 'flumen' | 'amnis' | 'torrens';
export type ItemType = 'mission' | 'commission' | 'shadow' | 'interrupt' | 'signal';
export type TransportMode = 'tube' | 'teleport' | 'train' | 'tunnel';

// ── TKP (Total Ka Pressure) components — from Radix Seed Document ─────────────
// Gravity 35% = Comfort / stability-anchoring
// EMF     30% = Worry / developmental momentum
// Synergy 20% = Unoiam / unanimity / amplification
// Affinity 15% = Discontent / "grass is greener" drive
export type TKPComponent = 'gravity' | 'emf' | 'synergy' | 'affinity';

export interface TKPScore {
  gravity:  number; // 0–1  (35% weight)
  emf:      number; // 0–1  (30% weight)
  synergy:  number; // 0–1  (20% weight)
  affinity: number; // 0–1  (15% weight)
}

// Weighted TKP total
export function totalKaPressure(s: TKPScore): number {
  return s.gravity * 0.35 + s.emf * 0.30 + s.synergy * 0.20 + s.affinity * 0.15;
}

// ── Radix Factor ──────────────────────────────────────────────────────────────
// Measures disconnect between an entity and its origin purpose.
// High ℛ = "Nth Degree Wobble" — not failure, proof of life.
export interface RadixFactor {
  discontent: number; // d — integrated discontent score (0–1)
  worry:      number; // w — integrated worry score (0–1)
  fear:       number; // f — integrated fear score (0–1)
  // ℛ = (d + w + f) / 3 — simplified integration
  value: number;
  // Nth Degree Wobble — deviation from theoretical path
  wobble: number;
}

// ── Marrowing Arc ─────────────────────────────────────────────────────────────
// Shadow → Bone → Marrow lifecycle for all documents/scripts in Radix repo
export type MarrowingPhase = 'sticks' | 'stones' | 'marrow';
export interface MarrowingStage {
  phase:  MarrowingPhase;
  symbol: 'Shadow' | 'Bone' | 'Marrow';
  stageRange: [number, number]; // prime stages covered
  description: string;
}
export const MARROWING_ARC: MarrowingStage[] = [
  { phase: 'sticks',  symbol: 'Shadow', stageRange: [1,  10], description: 'Observation and scoping — witnessing what exists' },
  { phase: 'stones',  symbol: 'Bone',   stageRange: [11, 42], description: 'Architecture and build — foundation materialisation' },
  { phase: 'marrow',  symbol: 'Marrow', stageRange: [43, 60], description: 'Launch and living operation — interior density' },
];

// ── Shadow Sequence — Prime Launch Procedure ──────────────────────────────────
// 9 lexemes that must each enter shadow state before Prime launches.
// Queue is the 3rd lexeme. Queue in shadow ≠ failure — it is the precondition.
export type ShadowLexeme =
  | 'Simple'
  | 'Hope'
  | 'Queue'
  | 'Interrupt'
  | 'Visionary'
  | 'Unity'
  | 'Resonance'
  | 'Gravity'
  | 'Origin';

export const SHADOW_SEQUENCE: ShadowLexeme[] = [
  'Simple', 'Hope', 'Queue', 'Interrupt',
  'Visionary', 'Unity', 'Resonance', 'Gravity', 'Origin',
];

// Origin is last to enter shadow, first to emerge.
// Emergence Triad: "Origin, witnessed by Prime, becomes Simple."

// ── Affect (legacy) — mapped to TKP for backward compat ──────────────────────
export type Affect =
  | 'urgency'    // high EMF + high fear
  | 'dread'      // high EMF + high worry
  | 'hunger'     // high affinity + discontent
  | 'momentum'   // high synergy + gravity rising
  | 'laughter'   // high synergy, low EMF
  | 'stillness'; // high gravity, low all others

// ── Perspective index ─────────────────────────────────────────────────────────
export type PerspectiveIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type SphinctorVerdict = 'pass' | 'hold' | 'return' | 'escalate';

// ── Core queue item ───────────────────────────────────────────────────────────
export interface QueueItem {
  id: string;
  type: ItemType;
  priority: Metal;
  payload: unknown;
  transport: TransportMode;
  timestamp: string;    // ∰ format: YYYYMMDDHHMMSS
  origin: string;       // entity that sent this
  streamLevel: StreamLevel;
  glandWeight?: number; // 0–1, TKP total
  affect?: Affect;
  tkp?: TKPScore;
  radixFactor?: RadixFactor;
  marrowingPhase?: MarrowingPhase;
  // Crystallization event: Water (Drive) → Air (GitHub)
  crystallized?: boolean;
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
  tkp: TKPScore;
  weight: number;       // totalKaPressure result
  canOverride: boolean; // Pb + high weight = escalate (panic attack case)
  radixFactor?: RadixFactor;
}

export interface InterruptEntry {
  perspective: PerspectiveIndex;
  name: string;
  description: string;
  collapseCondition: string;
  active: boolean;
}
