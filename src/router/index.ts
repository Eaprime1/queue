// queue router — the dispatch core
// Entry point for all routing. Orchestrates: glands → sphincter → yod.

import { QueueItem, RoutingDecision } from '../types';
import { enrich, assess, adjustStream, fecalTruth } from '../glands';
import { screen } from './sphincter';
import { route, shouldIgnore, log } from './yod';

export interface RouterResult {
  decision: RoutingDecision;
  healthy: boolean;
}

export function dispatch(raw: QueueItem): RouterResult {
  // 1. Ground-truth health check
  const healthy = fecalTruth(raw);

  // 2. Glands — enrich with affect and weight
  const glandSignal = assess(raw);
  let item = enrich(raw);
  item = { ...item, streamLevel: adjustStream(item, glandSignal) };

  // 3. Strategic ignoring — Yod's economy principle
  if (shouldIgnore(item)) {
    return {
      decision: {
        item,
        verdict: 'hold',
        destination: 'todo/shadows/',
        reason: 'Strategic ignore — rivulus + Pb + no affect: not the right season',
      },
      healthy,
    };
  }

  // 4. Sphincter — security gate
  const { verdict, reason } = screen(item, glandSignal);
  if (verdict !== 'pass' && verdict !== 'escalate') {
    return {
      decision: { item, verdict, destination: verdict === 'hold' ? 'todo/shadows/' : 'sender', reason },
      healthy,
    };
  }

  // 5. Yod — routing decision
  const decision = route(item);
  log(decision);

  return { decision, healthy };
}
