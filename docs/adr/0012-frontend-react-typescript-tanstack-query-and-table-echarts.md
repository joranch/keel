# 0012. Frontend: React, TypeScript, TanStack Query and Table, ECharts

- **Status:** Accepted
- **Date:** 2026-10-23
- **Deciders:** Jøran
- **Links:** Build plan architecture table; UX and design tab

## Context
Most of the UI is tables and charts, built and reviewed by one person with agents.

## Decision
React with strict TypeScript, TanStack Query for server state, TanStack Table for tables, ECharts for charts, and the Keel design system's tokens and components.

## Options considered
| Option | For | Against |
| --- | --- | --- |
| React + TanStack + ECharts | Known stack; strong table and chart support | Several libraries to keep current |
| Server-rendered pages | Less JavaScript | Interactive tables and charts are harder |

## Consequences
- Tables and charts share one data layer
- Design tokens enforce the look
- Bundle size needs watching

## Revisit when
Performance or accessibility targets can't be met with this stack.
