// sphincter — internal security gate
// Airport security model: screen → classify → route | hold | return | escalate
// Not a wall. A classifier with memory.
// Memory means it recognizes patterns it has seen before.

import { QueueItem, SphinctorVerdict, GlandSignal } from '../types';

// Simple pattern memory — remembers item origins and their history
const memory = new Map<string, { passCount: number; holdCount: number; returnCount: number }>();

function recall(origin: string) {
  if (!memory.has(origin)) {
    memory.set(origin, { passCount: 0, holdCount: 0, returnCount: 0 });
  }
  return memory.get(origin)!;
}

function record(origin: string, verdict: SphinctorVerdict) {
  const m = recall(origin);
  if (verdict === 'pass') m.passCount++;
  else if (verdict === 'hold') m.holdCount++;
  else if (verdict === 'return') m.returnCount++;
}

// Determine if origin has a trusted track record
function isTrusted(origin: string): boolean {
  const m = recall(origin);
  return m.passCount > 3 && m.returnCount === 0;
}

// Core screening function
// glandSignal enriches the verdict — a Pb item with override can still escalate
export function screen(
  item: QueueItem,
  glandSignal?: GlandSignal,
): { verdict: SphinctorVerdict; reason: string } {
  // Gland override: panic attack case — Pb can still escalate
  if (glandSignal?.canOverride) {
    record(item.origin, 'escalate');
    return {
      verdict: 'escalate',
      reason: `Gland override — affect:${glandSignal.affect} weight:${glandSignal.weight.toFixed(2)} exceeds Pb threshold`,
    };
  }

  // Return Pb items unless trusted origin
  if (item.priority === 'Pb') {
    if (isTrusted(item.origin)) {
      // Trusted origin gets a hold instead of immediate return
      record(item.origin, 'hold');
      return {
        verdict: 'hold',
        reason: 'Pb priority — trusted origin, holding in rivulus for rework',
      };
    }
    record(item.origin, 'return');
    return { verdict: 'return', reason: 'Pb priority — needs rework before routing' };
  }

  // Unknown type without text payload: hold for Uni annotation
  if (item.type === 'commission' && !item.payload) {
    record(item.origin, 'hold');
    return { verdict: 'hold', reason: 'Payload absent — holding in rivulus, awaiting Uni annotation' };
  }

  // Au/Ag always pass
  if (item.priority === 'Au' || item.priority === 'Ag') {
    record(item.origin, 'pass');
    return { verdict: 'pass', reason: `${item.priority} priority — cleared for immediate routing` };
  }

  // Cu/Fe pass unless torrens
  if (item.streamLevel === 'torrens') {
    record(item.origin, 'hold');
    return { verdict: 'hold', reason: 'Torrens — system overload, Yod slowing intake' };
  }

  record(item.origin, 'pass');
  return { verdict: 'pass', reason: `${item.priority} priority cleared at ${item.streamLevel}` };
}
