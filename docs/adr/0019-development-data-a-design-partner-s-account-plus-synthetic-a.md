# 0019. Development data: a design partner's account plus synthetic accounts

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Readiness B9; FR-PART-1 to 4; FR-SIM-1 to 5; risk R20

## Context
Jøran has no Google Ads account. Test accounts have no metrics. Keel must be proven on real spend and developed without real data in tests.

## Decision
Real data comes from a design partner's account, read-only by default under a short written agreement with data-processing terms. Development, tests and demos use synthetic accounts from `connector-sim`, which also plugs in as a connector. Writes go to the test account until the partner consents to named change types and campaigns.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Partner + synthetic | Real volume and feedback; safe test data | Depends on one partner's goodwill |
| Own small account | Full control | Low volume; costs money |
| Synthetic only | Free | Proves nothing against Google |

## Consequences
- Phase gates measure real use
- Tests never hold real data
- Fallback to an own account after 6 weeks without a partner

## Revisit when
The partner leaves or volume is too low for rules to act: open an own account (option B).
