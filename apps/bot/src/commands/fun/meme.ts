import { ChatInputCommand, Command } from '@sapphire/framework';
import axios from 'axios';
import { EmbedBuilder } from 'discord.js';


export interface IMeme {
  title: string
  postLink: string
  url: string
  subreddit: string
  ups: string
}

export class AnimeCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options })
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry,
  ) {
    registry.registerChatInputCommand(builder =>
      builder.setName('meme').setDescription('Will send a random meme'),
    )
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction,
  ) {
    await axios
      .get('https://meme-api.com/gimme')
      .then(({ data }: { data: IMeme }) => {
        const embed = new EmbedBuilder()
          .setTitle(data.title)
          .setURL(data.postLink)
          .setImage(data.url)
          .setFooter({ text: `${data.subreddit} - ${data.ups}` })
          .setTimestamp(Date.now())
          .setColor('#FF5F9F')

        void interaction.reply({
          embeds: [embed],
        })
      })
  }
}