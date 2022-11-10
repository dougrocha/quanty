import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js'
import { SlashCommand, Test } from '../../src'
import { Command } from '../../src/structures/command/Command'
import { CommandReturnType } from '../../src/structures/command/types'

@SlashCommand('mute', {
  description: 'Mute the user',
  options: [
    {
      name: 'user',
      description: 'The user to mute',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
})
@Test()
export class MuteCommand extends Command {
  async run(interaction: CommandInteraction): CommandReturnType {
    const user = interaction.options.getUser('user')
    const guild = interaction.guild

    const member = await guild?.members.fetch(user?.id as string)

    const isMute = member?.voice.mute

    member?.voice.setMute(!isMute)

    return {
      content: `${isMute ? 'Muted' : 'Unmuted'} user ${member?.user.username}#${
        member?.user.discriminator
      }`,
    }
  }
}

