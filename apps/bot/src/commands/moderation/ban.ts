import { Command } from '@quanty/framework'

export const command: Command = {
  name: `ban`,
  description: 'Bans members',
  category: 'moderation',
  cmdType: 'both',
  run: async () => {
    return {
      content: 'Command not yet built',
    }
  },
}
