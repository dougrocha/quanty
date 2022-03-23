import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

@Category('music')
@SlashCommand('shuffle', {
  description: 'Shuffles the current queue',
})
export class TCommand extends Command {
  async run(options?: SlashCommandRunOptions): CommandReturnType {
    // const player = client.player.get(guild.id)
    // const embed = new MessageEmbed().setColor('#FF5F9F')
    // if (!player)
    //   return {
    //     embeds: [embed.setDescription('Invite Quanty to shuffle your music.')],
    //   }
    // if (!player.queue)
    //   return {
    //     embeds: [embed.setDescription('The queue is empty.')],
    //   }
    // embed.setDescription('Shuffled Queue!')
    // player.queue.shuffle()
    // return { embeds: [embed] }
  }
  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
