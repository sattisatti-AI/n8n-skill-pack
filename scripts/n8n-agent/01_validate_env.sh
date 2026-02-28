#!/usr/bin/env bash
set -euo pipefail
: "${N8N_BASE_URL:?Missing N8N_BASE_URL}"
: "${N8N_API_KEY:?Missing N8N_API_KEY}"
echo "OK: N8N_BASE_URL and N8N_API_KEY are set"
