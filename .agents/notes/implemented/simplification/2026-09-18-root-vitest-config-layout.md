# Agent Note: Keep the repository root Vitest entry small

Status: implemented

English | [中文](2026-09-18-root-vitest-config-layout.zh.md)

## Problem

The repository root exposed every Vitest lane as a separate configuration file even though the lane implementations belong to test tooling. This made the root inventory noisy and made test configuration look like project-level runtime entrypoints.

## Decision

Keep one root `vitest.config.ts` compatibility entry that re-exports the default configuration from `scripts/vitest/config.ts`. Store the shared helper and the benchmark, e2e, expected-output, snapshot, web, web-performance, and web-stress configurations under `scripts/vitest/`. Package scripts, CI commands, test wiring checks, documentation, and benchmark instructions use the relocated paths for explicit lanes.

The configurations remain separate because their test inventories, build prerequisites, concurrency, credentials, and replay semantics differ. The change relocates configuration files without merging lanes or changing test behavior.

## Alternatives considered

**Merge all Vitest lanes into one configuration selected by environment variables.** Rejected because it would hide distinct test inventories and lifecycle requirements behind implicit switches.

**Keep every Vitest file at the root.** Rejected because the root would continue to expose test-tool implementation details and would not match the repository's directory ownership.

**Move every root tool configuration in the same change.** Rejected because TypeScript compiler faces and tool auto-discovery rules have different compatibility constraints; a Vitest-only move is the smallest reversible slice.

## Consequences

`vitest run` continues to discover the root compatibility entry. Lane-specific commands and CI use `scripts/vitest/*.config.ts`, while the shared helper is `scripts/vitest/shared.ts`. Future test configuration belongs under `scripts/vitest/` unless a tool requires a deliberate root compatibility entry.

## Verification

The focused wiring checks cover relocated setup files and CI config reads. Vitest config loading and the default test entry are validated separately from the broader repository test suite.
