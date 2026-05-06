# AGENTS

This repository is intended to host a backend microservice for a Task Management application.

## Verified Workspace State

- The current workspace only contains this `AGENTS.md` file.
- No application source code, package manifest, runtime configuration, or documented commands exist yet.
- Treat `tutorial/` as non-product reference material if it appears later. Do not use it as backend implementation context unless the user explicitly asks for tutorial work.

## Source Of Truth

- This repository follows specs-driven development.
- Treat `docs/specs/` as the source of truth for feature behavior when that directory exists.
- If requested behavior is not covered by a spec, ask before implementing it.
- Link to existing docs instead of copying them into instructions.

## Default Technical Direction

- Assume Node.js with TypeScript.
- Assume a REST API for task management.
- Keep HTTP routing, request validation, domain logic, and persistence separated.
- Prefer small modules, explicit types, and predictable naming.

## Implementation Rules

- Confirm assumptions before introducing new project structure.
- Prefer minimal, production-oriented scaffolding over demo code.
- Do not implement a feature until the relevant spec has been read.
- If a spec is ambiguous, stop and ask clarifying questions instead of guessing.
- Prefer minimal, traceable changes over broad scaffolding.
- Every function, route handler, controller, or service that directly fulfills a requirement must include a JSDoc block with `@spec <requirement-id>`.

## Domain Rules

- Keep task state-transition logic centralized in one domain or service layer.
- Validate every state change against an explicit transition map or state machine.
- Model task status as a constrained enum or union type.
- Reject invalid transitions with a clear client error.
- Preserve invariants during update operations; partial updates must not bypass transition validation.

## Expected Backend Shape

- `src/routes` or `src/controllers`: HTTP wiring only.
- `src/services` or `src/domain`: task lifecycle logic.
- `src/repositories`: data access.
- `src/schemas` or `src/validators`: request and response validation.
- `src/types`: shared TypeScript contracts when needed.

## API And Testing Guidance

- Keep handlers thin and deterministic.
- Return stable JSON shapes and explicit HTTP status codes.
- Treat create, update, transition, and delete flows as separate test behaviors.
- If a dedicated transition endpoint exists, enforce transition validation there and in the underlying domain layer.
- Use Jest for unit tests.
- Add at least one test for each edge case named in a spec.
- Mock external I/O in unit tests.

## Validation And Maintenance

- Once commands exist, prefer the narrowest relevant validation first: targeted tests, then typecheck, then lint.
- When project docs or commands are added, update this file to reference canonical setup, run, test, and build entry points.
- If this service is scaffolded later, add the actual package manager, scripts, persistence choice, and environment variable contract here or in linked docs.
