---
name: explore
description: Design a DeepSeek Harness capability after the desired behavior is clear. Use when choosing between a Plugin, Service, Bundle, Profile, Preset, Tool, Session Event, Host integration, or Client integration before writing implementation code.
---

# DSH capability design

Design the smallest owner for the requested behavior. DSH architecture and directory `AGENTS.md` rules are authoritative; generic engineering methods may help but do not replace them.

## Map the capability

Answer these questions from current code and documentation:

1. Who owns the data and lifecycle: Runtime, Agent, Session, Tool, Host, Client, Profile, or Debug Harness?
2. Is the behavior general Harness infrastructure or Debug Mode product behavior?
3. Which existing extension point can carry it?
4. Which consumers must be updated?
5. If model-visible, what Session event or durable fact reconstructs it?
6. What permission, workspace, cancellation, disposal, and replay rules apply?
7. What Standard Mode behavior must remain unchanged?

Prefer this order when choosing an owner:

```text
existing extension point → existing package seam → new focused package → core Runtime change
```

A core change requires evidence that the capability cannot be implemented correctly as a Plugin, Bundle, Preset, or Client package.

## Design output

Return a compact implementation design:

```text
Owner and package
Extension point
Inputs and outputs
Session or wire changes
Permission and lifecycle rules
Standard Mode impact
Tests and fixture evidence
Documentation and Agent Note changes
Deferred choices
```

Do not create code, tickets, or broad abstractions during design. If the design depends on an unresolved user decision, return to `grill-with-docs` with only that question.
