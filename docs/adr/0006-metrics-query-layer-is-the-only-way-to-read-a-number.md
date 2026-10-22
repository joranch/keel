# 0006. Metrics query layer is the only way to read a number

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; Readiness B3; NFR-MNT-1.3

## Context
Dashboard, insights, rules, alerts and the assistant must agree on every number, including maturing days, brand split and currency rules.

## Decision
All metrics are read through one typed API in `metrics`: metric × entity × window × segment, implementing the B3 metric dictionary. No feature queries fact tables directly.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| One query layer | One definition per metric; golden tests in one place | Must be expressive enough |
| Each feature queries tables | Flexible | Numbers drift between screens |

## Consequences
- Trust in numbers (risk R5)
- Replay snapshots and golden data test one module
- New query shapes need the layer extended first

## Revisit when
A query shape it cannot express without distortion.
