# ADR-006: NATS JetStream for Asynchronous Event Processing

## Status
Accepted

## Context
Background workloads like document OCR, PDF ingestion, merchant fuzzy reconciliation, and forecasting require durable, observable message queueing with consumer retries and dead-letter queues.

## Decision
We select **NATS JetStream** as the lightweight, high-performance event bus for asynchronous workflow coordination.

## Consequences
- Enables durable stream persistence, consumer groups, idempotency tracking, and backoff retries.
- Runs efficiently in Docker with minimal resource overhead (~20MB memory footprint).
