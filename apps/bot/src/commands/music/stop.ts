import { checkChannel, ICommand } from '@quanty/framework';

export const command: ICommand = {
  name: 'stop',
  description: 'Stop Quanty and clears the queue.',
  options: [],
  category: 'music',
  run: async ({ client, guild, member }) => {
    const { content, player } = checkChannel({
      client,
      guild,
      member,
    });

    if (!player) {
      return {
        content,
      };
    }

    player.disconnect();
    player.destroy();

    return {
      content: 'Bye!',
    };
  },
};
