// Import {
//   ApplicationCommandOptionData,
//   PermissionString,
//   ApplicationCommandType,
//   Message,
//   CommandInteraction,
//   GuildMember,
//   Guild,
//   TextBasedChannel,
//   ContextMenuInteraction,
//   ButtonInteraction,
//   AutocompleteInteraction,
//   CommandInteractionOptionResolver,
//   ReplyMessageOptions,
//   InteractionReplyOptions,
//   WebhookEditMessageOptions,
// } from 'discord.js'

// import { QuantyClient } from '../../client/Client'
// import { CommandTypes } from './Command'

// /**
//  * Interface for Commands
//  *
//  * By default all commands with be set to work with message and interactions.
//  * If you would like to only only one, use the `cmdType` option.
//  *
//  * @example
//  * const command: Command = {
//  *  name: 'name',
//  *  description: 'description',
//  *  category: 'category',
//  *  run: async ({client, message, interaction}) => {}
//  * }
//  */
// export type Command = MsgCommand | SlashCommand | SlashMsgCommand

// export interface BaseCommand {
//   name: string
//   aliases?: string[]
//   category: string
//   description: string
//   options?: ApplicationCommandOptionData[]
//   isGuildOnly?: boolean
//   isOwnerOnly?: boolean
//   nsfw?: boolean
//   userPermissions?: PermissionString[]
//   clientPermissions?: PermissionString[]
//   expected?: string[]
//   minArgs?: number
//   maxArgs?: number
//   format?: string
//   cooldown?: number
//   globalCooldown?: number
//   cmdType?: CommandTypes
//   type?: ApplicationCommandType
//   test?: boolean
//   ephemeral?: boolean
//   hidden?: boolean
//   run: (options: any) => CommandReturnType
//   error?: (options: any, error: any) => CommandReturnType
// }

// export interface ICooldown {
//   times: number
//   timeout: number
//   includeOwners: boolean
// }

// interface MsgCommand
//   extends Omit<BaseCommand, 'type' | 'ephemeral' | 'hidden'> {
//   cmdType: 'message'
//   run: (
//     options: Omit<RunOptions<'message'>, 'interaction' | 'options'>,
//   ) => CommandReturnType
//   error?: (
//     options: Omit<RunOptions<'message'>, 'interaction' | 'options'>,
//     error: CommandErrorOptions,
//   ) => CommandReturnType
// }

// interface SlashCommand
//   extends Omit<BaseCommand, 'type' | 'minArgs' | 'maxArgs' | 'expected'> {
//   cmdType: 'slash'
//   run: (
//     options: Omit<RunOptions<'slash'>, 'message' | 'args'>,
//   ) => CommandReturnType
//   error?: (
//     options: Omit<RunOptions<'slash'>, 'message' | 'args'>,
//     error: CommandErrorOptions,
//   ) => CommandReturnType
// }

// interface SlashMsgCommand extends Omit<BaseCommand, 'type'> {
//   cmdType?: 'both'
//   run: (options: RunOptions<'both'>) => CommandReturnType
//   error?: (
//     options: RunOptions<'both'>,
//     error: CommandErrorOptions,
//   ) => CommandReturnType
// }

// export interface ContextCommand
//   extends Pick<BaseCommand, 'name' | 'description' | 'category'> {
//   type: Exclude<ApplicationCommandType, 'CHAT_INPUT'>
//   run: (options: RunOptions<'context'>) => CommandReturnType
//   error?: (
//     options: RunOptions<'context'>,
//     error: CommandErrorOptions,
//   ) => CommandReturnType
// }

// export interface BaseRunOptions {
//   client: QuantyClient
//   message: Message
//   interaction: CommandInteraction
//   args: string[]
//   member: GuildMember
//   guild: Guild
//   channel: TextBasedChannel
//   options: CommandRunOptions
// }

// interface RunOptions<T extends CommandTypes | 'any'> {
//   client: QuantyClient
//   message: Message
//   interaction: T extends keyof InteractionType ? InteractionType[T] : null
//   args: string[]
//   member: T extends 'any' ? GuildMember | null : GuildMember
//   guild: T extends 'any' ? Guild | null : Guild
//   channel: T extends 'any' ? TextBasedChannel | null : TextBasedChannel
//   options: T extends 'slash' | 'context' | 'autocomplete'
//     ? CommandRunOptions[T]
//     : T extends 'both'
//     ? CommandRunOptions['slash']
//     : null
// }

// export type MessageRunOptions = Omit<
//   RunOptions<'message'>,
//   'interaction' | 'options'
// >
// export type SlashRunOptions = Omit<RunOptions<'slash'>, 'message' | 'args'>

// interface InteractionType {
//   both: CommandInteraction
//   slash: CommandInteraction
//   context: ContextMenuInteraction
//   button: ButtonInteraction
//   autocomplete: AutocompleteInteraction
// }

// interface CommandErrorOptions {
//   code: number
//   content: number
// }

// interface CommandRunOptions {
//   slash: Omit<CommandInteractionOptionResolver, 'getMessage' | 'getFocused'>
//   context: Omit<
//     CommandInteractionOptionResolver,
//     | 'getFocused'
//     | 'getMentionable'
//     | 'getRole'
//     | 'getNumber'
//     | 'getInteger'
//     | 'getString'
//     | 'getChannel'
//     | 'getBoolean'
//     | 'getSubcommandGroup'
//     | 'getSubcommand'
//   >
//   autocomplete: Omit<CommandInteractionOptionResolver, 'getMessage'>
// }

// export type CommandReturnType =
//   | Promise<CommandReturnObjects>
//   | CommandReturnObjects

// type CommandReturnObjects =
//   | ReplyMessageOptions
//   | InteractionReplyOptions
//   | WebhookEditMessageOptions
//   | string
//   | void
