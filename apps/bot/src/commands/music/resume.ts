import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'

@Category('music')
@SlashCommand('resume', {
  description: 'Resumes the song',
})
export class TCommand extends Command {
  async run(options?: SlashCommandRunOptions): CommandReturnType {
    // const { content, player } = checkChannel({
    //   client,
    //   guild,
    //   member,
    // })
    // if (!player) {
    //   return {
    //     content,
    //   }
    // }
    // if (player.playing) return { content: 'Song is already playing.' }
    // player.pause(false)
    // return { content: 'Quanty is now playing' }
  }
  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
