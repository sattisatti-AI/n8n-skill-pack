# Google Service Account (n8n Cloud)

## Key rules
- Never store the service account JSON in workflow files.
- Store it ONLY in n8n Credentials (Service Account / Google credential type).
- For Sheets/Drive resources, SHARE the resource with the service account email (Editor if writing).

## Sheets specifics
- Spreadsheet must be shared with the service account email.
- Use stable header contract (row 1 headers).
- Prefer USER_ENTERED input mode unless you need RAW.

## Deployment
- Use separate service accounts for dev/stage/prod.
- Rotate keys periodically; update credentials in n8n UI.
