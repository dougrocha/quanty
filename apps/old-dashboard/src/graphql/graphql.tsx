import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AddCustomCommand = {
  customCommand: CustomCommand
  guildId: Scalars['String']
}

export type AddLog = {
  guildId: Scalars['String']
  log: Log
}

export type Anime = {
  __typename?: 'Anime'
  nsfw?: Maybe<Scalars['Boolean']>
  plugin?: Maybe<Scalars['Boolean']>
}

export type Channel = {
  __typename?: 'Channel'
  application_id?: Maybe<Scalars['String']>
  bitrate?: Maybe<Scalars['Int']>
  default_auto_archive_duration?: Maybe<Scalars['Float']>
  guild_id?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  id: Scalars['String']
  last_message_id?: Maybe<Scalars['String']>
  last_pin_timestamp?: Maybe<Scalars['String']>
  member?: Maybe<ThreadMember>
  member_count?: Maybe<Scalars['Int']>
  message_count?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  nsfw?: Maybe<Scalars['Boolean']>
  owner_id?: Maybe<Scalars['String']>
  parent_id?: Maybe<Scalars['String']>
  permission_overwrites?: Maybe<Array<OverWrite>>
  position?: Maybe<Scalars['Float']>
  rate_limit_per_user?: Maybe<Scalars['Int']>
  recipients?: Maybe<Array<User>>
  rtc_region?: Maybe<Scalars['String']>
  thread_metadata?: Maybe<ThreadMetaData>
  topic?: Maybe<Scalars['String']>
  type: Scalars['Float']
  user_limit?: Maybe<Scalars['Int']>
  video_quality_mode?: Maybe<Scalars['Float']>
}

export type CustomCommand = {
  description: Scalars['String']
  id: Scalars['String']
  name: Scalars['String']
}

export type CustomCommands = {
  __typename?: 'CustomCommands'
  description: Scalars['String']
  id: Scalars['String']
  name: Scalars['String']
}

export type Emojis = {
  __typename?: 'Emojis'
  animated?: Maybe<Scalars['Boolean']>
  available?: Maybe<Scalars['Boolean']>
  id: Scalars['String']
  managed?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  require_colons?: Maybe<Scalars['Boolean']>
  roles?: Maybe<Array<Scalars['String']>>
  user?: Maybe<User>
}

export type Guild = {
  __typename?: 'Guild'
  afk_timeout: Scalars['Int']
  channels?: Maybe<Array<Channel>>
  description?: Maybe<Scalars['String']>
  discovery_splash: Scalars['String']
  emojis: Array<Emojis>
  features: Array<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  icon_hash?: Maybe<Scalars['String']>
  id: Scalars['String']
  member_count: Scalars['Float']
  members?: Maybe<GuildMember>
  name: Scalars['String']
  nsfw_level: Scalars['Float']
  owner?: Maybe<Scalars['Boolean']>
  owner_id: Scalars['String']
  permissions?: Maybe<Scalars['String']>
  preferred_locale: Scalars['String']
  premium_subscription_count: Scalars['Float']
  premium_tier: Scalars['Float']
  roles: Array<Roles>
  splash: Scalars['String']
  stickers: Array<Sticker>
  threads?: Maybe<Array<Channel>>
  unavailable?: Maybe<Scalars['Boolean']>
}

export type GuildConfig = {
  __typename?: 'GuildConfig'
  anime?: Maybe<Anime>
  blacklistedWords?: Maybe<Array<Scalars['String']>>
  customCommands?: Maybe<Array<CustomCommands>>
  guildId: Scalars['String']
  logs?: Maybe<Array<Logs>>
  moderation?: Maybe<Moderation>
  music?: Maybe<Music>
  prefix?: Maybe<Scalars['String']>
  premium?: Maybe<Scalars['Boolean']>
}

export type GuildMember = {
  __typename?: 'GuildMember'
  avatar?: Maybe<Scalars['String']>
  deaf: Scalars['Boolean']
  joined_at: Scalars['String']
  mute: Scalars['Boolean']
  nick?: Maybe<Scalars['String']>
  pending?: Maybe<Scalars['Boolean']>
  premium_since?: Maybe<Scalars['String']>
  roles: Array<Scalars['String']>
  user?: Maybe<User>
}

