import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

import { uppercaseFirst } from '../../libs/extra'

const PossiblePlugins = {
  MODERATION: 'moderation',
  ANIME: 'anime',
  MUSIC: 'music',
  //   ECONOMY: 'economy',
} as const

type PossiblePluginsType = typeof PossiblePlugins[keyof typeof PossiblePlugins]

@Category('util')
@SlashCommand('help', {
  description: "Displays this bot's help command.",
  options: [
    {
      name: 'plugin-name',
      description: `Shows command's information`,
      type: 'STRING',
      required: false,
    },
  ],
})
export class HelpCommand extends Command {
  async run({ guild, options }: SlashCommandRunOptions): CommandReturnType {
    const pluginName = options?.getString('plugin-name')?.toLowerCase()

    // Const guildConfig = client.guildManager.findGuild(guild.id)
    const guildConfig: any = ''

    if (!guildConfig) {
      return `It seems that I don't have your guild saved. Log in to https://quanty.xyz to active plugins.`
    }

    const embed = new MessageEmbed().setColor('RANDOM')

    if (!pluginName) {
      const pluginStrings: readonly {
        name: PossiblePluginsType
        value: string
      }[] = [
        { name: 'music', value: `\`/help music\`` },
        { name: 'moderation', value: `\`/help moderation\`` },
        { name: 'anime', value: `\`/help anime\`` },
      ] as const

      const descStringArray: string[] = []

      pluginStrings.map(plugin => {
        if (guildConfig[plugin.name]?.plugin) {
          descStringArray.push(plugin.value)
        }
      })

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
        content: `The plugin: ${pluginName} does not exist. Use \`/help\` to see possible plugins.`,
      }
    }

    embed.setTitle(`${uppercaseFirst(pluginName)} plugin.`)

    Object.keys(guildConfig[pluginName as unknown as PossiblePluginsType]).map(
      name => {
        const value = (guildConfig as any)[pluginName as any][name as any]
        embed.addField(uppercaseFirst(name), value ? 'On' : 'Off')
      },
    )

    return {
      embeds: [embed],
    }
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
