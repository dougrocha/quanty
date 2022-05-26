import { atom } from 'jotai'

import { CurrentUser } from '../types'

export const currentUserAtom = atom<CurrentUser | null>(null)
