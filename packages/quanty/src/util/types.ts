export declare type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

export declare type Optional<T> = {
  [P in keyof T]: T[P] | undefined
}

/**
 * A readonly array of any values.
 * @private
 */
export type Arr = readonly any[]

/**
 * A generic constructor with parameters
 */
export type Ctor<A extends Arr = readonly any[], R = any> = new (
  ...args: A
) => R

/**
 * A generic constructor without parameters
 */
export type Constructor<T> = new (...args: any[]) => T

/**
 * A generic abstract constructor with parameters
 */
export type AbstractCtor<
  A extends Arr = readonly any[],
  R = any,
> = abstract new (...args: A) => R

/**
 * A generic abstract constructor without parameters
 */
export type AbstractConstructor<T> = abstract new (...args: any[]) => T
