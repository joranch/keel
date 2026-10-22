# 0011. Money as Long micros, account-local dates, UTC instants

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; Engineering C6; FR-SYNC-7.2, 7.5, 7.6

## Context
Google Ads reports money in micros and days in the account's time zone. Floating point and mixed time zones cause silent errors.

## Decision
Money is `Long` micros in a `Micros` value class, always with a currency; never `Double`. Reporting dates are account-local dates; instants are UTC. Accounts in different currencies are never summed without a stated exchange rate. Daylight-saving days are tested.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Micros and account-local dates | Matches the API; no rounding or time-zone drift | Conversions at display time |
| Decimal and UTC dates | Familiar | Off-by-one days and rounding against Google's numbers |

## Consequences
- Reconciliation against Google can be exact
- detekt and review can flag `Double` money
- Display formatting needs care

## Revisit when
Never for storage; display rules can change freely.
