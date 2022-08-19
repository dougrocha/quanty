import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  CommandOptions,
  OwnerOnly,
} from '@quanty/framework'
import { GuildMember } from 'discord.js'

@SlashCommand('test', {
  description: 'Runs test commands',
})
@Category('moderation')
@OwnerOnly()
export class BanCommand extends Command {
  async run({ client, interaction }: CommandOptions): CommandReturnType {
    if (!(interaction.member instanceof GuildMember)) return

    client.emit('guildMemberAdd', interaction.member)
    client.emit('guildMemberRemove', interaction.member)
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
