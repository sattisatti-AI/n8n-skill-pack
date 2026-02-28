# n8n Agent Scripts

These scripts let an agent (Claude Code/Antigravity) create, activate, and test workflows in n8n Cloud using an API key.

## Setup
Set environment variables:

- `N8N_BASE_URL` (example: https://YOUR-SUBDOMAIN.n8n.cloud)
- `N8N_API_KEY`

## Scripts
1) `01_validate_env.sh`
2) `02_create_workflow.sh path/to/workflow.json`
3) `03_activate_workflow.sh WORKFLOW_ID`
4) `04_run_test_webhook.sh WEBHOOK_URL [JSON_BODY]`

## Security
Do not store API keys in files. Use your shell profile (e.g. ~/.zshrc) or a secrets manager.
