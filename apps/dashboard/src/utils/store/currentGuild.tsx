import { atomWithReset } from 'jotai/utils'

import { Guild } from '../../graphql/generated/schema'

export const currentGuildAtom = atomWithReset<Guild | null>(null)
