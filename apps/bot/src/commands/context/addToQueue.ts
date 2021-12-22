import { IContextCommand } from '@quanty/framework';

export const command: IContextCommand = {
  name: 'Add to queue',
  category: 'context',
  description: 'Add message content to queue if song exists.',
  type: 'MESSAGE',

  run: async ({ interaction }) => {
    const targetId = interaction?.targetId;
  },
};
