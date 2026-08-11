# FINORA — Execution Roadmap

## Phase Progress Summary

- [x] **Phase 0.1 — Repository Initialization & Hygiene Setup**
  - Git initialization, GitHub public repository creation (`MauricioTAzevedo/finora`).
  - GSD Core installation (`.agents/`).
  - Monorepo directory layout, README, LICENSE, SECURITY, CONTRIBUTING, .gitignore, .env.example, docker-compose.yml.
  - Architecture documentation & ADRs (ADR-001 through ADR-007).
  - Canonical PRD & Roadmap definition.

- [ ] **Phase 0.2 — Web Application & Core Monorepo Setup**
  - Next.js 15 Web App setup (`apps/web`) with React 19, TypeScript, Tailwind CSS, and shadcn/ui design tokens.
  - Core API & Shared Domain Models (`packages/contracts`, `services/api`).
  - PostgreSQL Migration Schema & Seeding (Users, Households, Accounts, Categories, Ledger, Transactions).
  - Health check & baseline verification tests.

- [ ] **Phase 1.1 — Identity & Household Governance Slice**
  - User Signup / Authentication flow.
  - Household Creation & Member Roles (Owner, Admin, Member, Viewer).
  - Cross-Household Multi-Tenant Security Boundary Tests.

- [ ] **Phase 1.2 — Double-Entry Ledger Core & Account Management**
  - Asset Accounts (Checking, Savings) & Liability Accounts (Credit Cards).
  - Double-Entry Posting Engine (`Sum(Debits) == Sum(Credits)`).
  - Manual Transaction Creation (Income, Expense, Transfer, Installments).
  - Invariants Verification Tests (Transfer non-expense, Credit card payment non-double-count).

- [ ] **Phase 1.3 — Excel & Statement Import Engine**
  - CSV/OFX/XLSX Parser & Column Mapping Engine.
  - Import Review Queue & Duplicate Detection.
  - Atomic Import Commit & Data Lineage Tracking.

- [ ] **Phase 1.4 — Household Financial Overview & Explorer**
  - Dense Financial Data Table (Sorting, Filtering, Pagination).
  - Financial Overview Cards (Net Available, Income, Expenses, Obligations).
  - Brazilian Locale Formatting (BRL, pt-BR dates, card closing cycles).
