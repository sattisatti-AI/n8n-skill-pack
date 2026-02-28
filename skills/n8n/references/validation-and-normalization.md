# Validation & normalization

## Validate early
- Immediately after trigger, validate required fields.
- IF node with combineOperation:"all" for multiple required fields.
- Route failures to Respond 400 (webhooks) or Notification+Stop (non-webhook).

## Normalize to a stable schema
- Use Set node with keepOnlySet:true.
- Add:
  - received_at: $now.toISO()
  - execution_id: $execution.id
  - request identifiers if present
- Optionally store original payload as JSON string (payload/originalPayload) for audit/debug.

## Output discipline
- Keep one item per record unless explicitly aggregating.
- For aggregation, do it explicitly and document assumptions.
