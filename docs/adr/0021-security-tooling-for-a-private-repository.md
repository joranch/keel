# 0021. Security tooling for a private repository

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Engineering C7 (decided 22 Oct 2026); NFR-SEC-11

## Context
The repository is private on a free or Pro GitHub plan, so CodeQL, repository push protection and artifact attestations need paid add-ons.

## Decision
CI runs Semgrep (with Keel rules), gitleaks (also as a pre-commit hook), OSV-Scanner with Renovate, the new-dependency check, Trivy on images and config, and a nightly OWASP ZAP baseline against staging. Releases get a CycloneDX SBOM and a cosign signature with transparency-log upload off.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| Free tools on a private repo | No cost; same gates | More configuration than GitHub's built-ins |
| Public repo with GitHub's free features | CodeQL and attestations free | Code and plans public |
| Paid GitHub add-ons | Less setup | Monthly cost per committer |

## Consequences
- All C7 gates run without paid plans
- Signatures stay private
- Tool configuration to maintain

## Revisit when
The repo goes public or moves to a plan that includes these features.
