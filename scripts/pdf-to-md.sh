#!/usr/bin/env bash
# pdf-to-md.sh — local PDF to Markdown conversion helper
# Usage: bash scripts/pdf-to-md.sh <file.pdf> [output.md]
#
# Tries pdftotext first, then pandoc. Wraps output in minimal markdown.
# Mirrors what the pdf-to-md GitHub Actions workflow does in CI.
#
# ∰ Crystallization Event: Water → Air — local helper

set -euo pipefail

PDF="${1:-}"
if [ -z "$PDF" ]; then
  echo "Usage: bash scripts/pdf-to-md.sh <file.pdf> [output.md]"
  exit 1
fi

if [ ! -f "$PDF" ]; then
  echo "Error: file not found: $PDF"
  exit 1
fi

BASE="${PDF%.pdf}"
MD="${2:-${BASE}.md}"
TMP="$(mktemp /tmp/pdf-to-md-XXXXXX.txt)"
trap 'rm -f "$TMP"' EXIT

echo "∰ Converting: $PDF → $MD"

# ── Method 1: pdftotext (poppler) ──────────────────────────────────────────────
if command -v pdftotext &>/dev/null; then
  if pdftotext -layout "$PDF" "$TMP" 2>/dev/null && [ -s "$TMP" ]; then
    {
      echo "# $(basename "$BASE")"
      echo ""
      echo "> ∰ Crystallization Event — converted from \`$(basename "$PDF")\`"
      echo "> Converted by: scripts/pdf-to-md.sh (pdftotext)"
      echo ""
      echo "---"
      echo ""
      cat "$TMP"
    } > "$MD"
    echo "  ✓ converted via pdftotext"
    echo "  → $MD"
    exit 0
  fi
fi

# ── Method 2: pandoc ──────────────────────────────────────────────────────────
if command -v pandoc &>/dev/null; then
  if pandoc "$PDF" -t markdown -o "$MD" 2>/dev/null && [ -s "$MD" ]; then
    # Prepend crystallization header
    TMP2="$(mktemp /tmp/pdf-to-md-header-XXXXXX.md)"
    {
      echo "# $(basename "$BASE")"
      echo ""
      echo "> ∰ Crystallization Event — converted from \`$(basename "$PDF")\`"
      echo "> Converted by: scripts/pdf-to-md.sh (pandoc)"
      echo ""
      echo "---"
      echo ""
      cat "$MD"
    } > "$TMP2"
    mv "$TMP2" "$MD"
    echo "  ✓ converted via pandoc"
    echo "  → $MD"
    exit 0
  fi
fi

# ── Method 3: python pdfminer ─────────────────────────────────────────────────
if command -v python3 &>/dev/null && python3 -c "import pdfminer" 2>/dev/null; then
  python3 - "$PDF" "$TMP" <<'PYEOF'
import sys
from pdfminer.high_level import extract_text
text = extract_text(sys.argv[1])
with open(sys.argv[2], 'w', encoding='utf-8') as f:
    f.write(text)
PYEOF
  if [ -s "$TMP" ]; then
    {
      echo "# $(basename "$BASE")"
      echo ""
      echo "> ∰ Crystallization Event — converted from \`$(basename "$PDF")\`"
      echo "> Converted by: scripts/pdf-to-md.sh (pdfminer)"
      echo ""
      echo "---"
      echo ""
      cat "$TMP"
    } > "$MD"
    echo "  ✓ converted via pdfminer"
    echo "  → $MD"
    exit 0
  fi
fi

# ── Failed ────────────────────────────────────────────────────────────────────
echo ""
echo "  ✗ Conversion failed. None of the available tools could extract text."
echo ""
echo "  Install one of the following and try again:"
echo "    Ubuntu/Debian: sudo apt-get install poppler-utils pandoc"
echo "    macOS:         brew install poppler pandoc"
echo "    Python:        pip install pdfminer.six"
echo ""
echo "  Or: export the document from Google Drive as .txt or .md directly."
exit 1
