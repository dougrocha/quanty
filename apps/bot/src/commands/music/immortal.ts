import {
  CommandReturnType,
  Category,
  Command,
  Logger,
  logger,
  SlashCommand,
  SlashCommandRunOptions,
  Test,
} from '@quanty/framework'
import {
  BeAnObject,
  IObjectWithTypegooseFunction,
} from '@typegoose/typegoose/lib/types'
import { MessageEmbed } from 'discord.js'
import { Document } from 'mongoose'

import { GuildPluginModel } from '../../database'
import { GuildPlugins } from '../../database/schemas/GuildPluginSchema'
@Category('music')
@SlashCommand('immortal', {
  description: 'Toggles immortality mode.',
})
@Test()
export class ImmortalCommand extends Command {
  @logger()
  private logger: Logger

  async run({ guild }: SlashCommandRunOptions): CommandReturnType {
    const embed = new MessageEmbed().setTitle('Updating Immortality: ')

    const guildConfig = await GuildPluginModel.findOne(
      {
        guildId: guild.id,
      },
      'immortal',
    )

    const guildId = guild.id

    if (!guildConfig?.immortal) {
      await this.updateGuildPlugins(guildConfig, true, guildId).catch(err => {
        this.logger.error(err)

        return {
          embeds: [embed.setDescription('Error occurred. Try again later.')],
        }
      })

      return {
        embeds: [embed.setDescription(`Set immortality to: \`True\``)],
      }
    }

    await this.updateGuildPlugins(guildConfig, false, guildId).catch(err => {
      this.logger.error(err)

      return {
        embeds: [embed.setDescription('Error occurred. Try again later.')],
      }
    })
    return {
      embeds: [embed.setDescription(`Set immortality to: \`False\``)],
    }
  }

  async error(): CommandReturnType {
    const embed = new MessageEmbed().setTitle('Command Error ')

    return {
      embeds: [embed.setDescription('Error occurred. Try again later.')],
    }
  }

  async updateGuildPlugins(
    guild: GuildConfig,
    value: boolean,
    guildId: string,
  ) {
    if (!guild) guild = new GuildPluginModel({ guildId })

    guild.immortal = value

    await guild.save()
  }
}

type GuildConfig =
  | (Document<any, BeAnObject, any> &
      GuildPlugins &
      IObjectWithTypegooseFunction & {
        _id: any
      })
  | null
