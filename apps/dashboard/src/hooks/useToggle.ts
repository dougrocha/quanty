import { useCallback, useState } from 'react'

export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialState ?? false)

  const toggle = useCallback(() => setState(prevState => !prevState), [])

  return [state, toggle]
}
