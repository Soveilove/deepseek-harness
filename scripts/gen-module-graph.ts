/** Validate the workspace peer-dependency graph for dependency-repair callers. */

import { resolve } from 'node:path'
import { collectPackageGraph } from './package-graph.ts'

const root = resolve(import.meta.dirname, '..')

/**
 * Read the peer-dependency graph after manifest repairs.
 * @param scanRoot - Repository root containing workspace package manifests.
 * @returns No generated artifacts; callers retain this result for repair reporting.
 */
export function writeModuleGraph(scanRoot: string = root): string[] {
  collectPackageGraph(scanRoot, [], 'gen-module-graph')
  return []
}
