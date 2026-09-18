---
name: implement
description: Implement an approved DeepSeek Harness or Debug Mode design as the smallest vertical slice. Use when scope, owner, extension point, and acceptance evidence are clear and code changes can begin.
---

# DSH implementation

Implement only the approved behavior. Do not turn implementation into an unrequested repository cleanup or process migration.

## Before editing

Confirm:

- the applicable `AGENTS.md` chain was read;
- the owner is a Plugin, Service, Bundle, Profile, Preset, Tool, Session, Host, Client, or documented Runtime change;
- current consumers and generated/build wiring are known;
- acceptance evidence is identified;
- Standard Mode behavior is not being changed accidentally.

## Implement the vertical slice

1. Reuse an existing seam before adding a new abstraction.
2. Update every typed consumer of a changed public API.
3. Keep registrations as effects and return disposers.
4. Enforce permissions at the execution layer, not only in Prompt text.
5. Record model-visible inputs through Session events or existing durable facts.
6. Add behavior tests at the owning package and a real composition test for product-visible behavior.
7. Add or update snapshots when model-, protocol-, or user-visible output changes.
8. Update affected README and JSDoc contracts together.

Do not commit, push, publish, or create a pull request unless the user explicitly requests that action. Report scope changes instead of silently expanding the implementation.
