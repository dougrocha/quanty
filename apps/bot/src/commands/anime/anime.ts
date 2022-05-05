import {
  CommandReturnType,
  Category,
  Command,
  NSFW,
  SlashCommand,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'
import Client from 'nekos.life'

@Category('nsfw')
@SlashCommand('anime', {
  description: 'Sends a sfw anime picture.',
  // Options: [
  //   {
  //     type: 'SUB_COMMAND',
  //     name: 'sfw',
  //     description: 'Sends a sfw anime picture.',
  //     options: [
  //       {
  //         type: 'STRING',
  //         name: 'type',
  //         description: 'type of image',
  //         required: false,
  //         choices: [
  //           { name: 'Waifu', value: 'waifu' },
  //           { name: 'Baka', value: 'baka' },
  //           { name: 'Holo', value: 'holo' },
  //           { name: 'Food', value: 'feed' },
  //         ],
  //       },
  //     ],
  //   },
  // ],
})
@NSFW()
export class AnimeCommand extends Command {
  async run(): CommandReturnType {
    const neko = new Client()

    const embed = new MessageEmbed()

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

    return {
      embeds: [embed.setColor('#FF5F9F')],
    }
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
