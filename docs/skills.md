# Skills and plugins register

Engineering C10: reuse Anthropic's maintained plugins and skills before writing our own. Record every adoption here with the commit it came from and what we changed. Check for updates at the quarterly platform review (D3).

## Adopted as is (Claude Code plugins, marketplace `claude-plugins-official`, commit 465f093)

| Plugin | What Keel uses it for | Where it runs |
| --- | --- | --- |
| security-guidance | Warns on risky patterns as code is written; reviews the diff before a turn ends; reviews commits | Always on |
| pr-review-toolkit | `code-reviewer`, `silent-failure-hunter`, `pr-test-analyzer`, `type-design-analyzer` | Review step of every story |
| feature-dev | `code-explorer` and `code-architect` for exploring unfamiliar code | Planning, when keel-planner needs a wider look |
| claude-security | `/claude-security` full scan | High-risk pull requests and before each release |
| claude-md-management | `claude-md-improver` keeps CLAUDE.md accurate and short | Monthly, and after an agent repeats a mistake |
| kotlin-lsp | Kotlin language server (needs `brew install JetBrains/utils/kotlin-lsp`) | Always on |
| typescript-lsp | TypeScript language server | Always on |
| commit-commands | `/commit`, `/commit-push-pr` with Conventional Commits | Every commit |

## Adapted

| Keel file | Source | Licence | Changes |
| --- | --- | --- | --- |
| `.claude/skills/adr/SKILL.md` | anthropics/knowledge-work-plugins @33d3dea, `engineering/skills/architecture` | Apache-2.0 | Keel numbering and location, status rules, links to requirement IDs, "Revisit when" section |
| `.claude/agents/keel-planner.md` | claude-plugins-official @465f093, `feature-dev/agents/code-architect.md` | Apache-2.0 | Definition-of-ready check first, read-only, fixed Keel plan sections, high-risk paths, ADR check |

## Written for Keel (nothing suitable existed)

- `keel-test-writer`, `keel-implementer`, `keel-reviewer` (Keel-only checks; runs alongside pr-review-toolkit), `keel-security-reviewer` (Keel threats T1–T16, ASVS L2 chapters).
- Hooks: new-dependency check, format on edit, fast tests before stop.

## Candidates for later

| Skill | Source | When |
| --- | --- | --- |
| testing-strategy | knowledge-work-plugins `engineering` | Story 0.0.7 (test pyramid and CI layers) |
| deploy-checklist | knowledge-work-plugins `engineering` | Story 0.8.x (first release) |
| incident-response | knowledge-work-plugins `engineering` | Before the partner relies on alerts |
| tech-debt | knowledge-work-plugins `engineering` | After phase 1 |
| code-review | knowledge-work-plugins `engineering` | Compare with pr-review-toolkit; keep one |
| performance-report | knowledge-work-plugins `marketing` | Report wording in phase 3 (FR-REP) |
| ad-manager | knowledge-work-plugins `small-business` | Plain-English explanations for insights (FR-INS) |
| skill-creator | anthropics/skills @dbd4588 | When a Keel skill is worth writing |

Document skills in anthropics/skills (docx, pptx, xlsx, pdf) are source-available, not open source: use them in Claude, don't copy them into the repo.
