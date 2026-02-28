# Stable node versions (recommended defaults)

Use these unless the user’s n8n instance requires different versions:

- Webhook: n8n-nodes-base.webhook (typeVersion: 2)
- Respond to Webhook: n8n-nodes-base.respondToWebhook (typeVersion: 1)
- Manual Trigger: n8n-nodes-base.manualTrigger (typeVersion: 1)
- Schedule Trigger: n8n-nodes-base.scheduleTrigger (typeVersion: 1)
- IF: n8n-nodes-base.if (typeVersion: 2)
- Set: n8n-nodes-base.set (typeVersion: 2)
- HTTP Request: n8n-nodes-base.httpRequest (typeVersion: 4)
- Google Sheets: n8n-nodes-base.googleSheets (typeVersion: 4)
- Error Trigger: n8n-nodes-base.errorTrigger (typeVersion: 1)

If an import fails due to version mismatch, adjust only the failing node(s) and document it in node notes.
