import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCustomCommand = {
  customCommand: CustomCommand;
  guildId: Scalars['String'];
};

export type AddLog = {
  guildId: Scalars['String'];
  log: Log;
};

export type Anime = {
  __typename?: 'Anime';
  nsfw?: Maybe<Scalars['Boolean']>;
  plugin?: Maybe<Scalars['Boolean']>;
};

export type Channel = {
  __typename?: 'Channel';
  application_id?: Maybe<Scalars['String']>;
  bitrate?: Maybe<Scalars['Int']>;
  default_auto_archive_duration?: Maybe<Scalars['Float']>;
  guild_id?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  last_message_id?: Maybe<Scalars['String']>;
  last_pin_timestamp?: Maybe<Scalars['String']>;
  member?: Maybe<ThreadMember>;
  member_count?: Maybe<Scalars['Int']>;
  message_count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  nsfw?: Maybe<Scalars['Boolean']>;
  owner_id?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  permission_overwrites?: Maybe<Array<OverWrite>>;
  position?: Maybe<Scalars['Float']>;
  rate_limit_per_user?: Maybe<Scalars['Int']>;
  recipients?: Maybe<Array<User>>;
  rtc_region?: Maybe<Scalars['String']>;
  thread_metadata?: Maybe<ThreadMetaData>;
  topic?: Maybe<Scalars['String']>;
  type: Scalars['Float'];
  user_limit?: Maybe<Scalars['Int']>;
  video_quality_mode?: Maybe<Scalars['Float']>;
};

