# 0017. Exposed (typed DSL) and Flyway

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Engineering C6 (decided 22 Oct 2026)

## Context
Type-safe queries against a schema with RLS, written mostly by agents, with migrations reviewed by a person.

## Decision
Queries use the Exposed typed DSL; raw SQL (`exec`) only in Flyway migrations and tests, enforced by a Semgrep rule. Migrations are Flyway SQL files, forward-only, using expand, migrate, contract for breaking changes.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Exposed DSL + Flyway | Kotlin-native and type-safe; plain SQL migrations | Complex analytics can be clumsy in a DSL |
| jOOQ | Generated types from the real schema | Code generation step; licence for some databases |

## Consequences
- SQL injection risk confined to migrations and tests
- Migrations reviewable as plain SQL
- Some queries may need careful DSL use

## Revisit when
The metrics layer can't express a query efficiently in the DSL.
