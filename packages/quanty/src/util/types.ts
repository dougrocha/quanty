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
export type Arr = readonly unknown[]

/**
 * A generic constructor with parameters
 */
export type Ctor<A extends Arr = readonly unknown[], R = unknown> = new (
  ...args: A
) => R

/**
 * A generic constructor without parameters
 */
export type Constructor<T> = new (...args: unknown[]) => T

/**
 * A generic abstract constructor with parameters
 */
export type AbstractCtor<
  A extends Arr = readonly unknown[],
  R = unknown,
> = abstract new (...args: A) => R

/**
 * A generic abstract constructor without parameters
 */
export type AbstractConstructor<T> = abstract new (...args: unknown[]) => T

/**
 * An object that is non nullable, to bypass TypeScript not easily working with {@link Record}<{@link PropertyKey}, unknown> in various instances.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type NonNullObject = {} & object
