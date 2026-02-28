# Secrets & configuration

## Never embed secrets
- No API keys/tokens/passwords in workflow JSON.
- Use n8n Credentials exclusively.

## Config placeholders
Use placeholders for:
- base IDs, table names, sheet IDs, webhook paths
- environment identifiers (dev/stage/prod)

## Environment variables
- Prefer env vars for non-secret configuration (flags, endpoints) where supported.
- Document expected env vars in node notes or README.
