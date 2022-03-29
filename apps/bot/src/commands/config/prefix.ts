import {
  Category,
  Command,
  CommandReturnType,
  SlashCommand,
  SlashCommandRunOptions,
  UserPermissions,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

import { GuildModel } from '../../database'
import { createLog, CreateLogActionsEnum } from '../../libs/createLog'

@SlashCommand('prefix', {
  description: 'Prefix manager.',
  options: [
    {
      name: 'prefix',
      description: 'Sets a new prefix.',
      required: false,
      type: 'STRING',
    },
  ],
})
@Category('config')
@UserPermissions('ADMINISTRATOR')
export class PrefixCommand extends Command {
  async run({
    user,
    options,
    guild,
  }: SlashCommandRunOptions): CommandReturnType {
    const guildPrefix = await GuildModel.findOne(
      { guildId: guild.id },
      'prefix',
    )

    const embed = new MessageEmbed().setFooter({
      text: `${user.discriminator} | ${user.username}`,
      iconURL: user.displayAvatarURL({ format: 'png', dynamic: true }),
    })

    const input = options?.getString('prefix')

    if (input) {
      const userObj = guild.members.cache.get(user.id)

      if (!userObj) return

      if (!userObj?.permissions.has('ADMINISTRATOR'))
        return { content: 'You can not edit the prefix.' }

      if (!guildPrefix) {
        return {
          embeds: [
            embed.setDescription(
              `The current prefix is \`${this.client.prefix || 'q!'}\``,
            ),
          ],
        }
      }

      if (input.length > 4)
        return {
          embeds: [
            embed.setDescription(
              'The length of your prefix must be under 4 characters.',
            ),
          ],
        }

      await createLog({
        guildId: guild.id,
        action: CreateLogActionsEnum.CHANGEPREFIX,
        user: {
          discriminator: user.discriminator,
          username: user.username,
          id: user.id,
        },
      })

      guildPrefix.prefix = input

      await guildPrefix.save()

      return {
        embeds: [
          embed.setDescription(`Your prefix has been set to \`${input}\``),
        ],
      }
    }

    return {
      embeds: [
        embed.setDescription(
          `Your prefix is  \`${guildPrefix?.prefix ?? this.client.prefix}\``,
        ),
      ],
    }
  }

  async error(): CommandReturnType {
    return {
      content: 'Hey man your prefix broke. Contact someone to fix this plugin',
    }
  }
}
