import type { ApplicationCommandOptionData } from 'discord.js'

export interface SlashCommandBaseData {
  name: string
  options: SlashCommandExtraData
}

export interface SlashCommandExtraData {
  description: string
  ephemeral?: string
  options?: ApplicationCommandOptionData[]
}
