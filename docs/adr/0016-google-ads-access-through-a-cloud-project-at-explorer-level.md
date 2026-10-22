# 0016. Google Ads access through a Cloud project at Explorer level, pinned API version

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Readiness B1, B2; NFR-SEC-12; NFR-MNT-1.2

## Context
Developer tokens were sunset on 9 Sep 2026; access now follows the Google Cloud project. Explorer allows 2,880 operations a day against production accounts; a nightly sync costs about 22 per account.

## Decision
Keel uses one Cloud project at Explorer access, with the OAuth app published to Production (Testing expires refresh tokens after 7 days). Reads use SearchStream; the Java client is pinned through `google-ads-bom` and upgraded within 6 months of a new major version, with a CI job against the next version.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Explorer, pinned version | No review wait; enough quota for ~25 accounts | Brand verification needed later for Basic |
| Apply for Basic now | More quota | Brand verification work before it's needed |

## Consequences
- Quota fits the MVP comfortably
- Upgrades are planned, not forced
- Quarterly platform review watches sunsets (D3)

## Revisit when
Daily operations above 70% of the limit, or SaaS onboarding: apply for Basic.
