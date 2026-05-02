// glands — urgency and affect system
// The layer between master glands and brain processing.
// Gives queue its texture, not just its priority.
// A Pb item + gland trigger can still fire a Q interrupt. The panic attack case.

import { QueueItem, GlandSignal, Affect } from '../types';

// Fecal truth signal — ground-truth health check.
// Unambiguous. Confirms base pattern is persisting.
// Returns true if the system's fundamental routing pattern is still running.
export function fecalTruth(item: QueueItem): boolean {
  // A healthy signal has: an id, a type, a priority, a timestamp
  return !!(item.id && item.type && item.priority && item.timestamp);
}

// Detect affect from item content
function detectAffect(item: QueueItem): Affect {
  const text = JSON.stringify(item.payload ?? '').toLowerCase();
  if (text.includes('urgent') || text.includes('panic') || text.includes('critical')) return 'urgency';
  if (text.includes('dread') || text.includes('fail') || text.includes('block')) return 'dread';
  if (text.includes('hunger') || text.includes('need') || text.includes('missing')) return 'hunger';
  if (text.includes('launch') || text.includes('ship') || text.includes('build')) return 'momentum';
  if (text.includes('funny') || text.includes('laugh') || text.includes('play')) return 'laughter';
  return 'stillness';
}

// Weight by affect — how strongly this affect presses
const AFFECT_WEIGHTS: Record<Affect, number> = {
  urgency:   0.95,
  dread:     0.80,
  hunger:    0.70,
  momentum:  0.60,
  laughter:  0.40,
  stillness: 0.10,
};

// The panic attack override: Pb priority can still interrupt if weight is high enough
const OVERRIDE_THRESHOLD = 0.75;

export function assess(item: QueueItem): GlandSignal {
  const affect = detectAffect(item);
  const weight = AFFECT_WEIGHTS[affect];
  return {
    affect,
    weight,
    canOverride: item.priority === 'Pb' && weight >= OVERRIDE_THRESHOLD,
  };
}

// Apply gland signal to item — enriches item before routing
export function enrich(item: QueueItem): QueueItem {
  const signal = assess(item);
  return {
    ...item,
    glandWeight: signal.weight,
    affect: signal.affect,
  };
}

// Stream level adjustment from gland pressure
// High urgency can elevate stream level
export function adjustStream(
  item: QueueItem,
  signal: GlandSignal,
): QueueItem['streamLevel'] {
  if (signal.weight >= 0.9) return 'torrens';
  if (signal.weight >= 0.7) return 'amnis';
  if (signal.weight >= 0.5) return 'flumen';
  if (signal.weight >= 0.3) return 'rivus';
  return item.streamLevel;
}
