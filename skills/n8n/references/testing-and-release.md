# Testing & release checklist (n8n Cloud)

## Before activation
- Import workflow, re-select credentials in UI.
- Verify required node parameters (IDs, table names, sheet names).
- Run a manual test with representative payloads.
- Confirm 4xx/5xx branches respond correctly (webhooks).
- Confirm idempotency: duplicate payload does not create duplicates (if required).

## After activation
- Enable notifications via error workflow.
- Add lightweight logging (execution_id returned to caller).
- Monitor first 24h for retries/rate limits.
