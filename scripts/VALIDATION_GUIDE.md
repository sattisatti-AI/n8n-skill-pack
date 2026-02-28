# Validation guide

Run:
- node scripts/validate_workflow_json.js n8n-prd-generator/out/

Checks:
- JSON parse
- required top-level keys
- node required fields
- duplicate ids/names
- broken connections
- basic secret pattern detection

For production, also import an error workflow (templates/05_*).
