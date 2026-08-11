# ADR-007: AI Provider Abstraction & Fallback Architecture

## Status
Accepted

## Context
Finora uses AI for spreadsheet column mapping, merchant normalization, unstructured document extraction, and natural-language query generation. Coupling code to a single cloud LLM API creates vendor lock-in, testing friction, cost volatility, and failure vulnerability.

## Decision
We create a strict **AI Provider Abstraction Layer**. The application interacts only with a standardized provider interface (`IAIService`) supporting structured model outputs and tool execution. Supported implementations:
1. `MockAIProvider`: Fully offline, deterministic responses for tests and local offline development (`AI_PROVIDER=mock`).
2. `OpenAIProvider` / `GeminiProvider` / `AnthropicProvider`: Cloud providers activated via configuration.

## Consequences
- The application remains 100% functional and testable without external paid API keys.
- AI failure degrades gracefully (showing manual review queues) rather than breaking core financial tracking.
