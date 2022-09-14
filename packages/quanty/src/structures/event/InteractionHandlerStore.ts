import type { Interaction } from 'discord.js'
import { Store } from '../store/Store'
import {
  InteractionHandler,
  InteractionHandlerTypes,
} from './InteractionHandler'

export class InteractionHandlerStore extends Store<InteractionHandler> {
  public constructor() {
    super(InteractionHandler, { name: 'interactionHandlers' })
  }

  public async run(interaction: Interaction) {
    if (!this.size) return false

    const promises = []

    for (const handler of this.values() as IterableIterator<InteractionHandler>) {
      const filter = InteractionHandlerFilters.get(handler.type)

      if (!filter?.(interaction)) continue
    }
  }
}

export const InteractionHandlerFilters = new Map<
  InteractionHandlerTypes,
  (interaction: Interaction) => boolean
>([
  [
    InteractionHandlerTypes.Autocomplete,
    interaction => interaction.isAutocomplete(),
  ],
  [
    InteractionHandlerTypes.ModalSubmit,
    interaction => interaction.isModalSubmit(),
  ],
  [
    InteractionHandlerTypes.SelectMenu,
    interaction => interaction.isSelectMenu(),
  ],
])

