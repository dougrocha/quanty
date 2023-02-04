import type { APIGuild } from 'discord-api-types/v10'
import { atom } from 'jotai'

export const currentGuildAtom = atom<APIGuild | undefined>(undefined)