export type Log = {
  action: Scalars['String']
  name: Scalars['String']
}

export type Logs = {
  __typename?: 'Logs'
  action: Scalars['String']
  name: Scalars['String']
}

export type Moderation = {
  __typename?: 'Moderation'
  autoMod?: Maybe<Scalars['Boolean']>
  plugin?: Maybe<Scalars['Boolean']>
}

export type Music = {
  __typename?: 'Music'
  channel?: Maybe<Scalars['String']>
  immortal?: Maybe<Scalars['Boolean']>
  plugin?: Maybe<Scalars['Boolean']>
}

export type Mutation = {
  __typename?: 'Mutation'
  addCustomCommand: GuildConfig
  addLog: GuildConfig
  updateAutoMod: GuildConfig
  updateBlacklistedWords: GuildConfig
  updateImmortality: GuildConfig
  updateModerationPlugin: GuildConfig
  updateMusicChannel: GuildConfig
  updateMusicPlugin: GuildConfig
  updatePrefix: GuildConfig
}

export type MutationAddCustomCommandArgs = {
  addCustomCommand: AddCustomCommand
}

export type MutationAddLogArgs = {
  addLog: AddLog
}

export type MutationUpdateAutoModArgs = {
  updateAutoMod: UpdateAutoModInput
}

export type MutationUpdateBlacklistedWordsArgs = {
  updateBlacklistedWords: UpdateBlacklistedWords
}

export type MutationUpdateImmortalityArgs = {
  updateImmortality: UpdateMusicImmortality
}

export type MutationUpdateModerationPluginArgs = {
  updateModerationPlugin: UpdateModerationPlugin
}

export type MutationUpdateMusicChannelArgs = {
  updateMusicChannel: UpdateMusicChannel
}

export type MutationUpdateMusicPluginArgs = {
  updateMusicPlugin: UpdateMusicPlugin
}

export type MutationUpdatePrefixArgs = {
  updatePrefix: UpdatePrefixInput
}

export type OverWrite = {
  __typename?: 'OverWrite'
  allow: Scalars['String']
  deny: Scalars['String']
  id: Scalars['String']
  type: Scalars['Float']
}

export type Query = {
  __typename?: 'Query'
  guildConfig: GuildConfig
  guilds: Guild
  ownerGuilds: Array<Guild>
  user: UserObject
}

export type QueryGuildConfigArgs = {
  guildId: Scalars['String']
}

export type QueryGuildsArgs = {
  guildId: Scalars['String']
}

export type RoleTags = {
  __typename?: 'RoleTags'
  bot_id?: Maybe<Scalars['String']>
  integration_id?: Maybe<Scalars['String']>
}

export type Roles = {
  __typename?: 'Roles'
  color: Scalars['Float']
  hoist: Scalars['Boolean']
  icon?: Maybe<Scalars['String']>
  id: Scalars['String']
  managed: Scalars['Boolean']
  mentionable: Scalars['Boolean']
  name: Scalars['String']
  permissions: Scalars['String']
  position: Scalars['Float']
  tags?: Maybe<RoleTags>
  unicode_emoji?: Maybe<Scalars['String']>
}

export type Sticker = {
  __typename?: 'Sticker'
  asset: Scalars['String']
  available?: Maybe<Scalars['Boolean']>
  description: Scalars['String']
  format_type: Scalars['Float']
  guild_id?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  name: Scalars['String']
  pack_id?: Maybe<Scalars['String']>
  sort_value?: Maybe<Scalars['Float']>
  tags: Scalars['String']
  type: Scalars['Float']
  user?: Maybe<User>
}

export type ThreadMember = {
  __typename?: 'ThreadMember'
  flags: Scalars['Float']
  id?: Maybe<Scalars['String']>
  join_timestamp: Scalars['String']
  user_id?: Maybe<Scalars['String']>
}

