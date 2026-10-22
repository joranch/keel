#!/usr/bin/env bash
# PostToolUse hook: format the file Claude just edited. Never blocks (always exits 0).
# Kotlin: ktlint (brew install ktlint). Web: prettier from web/node_modules.
set -u
input="$(cat)"
file="$(printf '%s' "$input" | python3 -c 'import json,sys
try:
    print((json.load(sys.stdin).get("tool_input") or {}).get("file_path",""))
except Exception:
    print("")')"
[ -n "$file" ] && [ -f "$file" ] || exit 0
root="${CLAUDE_PROJECT_DIR:-$(pwd)}"

case "$file" in
  *.kt|*.kts)
    if command -v ktlint >/dev/null 2>&1; then
      ktlint -F "$file" >/dev/null 2>&1 || true
    fi
    ;;
  "$root"/web/*.ts|"$root"/web/*.tsx|"$root"/web/*.js|"$root"/web/*.jsx|"$root"/web/*.css|"$root"/web/*.json|"$root"/web/*.md)
    prettier="$root/web/node_modules/.bin/prettier"
    if [ -x "$prettier" ]; then
      "$prettier" --write --log-level silent "$file" >/dev/null 2>&1 || true
    fi
    ;;
esac
exit 0
