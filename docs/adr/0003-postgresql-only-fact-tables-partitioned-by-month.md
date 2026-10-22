# 0003. PostgreSQL only, fact tables partitioned by month

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; NFR-OPS-4; NFR-PERF-1

## Context
About 13 months of daily data for roughly 10 accounts, plus search terms and segments. One store is easiest to back up, secure with RLS and run on a Mac.

## Decision
PostgreSQL is the only data store, including for jobs and metrics. Daily fact tables are partitioned by month, with retention set per level of detail from the capacity estimate (story 0.4.5).

## Options considered
| Option | For | Against |
| --- | --- | --- |
| PostgreSQL only | One thing to back up, secure and tune; RLS available | Analytical queries need care |
| PostgreSQL plus a column store | Faster analytics | Second store to sync, secure and back up |

## Consequences
- Backups, RLS and migrations cover all data
- Old partitions can be dropped cheaply
- Heavy aggregates may need materialized rollups later

## Revisit when
Dashboard queries miss NFR-PERF-1 (1.5 s); add materialized rollups first, another store last.
