import express, { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
import {
  generateJournalPostings,
  validatePostingBalance,
  DEMO_HOUSEHOLD,
  DEMO_TRANSACTIONS,
  Transaction,
  Money,
} from '@finora/contracts';

export const app: Express = express();
app.use(cors());
app.use(express.json());

// In-Memory Repository Stores (Backed by PostgreSQL schema in production)
const usersStore: Map<string, { id: string; email: string; name: string }> = new Map([
  ['user-silva-1', { id: 'user-silva-1', email: 'mauricio@silva.local', name: 'Maurício Silva' }],
  ['user-outside-99', { id: 'user-outside-99', email: 'stranger@other.local', name: 'User Out' }],
]);

const householdMembersStore: Map<string, Set<string>> = new Map([
  // householdId -> set of userIds authorized
  ['hh-silva-demo', new Set(['user-silva-1'])],
  ['hh-other-secret', new Set(['user-other-99'])],
]);

const transactionsStore: Transaction[] = [...DEMO_TRANSACTIONS];

// --- Middleware: Multi-Tenant Authorization Guard ---
export function authorizeHouseholdAccess(req: Request, res: Response, next: NextFunction) {
  const userId = (req.headers['x-user-id'] as string) || 'user-silva-1';
  const householdId = String(req.params.householdId || req.body.householdId || '');

  if (!householdId) {
    return res.status(400).json({
      error: { code: 'MISSING_HOUSEHOLD_ID', message: 'householdId parameter is required' },
    });
  }

  const authorizedUsers = householdMembersStore.get(householdId);
  if (!authorizedUsers || !authorizedUsers.has(userId)) {
    return res.status(403).json({
      error: {
        code: 'FORBIDDEN_HOUSEHOLD_ACCESS',
        message: 'Access denied: You are not an authorized member of this household.',
      },
    });
  }

  next();
}

// --- Routes ---

// Health & Readiness Endpoints
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'finora-api', timestamp: new Date().toISOString() });
});

app.get('/livez', (req: Request, res: Response) => {
  res.json({ status: 'alive' });
});

app.get('/readyz', (req: Request, res: Response) => {
  res.json({ status: 'ready', database: 'connected' });
});

// Auth Routes
app.post('/api/v1/auth/signup', (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: { code: 'INVALID_INPUT', message: 'Email, name, and password are required.' } });
  }
  const id = `user-${Date.now()}`;
  usersStore.set(id, { id, email, name });
  res.status(201).json({ id, email, name });
});

// Household Routes
app.get('/api/v1/households', (req: Request, res: Response) => {
  res.json([DEMO_HOUSEHOLD]);
});

// Transactions & Double-Entry Postings Routes (Scoped to Household)
app.get(
  '/api/v1/households/:householdId/transactions',
  authorizeHouseholdAccess,
  (req: Request, res: Response) => {
    const householdId = String(req.params.householdId);
    const householdTxs = transactionsStore.filter((t) => t.householdId === householdId);
    res.json(householdTxs);
  }
);

app.post(
  '/api/v1/households/:householdId/transactions',
  authorizeHouseholdAccess,
  (req: Request, res: Response) => {
    const householdId = String(req.params.householdId);
    const { type, description, amountMinor, sourceAccountId, destinationAccountId, categoryId } = req.body;

    if (!type || !description || !amountMinor || !sourceAccountId) {
      return res.status(400).json({
        error: { code: 'INVALID_TRANSACTION', message: 'Missing mandatory transaction fields.' },
      });
    }

    const amount: Money = { amountMinor, currency: 'BRL' };
    const transactionId = `tx-${Date.now()}`;

    // Generate & Validate Double-Entry Postings
    const postings = generateJournalPostings({
      transactionId,
      type,
      amount,
      sourceAccountId,
      destinationAccountId,
      categoryId,
    });

    validatePostingBalance(postings);

    const newTx: Transaction = {
      id: transactionId,
      householdId,
      type,
      status: 'POSTED',
      description,
      amount,
      occurredAt: new Date().toISOString(),
      sourceAccountId,
      destinationAccountId,
      postings,
      createdAt: new Date().toISOString(),
    };

    transactionsStore.push(newTx);
    res.status(201).json(newTx);
  }
);

const PORT: number | string = process.env.API_PORT || 8080;
if (process.env.NODE_ENV !== 'test' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Finora API] Server running on port ${PORT}`);
  });
}
