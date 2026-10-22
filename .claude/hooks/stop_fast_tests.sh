#!/usr/bin/env bash
# Stop hook: when Kotlin or web code changed, run the fast test suites before Claude ends its turn.
# A failure blocks the stop once (exit 2) so Claude fixes it; if Claude already continued
# because of this hook (stop_hook_active), it lets the turn end to avoid a loop and says so.
set -u
input="$(cat)"
active="$(printf '%s' "$input" | python3 -c 'import json,sys
try:
    print(str(json.load(sys.stdin).get("stop_hook_active", False)).lower())
except Exception:
    print("false")')"
root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$root" || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

changed="$(git status --porcelain --untracked-files=normal | awk '{print $NF}')"
kotlin_changed=$(printf '%s\n' "$changed" | grep -E '\.(kt|kts)$' | head -n 1)
web_changed=$(printf '%s\n' "$changed" | grep -E '^web/.*\.(ts|tsx|js|jsx)$' | head -n 1)
[ -n "$kotlin_changed$web_changed" ] || exit 0

log="$(mktemp)"
status=0
if [ -n "$kotlin_changed" ] && [ -x ./gradlew ]; then
  if ./gradlew tasks --all -q 2>/dev/null | grep -qE '^fastTest\b'; then
    ./gradlew fastTest -q >"$log" 2>&1 || status=1
  fi
fi
if [ "$status" -eq 0 ] && [ -n "$web_changed" ] && [ -f web/package.json ]; then
  if grep -q '"test:fast"' web/package.json; then
    npm --prefix web run test:fast --silent >"$log" 2>&1 || status=1
  fi
fi

if [ "$status" -ne 0 ]; then
  if [ "$active" = "true" ]; then
    echo "Fast tests still fail after one fix attempt; ending the turn so Jøran can look." >&2
    rm -f "$log"
    exit 0
  fi
  {
    echo "Fast tests fail. Fix them before ending the turn (last 60 lines):"
    tail -n 60 "$log"
  } >&2
  rm -f "$log"
  exit 2
fi
rm -f "$log"
exit 0
