---
description: "Use when implementing TypeScript backend code from specs in docs/specs for the task API. Covers reading the relevant spec first, mapping requirement IDs into @spec JSDoc, separating routing, validation, and business logic. Testing mechanics are in task-api-backend-testing.instructions.md."
name: "Task API Backend Implementation"
applyTo: "**/*.ts"
---

# Task API Backend Implementation Guidelines

- Read the relevant spec in `docs/specs/` before changing any TypeScript implementation that fulfills task API behavior.
- If the requested behavior is not covered by a spec, stop and ask instead of inferring product behavior from code alone.
- Keep changes minimal and traceable to named requirements and edge cases.

## Implementation Flow

- Start from the requirement IDs and edge cases in the relevant spec, then map the work into handlers, controllers, services, and tests.
- Keep HTTP routing, input validation, and business logic in separate modules instead of mixing them into one implementation surface.
- Prefer explicit TypeScript types and small functions over implicit contracts or broad utility layers.
- Reuse existing abstractions when they already match the specification; do not add new scaffolding unless the spec requires it.

## Requirement Traceability

- Every function, route handler, controller, or service that directly fulfills a requirement must include a JSDoc block with `@spec <requirement-id>`.
- When a function implements multiple requirements, include one `@spec` tag per requirement ID.
- Keep `@spec` tags on the implementation surface that actually enforces the behavior, not on unrelated wrappers or passthrough helpers.
- Preserve existing requirement IDs when revising behavior so code and tests remain traceable to the specification.

## Testing Mandate

- Add or update Jest tests for each requirement and for each named edge case affected by the change.
- Prefer narrow unit tests for validation and business rules before adding broader integration coverage.
- For detailed test structure, naming, and mocking rules, see `task-api-backend-testing.instructions.md`.

## Ambiguity Handling

- If a spec is ambiguous, incomplete, or conflicts with existing behavior, do not resolve it in code silently.
- Surface the exact requirement or edge case that is unclear and ask for clarification before implementing the disputed behavior.