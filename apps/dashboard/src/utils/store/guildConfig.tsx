import { atomWithReset } from 'jotai/utils'

import { GuildConfig } from '../../graphql/generated/schema'

export const guildConfigAtom = atomWithReset<GuildConfig | null>(null)
