import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useCurrentGuildId = (): string => {
  const {
    query: { guildId },
    isReady,
    push,
  } = useRouter()

  useEffect(() => {
    if (!isReady) return
    if (!guildId) {
      push('/dashboard')
      return
    }
    console.debug(`[SELECTED_GUILD_ID] - ${guildId}`)
  }, [guildId])

  return guildId as string
}
