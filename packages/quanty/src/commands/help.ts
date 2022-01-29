import { MessageEmbed } from 'discord.js'
import { Command } from 'index'

const PossiblePlugins = {
  MODERATION: 'moderation',
  ANIME: 'anime',
  MUSIC: 'music',
  //   ECONOMY: 'economy',
} as const

type PossiblePluginsType = typeof PossiblePlugins[keyof typeof PossiblePlugins]

export const command: Command = {
  name: 'help',
  description: `Displays this bot's help command.`,
  category: 'pre-built',
  options: [
    {
      name: 'plugin-name',
      description: `Shows command's information`,
      type: 'STRING',
      required: false,
    },
  ],
  run: async ({ client, guild, options, args }) => {
    const pluginName =
      options?.getString('plugin-name')?.toLowerCase() ??
      args?.slice(0, 1).shift()?.toLowerCase()

    const guildConfig = await client.guildManager.findById(guild.id)

    if (!guildConfig) {
      return `It seems that I don't have you guild save. Log in to https://quanty.xyz to active plugins.`
    }

    const embed = new MessageEmbed().setColor('RANDOM')

    if (!pluginName) {
      const musicString = `\`/help music\``
      const moderationString = `\`/help moderation\``
      const animeString = `\`/help anime\``

      const descStringArray = []

      if (guildConfig?.music?.plugin == true) {
        descStringArray.push(musicString)
      }

      if (guildConfig?.moderation?.plugin == true) {
        descStringArray.push(moderationString)
      }

      if (guildConfig?.anime?.plugin == true) {
        descStringArray.push(animeString)
      }

      const descString = descStringArray.join(' ')

      embed
        .setTitle(`Quanty Plugin for ${guild.name}`)
        .setDescription(descString)

      return {
        embeds: [embed],
      }
    }

    if (!(<any>Object).values(PossiblePlugins).includes(pluginName)) {
      return {
        content: `The plugin: ${pluginName} does not exist. Use \`/help plugins\` to see possible plugins.`,
      }
    }

    const availablePlugins =
      guildConfig[pluginName as unknown as PossiblePluginsType]

    embed.setTitle(`${pluginName} plugin.`)

    const descString = `${JSON.stringify(availablePlugins)}`

    embed.setDescription(descString)

    return {
      embeds: [embed],
    }
  },
}
