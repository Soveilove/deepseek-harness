/** The document-preview plugin imports without a native Iterator constructor. */
import { afterEach, expect, it, vi } from 'vitest'

vi.mock('../src/client/pdf/assets.ts', () => ({
  workerSource: '',
  createPdfBinaryDataFactory: vi.fn(),
}))

afterEach(() => { vi.unstubAllGlobals() })

it('loads PDF preview when the browser has no global Iterator', async () => {
  vi.stubGlobal('Iterator', undefined)
  Reflect.deleteProperty(globalThis, 'Iterator')
  expect(globalThis.Iterator).toBeUndefined()
  const plugin = await import('../src/client/index.ts')
  expect(plugin.apply).toBeTypeOf('function')
  expect(globalThis.Iterator).toBeTypeOf('function')
}, 30_000)
