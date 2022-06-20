import { atomWithReset } from 'jotai/utils'

import { Guilds } from '../../graphql/generated/schema'

export const guildConfigAtom = atomWithReset<Guilds | null>(null)
