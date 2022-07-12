import type { ClientEvents } from 'discord.js'

export function On(eventName: keyof ClientEvents) {
  return setMetaData({ once: false, eventName })
}

export function Once(eventName: keyof ClientEvents) {
  return setMetaData({ once: true, eventName })
}

function setMetaData(data: {
  once: boolean
  eventName: string
}): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function <T extends Function>(target: T): T {
    Object.defineProperties(target.prototype, {
      eventName: {
        value: data.eventName,
        enumerable: true,
        configurable: true,
        writable: true,
      },
      once: {
        value: data.once,
        enumerable: false,
        configurable: true,
        writable: true,
      },
      _className: {
        value: target.name.toUpperCase(),
        enumerable: false,
        configurable: true,
        writable: true,
      },
    })
    return target
  }
}
