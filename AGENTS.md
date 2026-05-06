# Task API Copilot Instructions

## Project intent
- This repository follows specs-driven development (SDD).
- Treat files in `docs/specs/` as the source of truth for feature behavior.
- If requested behavior is not in a specification, ask before implementing it.

## Technology choices
- Use Node.js and TypeScript for backend code.
- Prefer small modules and explicit types.
- Keep HTTP routing, validation, and business logic separated.

## Implementation rules
- Do not implement a feature until the relevant spec file has been read.
- Every function, route handler, controller, or service that directly fulfills a requirement must include a JSDoc block with `@spec <requirement-id>`.
- If a specification is ambiguous, stop and ask clarifying questions instead of guessing.
- Prefer minimal, traceable changes over broad scaffolding.

## Testing rules
- Use Jest for unit tests.
- Add at least one test for each edge case named in a specification.
- Mock external I/O in unit tests.