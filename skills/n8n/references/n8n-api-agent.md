# n8n API (Cloud, API Key) — Agent Mode

This pack supports "C mode": generate workflow JSON → upload via n8n API → activate → test.

## Authentication
- Use n8n Cloud **API (beta)** key.
- Store as env vars on the agent machine (your Mac):
  - `N8N_BASE_URL` (e.g. https://YOUR-SUBDOMAIN.n8n.cloud)
  - `N8N_API_KEY`

Never paste keys into workflow JSON. Never commit keys to git.

## Endpoints (common)
- List workflows: `GET /api/v1/workflows`
- Create workflow: `POST /api/v1/workflows`
- Update workflow: `PATCH /api/v1/workflows/{id}`
- Activate workflow: `PATCH /api/v1/workflows/{id}` body `{"active":true}`

## Safe operating rules
- Default to **create new workflow**.
- Only update existing workflow if user explicitly provides workflow ID.
- Activate only after variables/credentials are configured.
- Always print created workflow ID and name.

## Testing (webhooks)
- After activation, test via webhook URL with representative JSON.
- Validate responses (200/400/500) and include execution_id in responses.
