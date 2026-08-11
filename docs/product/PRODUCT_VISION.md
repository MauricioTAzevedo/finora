# FINORA — Product Vision & Requirements Specification

## 1. Executive Summary

**Finora** is an autonomous AI-native household financial intelligence platform. It transforms fragmented financial data—Excel spreadsheets, bank exports, credit-card statements, bills, receipts, recurring payments, debts, goals, and financial documents—into a unified double-entry ledger and intelligent decision support system.

### Core Value Proposition
> "We no longer need our Excel spreadsheet for everyday financial organization."

Finora helps families understand not only where their money went, but where it is going, combining robust accounting invariants with natural language intelligence and scenario simulation.

---

## 2. Target Users & Locale Context

- **Primary Audience**: Brazilian households currently managing family budgets in Excel spreadsheets, couples sharing household expenses, and parents managing recurring bills and debt commitments.
- **First-Class Locale (pt-BR)**:
  - Default Currency: **BRL (R$)**
  - Currency Math: Minor units (`amountMinor` in centavos, e.g., 12990 = R$ 129,90)
  - Brazilian Credit Card Conventions: Closing dates, due dates, multi-month installment plans (*parcelamento* e.g., 10x R$ 150)
  - Brazilian Banking Artifacts: PIX transaction notes, boleto obligations, OFX exports, standard bank statement CSV/XLSX formats from major Brazilian financial institutions.

---

## 3. Financial Correctness Invariants (Non-Negotiables)

1. **Transfers are NOT Expenses**: Moving funds between accounts (e.g., checking to savings) must never inflate household consumption expenditure.
2. **Credit Card Double-Counting Protection**: Purchasing an item on credit creates a liability. Paying the monthly credit-card bill settles the liability—it must NOT produce a secondary expense entry.
3. **Installment Dual Semantics**: Supports both economic commitment (the total purchase price) and cash-flow impact (the recurring monthly installment obligation).
4. **Refund Offset**: Refunds reverse or offset original category spending cleanly.
5. **No Floating-Point Money**: All financial values are stored using integer minor units or high-precision decimal representation.

---

## 4. Key Platform Pillars

1. **Import & Migration Center**: Intelligent Excel, CSV, OFX, and PDF statement importer with column auto-detection, interactive review, confidence scoring, duplicate detection, and batch rollback capabilities.
2. **Double-Entry Ledger Core**: Underlying accounting engine guaranteeing balanced postings (`Sum(Debits) = Sum(Credits)`), preserving data lineage, auditability, and reversibility.
3. **Digital Financial Twin & Forecast Engine**: Deterministic cash-flow projection model (7-day, 30-day, 90-day, 12-month) driving "What-If" scenario simulations ("Can we afford a R$ 6.000 laptop in 12 installments?").
4. **AI Tool Layer & Natural Language Queries**: Evidence-backed, tool-calling AI agent answering questions ("Why is our credit card bill higher this month?") using deterministic query planners rather than raw SQL injection.
5. **Event-Driven Automation Engine**: Outbox-driven event pipeline supporting rule triggers, anomaly detection, subscription tracking, and intelligent household notifications.
