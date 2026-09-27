#!/usr/bin/env bash
# Fail when plugin, server, and package versions drift, or when a later
# change lands on the base ref without a version bump.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

files=(
  plugins/lsports-arena360/.cursor-plugin/plugin.json
  plugins/lsports-arena360/.claude-plugin/plugin.json
  plugins/lsports-arena360/.codex-plugin/plugin.json
  server.json
  package.json
)

version_of() {
  node -e 'const fs=require("fs"); const j=JSON.parse(fs.readFileSync(process.argv[1],"utf8")); if(!j.version) process.exit(2); process.stdout.write(j.version);' "$1"
}

expected=""
for f in "${files[@]}"; do
  v="$(version_of "$f")"
  if [[ -z "$expected" ]]; then
    expected="$v"
  elif [[ "$v" != "$expected" ]]; then
    echo "version mismatch: $f has $v, expected $expected" >&2
    exit 1
  fi
done

if ! grep -q "$expected" CHANGELOG.md; then
  echo "CHANGELOG.md does not mention $expected" >&2
  exit 1
fi

base="${1:-origin/main}"
if git cat-file -e "$base:server.json" 2>/dev/null; then
  old="$(git show "$base:server.json" | node -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>{process.stdout.write(JSON.parse(s).version||"")})')"
  if [[ -n "$old" && "$old" == "$expected" ]]; then
    if git diff --name-only "$base" HEAD | grep -Eq '^(plugins/|server\.json|package\.json)'; then
      echo "plugins or server.json changed vs $base but version is still $expected" >&2
      exit 1
    fi
  fi
fi

echo "versions match at $expected"
