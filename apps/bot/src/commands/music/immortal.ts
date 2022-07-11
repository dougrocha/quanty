import {
  CommandReturnType,
  Category,
  Command,
  Logger,
  logger,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

@Category('music')
@SlashCommand('immortal', {
  description: 'Toggles immortality mode.',
})
export class ImmortalCommand extends Command {
  @logger()
  private logger: Logger

  async run({ guild }: SlashCommandRunOptions): CommandReturnType {
    // Const embed = new MessageEmbed().setTitle('Updating Immortality: ')
    // let guildConfig = await GuildPluginsModel.findOne(
    //   {
    //     guildId: guild.id,
    //   },
    //   'immortal',
    // )
    // const guildId = guild.id
    // if (!guildConfig) guildConfig = new GuildPluginsModel({ guildId })
    // if (!guildConfig.immortal) {
    //   guildConfig.immortal = true
    //   await guildConfig?.save().catch(err => {
    //     this.logger.error(err)
    //     return {
    //       embeds: [embed.setDescription('Error occurred. Try again later.')],
    //     }
    //   })
    //   return {
    //     embeds: [embed.setDescription(`Set immortality to: \`True\``)],
    //   }
    // }
    // guildConfig.immortal = false
    // await guildConfig.save().catch(err => {
    //   this.logger.error(err)
    //   return {
    //     embeds: [embed.setDescription('Error occurred. Try again later.')],
    //   }
    // })
    // return {
    //   embeds: [embed.setDescription(`Set immortality to: \`False\``)],
    // }
  }

  async error(): CommandReturnType {
    const embed = new MessageEmbed().setTitle('Command Error ')

    return {
      embeds: [embed.setDescription('Error occurred. Try again later.')],
    }
  }
}
