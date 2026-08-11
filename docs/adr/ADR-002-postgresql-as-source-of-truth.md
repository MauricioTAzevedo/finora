# ADR-002: PostgreSQL as Source of Truth

## Status
Accepted

## Context
Financial platforms require strong ACID consistency, strict foreign key constraints, migration reliability, and complex relational querying across accounts, statements, double-entry postings, and audit records.

## Decision
We select **PostgreSQL** as the single canonical source of truth for all financial state, ledger postings, household structures, and audit logs. Ephemeral stores (Redis) or search/AI indexes are strictly derived data stores rebuildable from PostgreSQL.

## Consequences
- Guarantees strict transactional consistency and zero financial data corruption.
- All schema evolution uses explicit timestamped SQL migrations.
- High-performance indexing and full-text search capabilities handle high transaction volume natively.
