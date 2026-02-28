#!/usr/bin/env bash
set -euo pipefail
WF_JSON="${1:?Usage: 02_create_workflow.sh path/to/workflow.json}"
curl -sS   -H "X-N8N-API-KEY: $N8N_API_KEY"   -H "Content-Type: application/json"   -X POST "$N8N_BASE_URL/api/v1/workflows"   --data-binary "@$WF_JSON"
