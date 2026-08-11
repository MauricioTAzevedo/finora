# ADR-003: Integer Minor Units for Money

## Status
Accepted

## Context
IEEE 754 floating-point arithmetic (e.g. `0.1 + 0.2 = 0.30000000000000004`) causes rounding errors and precision loss in financial applications.

## Decision
We enforce storing monetary amounts as **integer minor units** (e.g., centavos for BRL, cents for USD) alongside an explicit 3-letter ISO-4217 currency code (e.g., `amountMinor: 12990, currency: "BRL"` represents R$ 129,90).

## Consequences
- Completely eliminates floating-point rounding errors across ledger calculations, aggregates, and reports.
- Money formatting logic is isolated to the presentation layer based on user locale.
- Mathematical operations (sum, diff, installment splits) preserve exact cent precision.
