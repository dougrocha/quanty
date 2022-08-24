import {
  CommandReturnType,
  Category,
  Command,
  Test,
  SlashCommand,
  CommandOptions,
} from '@quanty/framework'
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'
import NekoClient from 'nekos.life'

@Test()
@Category('nsfw')
@SlashCommand('anime', {
  description: 'Sends an anime picture.',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: 'type',
      description: 'type of image',
      required: false,
      choices: [
        { name: 'Waifu', value: 'waifu' },
        { name: 'Baka', value: 'baka' },
        { name: 'Cuddle', value: 'cuddle' },
        { name: 'Pat', value: 'pat' },
        { name: 'Holo', value: 'holo' },
        { name: 'Food', value: 'feed' },
        { name: 'Kiss', value: 'kiss' },
        { name: 'Poke', value: 'poke' },
      ],
    },
  ],
})
export class AnimeCommand extends Command {
  async run({ options }: CommandOptions): CommandReturnType {
    const neko = new NekoClient()

    const embed = new EmbedBuilder()

    const type = options.getString('type')

    if (!type) {
      const allsfw = [
        await neko.waifu(),
        await neko.baka(),
        await neko.cuddle(),
        await neko.pat(),
        await neko.tickle(),
        await neko.feed(),
        await neko.hug(),
        await neko.kiss(),
        await neko.slap(),
        await neko.smug(),
        await neko.poke(),
        await neko.holo(),
      ]

      const res = allsfw[Math.floor(Math.random() * allsfw.length)]

      return {
        embeds: [embed.setImage(res.url).setColor('#FF5F9F')],
      }
    }

    const res = neko[type as never] as () => Promise<{ url: string }>

    const url = (await res()).url

    return {
      embeds: [embed.setImage(url).setColor('#FF5F9F')],
    }
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
