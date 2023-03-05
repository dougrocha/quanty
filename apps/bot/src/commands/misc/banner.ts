import { Command } from '@sapphire/framework'
import axios, { AxiosResponse } from 'axios'
import {
  ApplicationCommandType,
  EmbedBuilder,
  GuildMember,
  User,
} from 'discord.js'

import { clientEnv } from '../../utils/env'

export class GetBannerCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      description: "Get's banner with right click.",
    })
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerContextMenuCommand(builder =>
      builder.setName('Get Banner').setType(ApplicationCommandType.User),
    )
  }

  public override async contextMenuRun(
    interaction: Command.ContextMenuCommandInteraction,
  ) {
    if (
      !interaction.isUserContextMenuCommand() ||
      !(interaction.targetMember instanceof GuildMember)
    )
      return

    const targetId = interaction?.targetId

    const guild = interaction.guild

    const client = this.container.client

    if (!guild) return

    const user = client.guilds.cache
      .get(guild.id)
      ?.members.cache.get(targetId)?.user

    await axios
      .get(`https://discord.com/api/v10/users/${targetId}`, {
        headers: {
          Authorization: `Bot ${clientEnv.DISCORD_CLIENT_TOKEN ?? ''}`,
        },
      })
      .then((res: AxiosResponse<User>) => {
        const { banner, accentColor } = res.data

        const embed = new EmbedBuilder().setTimestamp(Date.now())

        if (banner) {
          const extension = banner.startsWith('a_') ? '.gif' : '.png'
          const url = `https://cdn.discordapp.com/banners/${targetId}/${banner}${extension}?size=512`

          embed.setDescription(`${user?.tag}'s banner`).setImage(url)
        } else if (accentColor) {
          embed
            .setDescription(`${user?.tag} doesn't have a banner`)
            .setColor(accentColor)
        } else {
          embed.setDescription(
            `${user?.tag} does not have banner or accent color`,
          )
        }

        interaction.reply({ embeds: [embed] })
      })
  }
}
