import { useAtomValue } from 'jotai'

import { useGetGuildConfigQuery } from '../graphql/generated/schema'
import { currentGuildIdAtom } from '../utils/atoms/guild'

export const useCurrentGuildConfig = () => {
  const guildId = useAtomValue(currentGuildIdAtom)

  const { data, loading, error } = useGetGuildConfigQuery({
    variables: {
      guildId: guildId ?? '',
    },
    skip: !guildId,
  })

  return { guildId, guild: data?.guildConfig, loading, error }
}
