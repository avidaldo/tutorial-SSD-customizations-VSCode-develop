---
description: "Use when writing or reviewing Jest tests for the task API backend. Covers test file structure, describe/it naming from requirement IDs, mocking strategy for external I/O, and coverage expectations tied to spec edge cases."
name: "Task API Backend Testing"
applyTo: "**/*.test.ts"
---

# Task API Backend Testing Guidelines

- Add or update tests for each requirement and for each named edge case affected by the change.
- Prefer narrow unit tests for validation and business rules before adding broader integration coverage.
- Ensure rejection paths from the spec are asserted explicitly, including invalid input, missing resources, invalid state transitions, and idempotent outcomes when relevant.
- Every test file maps to one production module; do not scatter tests for the same unit across multiple files.
- Derive test cases directly from spec requirements and named edge cases in `docs/specs/`; do not add tests for behaviors that are not in the spec without flagging them as out-of-spec.

## Describe / It Naming

- Use the requirement ID as part of the outer `describe` block when a test group covers a specific requirement:
  ```ts
  describe('TASK-CREATE-REQ-001: task creation', () => { ... })
  ```
- Name each `it` block as a statement of observable behavior, not an implementation detail:
  ```ts
  it('returns 400 when title is missing')   // good
  it('calls validateTitle')                 // avoid
  ```
- Name edge-case tests after the edge case label used in the spec so they stay traceable.

## Mocking Strategy

- Mock all external I/O at the boundary of the unit under test: database clients, HTTP clients, file system access, clocks, and random generators.
- Use `jest.mock(...)` at the module level, not inside individual test cases, unless the mock needs to vary per test.
- Restore all mocks in `afterEach` or `afterAll` to prevent cross-test leakage.
- Do not mock the module under test itself; only mock its dependencies.

## Assertion Discipline

- Assert the exact observable outcome the spec prescribes: status code, response body shape, thrown error type, or side-effect count.
- Avoid `toBeTruthy` / `toBeFalsy` when a more specific matcher is available.
- For rejection paths, assert both the error type and the client-visible message or code.
- When testing idempotency, call the operation twice and assert the second result matches the first.

## Coverage Expectations

- At minimum, cover: the happy path for each requirement, and every edge case named in the spec.
- Do not write tests solely to hit a line-coverage number; a test that only checks a line was executed without asserting a meaningful outcome adds noise.
- Flag any spec edge case that cannot be unit-tested (e.g., requires a real database) in a comment so integration tests can be added separately.

## Test File Layout

```ts
// imports

describe('<AREA>-REQ-NNN: <short description>', () => {
  beforeEach(() => { /* setup */ });
  afterEach(() => { jest.restoreAllMocks(); });

  it('<expected behavior on happy path>', () => { ... });

  describe('edge cases', () => {
    it('<edge case label from spec>', () => { ... });
  });
});
```
