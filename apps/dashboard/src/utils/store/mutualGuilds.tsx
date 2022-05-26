import { atomWithReset } from 'jotai/utils'

import { Guild } from '../../graphql/generated/schema'

export const mutualGuildsAtom = atomWithReset<Guild[] | null>([])
