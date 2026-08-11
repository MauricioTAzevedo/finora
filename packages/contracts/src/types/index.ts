// Finora Core Domain Type Definitions & Invariants

export type CurrencyCode = 'BRL' | 'USD' | 'EUR';

export interface Money {
  /** Monetary amount in integer minor units (e.g. centavos for BRL: 12990 = R$ 129,90) */
  amountMinor: number;
  currency: CurrencyCode;
}

export type Role = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Household {
  id: string;
  name: string;
  currency: CurrencyCode;
  locale: string; // e.g. "pt-BR"
  createdAt: string;
}

export interface HouseholdMember {
  id: string;
  householdId: string;
  userId: string;
  role: Role;
  joinedAt: string;
}

export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'INVESTMENT' | 'CASH';

export interface FinancialAccount {
  id: string;
  householdId: string;
  name: string;
  type: AccountType;
  institution?: string;
  lastFour?: string;
  color?: string;
  currentBalance: Money;
  creditLimit?: Money;
  closingDay?: number; // For credit cards (e.g. day 15)
  dueDay?: number;     // For credit cards (e.g. day 25)
  createdAt: string;
}

export type PostingType = 'DEBIT' | 'CREDIT';
export type AccountCategory = 'ASSET' | 'LIABILITY' | 'INCOME' | 'EXPENSE' | 'EQUITY';

export interface LedgerPosting {
  id: string;
  transactionId: string;
  accountId: string;
  accountCategory: AccountCategory;
  type: PostingType;
  amount: Money;
  description?: string;
}

export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'CREDIT_CARD_PAYMENT';
export type TransactionStatus = 'PENDING' | 'POSTED' | 'RECONCILED' | 'VOIDED';

export interface Transaction {
  id: string;
  householdId: string;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  amount: Money;
  occurredAt: string;
  postedAt?: string;
  sourceAccountId: string;
  destinationAccountId?: string;
  categoryId?: string;
  categoryName?: string;
  merchantId?: string;
  merchantName?: string;
  installmentPlanId?: string;
  currentInstallment?: number;
  totalInstallments?: number;
  tags?: string[];
  notes?: string;
  importBatchId?: string;
  postings: LedgerPosting[];
  createdAt: string;
}

export interface Category {
  id: string;
  householdId?: string; // Null for system defaults
  name: string;
  icon?: string;
  color?: string;
  parentCategoryId?: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface CreditCardStatement {
  id: string;
  householdId: string;
  accountId: string;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
  totalAmount: Money;
  minimumPayment: Money;
  isPaid: boolean;
  transactionsCount: number;
}

export interface InstallmentPlan {
  id: string;
  householdId: string;
  description: string;
  totalAmount: Money;
  installmentAmount: Money;
  totalInstallments: number;
  paidInstallments: number;
  startDate: string;
  merchantName?: string;
  categoryId?: string;
}

export interface RecurringTransaction {
  id: string;
  householdId: string;
  description: string;
  amount: Money;
  frequency: 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  nextDueDate: string;
  categoryId?: string;
  merchantName?: string;
  isSubscription: boolean;
  isActive: boolean;
}

export interface ImportBatch {
  id: string;
  householdId: string;
  filename: string;
  source: 'CSV' | 'XLSX' | 'OFX' | 'PDF';
  totalRows: number;
  importedRows: number;
  status: 'PROCESSING' | 'READY_FOR_REVIEW' | 'COMPLETED' | 'FAILED';
  createdAt: string;
}

export interface WhatIfScenario {
  id: string;
  householdId: string;
  title: string;
  description: string;
  proposedExpenseAmount: Money;
  installmentsCount: number;
  monthlyImpact: Money;
  lowestProjectedBalanceBefore: Money;
  lowestProjectedBalanceAfter: Money;
  recommendationSummary: string;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  householdId: string;
  actorId: string;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
}