export type ThreadMetaData = {
  __typename?: 'ThreadMetaData'
  archive_timestamp: Scalars['String']
  archived: Scalars['Boolean']
  auto_archive_duration: Scalars['Float']
  invitable?: Maybe<Scalars['Boolean']>
  locked?: Maybe<Scalars['Boolean']>
}

export type UpdateAutoModInput = {
  autoMod: Scalars['Boolean']
  guildId: Scalars['String']
}

export type UpdateBlacklistedWords = {
  blacklistedWords: Array<Scalars['String']>
  guildId: Scalars['String']
}

export type UpdateModerationPlugin = {
  guildId: Scalars['String']
  plugin: Scalars['Boolean']
}

export type UpdateMusicChannel = {
  channel: Scalars['String']
  guildId: Scalars['String']
}

export type UpdateMusicImmortality = {
  guildId: Scalars['String']
  immortal: Scalars['Boolean']
}

export type UpdateMusicPlugin = {
  guildId: Scalars['String']
  plugin: Scalars['Boolean']
}

export type UpdatePrefixInput = {
  guildId: Scalars['String']
  prefix: Scalars['String']
}

export type User = {
  __typename?: 'User'
  accent_color?: Maybe<Scalars['Float']>
  avatar: Scalars['String']
  banner?: Maybe<Scalars['String']>
  bot?: Maybe<Scalars['Boolean']>
  discriminator: Scalars['String']
  email?: Maybe<Scalars['String']>
  flags?: Maybe<Scalars['Float']>
  id: Scalars['String']
  locale?: Maybe<Scalars['String']>
  mfa_enabled?: Maybe<Scalars['Boolean']>
  premium_type?: Maybe<Scalars['Float']>
  public_flags?: Maybe<Scalars['Float']>
  system?: Maybe<Scalars['Boolean']>
  username: Scalars['String']
  verified?: Maybe<Scalars['Boolean']>
}

export type UserObject = {
  __typename?: 'UserObject'
  avatar?: Maybe<Scalars['String']>
  discordId: Scalars['String']
  discriminator: Scalars['String']
  email?: Maybe<Scalars['String']>
  flags?: Maybe<Scalars['Float']>
  locale?: Maybe<Scalars['String']>
  username: Scalars['String']
  verified?: Maybe<Scalars['Boolean']>
}

export type UserQueryVariables = Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'UserObject'
    username: string
    discordId: string
    discriminator: string
    email?: string | null | undefined
    verified?: boolean | null | undefined
    flags?: number | null | undefined
    locale?: string | null | undefined
  }
}

export type OwnerGuildsQueryVariables = Exact<{ [key: string]: never }>

export type OwnerGuildsQuery = {
  __typename?: 'Query'
  ownerGuilds: Array<{
    __typename?: 'Guild'
    id: string
    owner?: boolean | null | undefined
    icon?: string | null | undefined
    name: string
  }>
}

export type GuildsQueryVariables = Exact<{
  guildId: Scalars['String']
}>

export type GuildsQuery = {
  __typename?: 'Query'
  guilds: {
    __typename?: 'Guild'
    id: string
    name: string
    icon?: string | null | undefined
    afk_timeout: number
    roles: Array<{ __typename?: 'Roles'; id: string; name: string }>
  }
}

export type GuildConfigQueryVariables = Exact<{
  guildId: Scalars['String']
}>

export type GuildConfigQuery = {
  __typename?: 'Query'
  guildConfig: {
    __typename?: 'GuildConfig'
    guildId: string
    prefix?: string | null | undefined
    blacklistedWords?: Array<string> | null | undefined
    premium?: boolean | null | undefined
    moderation?:
      | {
          __typename?: 'Moderation'
          autoMod?: boolean | null | undefined
          plugin?: boolean | null | undefined
        }
      | null
      | undefined
    customCommands?:
      | Array<{
          __typename?: 'CustomCommands'
          id: string
          name: string
          description: string
        }>
      | null
      | undefined
    music?:
      | {
          __typename?: 'Music'
          plugin?: boolean | null | undefined
          channel?: string | null | undefined
          immortal?: boolean | null | undefined
        }
      | null
      | undefined
    logs?:
      | Array<{ __typename?: 'Logs'; name: string; action: string }>
      | null
      | undefined
  }
}

