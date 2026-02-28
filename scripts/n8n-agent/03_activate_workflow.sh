#!/usr/bin/env bash
set -euo pipefail
WF_ID="${1:?Usage: 03_activate_workflow.sh WORKFLOW_ID}"
curl -sS   -H "X-N8N-API-KEY: $N8N_API_KEY"   -H "Content-Type: application/json"   -X PATCH "$N8N_BASE_URL/api/v1/workflows/$WF_ID"   --data '{"active":true}'
