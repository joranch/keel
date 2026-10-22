# 0015. Envelope encryption behind a KeyProvider

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Readiness A3, B6 T1; NFR-SEC-2

## Context
Refresh tokens can change ad spend. A database dump or backup alone must not expose them.

## Decision
Secrets are encrypted with per-workspace data keys wrapped by a master key from a `KeyProvider` interface. On the Mac the master key lives outside the database (macOS Keychain or a file outside the repo); a cloud KMS can replace it later without touching callers.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Envelope encryption + KeyProvider | Dump-proof; KMS-ready; crypto-shredding per workspace | Key handling to get right |
| Database column encryption with one key | Simpler | Key often ends up next to the data |

## Consequences
- Deleting a workspace can shred its key
- Rotation without re-encrypting everything
- High-risk path

## Revisit when
Moving to a server with a managed KMS: swap the provider, keep the interface.
