import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'

@Category('music')
@SlashCommand('stop', {
  description: 'Stop Quanty and clears the queue.',
})
export class StopCommand extends Command {
  async run(options?: SlashCommandRunOptions): CommandReturnType {
    //   Const { content, player } = checkChannel({
    //     client,
    //     guild,
    //     member,
    //   })
    //   if (!player) {
    //     return {
    //       content,
    //     }
    //   }
    //   player.disconnect()
    //   player.destroy()
    //   return {
    //     content: 'Bye!',
    //   }
  }
  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
