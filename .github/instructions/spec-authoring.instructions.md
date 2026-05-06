---
description: "Use when writing or revising markdown specifications in docs/specs. Covers spec structure, requirement IDs, edge cases, and open questions for specs-driven backend work."
name: "Spec Authoring"
applyTo: "docs/specs/**/*.md"
---

# Spec Authoring Guidelines

- Treat each spec as the source of truth for product behavior, not as an implementation plan.
- Keep requirements testable, explicit, and stable under revision.
- Separate confirmed behavior from unresolved decisions.

## Expected Section Order

- Start each spec with a short title and a brief scope statement.
- Include a `## Requirements` section for normative behavior.
- Include a `## Edge Cases` section for failure paths, boundary conditions, and state-transition exceptions.
- Include a `## Open Questions` section only for unresolved decisions that block precise requirements.

## Requirement IDs

- Give every requirement a stable ID in the form `<AREA>-REQ-###`.
- Use an uppercase area key derived from the spec topic, such as `TASK-CREATE-REQ-001` or `TASK-STATUS-REQ-004`.
- Keep one atomic behavior per requirement ID.
- Do not renumber existing IDs unless the requirement is removed entirely.
- When revising a requirement, preserve the ID and update its text instead of creating near-duplicate requirements.

## Edge Cases

- Record edge cases as explicit expected behaviors, not vague notes.
- Cover invalid input, missing resources, invalid state transitions, conflicting updates, and idempotency when relevant.
- State the expected result for each edge case, including the client-visible outcome when known.
- Add edge cases whenever a new requirement introduces a boundary, rejection path, or exception flow.

## Open Questions

- Keep unresolved items out of `## Requirements` until they are decided.
- Phrase each open question so it can be answered with a concrete product decision.
- Move resolved questions into `## Requirements` or `## Edge Cases`, then remove them from `## Open Questions`.
- Do not leave implementation TODOs in this section unless they represent a genuine product ambiguity.

## Minimal Pattern

```md
# Task Status Transition Spec

Defines the allowed status transitions for task records.

## Requirements

- `TASK-STATUS-REQ-001`: A task in `todo` may transition to `in_progress`.
- `TASK-STATUS-REQ-002`: A task in `done` must reject transitions back to `in_progress`.

## Edge Cases

- A transition request for a missing task returns the documented not-found outcome.
- A transition from `done` to `in_progress` is rejected with a clear client error.

## Open Questions

- Should `archived` be a terminal status or a filtered view over existing statuses?
```