export type UpdatePrefixMutationVariables = Exact<{
  prefix: UpdatePrefixInput
}>

export type UpdatePrefixMutation = {
  __typename?: 'Mutation'
  updatePrefix: {
    __typename?: 'GuildConfig'
    guildId: string
    prefix?: string | null | undefined
  }
}

export type UpdateBlacklistedWordsMutationVariables = Exact<{
  blWords: UpdateBlacklistedWords
}>

export type UpdateBlacklistedWordsMutation = {
  __typename?: 'Mutation'
  updateBlacklistedWords: {
    __typename?: 'GuildConfig'
    guildId: string
    blacklistedWords?: Array<string> | null | undefined
  }
}

export type UpdateAutoModMutationVariables = Exact<{
  autoMod: UpdateAutoModInput
}>

export type UpdateAutoModMutation = {
  __typename?: 'Mutation'
  updateAutoMod: {
    __typename?: 'GuildConfig'
    guildId: string
    moderation?:
      | {
          __typename?: 'Moderation'
          autoMod?: boolean | null | undefined
          plugin?: boolean | null | undefined
        }
      | null
      | undefined
  }
}

export type UpdateModerationPluginMutationVariables = Exact<{
  updateModerationPlugin: UpdateModerationPlugin
}>

export type UpdateModerationPluginMutation = {
  __typename?: 'Mutation'
  updateModerationPlugin: {
    __typename?: 'GuildConfig'
    guildId: string
    moderation?:
      | { __typename?: 'Moderation'; plugin?: boolean | null | undefined }
      | null
      | undefined
  }
}

export type UpdateMusicPluginMutationVariables = Exact<{
  updateMusicPlugin: UpdateMusicPlugin
}>

export type UpdateMusicPluginMutation = {
  __typename?: 'Mutation'
  updateMusicPlugin: {
    __typename?: 'GuildConfig'
    guildId: string
    music?:
      | { __typename?: 'Music'; plugin?: boolean | null | undefined }
      | null
      | undefined
  }
}

export type UpdateImmortalityMutationVariables = Exact<{
  updateImmortality: UpdateMusicImmortality
}>

export type UpdateImmortalityMutation = {
  __typename?: 'Mutation'
  updateImmortality: {
    __typename?: 'GuildConfig'
    guildId: string
    music?:
      | { __typename?: 'Music'; immortal?: boolean | null | undefined }
      | null
      | undefined
  }
}

export type UpdateMusicChannelMutationVariables = Exact<{
  updateMusicChannel: UpdateMusicChannel
}>

export type UpdateMusicChannelMutation = {
  __typename?: 'Mutation'
  updateMusicChannel: {
    __typename?: 'GuildConfig'
    guildId: string
    music?:
      | { __typename?: 'Music'; channel?: string | null | undefined }
      | null
      | undefined
  }
}

export const UserDocument = gql`
  query user {
    user {
      username
      discordId
      discriminator
      email
      verified
      flags
      locale
    }
  }
`

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options,
  )
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
export const OwnerGuildsDocument = gql`
  query ownerGuilds {
    ownerGuilds {
      id
      owner
      icon
      name
    }
  }
`

