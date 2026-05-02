// Q^11 — the interrupt table
// 11 interrupt types, one per PRW perspective.
// Seeded by que. In shadow until primal launches.
// When a shadow collapses (8→11→7), it fires the matching interrupt.

import { InterruptEntry, PerspectiveIndex } from '../types';

// The 11-entry interrupt table — seeded from Q^11
// Perspectives 1-4 are Pinnacle tier (to be named when PRW Phase 1 completes)
// Perspective 5 = Uni (observer/annotator)
// Perspective 6 = Trias (commissioner)
// Perspective 7 = Unoiam (mission issuer — 7-Prime resolution state)
// Perspectives 8-11 = Shadow tier (collapse triggers)
export const Q_TABLE: Record<PerspectiveIndex, InterruptEntry> = {
  1: {
    perspective: 1,
    name: 'P1-PINNACLE',
    description: 'Pinnacle tier — perspective 1 (name to be defined in PRW Phase 1)',
    collapseCondition: 'PRW Phase 1 first clean run',
    active: false,
  },
  2: {
    perspective: 2,
    name: 'P2-PINNACLE',
    description: 'Pinnacle tier — perspective 2 (name to be defined in PRW Phase 1)',
    collapseCondition: 'PRW Phase 1 first clean run',
    active: false,
  },
  3: {
    perspective: 3,
    name: 'P3-PINNACLE',
    description: 'Pinnacle tier — perspective 3 (name to be defined in PRW Phase 1)',
    collapseCondition: 'PRW Phase 1 first clean run',
    active: false,
  },
  4: {
    perspective: 4,
    name: 'P4-PINNACLE',
    description: 'Pinnacle tier — perspective 4 (name to be defined in PRW Phase 1)',
    collapseCondition: 'PRW Phase 1 first clean run',
    active: false,
  },
  5: {
    perspective: 5,
    name: 'P5-UNI',
    description: 'Uni — observer/annotator. Fires when annotation is required.',
    collapseCondition: 'Item arrives in rivulus without Uni annotation',
    active: true,
  },
  6: {
    perspective: 6,
    name: 'P6-TRIAS',
    description: 'Trias — commissioner. Fires when a gap is detected that needs a commission.',
    collapseCondition: 'Gap detected in system capability',
    active: true,
  },
  7: {
    perspective: 7,
    name: 'P7-UNOIAM',
    description: 'Unoiam — 7-Prime resolution state. Mission issuer. Fires when shadow collapses to mission.',
    collapseCondition: 'Shadow reaches ¹¹ ready-to-collapse and triadic readiness complete',
    active: true,
  },
  8: {
    perspective: 8,
    name: 'P8-SEED',
    description: 'Shadow seed interrupt. Fires when a new shadow concept is first witnessed.',
    collapseCondition: 'New shadow named and witnessed',
    active: true,
  },
  9: {
    perspective: 9,
    name: 'P9-DEVELOP',
    description: 'Shadow developing interrupt. Fires when Anti-Vector is identified.',
    collapseCondition: 'Anti-Vector documented for a shadow',
    active: false,
  },
  10: {
    perspective: 10,
    name: 'P10-MATURE',
    description: 'Shadow maturing interrupt. Fires when all three triadic elements are in hand.',
    collapseCondition: 'Vector + Anti-Vector + Prime all documented',
    active: false,
  },
  11: {
    perspective: 11,
    name: 'P11-COLLAPSE',
    description: 'Shadow collapse interrupt. Fires when a shadow is ready to collapse to form.',
    collapseCondition: 'Shadow at ¹¹ ready-to-collapse — publication or implementation imminent',
    active: false,
  },
};

// Named interrupt patterns beyond the perspective table
export const NAMED_INTERRUPTS = {
  MOBIUS: {
    name: 'möbius',
    description: 'Single-surface interrupt — inside and outside are the same. Fires when the sphincter boundary collapses.',
  },
  INTERSTATE: {
    name: 'interstate',
    description: 'Multi-lane routing interrupt. Fires when multiple high-priority items arrive simultaneously.',
  },
  PEANUT_CURVE: {
    name: 'peanut-curve',
    description: 'Bifurcation interrupt. Fires when a single item needs to fork to two destinations.',
  },
} as const;

// Seed Q^11 — activate the table entries that are ready
export function seedQ11(): InterruptEntry[] {
  return Object.values(Q_TABLE).filter(entry => entry.active);
}

// Fire an interrupt for a given perspective
export function fire(perspective: PerspectiveIndex, payload?: unknown): void {
  const entry = Q_TABLE[perspective];
  if (!entry.active) {
    console.log(`Q-SHADOW | P${perspective}:${entry.name} not yet active — held in shadow`);
    return;
  }
  console.log(`Q-INTERRUPT | P${perspective}:${entry.name} | ${entry.description}`);
  if (payload) console.log('  payload:', JSON.stringify(payload, null, 2));
}
