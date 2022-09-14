import {
  ApplicationCommandOptionType,
  CommandInteraction,
  InteractionReplyOptions,
} from 'discord.js'

import { SlashCommand, Test } from '../../src'
import { UseGuards } from '../../src/decorators/core/useGuards'
import { SetMetadata } from '../../src/decorators/utils'
import { Command } from '../../src/structures/command/Command'
import { TestingGuard } from '../guards/testGuards'

const Roles = (...roles: string[]) => SetMetadata('roles', roles)

@SlashCommand('anime', {
  description: 'Testing Change',
  options: [
    {
      name: 'text',
      description: "Echo's text.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'waifu',
          description: 'Waifu',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],
})
@Test()
export class AnimeCommand extends Command {
  @UseGuards(TestingGuard)
  @Roles('admin', 'moderator')
  async run(interaction: CommandInteraction): Promise<InteractionReplyOptions> {
    // console.log(Reflect.getMetadata('roles', this.run))
    return {
      content: `${interaction.options.get('waifu', true).options}`,
    }
  }

  // error(e: any, options?: CommandOptions): CommandReturnType {
  //   throw new Error('Method not implemented.')
  // }
}
