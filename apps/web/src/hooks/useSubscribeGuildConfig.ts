import { useGuildConfigSubscription } from '../graphql/generated/schema'

export const useSubscribeGuildConfig = (guildId: string) => {
  const { data, loading, error } = useGuildConfigSubscription({
    variables: {
      guildId: guildId,
    },
    onSubscriptionData: ({ subscriptionData }) => {
      console.debug(`[GUILD_CONFIG_UPDATE] - ${guildId}:`, {
        data: subscriptionData.data,
      })
    },
    skip: !guildId,
  })

  return { data, loading, error }
}
