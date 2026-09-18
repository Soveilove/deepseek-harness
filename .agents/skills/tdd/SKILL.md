---
name: tdd
description: Select and run evidence for a DeepSeek Harness or Debug Mode change. Use when implementation exists, a fixture needs proof, or someone asks whether a change is ready.
---

# DSH TDD and validation

Match evidence to the changed surface. A passing local mock or unit test does not prove a real Profile composition, built package, replay, live model, or platform deployment.

## Test loop

For behavior changes, prefer a red-green-refactor slice: write the smallest failing test or fixture, implement the smallest change, then refactor only after the focused evidence passes. A unit test is not sufficient for a product-visible Plugin, Bundle, Profile, Session, or Client change; add the DSH composition, replay, snapshot, or built smoke evidence required by the surface.

## Choose evidence

- Pure logic or package behavior: focused unit tests.
- Plugin, Bundle, Profile, or product behavior: real Loader/composition test.
- Model-, protocol-, or user-visible transcript: keyless recorded-session snapshot or expected output owned by the relevant surface.
- Session, event, lifecycle, or replay change: Session tests plus replay or snapshot evidence.
- Client UI change: Client tests and the relevant built Web/Desktop smoke or snapshot.
- Provider or real API behavior: real-API evidence when credentials and network are available; otherwise report the gap.
- Package boundary or published path: build and package-consumer smoke.
- Concurrent, subprocess, port, or teardown behavior: apply `dsh-ci-test-reliability` before choosing the command.

## Report honestly

For every command, record:

```text
command
result
what it proves
what it does not prove
```

Do not call skipped CI, publication, live-model, or platform evidence passed. Do not rerun a broad suite merely because a commit or push follows; choose the smallest credible checks from the diff.

For Debug Mode, include the fixture question, expected root cause, cited file/line evidence, diagnosis output, tool trajectory, and verification steps in the acceptance record.
