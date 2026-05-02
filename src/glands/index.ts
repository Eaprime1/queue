// glands — urgency and affect system, aligned with Total Ka Pressure (TKP)
// TKP rubric from Radix Seed Document (Gemini synthesis):
//   Gravity  35% — Comfort / stability-anchoring
//   EMF      30% — Worry / developmental momentum
//   Synergy  20% — Unoiam / unanimity / amplification
//   Affinity 15% — Discontent / "grass is greener" drive
//
// A Pb item + high TKP weight = escalate (the panic attack case).
// ∰ 20260502

import { QueueItem, GlandSignal, Affect, TKPScore, totalKaPressure } from '../types';
import { calcRadixFactor } from '../radix';

// ── Fecal truth signal ────────────────────────────────────────────────────────
// Ground-truth health check. Unambiguous.
// Confirms the base routing pattern is still persisting.
export function fecalTruth(item: QueueItem): boolean {
  return !!(item.id && item.type && item.priority && item.timestamp);
}

// ── TKP scoring from item payload ─────────────────────────────────────────────
export function scoreTKP(item: QueueItem): TKPScore {
  const text = JSON.stringify(item.payload ?? '').toLowerCase();

  // Gravity: how stable/comfortable does this feel?
  const gravity =
    /comfort|stable|anchor|ground|calm|settled/.test(text) ? 0.85 :
    /urgent|panic|collapse|broken|lost/.test(text)         ? 0.20 :
    0.55; // baseline moderate

  // EMF: how much worry/momentum pressure?
  const emf =
    /worry|dread|stuck|block|fail/.test(text)     ? 0.85 :
    /build|launch|ship|momentum|go/.test(text)    ? 0.65 :
    /calm|done|resolved|complete/.test(text)      ? 0.15 :
    0.40;

  // Synergy: amplification through combination / unanimity
  const synergy =
    /together|unified|unoiam|consensus|all/.test(text) ? 0.90 :
    /alone|isolated|single|only/.test(text)             ? 0.20 :
    0.50;

  // Affinity: discontent / directional pull
  const affinity =
    /discontent|greener|missing|gap|need|want/.test(text) ? 0.85 :
    /satisfied|complete|enough|done/.test(text)            ? 0.10 :
    0.35;

  return { gravity, emf, synergy, affinity };
}

// ── Affect from TKP ───────────────────────────────────────────────────────────
export function affectFromTKP(tkp: TKPScore): Affect {
  const total = totalKaPressure(tkp);
  if (tkp.emf > 0.7 && tkp.gravity < 0.4)                   return 'urgency';
  if (tkp.emf > 0.6 && tkp.affinity > 0.5)                  return 'dread';
  if (tkp.affinity > 0.7 && tkp.synergy < 0.4)              return 'hunger';
  if (tkp.synergy > 0.6 && tkp.gravity > 0.4)               return 'momentum';
  if (tkp.synergy > 0.6 && tkp.emf < 0.3)                   return 'laughter';
  return 'stillness';
}

// ── Affect weights (legacy + TKP aligned) ────────────────────────────────────
const AFFECT_WEIGHTS: Record<Affect, number> = {
  urgency:   0.95,
  dread:     0.80,
  hunger:    0.70,
  momentum:  0.60,
  laughter:  0.40,
  stillness: 0.10,
};

const OVERRIDE_THRESHOLD = 0.75;

// ── Full gland assessment ─────────────────────────────────────────────────────
export function assess(item: QueueItem): GlandSignal {
  const tkp    = scoreTKP(item);
  const affect = affectFromTKP(tkp);
  const weight = totalKaPressure(tkp);
  const radixFactor = calcRadixFactor(tkp);

  return {
    affect,
    tkp,
    weight,
    canOverride: item.priority === 'Pb' && weight >= OVERRIDE_THRESHOLD,
    radixFactor,
  };
}

// ── Enrich item with gland data ───────────────────────────────────────────────
export function enrich(item: QueueItem): QueueItem {
  const signal = assess(item);
  return {
    ...item,
    tkp:         signal.tkp,
    glandWeight: signal.weight,
    affect:      signal.affect,
    radixFactor: signal.radixFactor,
  };
}

// ── Stream level from TKP gravity ────────────────────────────────────────────
// Low gravity = high urgency = stream level rises
export function adjustStream(
  item: QueueItem,
  signal: GlandSignal,
): QueueItem['streamLevel'] {
  const g = signal.tkp.gravity;
  if (g < 0.2) return 'torrens';  // gravity collapsed — flood state
  if (g < 0.4) return 'amnis';
  if (g < 0.6) return 'flumen';
  if (g < 0.8) return 'rivus';
  return item.streamLevel;        // stable gravity — keep current level
}
