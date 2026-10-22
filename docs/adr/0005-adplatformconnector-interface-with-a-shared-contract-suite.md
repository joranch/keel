# 0005. AdPlatformConnector interface with a shared contract suite

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; NFR-MNT-1; FR-SIM-3

## Context
Google Ads first, Microsoft Ads or Meta later, and synthetic data now. Features must not care which platform or simulator they talk to.

## Decision
All platform access goes through the `AdPlatformConnector` interface in `connector-api`. Each implementation (`connector-googleads`, `connector-sim`, later others) passes the same contract test suite. Google Ads types never leave `connector-googleads` (Konsist enforces).

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Interface plus contract suite | New platforms and the simulator plug in unchanged | Interface design up front |
| Call the Google client directly | Less code now | Every feature tied to one platform and one API version |

## Consequences
- API version upgrades touch one module
- Synthetic data exercises the same paths as real data
- The interface must grow carefully

## Revisit when
Never; it is the core seam.
