import { Command } from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
  name: 'immortal',
  description: 'Toggles immortality mode',
  category: 'music',
  run: async ({ client, guild }) => {
    const guildConfig = await client.PluginManager.getGuildSetting({
      guildId: guild.id,
      setting: 'MUSIC',
    })

    const toggle = guildConfig.immortal

    const embed = new MessageEmbed().setTitle('Updating Immortality: ')

    if (!toggle) {
      guildConfig.immortal = true
      await client.PluginManager.updateMusicImmortality({
        guildId: guild.id,
        immortal: guildConfig.immortal,
      })
      return {
        embeds: [embed.setDescription(`Set immortality to: \`True\``)],
      }
    }
    guildConfig.immortal = false
    await client.PluginManager.updateMusicImmortality({
      guildId: guild.id,
      immortal: guildConfig.immortal,
    })
    return {
      embeds: [embed.setDescription(`Set immortality to: \`False\``)],
    }
  },
}
