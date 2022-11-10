import { glob } from 'glob'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

/**
 * Match files using patterns supported by the shell.
 *
 * This is promise wrapped glob.
 */
export const globPromise = promisify(glob)

export type Path = string | URL

export function resolvePath(path: Path): string {
  if (typeof path === 'string') return path
  return fileURLToPath(path)
}
