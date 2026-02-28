# Schema enforcement (import-safe exports)

## Required top-level keys
- name: string
- nodes: array (non-empty)
- connections: object
- active: boolean (default false)
- settings: object (include executionOrder:"v1" unless user requests otherwise)
- versionId: string

## Node minimum fields
Every node MUST include:
- id (string unique)
- name (string unique)
- type (string)
- typeVersion (number)
- position ([x,y])
- parameters (object)

## Connections
- Every connection target node name must exist in nodes[].name.
- Prefer main output channel.
- Avoid exotic channels unless known to be supported in the target n8n version.

## Disallowed
- Secrets/tokens/passwords in parameters.
- Broken node references.
- Missing trigger (except error workflows).
- Mixed output shapes without explicit transforms.
