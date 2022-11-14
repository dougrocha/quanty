import { Test, SlashCommand, Command, CommandReturn } from '@quanty/framework'
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
} from 'discord.js'
import NekoClient from 'nekos.life'

@Test()
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
  async run({ options }: CommandInteraction): Promise<CommandReturn> {
    const neko = new NekoClient()

    const type = options.get('type')

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
        embeds: [
          new EmbedBuilder({ image: { url: res.url } }).setColor('#FF5F9F'),
        ],
      }
    }

    const res = neko[type as never] as () => Promise<{ url: string }>

    const url = (await res()).url

    return {
      embeds: [new EmbedBuilder({ image: { url } }).setColor('#FF5F9F')],
    }
  }

  async error(error: unknown, interaction: CommandInteraction) {
    throw new Error('Method not implemented.')
  }
}

