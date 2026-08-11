import { strict as assert } from 'node:assert';
import { test, describe } from 'node:test';
import {
  calculateNetHouseholdExpenses,
  generateJournalPostings,
  validatePostingBalance,
  LedgerValidationError,
} from '../ledger';

describe('Double-Entry Ledger Domain Invariants', () => {
  test('Balanced postings satisfy double-entry rule', () => {
    const postings = generateJournalPostings({
      transactionId: 'tx-1',
      type: 'EXPENSE',
      amount: { amountMinor: 15000, currency: 'BRL' }, // R$ 150,00
      sourceAccountId: 'acc-checking',
      categoryId: 'cat-groceries',
    });

    assert.equal(postings.length, 2);
    assert.doesNotThrow(() => validatePostingBalance(postings));
  });

  test('Unbalanced postings throw LedgerValidationError', () => {
    const invalidPostings = [
      {
        id: 'p1',
        transactionId: 'tx-bad',
        accountId: 'acc-1',
        accountCategory: 'ASSET' as const,
        type: 'DEBIT' as const,
        amount: { amountMinor: 10000, currency: 'BRL' as const },
      },
      {
        id: 'p2',
        transactionId: 'tx-bad',
        accountId: 'acc-2',
        accountCategory: 'INCOME' as const,
        type: 'CREDIT' as const,
        amount: { amountMinor: 9000, currency: 'BRL' as const }, // Unbalanced!
      },
    ];

    assert.throws(
      () => validatePostingBalance(invalidPostings),
      LedgerValidationError
    );
  });

  test('Invariant: Account Transfer does NOT increase household expenses', () => {
    const transactions = [
      {
        type: 'EXPENSE' as const,
        amount: { amountMinor: 25000, currency: 'BRL' as const }, // Supermarket R$ 250,00
      },
      {
        type: 'TRANSFER' as const,
        amount: { amountMinor: 100000, currency: 'BRL' as const }, // Transfer R$ 1.000,00 to Savings
      },
    ];

    const netExpense = calculateNetHouseholdExpenses(transactions);
    // Net expense should be exactly R$ 250,00 (25000 minor units), NOT R$ 1.250,00!
    assert.equal(netExpense.amountMinor, 25000);
  });

  test('Invariant: Credit Card Statement Payment does NOT double-count expenses', () => {
    const transactions = [
      {
        type: 'EXPENSE' as const,
        amount: { amountMinor: 30000, currency: 'BRL' as const }, // Card Purchase R$ 300,00
      },
      {
        type: 'CREDIT_CARD_PAYMENT' as const,
        amount: { amountMinor: 30000, currency: 'BRL' as const }, // Paying card bill R$ 300,00
      },
    ];

    const netExpense = calculateNetHouseholdExpenses(transactions);
    // Net expense should be R$ 300,00, NOT R$ 600,00!
    assert.equal(netExpense.amountMinor, 30000);
  });
});
