import type {
  APIGuildMember,
  Awaitable,
  CommandInteraction,
  Guild,
  GuildMember,
  Interaction,
  TextBasedChannel,
} from 'discord.js'
import { Part } from '../part/Part'

export abstract class InteractionHandler<
  O extends InteractionHandler.Options = InteractionHandler.Options,
> extends Part<O> {
  public readonly type: InteractionHandler.Type

  public constructor(context: Part.Context, options: O = {} as O) {
    super(context, { ...options })

    this.type = options.type
  }

  public abstract run(
    interaction: Interaction,
    parsedData?: unknown,
  ): Awaitable<unknown>

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public parse(_interaction: Interaction): Awaitable<unknown> {
    return {}
  }
}

/**
 * Extend this interface to add new values to the ParsedData type.
 */
export interface InteractionHandlerParsedData {
  member: GuildMember | APIGuildMember | null
  guild: Guild | null
  channel: TextBasedChannel | null
  options?: CommandInteraction['options']
}

export namespace InteractionHandler {
  export type Options = InteractionHandlerOptions
  export type Context = Part.Context
  export type Type = InteractionHandlerTypes

  export type ParsedData = InteractionHandlerParsedData
}

export interface InteractionHandlerOptions extends Part.Options {
  type: InteractionHandler.Type
}

export const enum InteractionHandlerTypes {
  Autocomplete = 'AUTOCOMPLETE',

  SelectMenu = 'SELECT_MENU',
  ModalSubmit = 'MODAL_SUBMIT',
}

