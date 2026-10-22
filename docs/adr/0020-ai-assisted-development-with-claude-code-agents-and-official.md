# 0020. AI-assisted development with Claude Code agents and official plugins

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Engineering C8, C10, C12

## Context
Agents write most of the code. AI-written code fails security tests often and invents packages, so the process needs independent review and guardrails.

## Decision
Five Keel agents (planner, test writer, implementer, reviewer, security reviewer) in `.claude/agents/`, plus Anthropic's official plugins: `security-guidance` (always on), `pr-review-toolkit` reviewers, `feature-dev`, `claude-security` for scans, `claude-md-management`, and language servers. Jøran approves every plan and merge. Hooks block unapproved dependencies, format edits and run fast tests before a turn ends; permission rules deny secrets and destructive commands.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Keel agents on official plugins | Reuses maintained reviewers and security checks | Plugins update on their own schedule |
| Only hand-written agents | Full control | More to write and maintain |

## Consequences
- Reviews are independent of the author
- Guardrails don't depend on the agent's goodwill
- Plugin versions are recorded in docs/skills.md

## Revisit when
A plugin changes behaviour in a way that conflicts with Keel's rules: pin it or replace it.
