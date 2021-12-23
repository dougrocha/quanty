import { MessageEmbed } from 'discord.js'
import axios from 'axios'
import { MemeType } from '../../types'
import { ICommand } from '@quanty/framework'

export const command: ICommand = {
  name: 'meme',
  description: 'Will send a random meme',
  category: 'fun',
  run: async () => {
    await axios
      .get('https://meme-api.herokuapp.com/gimme')
      .then(res => res.data)
      .then(async (data: MemeType) => {
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
