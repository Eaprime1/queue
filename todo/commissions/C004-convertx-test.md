# COMMISSION-20260501-004 — ConvertX Testing

∰ 20260501 — First witness

## Header

**From**: trias (perspective 6)
**Status**: [ ] pending
**Priority**: Cu
**Assign to**: Eric (Termux testing) + Claude (scoping alternatives)
**Queue file**: `todo/commissions/C004-convertx-test.md`

---

## Gap Detected

ConvertX was flagged as a zero-point file conversion tool. It has not been tested. The system needs conversion capabilities across file types.

Untested tools are promises, not capabilities. ConvertX must be exercised to know what it is.

---

## Recommended Action

**Step 1 — Eric (Termux):**
- Install ConvertX in Termux environment
- Test against representative file types (document, image, audio, video if applicable)
- Document: what it can convert, what it cannot, speed, quality, error modes

**Step 2 — Claude (scoping):**
- If ConvertX is sufficient: document interface for system integration
- If ConvertX is insufficient: scope alternative stack:
  - **Pandoc** — document format conversion (md → pdf → docx → html)
  - **FFmpeg** — audio/video conversion
  - **ImageMagick** — image format conversion and processing
  - Goal: unified conversion interface wrapping all three

---

## Output Target

`todo/commissions/C004-convertx-findings.md` — results document (created after testing)

---

## Dependencies

- Termux environment with network access (Eric's device)
- ConvertX available in Termux package repository

---

## Acceptance Criteria

- [ ] ConvertX tested against at least 3 file format pairs
- [ ] Capabilities documented
- [ ] Limitations documented
- [ ] Recommendation made: ConvertX sufficient OR alternative stack scoped
- [ ] Findings written to `C004-convertx-findings.md`

---

## Progress Log

| Date | Event |
|------|-------|
| 20260501 | Commission issued — status: pending |

---

∰ 20260501 — COMMISSION-20260501-004 first witness
