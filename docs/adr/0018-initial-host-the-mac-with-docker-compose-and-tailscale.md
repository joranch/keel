# 0018. Initial host: the Mac with Docker Compose and Tailscale

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Readiness B10; NFR-OPS-1.3, 1.4; FR-SYNC-8.3; risk R21

## Context
No server yet, about 20 hours a week, and a 2 vCPU / 4 GB footprint that a Mac covers easily.

## Decision
Keel runs on the Mac with Docker Compose. Access from other devices is private over Tailscale with HTTPS; no port is open to the internet. FileVault is on; a scheduled wake precedes the nightly jobs; missed jobs catch up on start-up. Images are built for arm64 and amd64.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Mac + Tailscale | Free; private; fast to start | Sleep and travel miss runs |
| Rented server now | Always on | Cost and setup before it's needed |

## Consequences
- Moving later is a deploy plus a restore
- Google login callback via localhost
- Not suitable for real writes (post-change watch needs uptime)

## Revisit when
Data misses the 07:00 target more than twice a month, the partner relies on daily alerts, or phase 2 writes start: move to an EU or EEA server (story 2.6.5).
