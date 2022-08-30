import type { ClientEvents } from 'discord.js'
import { createClassDecorator } from '../utils'

export function On(event: keyof ClientEvents) {
  return setMetaData({ once: false, event })
}

export function Once(event: keyof ClientEvents) {
  return setMetaData({ once: true, event })
}

function setMetaData(data: { once: boolean; event: string }): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return createClassDecorator(target => {
    Object.defineProperties(target.prototype, {
      name: {
        value: data.event,
        enumerable: true,
        configurable: true,
        writable: true,
      },
      once: {
        value: data.once,
        enumerable: true,
        configurable: true,
        writable: true,
      },
    })
    return target
  })
}
