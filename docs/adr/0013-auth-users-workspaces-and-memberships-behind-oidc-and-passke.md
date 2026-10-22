# 0013. Auth: users, workspaces and memberships behind OIDC and passkeys

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; Readiness A2; NFR-SEC-1, 7

## Context
One owner today; teams in a SaaS later. Retrofitting identity is expensive.

## Decision
Users, workspaces, memberships and roles exist from day one behind one `authorize()` check. Sign-in by passkey or OIDC; sessions expire after 12 hours idle; a fresh passkey is required for money-tier approvals, auto-apply, linking or unlinking accounts and the kill switch. The v1 UI shows one owner.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Full model, one owner in the UI | SaaS-ready at low cost | Some unused tables at first |
| Single hard-coded user | Simplest | Rewrite for SaaS |

## Consequences
- Every service call is authorized the same way
- Step-up protects money actions
- Passkey setup needed on day one

## Revisit when
Never; teams are added in the UI only.
