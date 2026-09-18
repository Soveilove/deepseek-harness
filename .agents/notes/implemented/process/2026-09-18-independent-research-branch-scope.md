# Agent Note: Independent research branch scope

Status: implemented

English | [中文](2026-09-18-independent-research-branch-scope.zh.md)

## Problem

The upstream repository carries GitHub stack, push-gate, release, and publication workflows that are useful for the official project but add unrelated decision and reading cost to this independent research branch.

## Decision

This branch uses direct local development and focused validation for the changed surface. It does not use upstream stacked-PR landing, `gh stack sync`, or a mandatory pre-push gate. The compatibility files for those two workflows remain as short non-operative pointers so historical links stay resolvable; they are not active development instructions.

Desktop, CLI, Web, Runtime, Session, Tool, Client, Provider, Sandbox, Bundle, and test infrastructure remain in scope because they support learning, product development, or future Debug Mode integration. Historical Agent Notes and engineering Skills remain learning material even when their workflow is not active on this branch. They are classified by applicability rather than deleted for being upstream-specific. Notes remain subject to their lifecycle rules; this decision does not bulk-delete archived or active architectural history.

## Alternatives considered

**Keep the upstream Git workflow active.** Rejected because this branch is not an upstream synchronization branch and does not need stacked-PR landing or an automatic push gate.

**Delete all related history and links.** Rejected because historical decisions still explain repository structure and deleting them would create broken references and erase useful provenance.

**Create a second repository for the research fork.** Rejected because the current checkout is intentionally the working fork and should continue to expose the full Harness for study and contribution.

## Consequences

Local work reports focused checks rather than upstream publication evidence. Desktop and generic Harness surfaces remain protected during later slimming. Upstream-only process Notes can be reviewed separately without controlling day-to-day development.
