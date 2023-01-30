import { RefObject } from 'react'

import { useEventListener } from './useEventListener'

type Handler = (event: MouseEvent) => void

export function useClickOn<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, event => {
    const el = ref?.current

    // Do nothing if clicking ref's element or descendent elements
    if (el?.contains(event.target as Node)) {
      handler(event)
    }
  })
}
