import { Household, FinancialAccount, Transaction, CreditCardStatement, WhatIfScenario, Money } from '../types';

export const DEMO_HOUSEHOLD: Household = {
  id: 'hh-silva-demo',
  name: 'Família Silva (Demo)',
  currency: 'BRL',
  locale: 'pt-BR',
  createdAt: '2026-01-01T00:00:00Z',
};

export const DEMO_ACCOUNTS: FinancialAccount[] = [
  {
    id: 'acc-itau',
    householdId: 'hh-silva-demo',
    name: 'Itaú Conta Corrente',
    type: 'CHECKING',
    institution: 'Itaú Unibanco',
    lastFour: '4821',
    color: '#ec7000',
    currentBalance: { amountMinor: 842000, currency: 'BRL' }, // R$ 8.420,00
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'acc-reserva',
    householdId: 'hh-silva-demo',
    name: 'Reserva de Emergência',
    type: 'SAVINGS',
    institution: 'Rico Investments',
    lastFour: '9012',
    color: '#10b981',
    currentBalance: { amountMinor: 1500000, currency: 'BRL' }, // R$ 15.000,00
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'acc-nubank',
    householdId: 'hh-silva-demo',
    name: 'Nubank Credit Card',
    type: 'CREDIT_CARD',
    institution: 'Nubank',
    lastFour: '7731',
    color: '#820ad1',
    currentBalance: { amountMinor: -384200, currency: 'BRL' }, // R$ -3.842,00 (fatura aberta)
    creditLimit: { amountMinor: 1500000, currency: 'BRL' },    // R$ 15.000,00 limite
    closingDay: 15,
    dueDay: 22,
    createdAt: '2026-01-01T00:00:00Z',
  },
];

export const DEMO_STATEMENTS: CreditCardStatement[] = [
  {
    id: 'stmt-nubank-aug',
    householdId: 'hh-silva-demo',
    accountId: 'acc-nubank',
    periodStart: '2026-07-16',
    periodEnd: '2026-08-15',
    dueDate: '2026-08-22',
    totalAmount: { amountMinor: 384200, currency: 'BRL' },
    minimumPayment: { amountMinor: 50000, currency: 'BRL' },
    isPaid: false,
    transactionsCount: 14,
  },
];

export const DEMO_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-001',
    householdId: 'hh-silva-demo',
    type: 'INCOME',
    status: 'POSTED',
    description: 'Salário Mensal - Tech Corp',
    amount: { amountMinor: 1450000, currency: 'BRL' }, // R$ 14.500,00
    occurredAt: '2026-08-05T10:00:00Z',
    sourceAccountId: 'acc-itau',
    categoryName: 'Salário',
    postings: [],
    createdAt: '2026-08-05T10:00:00Z',
  },
  {
    id: 'tx-002',
    householdId: 'hh-silva-demo',
    type: 'EXPENSE',
    status: 'POSTED',
    description: 'Supermercado Horizonte - Compras do Mês',
    amount: { amountMinor: 128000, currency: 'BRL' }, // R$ 1.280,00
    occurredAt: '2026-08-08T16:30:00Z',
    sourceAccountId: 'acc-nubank',
    categoryName: 'Alimentação',
    merchantName: 'Supermercado Horizonte',
    postings: [],
    createdAt: '2026-08-08T16:30:00Z',
  },
  {
    id: 'tx-003',
    householdId: 'hh-silva-demo',
    type: 'TRANSFER',
    status: 'POSTED',
    description: 'Aporte Mensal Reserva de Emergência',
    amount: { amountMinor: 100000, currency: 'BRL' }, // R$ 1.000,00
    occurredAt: '2026-08-06T09:00:00Z',
    sourceAccountId: 'acc-itau',
    destinationAccountId: 'acc-reserva',
    postings: [],
    createdAt: '2026-08-06T09:00:00Z',
  },
  {
    id: 'tx-004',
    householdId: 'hh-silva-demo',
    type: 'EXPENSE',
    status: 'POSTED',
    description: 'Notebook Dell (Parcela 3/10)',
    amount: { amountMinor: 45000, currency: 'BRL' }, // R$ 450,00
    occurredAt: '2026-08-01T12:00:00Z',
    sourceAccountId: 'acc-nubank',
    categoryName: 'Eletrônicos',
    currentInstallment: 3,
    totalInstallments: 10,
    merchantName: 'Dell Computadores',
    postings: [],
    createdAt: '2026-08-01T12:00:00Z',
  },
  {
    id: 'tx-005',
    householdId: 'hh-silva-demo',
    type: 'EXPENSE',
    status: 'POSTED',
    description: 'Energia Residencial Enel',
    amount: { amountMinor: 38000, currency: 'BRL' }, // R$ 380,00
    occurredAt: '2026-08-10T14:15:00Z',
    sourceAccountId: 'acc-itau',
    categoryName: 'Moradia / Utilidades',
    merchantName: 'Enel Distribuição',
    postings: [],
    createdAt: '2026-08-10T14:15:00Z',
  },
  {
    id: 'tx-006',
    householdId: 'hh-silva-demo',
    type: 'EXPENSE',
    status: 'POSTED',
    description: 'Netflix Assinatura Premium',
    amount: { amountMinor: 5590, currency: 'BRL' }, // R$ 55,90
    occurredAt: '2026-08-02T08:00:00Z',
    sourceAccountId: 'acc-nubank',
    categoryName: 'Assinaturas',
    merchantName: 'Netflix',
    postings: [],
    createdAt: '2026-08-02T08:00:00Z',
  },
];

export const DEMO_SCENARIO: WhatIfScenario = {
  id: 'scen-laptop',
  householdId: 'hh-silva-demo',
  title: 'Compra de Computador R$ 6.000 em 12x',
  description: 'Simulação de compra de um novo computador de trabalho parcelado em 12x de R$ 500,00/mês.',
  proposedExpenseAmount: { amountMinor: 600000, currency: 'BRL' },
  installmentsCount: 12,
  monthlyImpact: { amountMinor: 50000, currency: 'BRL' },
  lowestProjectedBalanceBefore: { amountMinor: 620000, currency: 'BRL' }, // R$ 6.200,00
  lowestProjectedBalanceAfter: { amountMinor: 420000, currency: 'BRL' },  // R$ 4.200,00
  recommendationSummary: 'A compra compromete R$ 500,00 adicionais por mês durante 12 meses. O menor saldo de caixa projetado nos próximos 6 meses cai de R$ 6.200,00 para R$ 4.200,00, permanecendo acima da reserva mínima da família.',
  createdAt: '2026-08-11T17:00:00Z',
};
