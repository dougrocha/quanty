import { atom } from 'jotai'

import { Guild } from '../../graphql/generated/schema'

export const guildConfigAtom = atom<Guild | null>(null)
