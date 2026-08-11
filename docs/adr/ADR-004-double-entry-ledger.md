# ADR-004: Double-Entry Ledger Engine

## Status
Accepted

## Context
Single-entry expense tracking fails to capture transfers between accounts, credit card statement liabilities vs payment settlements, and historical auditability.

## Decision
Finora models all internal transactions using accounting-inspired **Double-Entry Ledger Invariants**. Every transaction produces balanced journal entries where `Sum(Debits) = Sum(Credits)`.

Account types include:
- Assets (Checking, Savings, Investments)
- Liabilities (Credit Cards, Loans, Payable Obligations)
- Income (Salary, Investments, Transfers In)
- Expenses (Groceries, Housing, Utilities, Subscriptions)

## Consequences
- Guarantees financial integrity: money cannot appear or disappear without an offsetting entry.
- Transfers moving money between checking and savings produce zero consumption expense.
- Paying a credit card bill reduces checking assets and credit card liabilities equally without duplicating expenses.
