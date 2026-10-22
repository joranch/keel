# 0004. Postgres-backed job scheduler with explicit dependencies

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; FR-SYNC-8, FR-RULE-7, FR-SYNC-8.3

## Context
Sync jobs must finish before rules run, survive restarts of the Mac, retry with backoff and catch up after sleep.

## Decision
Jobs, their runs and their dependencies live in PostgreSQL and run in `app-worker`. A job declares what it depends on and its operation budget; missed runs catch up on start-up in priority order.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Postgres-backed scheduler | Durable, transactional with the data, no extra service | Write the scheduler or adopt a small library |
| Separate queue (Redis, RabbitMQ) | Mature tooling | Another service on a small host |

## Consequences
- Rules can never run on stale data by construction
- Job history is queryable for the status page
- No distributed workers without revisiting

## Revisit when
A need for distributed workers or throughput the database can't serve.
