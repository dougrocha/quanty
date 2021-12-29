import { Command } from '@quanty/framework'
import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { MemeType } from '../../types'

export const command: Command = {
  name: 'meme',
  description: 'Will send a random meme',
  category: 'fun',
  run: async () => {
    await axios
      .get('https://meme-api.herokuapp.com/gimme')
      .then(({ data }: { data: MemeType }) => {
        const embed = new MessageEmbed()
          .setTitle(data.title)
          .setURL(data.postLink)
          .setImage(data.url)
          .setFooter(`${data.subreddit} - ${data.ups}`)
          .setTimestamp(Date.now())
          .setColor('#FF5F9F')

        return {
          embeds: [embed],
        }
      })
  },
}
