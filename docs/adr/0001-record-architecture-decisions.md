# 0001. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** C1, story 0.0.3

## Context
Decisions so far live in the Keel doc and in conversation. Coding agents start each session cold and need the reasons next to the code; future me needs them too (risk R19).

## Decision
Every architecture decision is an ADR in `docs/adr/`, in the format of the `adr` skill (adapted from Anthropic's engineering `architecture` skill). The Keel doc keeps requirements and plans; ADRs keep decisions and their reasons.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| ADRs in the repo | Versioned with the code; agents read them; reviewable in pull requests | Two places to look (doc and repo) |
| Decisions only in the Keel doc | One place | Agents don't see it; drifts from the code |

## Consequences
- Agents and reviewers can check code against a written decision
- Changing a decision means a new ADR, not an edit
- Small overhead per decision

## Revisit when
ADRs stop being read or updated; then fold them back into the doc.
