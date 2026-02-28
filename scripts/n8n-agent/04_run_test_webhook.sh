#!/usr/bin/env bash
set -euo pipefail
WEBHOOK_URL="${1:?Usage: 04_run_test_webhook.sh WEBHOOK_URL}"
JSON_BODY="${2:-{"event":"test","source":"claude-agent"}}"
curl -sS -X POST "$WEBHOOK_URL"   -H "Content-Type: application/json"   -d "$JSON_BODY"
