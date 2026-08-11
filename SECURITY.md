# Finora Security Policy

## Security Overview

Finora is an AI-native household financial intelligence platform handling sensitive financial ledger data, transactions, credit card statements, and family financial records. Security and data privacy are fundamental architectural design criteria.

## Core Security Guarantees

1. **Multi-Tenant Household Isolation**: Every database query, API route, search index, and AI tool invocation is strictly authorization-scoped to the authenticated user's active household. Cross-household access attempts fail closed.
2. **Untrusted Upload Sanitization**: Financial spreadsheets (XLSX, CSV), statements (OFX, PDF), and receipts uploaded by users are treated as untrusted data inputs. No executable code or spreadsheet formulas are evaluated.
3. **Prompt Injection Defense**: Uploaded document content is strictly formatted as data blocks within AI prompts, never as system instructions. AI models are given zero direct database write or shell execution privileges.
4. **Deterministic Money & Ledger**: Financial balances are stored in integer minor units (e.g., centavos) using double-entry ledger invariants. AI systems interpret data but cannot mutate financial ledgers directly without validation.
5. **Data Minimization & AI Privacy**: When using cloud AI capabilities, data sent to models is sanitized and minimized to the minimum context required for the user's explicit request. Local/mock AI options are fully supported.

## Reporting Vulnerabilities

If you discover a potential security vulnerability in Finora, please report it privately:

- **Security Email**: security@finora.local (or submit a confidential report via GitHub Security Advisories)
- **Response SLA**: We acknowledge security reports within 24 hours and aim to provide patches within 7 days.

Please do **NOT** open public GitHub issues for security vulnerabilities.