/**
 * __useOwnerGuildsQuery__
 *
 * To run a query within a React component, call `useOwnerGuildsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnerGuildsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnerGuildsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOwnerGuildsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OwnerGuildsQuery,
    OwnerGuildsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<OwnerGuildsQuery, OwnerGuildsQueryVariables>(
    OwnerGuildsDocument,
    options,
  )
}
export function useOwnerGuildsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OwnerGuildsQuery,
    OwnerGuildsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<OwnerGuildsQuery, OwnerGuildsQueryVariables>(
    OwnerGuildsDocument,
    options,
  )
}
export type OwnerGuildsQueryHookResult = ReturnType<typeof useOwnerGuildsQuery>
export type OwnerGuildsLazyQueryHookResult = ReturnType<
  typeof useOwnerGuildsLazyQuery
>
export type OwnerGuildsQueryResult = Apollo.QueryResult<
  OwnerGuildsQuery,
  OwnerGuildsQueryVariables
>
export const GuildsDocument = gql`
  query guilds($guildId: String!) {
    guilds(guildId: $guildId) {
      id
      name
      icon
      roles {
        id
        name
      }
      afk_timeout
    }
  }
`

/**
 * __useGuildsQuery__
 *
 * To run a query within a React component, call `useGuildsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildsQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildsQuery(
  baseOptions: Apollo.QueryHookOptions<GuildsQuery, GuildsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GuildsQuery, GuildsQueryVariables>(
    GuildsDocument,
    options,
  )
}
export function useGuildsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GuildsQuery, GuildsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GuildsQuery, GuildsQueryVariables>(
    GuildsDocument,
    options,
  )
}
export type GuildsQueryHookResult = ReturnType<typeof useGuildsQuery>
export type GuildsLazyQueryHookResult = ReturnType<typeof useGuildsLazyQuery>
export type GuildsQueryResult = Apollo.QueryResult<
  GuildsQuery,
  GuildsQueryVariables
>
export const GuildConfigDocument = gql`
  query guildConfig($guildId: String!) {
    guildConfig(guildId: $guildId) {
      guildId
      prefix
      moderation {
        autoMod
        plugin
      }
      blacklistedWords
      customCommands {
        id
        name
        description
      }
      premium
      music {
        plugin
        channel
        immortal
      }
      logs {
        name
        action
      }
    }
  }
`

/**
 * __useGuildConfigQuery__
 *
 * To run a query within a React component, call `useGuildConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildConfigQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    GuildConfigQuery,
    GuildConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GuildConfigQuery, GuildConfigQueryVariables>(
    GuildConfigDocument,
    options,
  )
}
export function useGuildConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GuildConfigQuery,
    GuildConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GuildConfigQuery, GuildConfigQueryVariables>(
    GuildConfigDocument,
    options,
  )
}
export type GuildConfigQueryHookResult = ReturnType<typeof useGuildConfigQuery>
export type GuildConfigLazyQueryHookResult = ReturnType<
  typeof useGuildConfigLazyQuery
>
export type GuildConfigQueryResult = Apollo.QueryResult<
  GuildConfigQuery,
  GuildConfigQueryVariables
>
export const UpdatePrefixDocument = gql`
  mutation updatePrefix($prefix: UpdatePrefixInput!) {
    updatePrefix(updatePrefix: $prefix) {
      guildId
      prefix
    }
  }
`
export type UpdatePrefixMutationFn = Apollo.MutationFunction<
  UpdatePrefixMutation,
  UpdatePrefixMutationVariables
>

/**
 * __useUpdatePrefixMutation__
 *
 * To run a mutation, you first call `useUpdatePrefixMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePrefixMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePrefixMutation, { data, loading, error }] = useUpdatePrefixMutation({
 *   variables: {
 *      prefix: // value for 'prefix'
 *   },
 * });
 */
export function useUpdatePrefixMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePrefixMutation,
    UpdatePrefixMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdatePrefixMutation,
    UpdatePrefixMutationVariables
  >(UpdatePrefixDocument, options)
}
export type UpdatePrefixMutationHookResult = ReturnType<
  typeof useUpdatePrefixMutation
>
export type UpdatePrefixMutationResult =
  Apollo.MutationResult<UpdatePrefixMutation>
export type UpdatePrefixMutationOptions = Apollo.BaseMutationOptions<
  UpdatePrefixMutation,
  UpdatePrefixMutationVariables
>
export const UpdateBlacklistedWordsDocument = gql`
  mutation UpdateBlacklistedWords($blWords: UpdateBlacklistedWords!) {
    updateBlacklistedWords(updateBlacklistedWords: $blWords) {
      guildId
      blacklistedWords
    }
  }
`
export type UpdateBlacklistedWordsMutationFn = Apollo.MutationFunction<
  UpdateBlacklistedWordsMutation,
  UpdateBlacklistedWordsMutationVariables
>

