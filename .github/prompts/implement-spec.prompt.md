---
description: "Implement a backend feature from a markdown spec in docs/specs. Reads the spec, maps requirement IDs to TypeScript code with @spec JSDoc tags, separates routing/validation/business logic, and generates Jest tests."
name: "Implement Spec"
argument-hint: "Spec name or path, e.g. task-creation or docs/specs/task-creation.md"
agent: "agent"
---

Implement the feature described in the specification provided as the argument (look it up in `docs/specs/` if only a name was given).

## Steps

1. **Read the spec** — Open the spec file in `docs/specs/` and extract all requirement IDs and edge cases before touching any code.

2. **Identify or create implementation files** — Locate existing routing, validation, and service modules that relate to this feature. If they do not exist, create them as separate files (router, controller/handler, service).

3. **Implement each requirement** — For every requirement and named edge case in the spec:
   - Add a JSDoc block with `@spec <requirement-id>` on each function or route handler that directly enforces that requirement.
   - Keep HTTP routing, input validation, and business logic in their respective modules.
   - Use explicit TypeScript types; avoid `any`.

4. **Write Jest tests** — Follow [task-api-backend-testing.instructions.md](../instructions/task-api-backend-testing.instructions.md):
   - One `describe` block per requirement ID.
   - At least one `it` per named edge case from the spec.
   - Mock all external I/O (database, filesystem, network).

5. **Stop and ask** if any requirement is ambiguous, missing acceptance criteria, or conflicts with existing behavior. Do not silently resolve ambiguity in code.

> Follow [task-api-backend.instructions.md](../instructions/task-api-backend.instructions.md) throughout.
