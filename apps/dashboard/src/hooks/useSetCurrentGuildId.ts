import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { currentGuildIdAtom } from '../utils/atoms/guild'

export const useSetCurrentGuildId = () => {
  const { query, isReady, push } = useRouter()

  const guildId = query.guildId as string

  const setGuildId = useSetAtom(currentGuildIdAtom)

  useEffect(() => {
    if (!isReady) {
      return
    }
    if (!guildId) {
      push('/dashboard')
      return
    }
    console.debug(`[SELECTED_GUILD_ID] - ${guildId}`)
    setGuildId(guildId)
  }, [guildId])
}
