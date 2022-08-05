import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useCurrentGuildId = (): string => {
  const {
    isReady,
    query: { guildId },
  } = useRouter()

  useEffect(() => {
    if (!isReady) return
    if (!guildId) return
    console.debug(`[GUILD_ID] - ${guildId}`)
  }, [isReady, guildId])

  return guildId as string
}
