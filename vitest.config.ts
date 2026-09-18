/**
 * Default Vitest entry point for repository-local `vitest run` commands.
 *
 * Lane-specific configurations live under `scripts/vitest/`; this root entry
 * keeps Vitest's default discovery working without exposing every test lane at
 * the repository root.
 */
export { default } from './scripts/vitest/config.ts'
