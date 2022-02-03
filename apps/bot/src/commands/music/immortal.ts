import { Command } from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
  name: 'immortal',
  description: 'Toggles immortality mode',
  category: 'music',
  run: async ({ client, guild, channel }) => {
    const guildConfig = client.guildManager.findGuild(guild.id)

    const embed = new MessageEmbed().setTitle('Updating Immortality: ')

    // If (!guildConfig?.music.immortal) {
    //   await updateMusicImmortality(guild.id, true).catch(err => {
    //     client.logger.error('Immortality error', err)

    //     return {
    //       embeds: [embed.setDescription('Error occurred. Try again later.')],
    //     }
    //   })
    //   return {
    //     embeds: [embed.setDescription(`Set immortality to: \`True\``)],
    //   }
    // }

    // await updateMusicImmortality(guild.id, false).catch(err => {
    //   client.logger.error('Immortality error', err)

    //   return {
    //     embeds: [embed.setDescription('Error occurred. Try again later.')],
    //   }
    // })
    // return {
    //   embeds: [embed.setDescription(`Set immortality to: \`False\``)],
    // }
  },
}
