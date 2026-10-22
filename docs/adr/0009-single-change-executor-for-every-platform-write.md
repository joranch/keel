# 0009. Single change executor for every platform write

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; Readiness B5; FR-CHG-1 to 3; NFR-SAFE-2, 4, 6, 7; FR-PART-2

## Context
Writes change live ad spend. Safety, audit and revert must hold no matter where a change comes from.

## Decision
Every write goes through `changes`: change sets with the B5 states and an idempotency key; stale check; `validate_only`; mutate with partial failure; read-back; change log; 30-day revert; step caps, cooldowns and daily caps; write-consent allowlist per connection; cooling-off window; post-change spend watch.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| One executor | Every safeguard in one place, tested once | Every write path must route through it |
| Writes in each feature | Quicker per feature | Safeguards duplicated or forgotten |

## Consequences
- Revert and audit work for every source
- High-risk path: own pull requests, 1,000-line limit
- Executor is on the critical path for phase 2

## Revisit when
Never.
