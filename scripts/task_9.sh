#!/usr/bin/env bash
# Zero Atlas — task 9
set -euo pipefail
IFS=$'\n\t'
readonly ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
log() { printf "\033[36m[%s]\033[0m %s\n" "$(date +%H:%M:%S)" "$*"; }

main() {
  log "bootstrapping zero-atlas-1124"
  command -v node >/dev/null || { log "node missing"; exit 1; }
  [ -d "$ROOT/node_modules" ] || (cd "$ROOT" && npm ci --no-audit)
  log "task 9 complete"
}
main "$@"