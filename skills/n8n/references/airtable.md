# Airtable integration (production patterns)

## Recommended operations
- Upsert pattern: Search → If found Update else Create.
- Use a stable unique key (external_id/email/order_id).
- Avoid full-table scans: use filtered views or indexed fields.

## Rate limits & retries
- Airtable has rate limits; implement backoff on 429.
- Cap batch sizes; use Split in Batches for large writes.

## Data modeling
- Normalize types before Airtable (strings, numbers, booleans).
- Flatten nested JSON for Airtable fields or store JSON in a long text field if needed.

## Safety
- Never hardcode API keys; use Airtable Personal Access Token in n8n Credentials.
- Use separate bases/tables for dev vs prod.
