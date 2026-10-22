# 0010. REST with OpenAPI and a generated TypeScript client

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; Engineering C6

## Context
A Kotlin backend and a React frontend maintained by one person and agents; hand-written fetch code drifts.

## Decision
The API is REST, specified in OpenAPI 3.1 in the repo and written first. The web app's client and types are generated from it; contract tests fail when the implementation drifts. Versioned under `/api/v1`; errors as RFC 9457 Problem Details; `Idempotency-Key` on change-set requests.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| REST plus OpenAPI | Type-safe frontend; spec reviewable | Spec must be kept first |
| GraphQL | Flexible queries | More moving parts for little gain here |

## Consequences
- No hand-written fetch code
- API changes are visible in review
- Spec-first discipline needed

## Revisit when
A screen needs query flexibility REST can't give cheaply.
