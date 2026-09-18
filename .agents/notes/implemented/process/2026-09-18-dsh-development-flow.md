# Agent Note: DSH staged development flow

Status: implemented

English | [中文](2026-09-18-dsh-development-flow.zh.md)

## Problem

DeepSeek Harness has strong repository and architecture rules plus many specialized Skills, but it lacks a small route that tells an agent what to do when a task is unclear, when a Runtime seam must be chosen, when implementation can begin, and when evidence is sufficient. Copying a complete product-development lifecycle from another repository would add artifacts and gates that do not belong to a Runtime repository.

## Decision

The repository uses a staged Skill route: `grill-with-docs` for unclear requests, `explore` for Runtime seam selection, `implement` for an approved vertical slice, and `tdd` for surface-matched evidence. `dsh-development-flow` routes tasks to these stages and to existing review, testing, simplification, documentation, performance, and Agent Note Skills.

The DSH `AGENTS.md` chain, architecture documents, package rules, testing policy, and Agent Notes remain authoritative. General engineering methods such as grilling, TDD, diagnosis, and code review may inform a stage but do not introduce OpenSpec, tickets, mandatory commits, or another lifecycle. The Debug Mode product adds fixture, diagnosis, evidence, trajectory, and metric acceptance on top of this route.

## Alternatives considered

**Copy the full vt-flow or Matt lifecycle.** Rejected because mandatory specs, tickets, archive steps, and publication assumptions would duplicate DSH rules and create process overhead.

**Keep only the existing repository rules.** Rejected because an agent facing an unclear request still lacks a clear entry point and may implement before resolving ownership and evidence.

**Create a separate workflow engine.** Rejected because routing Skills is sufficient and keeps the decision in readable instructions rather than adding Runtime machinery.

## Consequences

A user can start with one of four visible stages without learning the whole repository. The route does not force every task through every stage. New Debug Mode work has a place for clarification, Runtime design, vertical implementation, and evidence without changing Standard Mode or creating an independent process framework.
