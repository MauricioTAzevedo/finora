# ADR-005: Transactional Event Outbox Pattern

## Status
Accepted

## Context
Publishing domain events directly to a message broker (e.g. NATS) within HTTP handlers risks dual-write inconsistency: if the database transaction commits but message publishing fails (or vice versa), background consumers drift out of sync.

## Decision
We implement a **Transactional Outbox Pattern**. When a financial entity mutates, the database write and an outbox event record are committed in the same PostgreSQL transaction. A background relay reads outbox events and reliably publishes them to NATS JetStream.

## Consequences
- Guarantees at-least-once event delivery for downstream document workers, AI intelligence triggers, and notification processors.
- Prevents lost events or ghost notifications resulting from transient network glitches.
