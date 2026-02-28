# Pagination & batching

## General
- Always cap pagination loops (maxPages/maxItems).
- Use Split in Batches for large datasets and to respect API limits.
- Prefer cursor-based pagination where available.

## Patterns
- HTTP Request with next cursor token → loop via IF + Merge.
- For list endpoints: stop when empty array or missing cursor.
