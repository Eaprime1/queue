// que — the concepts-side intake module
// The unexusi instance. Bridges .dot folders and the routing core.
// Receives all incoming concepts, stages them, seeds Q^11.

import { QueueItem, TransportMode, Metal, StreamLevel } from '../types';
import { stamp } from '../utils';

export type ConceptPayload = {
  text: string;
  source: string;
  transport: TransportMode;
};

// Read entity identity from .dot folder
function resolveDotIdentity(): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const identity = require('../../.claude/identity.json');
    return identity?.domains?.[0] ?? 'unknown';
  } catch {
    return 'unknown';
  }
}

// Assign a preliminary priority based on concept text signals
function inferPriority(text: string): Metal {
  const t = text.toLowerCase();
  if (t.includes('urgent') || t.includes('now') || t.includes('immediate')) return 'Au';
  if (t.includes('next') || t.includes('soon')) return 'Ag';
  if (t.includes('this week') || t.includes('week')) return 'Cu';
  if (t.includes('sprint') || t.includes('phase')) return 'Fe';
  return 'Cu'; // default — let Yod refine
}

// Assign stream level from transport mode
function transportToStream(transport: TransportMode): StreamLevel {
  switch (transport) {
    case 'teleport': return 'amnis';
    case 'tube':     return 'flumen';
    case 'train':    return 'rivus';
    case 'tunnel':   return 'rivulus';
  }
}

// Stage an incoming concept into a QueueItem ready for the sphincter
export function stage(concept: ConceptPayload): QueueItem {
  const origin = resolveDotIdentity();
  return {
    id: `que-${Date.now()}`,
    type: 'commission',     // concepts default to commission; Yod may reclassify
    priority: inferPriority(concept.text),
    payload: concept,
    transport: concept.transport,
    timestamp: stamp(),
    origin,
    streamLevel: transportToStream(concept.transport),
  };
}

// The que intake function — entry point for the BBS interface and external callers
export function intake(
  text: string,
  source = 'bbs-terminal',
  transport: TransportMode = 'tube',
): QueueItem {
  return stage({ text, source, transport });
}
