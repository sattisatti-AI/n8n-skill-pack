# AI JSON contracts (LLM steps)

If an AI step is used:
1) Provide a strict schema in the prompt.
2) Require JSON-only output.
3) Validate output before downstream actions (IF/Code).
4) Add fallback routing for invalid outputs.
5) Never pass secrets/credentials to AI.
6) Minimize PII and document what is sent.
