# Task Creation Specification

## Goal
Create tasks through a REST endpoint.

## Requirements
- **REQ-TC-01**: The system must expose a `POST /tasks` endpoint.
- **REQ-TC-02**: The request payload must include `title` as a string with a maximum length of 50 characters.
- **REQ-TC-03**: If `status` is omitted, the system must default it to `To-Do`.
- **REQ-TC-04**: If `title` exceeds 50 characters, the API must return HTTP 400 with the message `Title too long`.

## Edge cases
- Missing `title`.
- Empty string `title`.