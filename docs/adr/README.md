# Architecture decision records

Decisions and their reasons. Write new ones with the `adr` skill (`.claude/skills/adr`). Never rewrite an accepted decision: supersede it with a new ADR.

| # | Decision | Status |
| --- | --- | --- |
| 0001 | [Record architecture decisions](0001-record-architecture-decisions.md) | Accepted |
| 0002 | [Modular monolith, two processes, multi-tenant from day one](0002-modular-monolith-two-processes-multi-tenant-from-day-one.md) | Accepted |
| 0003 | [PostgreSQL only, fact tables partitioned by month](0003-postgresql-only-fact-tables-partitioned-by-month.md) | Accepted |
| 0004 | [Postgres-backed job scheduler with explicit dependencies](0004-postgres-backed-job-scheduler-with-explicit-dependencies.md) | Accepted |
| 0005 | [AdPlatformConnector interface with a shared contract suite](0005-adplatformconnector-interface-with-a-shared-contract-suite.md) | Accepted |
| 0006 | [Metrics query layer is the only way to read a number](0006-metrics-query-layer-is-the-only-way-to-read-a-number.md) | Accepted |
| 0007 | [Rules: aggregates in SQL, conditions in pure Kotlin](0007-rules-aggregates-in-sql-conditions-in-pure-kotlin.md) | Accepted |
| 0008 | [Rules as JSON with a versioned JSON Schema](0008-rules-as-json-with-a-versioned-json-schema.md) | Accepted |
| 0009 | [Single change executor for every platform write](0009-single-change-executor-for-every-platform-write.md) | Accepted |
| 0010 | [REST with OpenAPI and a generated TypeScript client](0010-rest-with-openapi-and-a-generated-typescript-client.md) | Accepted |
| 0011 | [Money as Long micros, account-local dates, UTC instants](0011-money-as-long-micros-account-local-dates-utc-instants.md) | Accepted |
| 0012 | [Frontend: React, TypeScript, TanStack Query and Table, ECharts](0012-frontend-react-typescript-tanstack-query-and-table-echarts.md) | Accepted |
| 0013 | [Auth: users, workspaces and memberships behind OIDC and passkeys](0013-auth-users-workspaces-and-memberships-behind-oidc-and-passke.md) | Accepted |
| 0014 | [Tenant isolation with forced row-level security](0014-tenant-isolation-with-forced-row-level-security.md) | Accepted |
| 0015 | [Envelope encryption behind a KeyProvider](0015-envelope-encryption-behind-a-keyprovider.md) | Accepted |
| 0016 | [Google Ads access through a Cloud project at Explorer level, pinned API version](0016-google-ads-access-through-a-cloud-project-at-explorer-level.md) | Accepted |
| 0017 | [Exposed (typed DSL) and Flyway](0017-exposed-typed-dsl-and-flyway.md) | Accepted |
| 0018 | [Initial host: the Mac with Docker Compose and Tailscale](0018-initial-host-the-mac-with-docker-compose-and-tailscale.md) | Accepted |
| 0019 | [Development data: a design partner's account plus synthetic accounts](0019-development-data-a-design-partner-s-account-plus-synthetic-a.md) | Accepted |
| 0020 | [AI-assisted development with Claude Code agents and official plugins](0020-ai-assisted-development-with-claude-code-agents-and-official.md) | Accepted |
| 0021 | [Security tooling for a private repository](0021-security-tooling-for-a-private-repository.md) | Accepted |
| 0022 | [Platform-neutral model with capabilities; Meta as the second platform](0022-platform-neutral-model-with-capabilities-meta-second.md) | Accepted |
