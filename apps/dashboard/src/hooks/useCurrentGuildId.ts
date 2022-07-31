import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useCurrentGuildId = (): string => {
  const {
    isReady,
    query: { guildId },
  } = useRouter()

  useEffect(() => {
    if (!isReady) return
    console.debug(`CURRENT_GUILD: ${guildId}`)
  }, [isReady])

  return guildId as string
}
