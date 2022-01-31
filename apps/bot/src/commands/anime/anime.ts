import { Command } from '@quanty/framework'
import { MessageEmbed, TextChannel } from 'discord.js'
import Client from 'nekos.life'

export const command: Command = {
  name: 'anime',
  description: 'Sends a random anime picture',
  options: [
    {
      type: 'SUB_COMMAND',
      name: 'sfw',
      description: 'Sends a sfw anime picture.',
      options: [
        {
          type: 'STRING',
          name: 'type',
          description: 'type of image',
          required: false,
          choices: [
            { name: 'Waifu', value: 'waifu' },
            { name: 'Baka', value: 'baka' },
            { name: 'Holo', value: 'holo' },
            { name: 'Food', value: 'feed' },
          ],
        },
      ],
    },
    {
      type: 'SUB_COMMAND',
      name: 'nsfw',
      description: 'Sends a nsfw anime picture.',
      options: [
        {
          type: 'STRING',
          name: 'type',
          description: 'type of image',
          required: false,
          choices: [
            { name: 'Boobs', value: 'boobs' },
            { name: 'Tits', value: 'tits' },
            { name: 'Solo Girl', value: 'girlSoloGif' },
            { name: 'Wank Gif', value: 'wankGif' },
          ],
        },
      ],
    },
  ],
  category: 'nsfw',
  cmdType: 'slash',
  run: async ({ options, channel }) => {
    const neko = new Client()

    const embed = new MessageEmbed()

    if (options.getSubcommand() === 'sfw') {
      const type = options.getString('type')

      let image: { url: string }

      switch (type) {
        case 'waifu':
          image = await neko.sfw.waifu()
          embed.setImage(image.url)
          break
        case 'baka':
          image = await neko.sfw.baka()
          embed.setImage(image.url)
          break
        case 'holo':
          image = await neko.sfw.holo()
          embed.setImage(image.url)
          break
        case 'feed':
          image = await neko.sfw.feed()
          embed.setImage(image.url)
          break
        default:
          const allsfw = [
            await neko.sfw.waifu(),
            await neko.sfw.baka(),
            await neko.sfw.cuddle(),
            await neko.sfw.pat(),
            await neko.sfw.tickle(),
            await neko.sfw.feed(),
            await neko.sfw.hug(),
            await neko.sfw.kiss(),
            await neko.sfw.slap(),
            await neko.sfw.smug(),
            await neko.sfw.poke(),
            await neko.sfw.holo(),
          ]

          const res = allsfw[Math.floor(Math.random() * allsfw.length)]

          embed.setImage(res.url)
      }
    }

    if (options.getSubcommand() === 'nsfw') {
      if ((channel as TextChannel).nsfw) {
        return {
          content: `Can't use this command here.`,
        }
      }
      const type = options.getString('type')

      let image: { url: string }

      switch (type) {
        case 'tits':
          image = await neko.nsfw.tits()
          embed.setImage(image.url)
          break
        case 'boobs':
          image = await neko.nsfw.boobs()
          embed.setImage(image.url)
          break
        case 'holo':
          image = await neko.nsfw.holo()
          embed.setImage(image.url)
          break
        case 'wankGif':
          image = await neko.nsfw.pussyWankGif()
          embed.setImage(image.url)
          break
        default:
          const all = [
            await neko.nsfw.tits(),
            await neko.nsfw.girlSoloGif(),
            await neko.nsfw.boobs(),
            await neko.nsfw.pussyWankGif(),
          ]

          embed.setImage(all[Math.floor(Math.random() * all.length)].url)
      }
    }

    return {
      embeds: [embed.setColor('#FF5F9F')],
    }
  },
}
