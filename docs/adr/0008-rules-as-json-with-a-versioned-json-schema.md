# 0008. Rules as JSON with a versioned JSON Schema

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; Readiness B4; FR-RULE-1.6, FR-AI-4.2

## Context
Rules are written by the builder UI, by hand as JSON and later by the assistant. All three need one contract.

## Decision
Rules are stored as JSON validated against a published, versioned JSON Schema (v1 from Readiness B4). Every edit creates a new rule version.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| JSON plus JSON Schema | One contract for three producers; validates anywhere | Schema evolution needs migrations |
| Kotlin DSL | Type-safe in code | Unusable from the UI and assistant |

## Consequences
- Builder, JSON editor and assistant drafts round-trip
- Old rule versions stay readable
- Breaking schema changes need migrations

## Revisit when
A schema change would break saved rules: add a migration and a new schema version.
