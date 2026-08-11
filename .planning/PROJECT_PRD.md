# FINORA — Canonical Project Product Requirements Document (PRD)

## 1. Overview
- **Project Name**: Finora — Household Financial Intelligence Platform
- **Target Locale**: pt-BR (BRL currency, centavos minor units, Brazilian credit card & banking standards)
- **Primary Objective**: Replace Excel household budgeting spreadsheets with an AI-native double-entry financial platform.

## 2. Strategic Milestones Roadmap

### Milestone 0 — Engineering & Project Foundation
- Monorepo repository hygiene, CI/CD workflows, Docker Compose infrastructure.
- PostgreSQL database setup with migration framework.
- Core Web Application shell (Next.js / React / TypeScript / Tailwind CSS / shadcn/ui) & API shell.
- Authentication & Multi-tenant Household Isolation foundation.
- Synthetic Brazilian household demo seed data.

### Milestone 1 — Excel Migration & Spreadsheet Replacement Core
- Multi-user Household Management (Roles, permissions).
- Financial Accounts (Checking, Savings, Cash) & Credit Card Statement Management.
- Double-Entry Ledger Core Engine (Journal entries, postings, balanced debits/credits).
- Transactions (Income, Expenses, Transfers, Split Payments, Installments).
- Excel/CSV/OFX Spreadsheet & Statement Ingestion Engine with auto-mapping & preview.
- Financial Overview, Monthly Spending Explorer & Data Export (CSV/XLSX).

### Milestone 2 — Intelligent Document & Ingestion Engine
- Financial Document Inbox (PDF, Receipts, Invoices).
- Merchant Normalization Pipeline (Fuzzy matching, alias rules, historical feedback).
- Automatic Reconciliation Engine (Scoring model, statement vs manual match).
- AI Spreadsheet Auto-Mapping & Categorization with Confidence/Review Queue.

### Milestone 3 — Financial Intelligence & Natural Language Insights
- Subscription Intelligence (Recurring charge detection, price hike alerts).
- Anomaly Detection Engine (Statistical baseline comparisons).
- Evidence-Backed Weekly/Monthly Financial Briefs.
- Safe Natural Language Query Engine (AI query planner -> structured DSL).

### Milestone 4 — Digital Financial Twin & Scenario Simulator
- Financial Calendar & Upcoming Obligations View.
- Deterministic Forecast Engine (7-day, 30-day, 90-day, 12-month projections).
- "Can We Afford This?" What-If Scenario Engine (Laptop purchase in 12x parcelas, income changes).
- Debt Amortization & Goal Planning Integration.

### Milestone 5 — Automation Platform & Event Explorer
- Transactional Event Outbox & NATS JetStream Event Bus.
- Automation DSL & Rule Engine (Custom triggers, conditions, actions).
- Financial Event Explorer UI (Real-time trace visualization).

### Milestone 6 — Production Hardening & Portfolio Presentation
- Security Threat Model Hardening & OWASP compliance checks.
- Distributed OpenTelemetry Tracing & Observability Dashboards.
- E2E Automated Test Suites (Playwright) & Chaos/Failure Testing.
