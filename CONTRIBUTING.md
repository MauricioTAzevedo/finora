# Contributing to Finora

Thank you for your interest in contributing to **Finora — Household Financial Intelligence Platform**!

## Development Guidelines

1. **GSD Development Workflow**: All features and architectural phases follow Get Shit Done (GSD Core) planning and execution standards. Check `.planning/` for current roadmap items and phase specifications.
2. **Financial Correctness First**: Always verify double-entry invariants, transfer non-expense semantics, credit card payment mechanics, and minor-unit currency math.
3. **Automated Verification**: Never submit code without unit/integration tests covering happy paths, edge cases, and cross-household isolation boundaries.
4. **Conventional Commits**: Format commit messages clearly using conventional commit types (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `infra:`).

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development infrastructure (PostgreSQL, NATS, Redis, MinIO)
docker compose up -d

# 3. Run development servers
npm run dev
```

## Running Tests

```bash
# Run unit and domain tests
npm test
```
