import { join } from 'path'

import { Command } from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

import { uppercaseFirst } from '../../libs/extra'
import { turnOffPlugin, turnOnPlugin } from '../../libs/pluginHandler'

const PossiblePlugins = {
  MODERATION: 'moderation',
  ANIME: 'anime',
  MUSIC: 'music',
  //   ECONOMY: 'economy',
} as const

export const command: Command = {
  name: 'plugins',
  description: 'Shows the commands available in this server.',
  options: [
    {
      type: 'SUB_COMMAND',
      name: 'on',
      description: 'Turn on plugins',
      options: [
        {
          name: 'plugin-name',
          description: 'Plugin to turn on',
          type: 'STRING',
        },
      ],
    },
    {
      type: 'SUB_COMMAND',
      name: 'off',
      description: 'Turn off plugins',
      options: [
        {
          name: 'plugin-name',
          description: 'Plugin to turn off',
          type: 'STRING',
        },
      ],
    },
  ],
  category: 'util',
  userPermissions: ['ADMINISTRATOR'],
  cmdType: 'both',
  run: async ({ client, guild, options, args }) => {
    const embed = new MessageEmbed().setColor('RANDOM')

    const subCmd =
      options?.getSubcommand().toLowerCase() ?? args[0]
        ? args[0].toLowerCase()
        : undefined

    const pluginName =
      options?.getString('plugin-name')?.toLowerCase() ?? args[1]
        ? args[1].toLowerCase()
        : undefined

    if (subCmd == 'all') {
      ;(await guild.commands.fetch()).map(async cmd => {
        await cmd.delete()
      })
      return
    }

    if (
      !(<any>Object).values(PossiblePlugins).includes(pluginName) ||
      !subCmd
    ) {
      return {
        embeds: [
          embed
            .setTitle('Plugins you can turn on/off:')
            .setDescription(
              `${Object.values(PossiblePlugins).map(
                string => `\`${uppercaseFirst(string)}\``,
              )}`,
            ),
        ],
      }
    }

    const guildConfig = client.guildManager.findGuild(guild.id)

    if (!guildConfig) {
      return `It seems that I don't have your guild saved. Log in to https://quanty.xyz to active plugins.`
    }

    const staticPath = join(__dirname, `../${pluginName}`)

    if (subCmd == 'off') {
      await turnOffPlugin(staticPath, client, guild.id)
      return {
        embeds: [
          embed
            .setTitle(`Turned off:`)
            .setDescription(uppercaseFirst(pluginName ?? '')),
        ],
      }
    } else if (subCmd == 'on') {
      await turnOnPlugin(staticPath, client, guild.id)
      return {
        embeds: [
          embed
            .setTitle(`Turned on:`)
            .setDescription(uppercaseFirst(pluginName ?? '')),
        ],
      }
    }
  },
}

// Allow user to enables certain commands.
// Make feature to remove and add those commands to specific server.
