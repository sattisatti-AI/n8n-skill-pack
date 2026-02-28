# Resilience & retries

## External calls
- Always set a timeout (e.g. 30s).
- Validate response shape before using it (IF/Code).
- Rate limits: detect 429, respect Retry-After, use Wait/backoff.
- Pagination: cap pages/cursors and max items.

## Failure strategy
- Prefer failing fast for critical actions and rely on an error workflow for alerting.
- Use Continue On Fail only with an explicit failure branch that surfaces the problem.
