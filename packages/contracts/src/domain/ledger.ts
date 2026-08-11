import { LedgerPosting, Money, TransactionType } from '../types';

export class LedgerValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LedgerValidationError';
  }
}

/**
 * Validates that a set of ledger postings satisfies double-entry balance invariants:
 * Sum(Debits) === Sum(Credits)
 */
export function validatePostingBalance(postings: LedgerPosting[]): boolean {
  if (!postings || postings.length === 0) {
    throw new LedgerValidationError('Transaction must contain at least two ledger postings.');
  }

  let totalDebit = 0;
  let totalCredit = 0;

  for (const posting of postings) {
    if (posting.amount.amountMinor <= 0) {
      throw new LedgerValidationError('Posting amounts must be positive integer minor units.');
    }

    if (posting.type === 'DEBIT') {
      totalDebit += posting.amount.amountMinor;
    } else if (posting.type === 'CREDIT') {
      totalCredit += posting.amount.amountMinor;
    }
  }

  if (totalDebit !== totalCredit) {
    throw new LedgerValidationError(
      `Unbalanced journal postings: Total Debits (${totalDebit}) != Total Credits (${totalCredit})`
    );
  }

  return true;
}

/**
 * Calculates net household consumption expenses from a list of transactions.
 * Enforces Invariants:
 * - Transfers between accounts are NOT expenses (Expense impact: 0).
 * - Credit card payments settle liabilities (Expense impact: 0).
 */
export function calculateNetHouseholdExpenses(
  transactions: { type: TransactionType; amount: Money }[]
): Money {
  let totalExpenseMinor = 0;

  for (const tx of transactions) {
    if (tx.type === 'EXPENSE') {
      totalExpenseMinor += tx.amount.amountMinor;
    }
    // TRANSFERS and CREDIT_CARD_PAYMENT do not increase household spending
  }

  return {
    amountMinor: totalExpenseMinor,
    currency: 'BRL',
  };
}

/**
 * Generates canonical double-entry postings for financial transactions
 */
export function generateJournalPostings(params: {
  transactionId: string;
  type: TransactionType;
  amount: Money;
  sourceAccountId: string;
  destinationAccountId?: string;
  categoryId?: string;
}): LedgerPosting[] {
  const { transactionId, type, amount, sourceAccountId, destinationAccountId } = params;

  switch (type) {
    case 'EXPENSE':
      return [
        {
          id: `${transactionId}-p1`,
          transactionId,
          accountId: params.categoryId || 'exp-uncategorized',
          accountCategory: 'EXPENSE',
          type: 'DEBIT',
          amount,
          description: 'Expense recognition',
        },
        {
          id: `${transactionId}-p2`,
          transactionId,
          accountId: sourceAccountId,
          accountCategory: 'ASSET',
          type: 'CREDIT',
          amount,
          description: 'Asset reduction',
        },
      ];

    case 'INCOME':
      return [
        {
          id: `${transactionId}-p1`,
          transactionId,
          accountId: sourceAccountId,
          accountCategory: 'ASSET',
          type: 'DEBIT',
          amount,
          description: 'Asset increase',
        },
        {
          id: `${transactionId}-p2`,
          transactionId,
          accountId: params.categoryId || 'inc-salary',
          accountCategory: 'INCOME',
          type: 'CREDIT',
          amount,
          description: 'Income recognition',
        },
      ];

    case 'TRANSFER':
      if (!destinationAccountId) {
        throw new LedgerValidationError('Transfer transaction requires a destination account.');
      }
      return [
        {
          id: `${transactionId}-p1`,
          transactionId,
          accountId: destinationAccountId,
          accountCategory: 'ASSET',
          type: 'DEBIT',
          amount,
          description: 'Transfer destination asset increase',
        },
        {
          id: `${transactionId}-p2`,
          transactionId,
          accountId: sourceAccountId,
          accountCategory: 'ASSET',
          type: 'CREDIT',
          amount,
          description: 'Transfer source asset decrease',
        },
      ];

    case 'CREDIT_CARD_PAYMENT':
      if (!destinationAccountId) {
        throw new LedgerValidationError('Credit card payment requires a card liability account ID.');
      }
      return [
        {
          id: `${transactionId}-p1`,
          transactionId,
          accountId: destinationAccountId,
          accountCategory: 'LIABILITY',
          type: 'DEBIT',
          amount,
          description: 'Card liability settlement',
        },
        {
          id: `${transactionId}-p2`,
          transactionId,
          accountId: sourceAccountId,
          accountCategory: 'ASSET',
          type: 'CREDIT',
          amount,
          description: 'Bank checking cash outflow',
        },
      ];

    default:
      throw new LedgerValidationError(`Unsupported transaction type: ${type}`);
  }
}
