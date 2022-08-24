import { useCurrentGuildId } from './useCurrentGuildId'

import { useGetGuildConfigQuery } from '../graphql/generated/schema'

export const useCurrentGuildConfig = () => {
  const guildId = useCurrentGuildId()

  const { data, loading, error } = useGetGuildConfigQuery({
    variables: {
      guildId: guildId,
    },
    skip: !guildId,
  })

  return { guild: data?.guildConfig, loading, error }
}
