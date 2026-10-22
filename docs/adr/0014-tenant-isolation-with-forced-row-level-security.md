# 0014. Tenant isolation with forced row-level security

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Readiness A1, B6 T4; NFR-SEC-8

## Context
A missing `WHERE workspace_id = …` must not leak another workspace's data, especially once Keel is a SaaS.

## Decision
Every tenant table has forced RLS with `WITH CHECK` policies. The app connects as a role that is not the table owner and has no `BYPASSRLS`; the server sets the workspace per transaction with `SET LOCAL`. A catalog test fails the build if any app table lacks forced RLS; a cross-workspace suite runs as the app role.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Forced RLS plus service checks | Two walls; a query bug can't leak | Policies to write and test |
| Application checks only | Simpler | One missed filter leaks data |

## Consequences
- Isolation is enforced by the database
- Migrations are a high-risk path
- Connection handling must set the workspace every transaction

## Revisit when
Never.
