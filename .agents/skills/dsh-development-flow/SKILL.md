---
name: dsh-development-flow
description: Route DeepSeek Harness work to the right development stage and supporting Skill. Use when starting a DSH change, deciding what to do next, or when a request may need discovery, design, implementation, validation, review, or simplification.
---

# DSH development flow

This Skill is a router, not a second lifecycle system. The repository's `AGENTS.md`, directory rules, architecture documents, and Agent Notes remain authoritative. Do not create OpenSpec, ticket, or CHANGE artifacts unless the user explicitly asks for them.

## Choose the stage

- The problem, terminology, scope, or desired behavior is unclear: use `grill-with-docs`.
- The intended outcome is known but the Runtime seam is unclear: use `explore`.
- The scope and design are approved: use `implement`.
- Code or a fixture exists and evidence is needed: use `tdd`.
- A completed diff needs independent review: use `dsh-code-review`.
- The task is deletion or simplification: use `dsh-find-simplifications`.
- The task is a flaky or resource-owning test: use `dsh-ci-test-reliability`.
- The task changes Agent Notes: use `dsh-archive-agent-notes`.

## Shared rules

1. Read the root and nearest directory `AGENTS.md` files before changing files.
2. Read `docs/architecture.md` or the Chinese architecture document before changing `packages/`.
3. Separate repository facts, user decisions, agent inferences, and unresolved questions.
4. Prefer the smallest vertical slice that demonstrates the requested behavior.
5. Treat Runtime changes and Debug Mode product changes separately; a Debug-specific behavior belongs in a Plugin, Preset, Bundle, or Client package unless a general Runtime gap is demonstrated.
6. Report exact evidence and remaining gaps. Do not claim CI, publication, live-model, or platform proof that was not run.

## Typical path

```text
clarify → choose Runtime seam → implement one vertical slice → validate behavior → review and record the decision
```

A small, clear change may skip discovery or design. A broad change may return to discovery when evidence changes the scope.
