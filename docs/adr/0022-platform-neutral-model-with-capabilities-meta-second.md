# 0022. Platform-neutral model with capabilities; Meta as the second platform

- **Status:** Proposed
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** NFR-MNT-1.4; FR-META-1 to 6; FR-COPY-1 to 5; Readiness B3 (metric dictionary); ADR 0005, 0006, 0009; stories 0.3.3, 0.4.1, 0.4.2, 0.7.1, epics 3.7, 4.2 and 4.6

## Context
Meta is wanted as a second platform, and copying campaigns from Google to Meta is wanted later. Meta works differently from Google: no keywords, search terms, Quality Score or Shopping feed; its levers are budgets, cost caps, ad sets, audiences and creatives, and it counts conversions with its own attribution (view-through, counted at impression time). The design partner spends little on Meta, so a Meta connector isn't needed for the MVP. What is needed now is that phase 0 doesn't build Google-only ideas into the connector interface, the schema or the metrics layer, which would force a rewrite in phase 4.

## Decision
1. The structure is platform-neutral: account > campaign > ad group or ad set > ad, with platform-specific detail in typed extensions owned by each connector.
2. Each connector declares capabilities (`KEYWORDS`, `SEARCH_TERMS`, `AUDIENCES`, `PRODUCTS`, `ASSET_GROUPS`, `CREATE`, ...). Rules, features and copy check a capability before they use it; nothing assumes Google.
3. Every conversion metric carries its platform and attribution setting. The metrics layer never sums conversions, CPA or ROAS across platforms unless a stated rule says how (like currencies).
4. Meta is the second platform, built in phase 4 after the MVP; Microsoft Ads comes after Meta.
5. Copying is "translate, review, create": a neutral blueprint, a mapper per platform with a mapping report, everything created paused through the change pipeline (ADR 0009) with a create change set.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Neutral model and capabilities now, Meta in phase 4 | Small cost in phase 0; no rewrite later; MVP date unchanged | Some abstraction before a second platform exists to test it |
| Build the Meta connector in the MVP | Meta usable sooner | Two to three more months before the MVP; partner spends little on Meta |
| Google-shaped model, generalise in phase 4 | Simplest now | Rewrite of connector interface, schema and metrics in phase 4 |
| Microsoft Ads second | Mirrors Google; imports Google campaigns | Adds little the user can't already do; Meta is the platform wanted |

## Consequences
- The synthetic connector exercises capability checks, so a Meta-shaped profile can be added to `connector-sim` without touching features.
- The connector contract suite gets a case with no keywords or search terms.
- Cross-platform dashboards show conversions side by side rather than as one total.
- Creating campaigns becomes a new change type on a high-risk path (`changes/`).

## Revisit when
The partner or target advertisers move a third or more of their spend to Meta (build Meta sooner), or a capability flag can't express a platform difference without special cases in features.
