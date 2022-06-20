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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AddCreditCardInput = {
  customerId: Scalars['String'];
  paymentMethodId: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Address line 1 (e.g., street, PO Box, or company name). */
  line1?: Maybe<Scalars['String']>;
  /** Address line 2 (e.g., apartment, suite, unit, or building). */
  line2?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type BillingDetails = {
  __typename?: 'BillingDetails';
  address: Address;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** Billing phone number (include extensions) */
  phone?: Maybe<Scalars['String']>;
};

export type CancelSubscription = {
  __typename?: 'CancelSubscription';
  status: Scalars['String'];
  subscriptionId: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  brand: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  exp_month: Scalars['Float'];
  exp_year: Scalars['Float'];
  /** Card funding type. Can be credit, debit, prepaid, or unknown. */
  funding: Scalars['String'];
  last4: Scalars['String'];
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

export type CreatePaymentMethod = {
  __typename?: 'CreatePaymentMethod';
  clientSecret: Scalars['String'];
  status: Scalars['String'];
};

export type CreateSubscription = {
  __typename?: 'CreateSubscription';
  clientSecret: Scalars['String'];
  subscriptionId: Scalars['String'];
};

export type CreateSubscriptionInput = {
  customerId: Scalars['String'];
  priceId: Scalars['String'];
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
  afk_timeout?: Maybe<Scalars['Int']>;
  bot?: Maybe<Scalars['Boolean']>;
  channels?: Maybe<Array<Channel>>;
  description?: Maybe<Scalars['String']>;
  emojis?: Maybe<Array<Emojis>>;
  features?: Maybe<Array<Scalars['String']>>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  member_count?: Maybe<Scalars['Float']>;
  members?: Maybe<GuildMember>;
  name: Scalars['String'];
  nsfw_level?: Maybe<Scalars['Float']>;
  owner?: Maybe<Scalars['Boolean']>;
  owner_id: Scalars['String'];
  permissions?: Maybe<Scalars['String']>;
  preferred_locale?: Maybe<Scalars['String']>;
  premium_tier?: Maybe<Scalars['Float']>;
  roles?: Maybe<Array<Roles>>;
  stickers?: Maybe<Array<Sticker>>;
  threads?: Maybe<Array<Channel>>;
  unavailable?: Maybe<Scalars['Boolean']>;
};

export type GuildBanLogs = {
  __typename?: 'GuildBanLogs';
  bannedUser: LoggedUser;
  guildId: Scalars['String'];
  issuedBy: LoggedUser;
  issuedOn: Scalars['DateTime'];
  reason: Scalars['String'];
};

export type GuildLogs = {
  __typename?: 'GuildLogs';
  action: Scalars['String'];
  guildId: Scalars['String'];
  user: LoggedUser;
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

export type GuildPlugins = {
  __typename?: 'GuildPlugins';
  autoMod?: Maybe<Scalars['Boolean']>;
  blacklistedWords?: Maybe<Array<Scalars['String']>>;
  channel?: Maybe<Scalars['String']>;
  defaultGlobalCooldown?: Maybe<Scalars['Float']>;
  djRole?: Maybe<Scalars['String']>;
  guildId: Scalars['String'];
  immortal?: Maybe<Scalars['Boolean']>;
  nsfw?: Maybe<Scalars['Boolean']>;
  plugins?: Maybe<Array<Scalars['String']>>;
  ticketCategory?: Maybe<Scalars['String']>;
  ticketTranscriptChannel?: Maybe<Scalars['String']>;
};

export type GuildTickets = {
  __typename?: 'GuildTickets';
  channelId: Scalars['String'];
  closed: Scalars['Boolean'];
  guildId: Scalars['String'];
  locked: Scalars['Boolean'];
  memberId: Scalars['String'];
  ticketId: Scalars['String'];
  type: Scalars['String'];
};

/** Guild Config for Quantum Bot Users */
export type Guilds = {
  __typename?: 'Guilds';
  banLogs?: Maybe<Array<GuildBanLogs>>;
  defaultJoinRole?: Maybe<Scalars['String']>;
  guildId: Scalars['String'];
  logChannel?: Maybe<Scalars['String']>;
  logs?: Maybe<Array<GuildLogs>>;
  maxTickets?: Maybe<Scalars['Float']>;
  plugins?: Maybe<GuildPlugins>;
  prefix?: Maybe<Scalars['String']>;
  premium?: Maybe<PremiumTiers>;
  /** Current provider for guild's premium status */
  premiumProvider?: Maybe<Scalars['String']>;
  tickets?: Maybe<Array<GuildTickets>>;
};

export type LoggedUser = {
  __typename?: 'LoggedUser';
  discriminator: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCreditCard: CreatePaymentMethod;
  cancelSubscription: CancelSubscription;
  createSubscription: CreateSubscription;
};


export type MutationAddCreditCardArgs = {
  createCardData: AddCreditCardInput;
};


export type MutationCancelSubscriptionArgs = {
  subscriptionId: Scalars['String'];
};


export type MutationCreateSubscriptionArgs = {
  newSubscriptionParams: CreateSubscriptionInput;
};

/** Mutual Guilds. Guilds that a user can edit */
export type MutualGuild = {
  __typename?: 'MutualGuild';
  bot: Scalars['Boolean'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type OverWrite = {
  __typename?: 'OverWrite';
  allow: Scalars['String'];
  deny: Scalars['String'];
  id: Scalars['String'];
  type: Scalars['Float'];
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  /** Billing information associated with the PaymentMethod that may be used or request by certain payment methods */
  billingDetails: BillingDetails;
  card: Card;
  /** Customer Id */
  customerId: Scalars['String'];
  id: Scalars['String'];
};

/** Premium tiers with for Quanty Bot */
export enum PremiumTiers {
  /** The free tier */
  Free = 'FREE',
  /** The premium tier */
  Quantum = 'QUANTUM'
}

export type Query = {
  __typename?: 'Query';
  getPaymentMethods?: Maybe<Array<PaymentMethod>>;
  guildConfig: Guilds;
  guilds: Guild;
  /** Returns the user that is logged in the session */
  me?: Maybe<Users>;
  /** Gets the available guilds that the user can edit. */
  mutualGuilds: Array<MutualGuild>;
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

/** Returns the logged in user */
export type Users = {
  __typename?: 'Users';
  avatar: Scalars['String'];
  billingAddress?: Maybe<Scalars['String']>;
  discordId: Scalars['String'];
  discriminator: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  stripeId?: Maybe<Scalars['String']>;
  subscriptionStatus?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type CreateSubscriptionMutationVariables = Exact<{
  newSubscriptionParams: CreateSubscriptionInput;
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'CreateSubscription', clientSecret: string, subscriptionId: string } };

export type GetGuildConfigQueryVariables = Exact<{
  guildId: Scalars['String'];
}>;


export type GetGuildConfigQuery = { __typename?: 'Query', guildConfig: { __typename?: 'Guilds', guildId: string, prefix?: string | null } };

export type GetMutualGuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMutualGuildsQuery = { __typename?: 'Query', mutualGuilds: Array<{ __typename?: 'MutualGuild', id: string, name: string, icon?: string | null, bot: boolean }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', me?: { __typename?: 'Users', discriminator: string, discordId: string, username: string, email?: string | null, avatar: string, locale?: string | null, verified: boolean, stripeId?: string | null } | null };


export const CreateSubscriptionDocument = gql`
    mutation createSubscription($newSubscriptionParams: CreateSubscriptionInput!) {
  createSubscription(newSubscriptionParams: $newSubscriptionParams) {
    clientSecret
    subscriptionId
  }
}
    `;
export type CreateSubscriptionMutationFn = Apollo.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      newSubscriptionParams: // value for 'newSubscriptionParams'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, options);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = Apollo.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const GetGuildConfigDocument = gql`
    query GetGuildConfig($guildId: String!) {
  guildConfig(guildId: $guildId) {
    guildId
    prefix
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
export const GetMutualGuildsDocument = gql`
    query GetMutualGuilds {
  mutualGuilds {
    id
    name
    icon
    bot
  }
}
    `;

/**
 * __useGetMutualGuildsQuery__
 *
 * To run a query within a React component, call `useGetMutualGuildsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMutualGuildsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMutualGuildsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMutualGuildsQuery(baseOptions?: Apollo.QueryHookOptions<GetMutualGuildsQuery, GetMutualGuildsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMutualGuildsQuery, GetMutualGuildsQueryVariables>(GetMutualGuildsDocument, options);
      }
export function useGetMutualGuildsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMutualGuildsQuery, GetMutualGuildsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMutualGuildsQuery, GetMutualGuildsQueryVariables>(GetMutualGuildsDocument, options);
        }
export type GetMutualGuildsQueryHookResult = ReturnType<typeof useGetMutualGuildsQuery>;
export type GetMutualGuildsLazyQueryHookResult = ReturnType<typeof useGetMutualGuildsLazyQuery>;
export type GetMutualGuildsQueryResult = Apollo.QueryResult<GetMutualGuildsQuery, GetMutualGuildsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  me {
    discriminator
    discordId
    username
    email
    avatar
    locale
    verified
    stripeId
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