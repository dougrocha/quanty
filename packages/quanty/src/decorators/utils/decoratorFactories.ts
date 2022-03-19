export function createClassDecorator(fn: ClassDecorator): ClassDecorator {
  return fn
}

export function createMethodDecorator(fn: MethodDecorator): MethodDecorator {
  return fn
}

export function createPropertyDecorator(
  fn: PropertyDecorator,
): PropertyDecorator {
  return fn
}

export function createParameterDecorator(
  fn: ParameterDecorator,
): ParameterDecorator {
  return fn
}

export const setMetaData = (key: string, value: unknown): ClassDecorator => {
  return createClassDecorator(target => {
    Object.defineProperty(target.prototype, key, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    })
    return target
  })
}
