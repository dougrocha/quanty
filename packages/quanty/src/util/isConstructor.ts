export function isConstructor(value: any) {
  try {
    new new Proxy(value, {
      construct() {
        return {}
      },
    })()
    return true
  } catch (err) {
    return false
  }
}
