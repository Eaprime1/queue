// yod — the routing engine
// Pure dispatch. No judgment. No creation. Holds, watches, routes.
// Economy principle: minimum routing decisions for maximum system health.

import { QueueItem, ItemType, Metal, RoutingDecision, PerspectiveIndex } from '../types';

// Destination map — where each item type routes
const DESTINATIONS: Record<ItemType, string> = {
  mission:    'todo/missions/',
  commission: 'todo/commissions/',
  shadow:     'todo/shadows/',
  interrupt:  'Q/',
  signal:     'Q/signals/',
};

// Priority → time horizon label (for logging)
const HORIZON: Record<Metal, string> = {
  Au: 'immediate',
  Ag: 'next-session',
  Cu: 'this-week',
  Fe: 'this-sprint',
  Pb: 'rework-required',
};

// Classify item type from payload signals
function classifyType(item: QueueItem): ItemType {
  const text = JSON.stringify(item.payload ?? '').toLowerCase();
  if (text.includes('mission') || text.includes('directive') || text.includes('long-horizon')) {
    return 'mission';
  }
  if (text.includes('interrupt') || text.includes('signal') || text.includes('q^')) {
    return 'interrupt';
  }
  if (text.includes('shadow') || text.includes('seed') || text.includes('perspective 8')) {
    return 'shadow';
  }
  return 'commission';
}

// Map shadow stage to perspective (8–11)
function shadowPerspective(item: QueueItem): PerspectiveIndex | undefined {
  const text = JSON.stringify(item.payload ?? '').toLowerCase();
  if (text.includes('⁸') || text.includes('seed'))       return 8;
  if (text.includes('⁹') || text.includes('developing')) return 9;
  if (text.includes('¹⁰') || text.includes('maturing'))  return 10;
  if (text.includes('¹¹') || text.includes('collapse'))  return 11;
  return undefined;
}

// Core Yod routing decision
export function route(item: QueueItem): RoutingDecision {
  const type = classifyType(item);
  const enriched: QueueItem = { ...item, type };
  const destination = DESTINATIONS[type];
  const horizon = HORIZON[item.priority];

  const reason = [
    `type:${type}`,
    `priority:${item.priority}(${horizon})`,
    `stream:${item.streamLevel}`,
    `transport:${item.transport}`,
  ].join(' | ');

  // Shadow items may carry a perspective index for Q interrupt mapping
  const interrupt = type === 'shadow' ? shadowPerspective(enriched) : undefined;

  return {
    item: enriched,
    verdict: 'pass',
    destination,
    interrupt,
    reason,
  };
}

// Strategic ignoring — Yod's most powerful tool
// Returns true if this item should not move yet
export function shouldIgnore(item: QueueItem): boolean {
  // Rivulus + Pb + no affect = not the right season
  return item.streamLevel === 'rivulus' && item.priority === 'Pb' && !item.affect;
}

// Log routing event to console (replace with persistent log when ready)
export function log(decision: RoutingDecision): void {
  const ts = decision.item.timestamp;
  const arrow = `${decision.item.origin} → ${decision.destination}`;
  console.log(`∰ ${ts} | ${arrow} | ${decision.reason}`);
  if (decision.interrupt !== undefined) {
    console.log(`  └─ interrupt:P${decision.interrupt} queued for Q`);
  }
}
