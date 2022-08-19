import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  CommandOptions,
  UserPermissions,
} from '@quanty/framework'
import {
  ButtonStyle,
  ComponentType,
  InteractionButtonComponentData,
} from 'discord.js'

@SlashCommand('ticket', {
  description: 'Opens a ticket for any issues you may have.',
})
@Category('moderation')
@UserPermissions('SendMessages')
export class TicketCommand extends Command {
  async run({ guild, user }: CommandOptions): CommandReturnType {
    // Const embed = new MessageEmbed().setColor('#FF5F9F')
    // const guildConfig = await GuildsModel.findOne(
    //   {
    //     guildId: guild.id,
    //   },
    //   'guildId maxTickets',
    //   {
    //     populate: {
    //       path: 'tickets',
    //       match: { memberId: { $eq: user.id }, closed: false },
    //       select: 'memberId closed',
    //     },
    //   },
    // )
    // // TODO: Decide whether max tickets should be user based or guild based
    // const maxTickets = guildConfig?.maxTickets ?? 25
    // if ((guildConfig?.tickets?.length ?? -1) > maxTickets)
    //   return {
    //     embeds: [
    //       embed
    //         .setDescription(
    //           `You already have the \`max number\` of tickets open.`,
    //         )
    //         .addField('Max Tickets:', String(maxTickets))
    //         .setFooter({
    //           text: dayjs(Date.now()).format('DD/MM/YYYY'),
    //           iconURL: guild.iconURL({ dynamic: true }) ?? '',
    //         }),
    //     ],
    //   }
    // embed.setDescription(`Open a ticket for \`${guild.name}\`.`).setFooter({
    //   text: dayjs(Date.now()).format('DD/MM/YYYY'),
    //   iconURL: guild.iconURL({ dynamic: true }) ?? '',
    // })
    // const component = new MessageActionRow().addComponents(
    //   ticketTypes.map(({ label, customId: id, style }) =>
    //     new MessageButton()
    //       .setCustomId(id)
    //       .setLabel(label ?? 'DNE')
    //       .setStyle(style),
    //   ),
    // )
    // return {
    //   embeds: [embed],
    //   components: [component],
    //   ephemeral: true,
    // }
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}

export const ticketTypes: InteractionButtonComponentData[] = [
  {
    customId: 'report-ticket',
    label: '🔴 Report',
    style: ButtonStyle.Danger,
    type: ComponentType.Button,
  },
  {
    customId: 'suggestion-ticket',
    label: '📃 Suggestion',
    style: ButtonStyle.Primary,
    type: ComponentType.Button,
  },
  {
    customId: 'other-ticket',
    label: '💡 Other',
    style: ButtonStyle.Secondary,
    type: ComponentType.Button,
  },
]