/**
 * __useUpdateBlacklistedWordsMutation__
 *
 * To run a mutation, you first call `useUpdateBlacklistedWordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlacklistedWordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlacklistedWordsMutation, { data, loading, error }] = useUpdateBlacklistedWordsMutation({
 *   variables: {
 *      blWords: // value for 'blWords'
 *   },
 * });
 */
export function useUpdateBlacklistedWordsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBlacklistedWordsMutation,
    UpdateBlacklistedWordsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateBlacklistedWordsMutation,
    UpdateBlacklistedWordsMutationVariables
  >(UpdateBlacklistedWordsDocument, options)
}
export type UpdateBlacklistedWordsMutationHookResult = ReturnType<
  typeof useUpdateBlacklistedWordsMutation
>
export type UpdateBlacklistedWordsMutationResult =
  Apollo.MutationResult<UpdateBlacklistedWordsMutation>
export type UpdateBlacklistedWordsMutationOptions = Apollo.BaseMutationOptions<
  UpdateBlacklistedWordsMutation,
  UpdateBlacklistedWordsMutationVariables
>
export const UpdateAutoModDocument = gql`
  mutation updateAutoMod($autoMod: UpdateAutoModInput!) {
    updateAutoMod(updateAutoMod: $autoMod) {
      guildId
      moderation {
        autoMod
        plugin
      }
    }
  }
`
export type UpdateAutoModMutationFn = Apollo.MutationFunction<
  UpdateAutoModMutation,
  UpdateAutoModMutationVariables
>

/**
 * __useUpdateAutoModMutation__
 *
 * To run a mutation, you first call `useUpdateAutoModMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAutoModMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAutoModMutation, { data, loading, error }] = useUpdateAutoModMutation({
 *   variables: {
 *      autoMod: // value for 'autoMod'
 *   },
 * });
 */
export function useUpdateAutoModMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAutoModMutation,
    UpdateAutoModMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateAutoModMutation,
    UpdateAutoModMutationVariables
  >(UpdateAutoModDocument, options)
}
export type UpdateAutoModMutationHookResult = ReturnType<
  typeof useUpdateAutoModMutation
>
export type UpdateAutoModMutationResult =
  Apollo.MutationResult<UpdateAutoModMutation>
export type UpdateAutoModMutationOptions = Apollo.BaseMutationOptions<
  UpdateAutoModMutation,
  UpdateAutoModMutationVariables
>
export const UpdateModerationPluginDocument = gql`
  mutation updateModerationPlugin(
    $updateModerationPlugin: UpdateModerationPlugin!
  ) {
    updateModerationPlugin(updateModerationPlugin: $updateModerationPlugin) {
      guildId
      moderation {
        plugin
      }
    }
  }
`
export type UpdateModerationPluginMutationFn = Apollo.MutationFunction<
  UpdateModerationPluginMutation,
  UpdateModerationPluginMutationVariables
>

/**
 * __useUpdateModerationPluginMutation__
 *
 * To run a mutation, you first call `useUpdateModerationPluginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModerationPluginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModerationPluginMutation, { data, loading, error }] = useUpdateModerationPluginMutation({
 *   variables: {
 *      updateModerationPlugin: // value for 'updateModerationPlugin'
 *   },
 * });
 */
export function useUpdateModerationPluginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateModerationPluginMutation,
    UpdateModerationPluginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateModerationPluginMutation,
    UpdateModerationPluginMutationVariables
  >(UpdateModerationPluginDocument, options)
}
export type UpdateModerationPluginMutationHookResult = ReturnType<
  typeof useUpdateModerationPluginMutation
>
export type UpdateModerationPluginMutationResult =
  Apollo.MutationResult<UpdateModerationPluginMutation>
export type UpdateModerationPluginMutationOptions = Apollo.BaseMutationOptions<
  UpdateModerationPluginMutation,
  UpdateModerationPluginMutationVariables
