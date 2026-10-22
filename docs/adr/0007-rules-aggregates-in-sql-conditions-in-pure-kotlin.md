# 0007. Rules: aggregates in SQL, conditions in pure Kotlin

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; FR-RULE-3; NFR-PERF-2.2

## Context
Rule results must be deterministic, explainable and fast over 10,000 keywords.

## Decision
The query layer fetches the aggregates a rule needs in SQL; the evaluator applies conditions, guards and roll-up in pure Kotlin with no I/O, and stores the metric values behind each proposal as evidence.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| SQL aggregates plus pure Kotlin | Deterministic and unit-testable; evidence is natural | Two steps to keep in sync |
| Compile rules to SQL | Fast | Hard to test, explain and guard |

## Consequences
- Same data and rule version always give the same change set
- Evaluator testable with fixtures and property tests
- Very large accounts may need batching

## Revisit when
Evaluation exceeds 10 s (NFR-PERF-2.2).
