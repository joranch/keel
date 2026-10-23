# Keel wireframes

Clickable desktop wireframes for Keel, built on the Keel design system (tokens and components in `ds/keel/`). The live canvas is the source of truth; this folder is a copy of its files so designs are versioned next to the code and readable by agents.

- Live canvas: https://claude.ai/artifact/FFZQf5HNM9LdmqY7APixQT (private; open it to click through)
- Design system: https://claude.ai/artifact/AwhatSLnLRwp5hMLsq3bvY
- Copied: 23 Oct 2026

The `.dc.html` files need the canvas runtime (`support.js`) to render, so they don't open on their own in a browser. Read them for layout, copy, states and sample data; use the canvas to see them.

## Screens

| File | Screen | Phase | Requirements |
| --- | --- | --- | --- |
| `Signin.dc.html` | Sign in with a passkey or Google | 0 | NFR-SEC-1 |
| `Main.dc.html` | Overview: needs attention, KPIs, accounts, pacing, alerts | 1 | FR-DASH, FR-BUD, FR-ALR |
| `AlertDetail.dc.html` | Alert: conversion tracking stopped, data exclusion, rules on hold | 1 | FR-CONV, FR-ALR |
| `Explorer.dc.html` | Explorer: keywords with filters and bulk actions | 1 | FR-DASH |
| `SearchTerms.dc.html` | Search terms and n-grams | 1 | FR-INS |
| `Approvals.dc.html` | Approvals and recent changes | 2 | FR-RULE, FR-CHG |
| `ChangeReview.dc.html` | Change review with hold-to-apply | 2 | FR-CHG-1 to 3 |
| `RuleBuilder.dc.html` | Rule builder | 2 | FR-RULE |
| `Accounts.dc.html` | Accounts and connections; other platforms (Meta next) | 0 | FR-SYNC-1, 2 |
| `OverviewPlatforms.dc.html` | Overview with Google and Meta side by side | 4 | FR-META-3, FR-META-5 |
| `RuleTemplate.dc.html` | Apply a rule to other accounts, with capability check | 3 | FR-COPY-1 |
| `CopyCampaign.dc.html` | Copy a Search campaign within Google | 3 | FR-COPY-2, FR-COPY-5 |
| `CopyToMeta.dc.html` | Copy a campaign from Google to Meta with a mapping report | 4 | FR-COPY-3 to 5 |

Rows on the canvas: the morning check, waste to a safe change, setup, and later phases (Meta and copying setups, ADR 0022).

## Patterns to keep when building

- Every write goes through a review with hold-to-confirm; creating campaigns is created paused and needs a passkey.
- Conversions from different platforms are shown side by side with how they were counted, never as one total.
- Sample data is synthetic: account names, numbers and ad copy are made up.

## Updating

Change the live canvas first, then copy its `project/` files here in the same pull request that needs them.
