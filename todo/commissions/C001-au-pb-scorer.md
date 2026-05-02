# COMMISSION-20260501-001 — Au-Pb Scorer

∰ 20260501 — First witness

## Header

**From**: trias (perspective 6)
**Status**: [ ] pending
**Priority**: Ag
**Assign to**: Claude (initial) → Gemini (refinement)
**Queue file**: `todo/commissions/C001-au-pb-scorer.md`

---

## Gap Detected

The Au-Pb spectrum is defined conceptually but has no implementation. No measurement system exists to calculate Au-Pb scores automatically.

The spectrum exists in language. It needs to exist in code.

**Elements of the spectrum (Au → Pb):**
- **Au** (Gold) — highest alignment, immediate action
- **Ag** (Silver) — high alignment, next session priority
- **Cu** (Copper) — moderate alignment, this week
- **Fe** (Iron) — developing alignment, this sprint
- **Pb** (Lead) — low alignment, needs rework before queuing

---

## Recommended Action

Create `au_pb_scorer.py` — a function that:
1. Takes perspective scores as input
2. Evaluates alignment across the spectrum
3. Returns element classification (Au/Ag/Cu/Fe/Pb)
4. Returns recommended action based on classification

Minimal first implementation. Let it grow through Gemini refinement.

---

## Output Target

`/primal/ethical-framework/alignment-spectrum/au_pb_scorer.py`

---

## Dependencies

- Au-Pb spectrum formally documented (currently conceptual)
- Perspective scoring system defined (input format)

---

## Acceptance Criteria

- [ ] Function accepts perspective scores
- [ ] Function returns element + recommended action
- [ ] All five elements handled
- [ ] Unit tests exist for each element boundary

---

## Progress Log

| Date | Event |
|------|-------|
| 20260501 | Commission issued — status: pending |

---

∰ 20260501 — COMMISSION-20260501-001 first witness