>
export const UpdateMusicPluginDocument = gql`
  mutation UpdateMusicPlugin($updateMusicPlugin: UpdateMusicPlugin!) {
    updateMusicPlugin(updateMusicPlugin: $updateMusicPlugin) {
      guildId
      music {
        plugin
      }
    }
  }
`
export type UpdateMusicPluginMutationFn = Apollo.MutationFunction<
  UpdateMusicPluginMutation,
  UpdateMusicPluginMutationVariables
>

/**
 * __useUpdateMusicPluginMutation__
 *
 * To run a mutation, you first call `useUpdateMusicPluginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMusicPluginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMusicPluginMutation, { data, loading, error }] = useUpdateMusicPluginMutation({
 *   variables: {
 *      updateMusicPlugin: // value for 'updateMusicPlugin'
 *   },
 * });
 */
export function useUpdateMusicPluginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMusicPluginMutation,
    UpdateMusicPluginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateMusicPluginMutation,
    UpdateMusicPluginMutationVariables
  >(UpdateMusicPluginDocument, options)
}
export type UpdateMusicPluginMutationHookResult = ReturnType<
  typeof useUpdateMusicPluginMutation
>
export type UpdateMusicPluginMutationResult =
  Apollo.MutationResult<UpdateMusicPluginMutation>
export type UpdateMusicPluginMutationOptions = Apollo.BaseMutationOptions<
  UpdateMusicPluginMutation,
  UpdateMusicPluginMutationVariables
>
export const UpdateImmortalityDocument = gql`
  mutation updateImmortality($updateImmortality: UpdateMusicImmortality!) {
    updateImmortality(updateImmortality: $updateImmortality) {
      guildId
      music {
        immortal
      }
    }
  }
`
export type UpdateImmortalityMutationFn = Apollo.MutationFunction<
  UpdateImmortalityMutation,
  UpdateImmortalityMutationVariables
>

/**
 * __useUpdateImmortalityMutation__
 *
 * To run a mutation, you first call `useUpdateImmortalityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImmortalityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImmortalityMutation, { data, loading, error }] = useUpdateImmortalityMutation({
 *   variables: {
 *      updateImmortality: // value for 'updateImmortality'
 *   },
 * });
 */
export function useUpdateImmortalityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateImmortalityMutation,
    UpdateImmortalityMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateImmortalityMutation,
    UpdateImmortalityMutationVariables
  >(UpdateImmortalityDocument, options)
}
export type UpdateImmortalityMutationHookResult = ReturnType<
  typeof useUpdateImmortalityMutation
>
export type UpdateImmortalityMutationResult =
  Apollo.MutationResult<UpdateImmortalityMutation>
export type UpdateImmortalityMutationOptions = Apollo.BaseMutationOptions<
  UpdateImmortalityMutation,
  UpdateImmortalityMutationVariables
>
export const UpdateMusicChannelDocument = gql`
  mutation updateMusicChannel($updateMusicChannel: UpdateMusicChannel!) {
    updateMusicChannel(updateMusicChannel: $updateMusicChannel) {
      guildId
      music {
        channel
      }
    }
  }
`
export type UpdateMusicChannelMutationFn = Apollo.MutationFunction<
  UpdateMusicChannelMutation,
  UpdateMusicChannelMutationVariables
>

/**
 * __useUpdateMusicChannelMutation__
 *
 * To run a mutation, you first call `useUpdateMusicChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMusicChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMusicChannelMutation, { data, loading, error }] = useUpdateMusicChannelMutation({
 *   variables: {
 *      updateMusicChannel: // value for 'updateMusicChannel'
 *   },
 * });
 */
export function useUpdateMusicChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMusicChannelMutation,
    UpdateMusicChannelMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateMusicChannelMutation,
    UpdateMusicChannelMutationVariables
  >(UpdateMusicChannelDocument, options)
}
export type UpdateMusicChannelMutationHookResult = ReturnType<
  typeof useUpdateMusicChannelMutation
>
export type UpdateMusicChannelMutationResult =
  Apollo.MutationResult<UpdateMusicChannelMutation>
export type UpdateMusicChannelMutationOptions = Apollo.BaseMutationOptions<
  UpdateMusicChannelMutation,
  UpdateMusicChannelMutationVariables
>
