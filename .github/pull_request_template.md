## Story
<!-- Story ID and title, e.g. 0.3.2 Sync campaigns -->

## What changed
<!-- Two or three lines. Link the approved plan. -->

## Acceptance criteria
<!-- One line per criterion with its requirement ID and the test that proves it. -->
- [ ] FR-… — test:

## Risk
- [ ] Touches a high-risk path (changes/, rules guardrails, migrations, platform auth or KeyProvider, Google OAuth, workflows, .claude/, CLAUDE.md) → under 1,000 lines, `/claude-security` run, result:
- [ ] New dependency → listed in `.claude/approved-dependencies.txt` by Jøran, reason:
- [ ] New or changed decision → ADR:
- [ ] Database migration → expand/migrate/contract step:

## Checks
- [ ] `./gradlew build` passes (lint, detekt, Konsist, tests, coverage 90/70)
- [ ] Web checks pass (if web changed)
- [ ] Tests written first and failed before the change
- [ ] Reviews done: keel-reviewer, keel-security-reviewer, pr-review-toolkit (rounds used: /3)
- [ ] Size under 5,000 lines changed (excluding generated code and lockfiles)

## Notes for Jøran
<!-- Anything to look at closely, decisions the agent made, follow-ups. -->
