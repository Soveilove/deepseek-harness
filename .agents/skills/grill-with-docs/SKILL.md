---
name: grill-with-docs
description: Clarify an unclear DeepSeek Harness or Debug Mode request before implementation. Use when the user is unsure what to build, the problem statement is incomplete, terminology is ambiguous, or several Runtime seams could own the behavior.
---

# DSH discovery and grilling (DSH adaptation)

Use this Skill before implementation when the request is not decision-complete. It is a short investigation and question loop, not a demand for a large specification.

## First inspect

Read the applicable `AGENTS.md` chain, the relevant architecture or package README, and the nearest current code. Do not ask the user where a symbol or feature lives when repository inspection can answer it.

Separate the result into:

- **Repository facts** — observed files, services, events, package relationships, and current behavior.
- **User intent** — the outcome the user actually wants.
- **Agent inference** — a proposed interpretation that still needs confirmation.
- **Unknowns** — decisions that materially change scope or behavior.

## Ask useful questions

Ask at most three high-value questions in one turn. Ask only about choices that inspection cannot settle, such as:

- Who uses the capability and what outcome proves it works?
- Is this a general Harness capability or a Debug Mode-specific behavior?
- Which behavior is explicitly out of scope?
- What evidence must be durable, replayable, or visible in the UI?
- Is a behavior change acceptable, or is this a compatibility-preserving repair?

Do not ask a question merely to confirm a repository fact. Do not present a large tree of hypothetical options; recommend one interpretation when the evidence supports it.

## Finish discovery

Before implementation, produce a compact decision record in the conversation:

```text
Problem
Goal
Non-goals
Relevant Runtime owner
User decisions
Acceptance evidence
Open questions
```

Do not edit code, create tickets, or create a full spec until the behavior-changing unknowns are resolved. If the user wants to proceed with an explicit assumption, record that assumption and continue with the smallest reversible slice.
