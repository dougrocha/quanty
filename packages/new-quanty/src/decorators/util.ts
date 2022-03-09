export function createClassDecorator<T extends (...args: any[]) => void>(
  fn: T,
): ClassDecorator {
  return fn
}

export function createMethodDecorator(fn: MethodDecorator): MethodDecorator {
  return fn
}

export const setMetaData = (key: string, value: unknown): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return createClassDecorator<(...args: any[]) => void>(target => {
    Object.defineProperty(target.prototype, key, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    })
    return target
  })
}
