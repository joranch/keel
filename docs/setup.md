# Setting up Claude Code for Keel

One-time setup on the Mac for the files from stories 0.0.3 (decision records) and 0.0.4 (CLAUDE.md, agents, hooks).

## Set up (once)

1. Clone the repository.
2. Review `.claude/approved-dependencies.txt`. Remove anything you don't want; agents can't edit it.
3. Install tools on the Mac:
   ```sh
   brew install JetBrains/utils/kotlin-lsp ktlint
   npm install -g typescript-language-server typescript
   ```
4. In Claude Code, in the repository:
   ```
   /plugin marketplace add anthropics/claude-plugins-official
   /plugin install security-guidance@claude-plugins-official
   /plugin install pr-review-toolkit@claude-plugins-official
   /plugin install feature-dev@claude-plugins-official
   /plugin install claude-security@claude-plugins-official
   /plugin install claude-md-management@claude-plugins-official
   /plugin install kotlin-lsp@claude-plugins-official
   /plugin install typescript-lsp@claude-plugins-official
   /plugin install commit-commands@claude-plugins-official
   ```
   `.claude/settings.json` also lists them under `enabledPlugins`, so Claude Code offers to install them when you trust the folder.
5. Run `/agents` and check the five `keel-*` agents appear, and `/hooks` to see the three hooks.

## What's here

| Path | Purpose |
| --- | --- |
| `CLAUDE.md` | Commands, architecture, rules tools can't check, high-risk paths, workflow, limits |
| `.claude/agents/keel-*.md` | Planner, test writer, implementer, reviewer, security reviewer |
| `.claude/settings.json` | Permissions (allow, ask, deny), hooks, plugins |
| `.claude/hooks/` | New-dependency block, format on edit, fast tests before stop |
| `.claude/approved-dependencies.txt` | Dependencies you have approved |
| `.claude/skills/adr/` | How to write a decision record |
| `docs/adr/` | ADRs 0001–0021 and the index |
| `docs/skills.md` | Plugins and skills adopted, adapted and planned |
| `.github/` | Pull request template, CODEOWNERS |
| `NOTICE.md` | Apache-2.0 attribution |

The hooks do nothing until the Gradle build and `web/` exist: they check for `gradlew`, a `fastTest` task and a `test:fast` script first.
