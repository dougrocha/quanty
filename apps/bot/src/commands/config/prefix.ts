import {
  AsyncCommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
  UserPermissions,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

import { createLog, CreateLogActionsEnum } from '../../libs/createLog'

@SlashCommand('prefix', {
  description: 'Prefix manager.',
  options: [
    {
      name: 'prefix',
      description: 'sets a new prefix',
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
  }: SlashCommandRunOptions): AsyncCommandReturnType {
    // Const prefix = client.guildManager.getPrefix(guild.id)
    const prefix = ''
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

      if (!prefix) {
        return {
          embeds: [
            embed.setDescription(`The current prefix is \`${prefix || 'q!'}\``),
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

      // Const newGuildConfig = await client.guildManager.getPrefixAndUpdate(
      //   guild.id,
      //   input,
      // )

      const newGuildConfig = { prefix: '' }

      await createLog({
        guildId: guild.id,
        action: CreateLogActionsEnum.CHANGEPREFIX,
        user: {
          discriminator: user.discriminator,
          username: user.username,
          id: user.id,
        },
      })

      return {
        embeds: [
          embed.setDescription(
            `Your prefix has been set to \`${newGuildConfig?.prefix}\``,
          ),
        ],
      }
    }
    return {
      embeds: [embed.setDescription(`Your prefix is  \`${prefix}\``)],
    }
  }
  error(): void {
    // Return {
    //   content: 'Hey man your prefix broke. Contact someone to fix this plugin',
    // }
  }
}
