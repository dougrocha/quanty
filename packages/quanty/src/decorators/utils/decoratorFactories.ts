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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SetMetadata = <K = string, V = any>(
  metadataKey: K,
  metadataValue: V,
) => {
  const decoratorFactory = (
    target: object,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    key?: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor?: any,
  ) => {
    if (descriptor) {
      Reflect.defineMetadata(metadataKey, metadataValue, descriptor.value)
      return descriptor
    }
    Reflect.defineMetadata(metadataKey, metadataValue, target)
    return target
  }
  decoratorFactory.KEY = metadataKey
  return decoratorFactory
}
