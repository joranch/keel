---
name: adr
description: Write or update an architecture decision record in docs/adr for Keel. Use when a story makes, changes or reverses a technical decision (a library, a data model rule, a boundary, a security control, an infrastructure choice), or when a plan says an ADR is needed.
---

# Keel ADRs

Adapted from the `architecture` skill in Anthropic's knowledge-work-plugins (engineering plugin, Apache-2.0). Changes: Keel numbering, file location, link rules and a "Revisit when" section; see `docs/skills.md`.

## Rules

- One decision per file: `docs/adr/NNNN-short-title.md`, numbered from the highest existing number plus one.
- Status is `Proposed` until Jøran approves it, then `Accepted`. Never rewrite an accepted ADR's decision: write a new ADR that supersedes it and set the old one to `Superseded by NNNN`.
- Link what it settles: requirement IDs (`FR-…`, `NFR-…`), Readiness items (`A1`, `B5`…), Engineering sections (`C6`…) and the story ID.
- Name real options, even when one is obvious, with the trade-offs that decided it.
- Say when to revisit: the concrete signal that would make the decision wrong.
- Keep it under a page. Link out instead of copying the spec.
- Add the new ADR to the index in `docs/adr/README.md`.

## Template

```markdown
# NNNN. Title in a few words

- **Status:** Proposed | Accepted | Superseded by NNNN
- **Date:** YYYY-MM-DD
- **Deciders:** Jøran
- **Links:** requirement IDs, Readiness or Engineering items, story ID

## Context
What forces are at play and what constraint makes a decision necessary now.

## Decision
What we do, stated so a reviewer can check code against it.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Chosen option | … | … |
| Alternative | … | … |

## Consequences
- What becomes easier
- What becomes harder
- What this rules out

## Revisit when
The signal that would make this decision wrong.
```
