# Idempotency (avoid duplicates)

When duplicates are possible (webhooks, schedules, retries):
- Choose a stable dedupe key (event_id/message_id/order_id).
- Store processed keys in durable storage when needed.
- For create operations, use idempotency headers if supported.
- For Sheets logging, include a dedupeKey column and optionally check before append (low-volume).
