# Observability

Minimum production observability:
- Stamp each run with execution_id ($execution.id) and received_at ($now.toISO()).
- Add a lightweight Debug Snapshot node when helpful (optional).

Error workflow should include:
- workflow name
- failing node
- error message
- execution id
- timestamp

Webhook responses should include execution_id for both success and error.
