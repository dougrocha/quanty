import type { AbstractCtor } from './types'

/**
 * Determines whether or not a value is a class.
 * @param value The piece to be checked.
 * @private
 */
export function isClass(value: unknown): value is AbstractCtor {
  return typeof value === 'function' && typeof value.prototype === 'object'
}

/**
 * Checks whether or not the value class extends the base class.
 * @param value The constructor to be checked against.
 * @param base The base constructor.
 * @private
 */
export function classExtends<T extends AbstractCtor>(
  value: AbstractCtor,
  base: T,
): value is T {
  let ctor: AbstractCtor | null = value
  while (ctor !== null) {
    if (ctor.constructor === base.constructor) return true
    ctor = Object.getPrototypeOf(ctor)
  }

  return false
}

export const isFunction = (val: unknown): boolean => typeof val === 'function'
export const isEmpty = (array: unknown[]): boolean =>
  !(array && array.length > 0)
