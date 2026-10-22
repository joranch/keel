# 0002. Modular monolith, two processes, multi-tenant from day one

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; Readiness A1, A6; NFR-OPS-1

## Context
One developer, about 20 hours a week, a 2 vCPU / 4 GB host, and a possible SaaS later. Splitting services would cost operations time; retrofitting tenancy later would cost a rewrite.

## Decision
One Gradle build with downward-only module dependencies, deployed as two processes: `app-api` (HTTP) and `app-worker` (jobs, platform calls). Every tenant table carries `workspace_id`; a self-hosted install is one workspace.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Modular monolith, two processes | One deploy; worker can't starve the API; boundaries kept by Konsist | Discipline needed to keep modules honest |
| Microservices | Independent scaling | Far more operations work for one person |
| Single process | Simplest | Long jobs compete with requests |

## Consequences
- Module boundaries keep a later split open
- Tenancy costs a column and policies now instead of a migration later
- Architecture tests become part of every build

## Revisit when
Several users or jobs starve the API, or one module needs separate scaling.
