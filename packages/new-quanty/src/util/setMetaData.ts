export const setMetaData = (key: string, value: unknown): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function <T extends Function>(target: T) {
    Object.defineProperty(target.prototype, key, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    })
    return target
  }
}
