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
      const allSfw = [
        neko.waifu(),
        neko.baka(),
        neko.cuddle(),
        neko.pat(),
        neko.tickle(),
        neko.feed(),
        neko.hug(),
        neko.kiss(),
        neko.slap(),
        neko.smug(),
        neko.poke(),
        neko.holo(),
      ]

      const res = await allSfw[Math.floor(Math.random() * allSfw.length)]

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
