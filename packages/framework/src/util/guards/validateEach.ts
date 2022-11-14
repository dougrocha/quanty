/* eslint-disable @typescript-eslint/ban-types */

export function validateEach(
  context: { name: string },
  arr: unknown[],
  predicate: Function,
  decorator: string,
  item: string,
): boolean {
  if (!context || !context.name) {
    return true
  }
  const errors = arr.some(str => !predicate(str))
  if (errors) {
    console.error(decorator, item, context.name)
    throw new Error('Invalid')
  }
  return true
}
