import { atomWithReset } from 'jotai/utils'

import { MutualGuild } from '../../graphql/generated/schema'

export const mutualGuildsAtom = atomWithReset<MutualGuild[] | null>([])
