import { IContextCommand } from '../../../quanty/types';

export const command: IContextCommand = {
  name: 'Add to queue',
  category: 'context',
  description: 'Add message content to queue if song exists.',
  type: 'MESSAGE',

  run: async ({ interaction }) => {
    const targetId = interaction?.targetId;
  },
};
