#!/usr/bin/env bash
# Sync the canonical knowledge catalog from react-senior-review into react-interview
# so both skills install and run independently.
#
# Canonical source: skills/react-senior-review/{principles.md,references/}
# Edit there, then run this script from anywhere.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/skills/react-senior-review"
DST="$ROOT/skills/react-interview"

rm -rf "$DST/references"
cp -R "$SRC/references" "$DST/references"
cp "$SRC/principles.md" "$DST/principles.md"

echo "Synced principles.md + references/ ($(find "$DST/references" -name '*.md' | wc -l | tr -d ' ') files) -> react-interview"
