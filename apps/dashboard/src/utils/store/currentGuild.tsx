import { atomWithReset } from 'jotai/utils'

export const currentGuildAtom = atomWithReset<string | null>(null)
