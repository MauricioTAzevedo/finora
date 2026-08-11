-- Finora Initial Relational Database Migration
-- PostgreSQL Schema for Households, Users, Financial Accounts, Double-Entry Ledger, and Audit Logs

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Households Multi-Tenant Boundary Table
CREATE TABLE IF NOT EXISTS households (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BRL',
    locale VARCHAR(10) DEFAULT 'pt-BR',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Household Members & Roles
CREATE TABLE IF NOT EXISTS household_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER')),
    joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(household_id, user_id)
);

-- Financial Accounts
CREATE TABLE IF NOT EXISTS financial_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('CHECKING', 'SAVINGS', 'CREDIT_CARD', 'INVESTMENT', 'CASH')),
    institution VARCHAR(255),
    last_four VARCHAR(4),
    color VARCHAR(20),
    current_balance_minor BIGINT NOT NULL DEFAULT 0,
    credit_limit_minor BIGINT,
    closing_day INT,
    due_day INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID REFERENCES households(id) ON DELETE CASCADE, -- NULL for system defaults
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('INCOME', 'EXPENSE')),
    icon VARCHAR(100),
    color VARCHAR(20),
    parent_category_id UUID REFERENCES categories(id) ON DELETE SET NULL
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS ledger_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL CHECK (type IN ('INCOME', 'EXPENSE', 'TRANSFER', 'CREDIT_CARD_PAYMENT')),
    status VARCHAR(20) NOT NULL DEFAULT 'POSTED' CHECK (status IN ('PENDING', 'POSTED', 'RECONCILED', 'VOIDED')),
    description TEXT NOT NULL,
    amount_minor BIGINT NOT NULL,
    currency VARCHAR(3) DEFAULT 'BRL',
    occurred_at TIMESTAMPTZ NOT NULL,
    source_account_id UUID NOT NULL REFERENCES financial_accounts(id),
    destination_account_id UUID REFERENCES financial_accounts(id),
    category_id UUID REFERENCES categories(id),
    merchant_name VARCHAR(255),
    current_installment INT,
    total_installments INT,
    import_batch_id UUID,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Double-Entry Ledger Postings
CREATE TABLE IF NOT EXISTS ledger_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES ledger_transactions(id) ON DELETE CASCADE,
    account_id UUID NOT NULL,
    account_category VARCHAR(20) NOT NULL CHECK (account_category IN ('ASSET', 'LIABILITY', 'INCOME', 'EXPENSE', 'EQUITY')),
    posting_type VARCHAR(10) NOT NULL CHECK (posting_type IN ('DEBIT', 'CREDIT')),
    amount_minor BIGINT NOT NULL,
    currency VARCHAR(3) DEFAULT 'BRL',
    description TEXT
);

-- Audit Events Log Table
CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    resource VARCHAR(255) NOT NULL,
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Performance & Isolation Indexes
CREATE INDEX IF NOT EXISTS idx_members_user ON household_members(user_id);
CREATE INDEX IF NOT EXISTS idx_members_household ON household_members(household_id);
CREATE INDEX IF NOT EXISTS idx_accounts_household ON financial_accounts(household_id);
CREATE INDEX IF NOT EXISTS idx_transactions_household ON ledger_transactions(household_id);
CREATE INDEX IF NOT EXISTS idx_transactions_occurred ON ledger_transactions(occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_postings_tx ON ledger_postings(transaction_id);
CREATE INDEX IF NOT EXISTS idx_audit_household ON audit_events(household_id);
