# ADR-001: Modular Monolith Architecture

## Status
Accepted

## Context
Finora requires strict domain boundaries across financial ledger management, document parsing, forecasting, AI intelligence, and multi-user household governance. Starting directly with microservices introduces deployment complexity, distributed data inconsistency, and network latency without immediate scale necessity.

## Decision
We choose a **Modular Monolith First** pattern. The backend logic resides in clearly separated internal modules (Identity, Household, Ledger, Accounts, Imports, AI, Forecast, Automation). Each module maintains explicit interfaces and domain boundaries.

## Consequences
- Single binary/process deployment simplifies local development and initial production topology.
- Module boundaries prepare the system for effortless microservice extraction if scaling requirements warrant it later.
- Cross-module database access is prohibited; interactions occur via explicit domain services or NATS events.
