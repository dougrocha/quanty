import { ChatInputCommand, Command } from '@sapphire/framework'
import { EmbedBuilder } from 'discord.js'
import NekoClient from 'nekos.life'

export class AnimeCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options })
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry,
  ) {
    registry.registerChatInputCommand(builder =>
      builder
        .setName('anime')
        .setDescription('Sends an anime picture.')
        .addStringOption(option =>
          option
            .setName('type')
            .setDescription('type of image')
            .setRequired(false)
            .addChoices(
              { name: 'Waifu', value: 'waifu' },
              { name: 'Waifu', value: 'waifu' },
              { name: 'Baka', value: 'baka' },
              { name: 'Cuddle', value: 'cuddle' },
              { name: 'Pat', value: 'pat' },
              { name: 'Holo', value: 'holo' },
              { name: 'Food', value: 'feed' },
              { name: 'Kiss', value: 'kiss' },
              { name: 'Poke', value: 'poke' },
            )
            .setRequired(false),
        ),
    )
  }

  private neko = new NekoClient()

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const type = interaction.options.get('type')

    const embed = new EmbedBuilder()

    if (!type) {
      const allSfw = [
        this.neko.waifu(),
        this.neko.baka(),
        this.neko.cuddle(),
        this.neko.pat(),
        this.neko.tickle(),
        this.neko.feed(),
        this.neko.hug(),
        this.neko.kiss(),
        this.neko.slap(),
        this.neko.smug(),
        this.neko.poke(),
        this.neko.holo(),
      ]

      console.log(allSfw)

      const res = await allSfw[Math.floor(Math.random() * allSfw.length)]
      interaction.reply({
        embeds: [embed.setImage(res.url).setColor('#FF5F9F')],
      })
    }

    const res = this.neko[type as never] as () => Promise<{ url: string }>
    const url = (await res()).url

    interaction.reply({
      embeds: [embed.setImage(url).setColor('#FF5F9F')],
    })
  }
}
