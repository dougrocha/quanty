import { Feature } from '@quanty/framework'

export const feature: Feature<'<%= name %>'> = {
  name: `<%= name %>`,
  once: <%= once %>,
  run: async (<%= args %>) => {},
}
