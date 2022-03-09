import { ContextCommand } from '@quanty/framework'
import axios, { AxiosResponse } from 'axios'
import { MessageEmbed, User } from 'discord.js'

export const command: ContextCommand = {
  name: 'Get Banner',
  category: 'context',
  description: "Get's banner with right click.",
  type: 'USER',
  run: async ({ client, interaction, guild }) => {
    const targetId = interaction?.targetId

    const user = client.guilds.cache
      .get(guild.id)
      ?.members.cache.get(targetId)?.user

    await axios
      .get(`https://discord.com/api/v9/users/${targetId}`, {
        headers: {
          Authorization: `Bot ${client.token}`,
        },
      })
      .then((res: AxiosResponse<User>) => {
        const { banner, accentColor } = res.data

        const embed = new MessageEmbed().setTimestamp(Date.now())

        if (banner) {
          const extension = banner.startsWith('a_') ? '.gif' : '.png'
          const url = `https://cdn.discordapp.com/banners/${targetId}/${banner}${extension}?size=512`

          embed.setDescription(`${user?.tag}'s banner`).setImage(url)
        } else if (accentColor) {
          embed
            .setDescription(`${user?.tag} doesnt have a banner`)
            .setColor(accentColor)
        } else {
          embed.setDescription(
            `${user?.tag} does not have banner or accent color`,
          )
        }

        return { embeds: [embed] }
      })
  },
}