export type CustomCommand = {
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CustomCommands = {
  __typename?: 'CustomCommands';
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Emojis = {
  __typename?: 'Emojis';
  animated?: Maybe<Scalars['Boolean']>;
  available?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  managed?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  require_colons?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<Array<Scalars['String']>>;
  user?: Maybe<User>;
};

export type Guild = {
  __typename?: 'Guild';
  afk_timeout: Scalars['Int'];
  channels?: Maybe<Array<Channel>>;
  description?: Maybe<Scalars['String']>;
  discovery_splash: Scalars['String'];
  emojis: Array<Emojis>;
  features: Array<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  icon_hash?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  member_count: Scalars['Float'];
  members?: Maybe<GuildMember>;
  name: Scalars['String'];
  nsfw_level: Scalars['Float'];
  owner?: Maybe<Scalars['Boolean']>;
  owner_id: Scalars['String'];
  permissions?: Maybe<Scalars['String']>;
  preferred_locale: Scalars['String'];
  premium_subscription_count: Scalars['Float'];
  premium_tier: Scalars['Float'];
  roles: Array<Roles>;
  splash: Scalars['String'];
  stickers: Array<Sticker>;
  threads?: Maybe<Array<Channel>>;
  unavailable?: Maybe<Scalars['Boolean']>;
};

export type GuildConfig = {
  __typename?: 'GuildConfig';
  anime?: Maybe<Anime>;
  blacklistedWords?: Maybe<Array<Scalars['String']>>;
  customCommands?: Maybe<Array<CustomCommands>>;
  guildId: Scalars['String'];
  logs?: Maybe<Array<Logs>>;
  moderation?: Maybe<Moderation>;
  music?: Maybe<Music>;
  prefix?: Maybe<Scalars['String']>;
  premium?: Maybe<Scalars['Boolean']>;
};

export type GuildMember = {
  __typename?: 'GuildMember';
  avatar?: Maybe<Scalars['String']>;
  deaf: Scalars['Boolean'];
  joined_at: Scalars['String'];
  mute: Scalars['Boolean'];
  nick?: Maybe<Scalars['String']>;
  pending?: Maybe<Scalars['Boolean']>;
  premium_since?: Maybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
  user?: Maybe<User>;
};

export type Log = {
  action: Scalars['String'];
  name: Scalars['String'];
};

export type Logs = {
  __typename?: 'Logs';
  action: Scalars['String'];
  name: Scalars['String'];
};

export type Moderation = {
  __typename?: 'Moderation';
  autoMod?: Maybe<Scalars['Boolean']>;
  plugin?: Maybe<Scalars['Boolean']>;
};

export type Music = {
  __typename?: 'Music';
  channel?: Maybe<Scalars['String']>;
  immortal?: Maybe<Scalars['Boolean']>;
  plugin?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCustomCommand: GuildConfig;
  addLog: GuildConfig;
  updateAutoMod: GuildConfig;
  updateBlacklistedWords: GuildConfig;
  updateImmortality: GuildConfig;
  updateModerationPlugin: GuildConfig;
  updateMusicChannel: GuildConfig;
  updateMusicPlugin: GuildConfig;
  updatePrefix: GuildConfig;
};


export type MutationAddCustomCommandArgs = {
  addCustomCommand: AddCustomCommand;
};


export type MutationAddLogArgs = {
  addLog: AddLog;
};


export type MutationUpdateAutoModArgs = {
  updateAutoMod: UpdateAutoModInput;
};


export type MutationUpdateBlacklistedWordsArgs = {
  updateBlacklistedWords: UpdateBlacklistedWords;
};


export type MutationUpdateImmortalityArgs = {
  updateImmortality: UpdateMusicImmortality;
};


export type MutationUpdateModerationPluginArgs = {
  updateModerationPlugin: UpdateModerationPlugin;
};


export type MutationUpdateMusicChannelArgs = {
  updateMusicChannel: UpdateMusicChannel;
};


export type MutationUpdateMusicPluginArgs = {
  updateMusicPlugin: UpdateMusicPlugin;
};


export type MutationUpdatePrefixArgs = {
  updatePrefix: UpdatePrefixInput;
};

export type OverWrite = {
  __typename?: 'OverWrite';
  allow: Scalars['String'];
  deny: Scalars['String'];
  id: Scalars['String'];
  type: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  guildConfig: GuildConfig;
  guilds: Guild;
  ownerGuilds: Array<Guild>;
  user: UserObject;
};


export type QueryGuildConfigArgs = {
  guildId: Scalars['String'];
};


export type QueryGuildsArgs = {
  guildId: Scalars['String'];
};

export type RoleTags = {
  __typename?: 'RoleTags';
  bot_id?: Maybe<Scalars['String']>;
  integration_id?: Maybe<Scalars['String']>;
};

export type Roles = {
  __typename?: 'Roles';
  color: Scalars['Float'];
  hoist: Scalars['Boolean'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  managed: Scalars['Boolean'];
  mentionable: Scalars['Boolean'];
  name: Scalars['String'];
  permissions: Scalars['String'];
  position: Scalars['Float'];
  tags?: Maybe<RoleTags>;
  unicode_emoji?: Maybe<Scalars['String']>;
};

export type Sticker = {
  __typename?: 'Sticker';
  asset: Scalars['String'];
  available?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  format_type: Scalars['Float'];
  guild_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  pack_id?: Maybe<Scalars['String']>;
  sort_value?: Maybe<Scalars['Float']>;
  tags: Scalars['String'];
  type: Scalars['Float'];
  user?: Maybe<User>;
};

export type ThreadMember = {
  __typename?: 'ThreadMember';
  flags: Scalars['Float'];
  id?: Maybe<Scalars['String']>;
  join_timestamp: Scalars['String'];
  user_id?: Maybe<Scalars['String']>;
};

export type ThreadMetaData = {
  __typename?: 'ThreadMetaData';
  archive_timestamp: Scalars['String'];
  archived: Scalars['Boolean'];
  auto_archive_duration: Scalars['Float'];
  invitable?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
};

export type UpdateAutoModInput = {
  autoMod: Scalars['Boolean'];
  guildId: Scalars['String'];
};

export type UpdateBlacklistedWords = {
  blacklistedWords: Array<Scalars['String']>;
  guildId: Scalars['String'];
};

export type UpdateModerationPlugin = {
  guildId: Scalars['String'];
  plugin: Scalars['Boolean'];
};

export type UpdateMusicChannel = {
  channel: Scalars['String'];
  guildId: Scalars['String'];
};

export type UpdateMusicImmortality = {
  guildId: Scalars['String'];
  immortal: Scalars['Boolean'];
};

export type UpdateMusicPlugin = {
  guildId: Scalars['String'];
  plugin: Scalars['Boolean'];
};

export type UpdatePrefixInput = {
  guildId: Scalars['String'];
  prefix: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  accent_color?: Maybe<Scalars['Float']>;
  avatar: Scalars['String'];
  banner?: Maybe<Scalars['String']>;
  bot?: Maybe<Scalars['Boolean']>;
  discriminator: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  mfa_enabled?: Maybe<Scalars['Boolean']>;
  premium_type?: Maybe<Scalars['Float']>;
  public_flags?: Maybe<Scalars['Float']>;
  system?: Maybe<Scalars['Boolean']>;
  username: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
};

export type UserObject = {
  __typename?: 'UserObject';
  avatar?: Maybe<Scalars['String']>;
  discordId: Scalars['String'];
  discriminator: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
};

export type GetGuildConfigQueryVariables = Exact<{
  guildId: Scalars['String'];
}>;


export type GetGuildConfigQuery = { __typename?: 'Query', guildConfig: { __typename?: 'GuildConfig', guildId: string, prefix?: string | null, blacklistedWords?: Array<string> | null, premium?: boolean | null, moderation?: { __typename?: 'Moderation', autoMod?: boolean | null, plugin?: boolean | null } | null, customCommands?: Array<{ __typename?: 'CustomCommands', id: string, name: string, description: string }> | null, music?: { __typename?: 'Music', plugin?: boolean | null, channel?: string | null, immortal?: boolean | null } | null } };

export type GetOwnerGuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOwnerGuildsQuery = { __typename?: 'Query', ownerGuilds: Array<{ __typename?: 'Guild', id: string, name: string, icon?: string | null }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserObject', discriminator: string, discordId: string, username: string, email?: string | null, avatar?: string | null, locale?: string | null, verified?: boolean | null } };


export const GetGuildConfigDocument = gql`
    query GetGuildConfig($guildId: String!) {
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
  }
}
    `;

/**
 * __useGetGuildConfigQuery__
 *
 * To run a query within a React component, call `useGetGuildConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGuildConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGuildConfigQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGetGuildConfigQuery(baseOptions: Apollo.QueryHookOptions<GetGuildConfigQuery, GetGuildConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGuildConfigQuery, GetGuildConfigQueryVariables>(GetGuildConfigDocument, options);
      }
export function useGetGuildConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGuildConfigQuery, GetGuildConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGuildConfigQuery, GetGuildConfigQueryVariables>(GetGuildConfigDocument, options);
        }
export type GetGuildConfigQueryHookResult = ReturnType<typeof useGetGuildConfigQuery>;
export type GetGuildConfigLazyQueryHookResult = ReturnType<typeof useGetGuildConfigLazyQuery>;
export type GetGuildConfigQueryResult = Apollo.QueryResult<GetGuildConfigQuery, GetGuildConfigQueryVariables>;
export const GetOwnerGuildsDocument = gql`
    query GetOwnerGuilds {
  ownerGuilds {
    id
    name
    icon
  }
}
    `;

/**
 * __useGetOwnerGuildsQuery__
 *
 * To run a query within a React component, call `useGetOwnerGuildsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOwnerGuildsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOwnerGuildsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOwnerGuildsQuery(baseOptions?: Apollo.QueryHookOptions<GetOwnerGuildsQuery, GetOwnerGuildsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOwnerGuildsQuery, GetOwnerGuildsQueryVariables>(GetOwnerGuildsDocument, options);
      }
export function useGetOwnerGuildsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOwnerGuildsQuery, GetOwnerGuildsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOwnerGuildsQuery, GetOwnerGuildsQueryVariables>(GetOwnerGuildsDocument, options);
        }
export type GetOwnerGuildsQueryHookResult = ReturnType<typeof useGetOwnerGuildsQuery>;
export type GetOwnerGuildsLazyQueryHookResult = ReturnType<typeof useGetOwnerGuildsLazyQuery>;
export type GetOwnerGuildsQueryResult = Apollo.QueryResult<GetOwnerGuildsQuery, GetOwnerGuildsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  user {
    discriminator
    discordId
    username
    email
    avatar
    locale
    verified
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;