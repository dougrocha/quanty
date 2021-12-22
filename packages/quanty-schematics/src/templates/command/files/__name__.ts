import { ICommand } from '@quanty/framework';

export const command: ICommand = {
  name: `<%= name %>`,
  description: '<%= description %>',
  category: '<%= category %>',
  slash: '<%= type %>',
  run: async () => {},
};
