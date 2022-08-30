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

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
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
  recipients?: Maybe<Array<DiscordUser>>;
  rtc_region?: Maybe<Scalars['String']>;
  thread_metadata?: Maybe<ThreadMetaData>;
  topic?: Maybe<Scalars['String']>;
  user_limit?: Maybe<Scalars['Int']>;
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
  guildId: Scalars['String'];
  priceId: Scalars['String'];
  userId: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  _count: CustomerCount;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  subscription?: Maybe<Array<GuildSubscription>>;
  subscriptionId: Scalars['Boolean'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type CustomerCount = {
  __typename?: 'CustomerCount';
  subscription: Scalars['Int'];
};

export type CustomerCountAggregate = {
  __typename?: 'CustomerCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  email: Scalars['Int'];
  id: Scalars['Int'];
  subscriptionId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type CustomerCreateNestedOneWithoutSubscriptionInput = {
  connect?: InputMaybe<CustomerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CustomerCreateOrConnectWithoutSubscriptionInput>;
  create?: InputMaybe<CustomerCreateWithoutSubscriptionInput>;
};

export type CustomerCreateOrConnectWithoutSubscriptionInput = {
  create: CustomerCreateWithoutSubscriptionInput;
  where: CustomerWhereUniqueInput;
};

export type CustomerCreateWithoutSubscriptionInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  subscriptionId?: InputMaybe<Scalars['Boolean']>;
  user?: InputMaybe<UserCreateNestedOneWithoutCustomerInput>;
};

export type CustomerMaxAggregate = {
  __typename?: 'CustomerMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
};

export type CustomerMinAggregate = {
  __typename?: 'CustomerMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
};

export type CustomerUpdateOneRequiredWithoutSubscriptionNestedInput = {
  connect?: InputMaybe<CustomerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CustomerCreateOrConnectWithoutSubscriptionInput>;
  create?: InputMaybe<CustomerCreateWithoutSubscriptionInput>;
  update?: InputMaybe<CustomerUpdateWithoutSubscriptionInput>;
  upsert?: InputMaybe<CustomerUpsertWithoutSubscriptionInput>;
};

export type CustomerUpdateWithoutSubscriptionInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  subscriptionId?: InputMaybe<BoolFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutCustomerNestedInput>;
};

export type CustomerUpsertWithoutSubscriptionInput = {
  create: CustomerCreateWithoutSubscriptionInput;
  update: CustomerUpdateWithoutSubscriptionInput;
};

export type CustomerWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DiscordGuild = {
  __typename?: 'DiscordGuild';
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
  roles?: Maybe<Array<DiscordRoles>>;
  stickers?: Maybe<Array<Sticker>>;
  threads?: Maybe<Array<Channel>>;
  unavailable?: Maybe<Scalars['Boolean']>;
};

export type DiscordRoles = {
  __typename?: 'DiscordRoles';
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

export type DiscordUser = {
  __typename?: 'DiscordUser';
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

export type Emojis = {
  __typename?: 'Emojis';
  animated?: Maybe<Scalars['Boolean']>;
  available?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  managed?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  require_colons?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<Array<Scalars['String']>>;
  user?: Maybe<DiscordUser>;
};

export type EnumPriceTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<PriceType>;
};

export type EnumSubscription_StatusFieldUpdateOperationsInput = {
  set?: InputMaybe<Subscription_Status>;
};

export type Guild = {
  __typename?: 'Guild';
  guildPlugins?: Maybe<GuildPlugins>;
  guildSettings?: Maybe<GuildSettings>;
  id: Scalars['ID'];
  prefix: Scalars['String'];
  premium: Scalars['Boolean'];
  subscription?: Maybe<GuildSubscription>;
};

export type GuildCountAggregate = {
  __typename?: 'GuildCountAggregate';
  _all: Scalars['Int'];
  id: Scalars['Int'];
  prefix: Scalars['Int'];
  premium: Scalars['Int'];
};

export type GuildMaxAggregate = {
  __typename?: 'GuildMaxAggregate';
  id?: Maybe<Scalars['String']>;
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
  user?: Maybe<DiscordUser>;
};

export type GuildMinAggregate = {
  __typename?: 'GuildMinAggregate';
  id?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  premium?: Maybe<Scalars['Boolean']>;
};

export type GuildPlugins = {
  __typename?: 'GuildPlugins';
  anime: Scalars['Boolean'];
  autoMod: Scalars['Boolean'];
  guild: Guild;
  id: Scalars['ID'];
};

export type GuildPluginsCountAggregate = {
  __typename?: 'GuildPluginsCountAggregate';
  _all: Scalars['Int'];
  anime: Scalars['Int'];
  autoMod: Scalars['Int'];
  id: Scalars['Int'];
};

export type GuildPluginsCreateOrConnectWithoutGuildInput = {
  create: GuildPluginsCreateWithoutGuildInput;
  where: GuildPluginsWhereUniqueInput;
};

export type GuildPluginsCreateWithoutGuildInput = {
  anime?: InputMaybe<Scalars['Boolean']>;
  autoMod?: InputMaybe<Scalars['Boolean']>;
};

export type GuildPluginsMaxAggregate = {
  __typename?: 'GuildPluginsMaxAggregate';
  anime?: Maybe<Scalars['Boolean']>;
  autoMod?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
};

export type GuildPluginsMinAggregate = {
  __typename?: 'GuildPluginsMinAggregate';
  anime?: Maybe<Scalars['Boolean']>;
  autoMod?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
};

export type GuildPluginsUpdateOneWithoutGuildNestedInput = {
  connect?: InputMaybe<GuildPluginsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GuildPluginsCreateOrConnectWithoutGuildInput>;
  create?: InputMaybe<GuildPluginsCreateWithoutGuildInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<GuildPluginsUpdateWithoutGuildInput>;
  upsert?: InputMaybe<GuildPluginsUpsertWithoutGuildInput>;
};

export type GuildPluginsUpdateWithoutGuildInput = {
  anime?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoMod?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type GuildPluginsUpsertWithoutGuildInput = {
  create: GuildPluginsCreateWithoutGuildInput;
  update: GuildPluginsUpdateWithoutGuildInput;
};

export type GuildPluginsWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type GuildSettings = {
  __typename?: 'GuildSettings';
  defaultJoinRole: Scalars['String'];
  djRole: Scalars['String'];
  globalCooldown: Scalars['Int'];
  guild: Guild;
  id: Scalars['ID'];
  musicTimeOut: Scalars['Boolean'];
  nsfw: Scalars['Boolean'];
};

export type GuildSettingsAvgAggregate = {
  __typename?: 'GuildSettingsAvgAggregate';
  globalCooldown?: Maybe<Scalars['Float']>;
};

export type GuildSettingsCountAggregate = {
  __typename?: 'GuildSettingsCountAggregate';
  _all: Scalars['Int'];
  defaultJoinRole: Scalars['Int'];
  djRole: Scalars['Int'];
  globalCooldown: Scalars['Int'];
  id: Scalars['Int'];
  musicTimeOut: Scalars['Int'];
  nsfw: Scalars['Int'];
};

export type GuildSettingsCreateOrConnectWithoutGuildInput = {
  create: GuildSettingsCreateWithoutGuildInput;
  where: GuildSettingsWhereUniqueInput;
};

export type GuildSettingsCreateWithoutGuildInput = {
  defaultJoinRole?: InputMaybe<Scalars['String']>;
  djRole?: InputMaybe<Scalars['String']>;
  globalCooldown?: InputMaybe<Scalars['Int']>;
  musicTimeOut?: InputMaybe<Scalars['Boolean']>;
  nsfw?: InputMaybe<Scalars['Boolean']>;
};

export type GuildSettingsMaxAggregate = {
  __typename?: 'GuildSettingsMaxAggregate';
  defaultJoinRole?: Maybe<Scalars['String']>;
  djRole?: Maybe<Scalars['String']>;
  globalCooldown?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  musicTimeOut?: Maybe<Scalars['Boolean']>;
  nsfw?: Maybe<Scalars['Boolean']>;
};

export type GuildSettingsMinAggregate = {
  __typename?: 'GuildSettingsMinAggregate';
  defaultJoinRole?: Maybe<Scalars['String']>;
  djRole?: Maybe<Scalars['String']>;
  globalCooldown?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  musicTimeOut?: Maybe<Scalars['Boolean']>;
  nsfw?: Maybe<Scalars['Boolean']>;
};

export type GuildSettingsSumAggregate = {
  __typename?: 'GuildSettingsSumAggregate';
  globalCooldown?: Maybe<Scalars['Int']>;
};

export type GuildSettingsUpdateOneWithoutGuildNestedInput = {
  connect?: InputMaybe<GuildSettingsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GuildSettingsCreateOrConnectWithoutGuildInput>;
  create?: InputMaybe<GuildSettingsCreateWithoutGuildInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<GuildSettingsUpdateWithoutGuildInput>;
  upsert?: InputMaybe<GuildSettingsUpsertWithoutGuildInput>;
};

export type GuildSettingsUpdateWithoutGuildInput = {
  defaultJoinRole?: InputMaybe<StringFieldUpdateOperationsInput>;
  djRole?: InputMaybe<StringFieldUpdateOperationsInput>;
  globalCooldown?: InputMaybe<IntFieldUpdateOperationsInput>;
  musicTimeOut?: InputMaybe<BoolFieldUpdateOperationsInput>;
  nsfw?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type GuildSettingsUpsertWithoutGuildInput = {
  create: GuildSettingsCreateWithoutGuildInput;
  update: GuildSettingsUpdateWithoutGuildInput;
};

export type GuildSettingsWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type GuildSubscription = {
  __typename?: 'GuildSubscription';
  cancel_at_period_end: Scalars['Boolean'];
  current_period_end: Scalars['DateTime'];
  customer: Customer;
  customerId: Scalars['String'];
  guild: Guild;
  guildId: Scalars['String'];
  id: Scalars['ID'];
  price: Price;
  priceId: Scalars['String'];
  status: Subscription_Status;
};

export type GuildSubscriptionCountAggregate = {
  __typename?: 'GuildSubscriptionCountAggregate';
  _all: Scalars['Int'];
  cancel_at_period_end: Scalars['Int'];
  current_period_end: Scalars['Int'];
  customerId: Scalars['Int'];
  guildId: Scalars['Int'];
  id: Scalars['Int'];
  priceId: Scalars['Int'];
  status: Scalars['Int'];
};

export type GuildSubscriptionCreateOrConnectWithoutGuildInput = {
  create: GuildSubscriptionCreateWithoutGuildInput;
  where: GuildSubscriptionWhereUniqueInput;
};

export type GuildSubscriptionCreateWithoutGuildInput = {
  cancel_at_period_end?: InputMaybe<Scalars['Boolean']>;
  current_period_end: Scalars['DateTime'];
  customer: CustomerCreateNestedOneWithoutSubscriptionInput;
  id: Scalars['String'];
  price: PriceCreateNestedOneWithoutSubscriptionInput;
  status?: InputMaybe<Subscription_Status>;
};

export type GuildSubscriptionMaxAggregate = {
  __typename?: 'GuildSubscriptionMaxAggregate';
  cancel_at_period_end?: Maybe<Scalars['Boolean']>;
  current_period_end?: Maybe<Scalars['DateTime']>;
  customerId?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  priceId?: Maybe<Scalars['String']>;
  status?: Maybe<Subscription_Status>;
};

export type GuildSubscriptionMinAggregate = {
  __typename?: 'GuildSubscriptionMinAggregate';
  cancel_at_period_end?: Maybe<Scalars['Boolean']>;
  current_period_end?: Maybe<Scalars['DateTime']>;
  customerId?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  priceId?: Maybe<Scalars['String']>;
  status?: Maybe<Subscription_Status>;
};

export type GuildSubscriptionUpdateOneWithoutGuildNestedInput = {
  connect?: InputMaybe<GuildSubscriptionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GuildSubscriptionCreateOrConnectWithoutGuildInput>;
  create?: InputMaybe<GuildSubscriptionCreateWithoutGuildInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<GuildSubscriptionUpdateWithoutGuildInput>;
  upsert?: InputMaybe<GuildSubscriptionUpsertWithoutGuildInput>;
};

export type GuildSubscriptionUpdateWithoutGuildInput = {
  cancel_at_period_end?: InputMaybe<BoolFieldUpdateOperationsInput>;
  current_period_end?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  customer?: InputMaybe<CustomerUpdateOneRequiredWithoutSubscriptionNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  price?: InputMaybe<PriceUpdateOneRequiredWithoutSubscriptionNestedInput>;
  status?: InputMaybe<EnumSubscription_StatusFieldUpdateOperationsInput>;
};

export type GuildSubscriptionUpsertWithoutGuildInput = {
  create: GuildSubscriptionCreateWithoutGuildInput;
  update: GuildSubscriptionUpdateWithoutGuildInput;
};

export type GuildSubscriptionWhereUniqueInput = {
  guildId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type GuildUpdateInput = {
  guildPlugins?: InputMaybe<GuildPluginsUpdateOneWithoutGuildNestedInput>;
  guildSettings?: InputMaybe<GuildSettingsUpdateOneWithoutGuildNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  prefix?: InputMaybe<StringFieldUpdateOperationsInput>;
  premium?: InputMaybe<BoolFieldUpdateOperationsInput>;
  subscription?: InputMaybe<GuildSubscriptionUpdateOneWithoutGuildNestedInput>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCreditCard: CreatePaymentMethod;
  cancelSubscription: CancelSubscription;
  createSubscription: CreateSubscription;
  updateGuildById: Guild;
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


export type MutationUpdateGuildByIdArgs = {
  guildId: Scalars['String'];
  guildUpdateInput: GuildUpdateInput;
};

/** Mutual Guilds. Guilds that a user can edit */
export type MutualGuild = {
  __typename?: 'MutualGuild';
  bot: Scalars['Boolean'];
  botMaster: Scalars['Boolean'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  owner: Scalars['Boolean'];
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type OverWrite = {
  __typename?: 'OverWrite';
  allow: Scalars['String'];
  deny: Scalars['String'];
  id: Scalars['String'];
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

export type Price = {
  __typename?: 'Price';
  _count: PriceCount;
  currency: Scalars['String'];
  id: Scalars['ID'];
  product: Product;
  productId: Scalars['String'];
  recurringInterval?: Maybe<Scalars['String']>;
  subscription?: Maybe<Array<GuildSubscription>>;
  type: PriceType;
  unit_amount: Scalars['Int'];
};

export type PriceAvgAggregate = {
  __typename?: 'PriceAvgAggregate';
  unit_amount?: Maybe<Scalars['Float']>;
};

export type PriceCount = {
  __typename?: 'PriceCount';
  subscription: Scalars['Int'];
};

export type PriceCountAggregate = {
  __typename?: 'PriceCountAggregate';
  _all: Scalars['Int'];
  currency: Scalars['Int'];
  id: Scalars['Int'];
  productId: Scalars['Int'];
  recurringInterval: Scalars['Int'];
  type: Scalars['Int'];
  unit_amount: Scalars['Int'];
};

export type PriceCreateNestedOneWithoutSubscriptionInput = {
  connect?: InputMaybe<PriceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PriceCreateOrConnectWithoutSubscriptionInput>;
  create?: InputMaybe<PriceCreateWithoutSubscriptionInput>;
};

export type PriceCreateOrConnectWithoutSubscriptionInput = {
  create: PriceCreateWithoutSubscriptionInput;
  where: PriceWhereUniqueInput;
};

export type PriceCreateWithoutSubscriptionInput = {
  currency: Scalars['String'];
  id: Scalars['String'];
  product: ProductCreateNestedOneWithoutPriceInput;
  recurringInterval?: InputMaybe<Scalars['String']>;
  type: PriceType;
  unit_amount: Scalars['Int'];
};

export type PriceMaxAggregate = {
  __typename?: 'PriceMaxAggregate';
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  recurringInterval?: Maybe<Scalars['String']>;
  type?: Maybe<PriceType>;
  unit_amount?: Maybe<Scalars['Int']>;
};

export type PriceMinAggregate = {
  __typename?: 'PriceMinAggregate';
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  recurringInterval?: Maybe<Scalars['String']>;
  type?: Maybe<PriceType>;
  unit_amount?: Maybe<Scalars['Int']>;
};

export type PriceSumAggregate = {
  __typename?: 'PriceSumAggregate';
  unit_amount?: Maybe<Scalars['Int']>;
};

export enum PriceType {
  OneTime = 'ONE_TIME',
  Recurring = 'RECURRING'
}

export type PriceUpdateOneRequiredWithoutSubscriptionNestedInput = {
  connect?: InputMaybe<PriceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PriceCreateOrConnectWithoutSubscriptionInput>;
  create?: InputMaybe<PriceCreateWithoutSubscriptionInput>;
  update?: InputMaybe<PriceUpdateWithoutSubscriptionInput>;
  upsert?: InputMaybe<PriceUpsertWithoutSubscriptionInput>;
};

export type PriceUpdateWithoutSubscriptionInput = {
  currency?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  product?: InputMaybe<ProductUpdateOneRequiredWithoutPriceNestedInput>;
  recurringInterval?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumPriceTypeFieldUpdateOperationsInput>;
  unit_amount?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type PriceUpsertWithoutSubscriptionInput = {
  create: PriceCreateWithoutSubscriptionInput;
  update: PriceUpdateWithoutSubscriptionInput;
};

export type PriceWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  _count: ProductCount;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  price?: Maybe<Array<Price>>;
};

export type ProductCount = {
  __typename?: 'ProductCount';
  price: Scalars['Int'];
};

export type ProductCountAggregate = {
  __typename?: 'ProductCountAggregate';
  _all: Scalars['Int'];
  description: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
};

export type ProductCreateNestedOneWithoutPriceInput = {
  connect?: InputMaybe<ProductWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProductCreateOrConnectWithoutPriceInput>;
  create?: InputMaybe<ProductCreateWithoutPriceInput>;
};

export type ProductCreateOrConnectWithoutPriceInput = {
  create: ProductCreateWithoutPriceInput;
  where: ProductWhereUniqueInput;
};

export type ProductCreateWithoutPriceInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ProductMaxAggregate = {
  __typename?: 'ProductMaxAggregate';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ProductMinAggregate = {
  __typename?: 'ProductMinAggregate';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ProductUpdateOneRequiredWithoutPriceNestedInput = {
  connect?: InputMaybe<ProductWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProductCreateOrConnectWithoutPriceInput>;
  create?: InputMaybe<ProductCreateWithoutPriceInput>;
  update?: InputMaybe<ProductUpdateWithoutPriceInput>;
  upsert?: InputMaybe<ProductUpsertWithoutPriceInput>;
};

export type ProductUpdateWithoutPriceInput = {
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ProductUpsertWithoutPriceInput = {
  create: ProductCreateWithoutPriceInput;
  update: ProductUpdateWithoutPriceInput;
};

export type ProductWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getPaymentMethods?: Maybe<Array<PaymentMethod>>;
  guildConfig: Guild;
  guilds: DiscordGuild;
  /** Returns the user that is logged in the session */
  me?: Maybe<User>;
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
  user?: Maybe<DiscordUser>;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  updatedGuildConfig: Guild;
};


export type SubscriptionUpdatedGuildConfigArgs = {
  id: Scalars['String'];
};

export enum Subscription_Status {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Incomplete = 'INCOMPLETE'
}

export type ThreadMember = {
  __typename?: 'ThreadMember';
  id?: Maybe<Scalars['String']>;
  join_timestamp: Scalars['String'];
  user_id?: Maybe<Scalars['String']>;
};

export type ThreadMetaData = {
  __typename?: 'ThreadMetaData';
  archive_timestamp: Scalars['String'];
  archived: Scalars['Boolean'];
  invitable?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  acceptedTermsAndConditions: Scalars['Boolean'];
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  customer?: Maybe<Customer>;
  discriminator: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int'];
  acceptedTermsAndConditions: Scalars['Int'];
  avatar: Scalars['Int'];
  createdAt: Scalars['Int'];
  discriminator: Scalars['Int'];
  email: Scalars['Int'];
  id: Scalars['Int'];
  locale: Scalars['Int'];
  username: Scalars['Int'];
};

export type UserCreateNestedOneWithoutCustomerInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCustomerInput>;
  create?: InputMaybe<UserCreateWithoutCustomerInput>;
};

export type UserCreateOrConnectWithoutCustomerInput = {
  create: UserCreateWithoutCustomerInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutCustomerInput = {
  acceptedTermsAndConditions?: InputMaybe<Scalars['Boolean']>;
  accessToken?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  discriminator: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  acceptedTermsAndConditions?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discriminator?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  acceptedTermsAndConditions?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discriminator?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserSessionCountAggregate = {
  __typename?: 'UserSessionCountAggregate';
  _all: Scalars['Int'];
  data: Scalars['Int'];
  expiresAt: Scalars['Int'];
  id: Scalars['Int'];
  sid: Scalars['Int'];
};

export type UserSessionMaxAggregate = {
  __typename?: 'UserSessionMaxAggregate';
  data?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  sid?: Maybe<Scalars['String']>;
};

export type UserSessionMinAggregate = {
  __typename?: 'UserSessionMinAggregate';
  data?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  sid?: Maybe<Scalars['String']>;
};

export type UserUpdateOneWithoutCustomerNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCustomerInput>;
  create?: InputMaybe<UserCreateWithoutCustomerInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutCustomerInput>;
  upsert?: InputMaybe<UserUpsertWithoutCustomerInput>;
};

export type UserUpdateWithoutCustomerInput = {
  acceptedTermsAndConditions?: InputMaybe<BoolFieldUpdateOperationsInput>;
  accessToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  discriminator?: InputMaybe<StringFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  locale?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  refreshToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpsertWithoutCustomerInput = {
  create: UserCreateWithoutCustomerInput;
  update: UserUpdateWithoutCustomerInput;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type CreateGuildSubscriptionMutationVariables = Exact<{
  newSubscriptionParams: CreateSubscriptionInput;
}>;


export type CreateGuildSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'CreateSubscription', clientSecret: string, subscriptionId: string } };

export type GetCustomerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerQuery = { __typename?: 'Query', me?: { __typename?: 'User', customer?: { __typename?: 'Customer', id: string } | null } | null };

export type GetGuildConfigQueryVariables = Exact<{
  guildId: Scalars['String'];
}>;


export type GetGuildConfigQuery = { __typename?: 'Query', guildConfig: { __typename?: 'Guild', id: string, prefix: string, premium: boolean, guildSettings?: { __typename?: 'GuildSettings', defaultJoinRole: string, djRole: string, globalCooldown: number, nsfw: boolean, musicTimeOut: boolean, id: string } | null, guildPlugins?: { __typename?: 'GuildPlugins', anime: boolean, autoMod: boolean, id: string } | null } };

export type GetMutualGuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMutualGuildsQuery = { __typename?: 'Query', mutualGuilds: Array<{ __typename?: 'MutualGuild', id: string, name: string, icon?: string | null, bot: boolean, owner: boolean }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, discriminator: string, username: string, email?: string | null, avatar?: string | null, locale?: string | null } | null };

export type GuildConfigSubscriptionVariables = Exact<{
  guildId: Scalars['String'];
}>;


export type GuildConfigSubscription = { __typename?: 'Subscription', updatedGuildConfig: { __typename?: 'Guild', id: string, prefix: string, premium: boolean, guildSettings?: { __typename?: 'GuildSettings', defaultJoinRole: string, djRole: string, globalCooldown: number, nsfw: boolean, musicTimeOut: boolean, id: string } | null, guildPlugins?: { __typename?: 'GuildPlugins', anime: boolean, autoMod: boolean, id: string } | null } };

export type UpdateGuildByIdMutationVariables = Exact<{
  guildId: Scalars['String'];
  guildUpdateInput: GuildUpdateInput;
}>;


export type UpdateGuildByIdMutation = { __typename?: 'Mutation', updateGuildById: { __typename?: 'Guild', id: string, prefix: string, premium: boolean, guildPlugins?: { __typename?: 'GuildPlugins', anime: boolean, autoMod: boolean } | null } };


export const CreateGuildSubscriptionDocument = gql`
    mutation createGuildSubscription($newSubscriptionParams: CreateSubscriptionInput!) {
  createSubscription(newSubscriptionParams: $newSubscriptionParams) {
    clientSecret
    subscriptionId
  }
}
    `;
export type CreateGuildSubscriptionMutationFn = Apollo.MutationFunction<CreateGuildSubscriptionMutation, CreateGuildSubscriptionMutationVariables>;

/**
 * __useCreateGuildSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateGuildSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuildSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuildSubscriptionMutation, { data, loading, error }] = useCreateGuildSubscriptionMutation({
 *   variables: {
 *      newSubscriptionParams: // value for 'newSubscriptionParams'
 *   },
 * });
 */
export function useCreateGuildSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateGuildSubscriptionMutation, CreateGuildSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGuildSubscriptionMutation, CreateGuildSubscriptionMutationVariables>(CreateGuildSubscriptionDocument, options);
      }
export type CreateGuildSubscriptionMutationHookResult = ReturnType<typeof useCreateGuildSubscriptionMutation>;
export type CreateGuildSubscriptionMutationResult = Apollo.MutationResult<CreateGuildSubscriptionMutation>;
export type CreateGuildSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateGuildSubscriptionMutation, CreateGuildSubscriptionMutationVariables>;
export const GetCustomerDocument = gql`
    query GetCustomer {
  me {
    customer {
      id
    }
  }
}
    `;

/**
 * __useGetCustomerQuery__
 *
 * To run a query within a React component, call `useGetCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
      }
export function useGetCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
        }
export type GetCustomerQueryHookResult = ReturnType<typeof useGetCustomerQuery>;
export type GetCustomerLazyQueryHookResult = ReturnType<typeof useGetCustomerLazyQuery>;
export type GetCustomerQueryResult = Apollo.QueryResult<GetCustomerQuery, GetCustomerQueryVariables>;
export const GetGuildConfigDocument = gql`
    query GetGuildConfig($guildId: String!) {
  guildConfig(guildId: $guildId) {
    id
    prefix
    premium
    guildSettings {
      defaultJoinRole
      djRole
      globalCooldown
      nsfw
      musicTimeOut
      id
    }
    guildPlugins {
      anime
      autoMod
      id
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
export const GetMutualGuildsDocument = gql`
    query GetMutualGuilds {
  mutualGuilds {
    id
    name
    icon
    bot
    owner
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
    id
    discriminator
    username
    email
    avatar
    locale
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
export const GuildConfigDocument = gql`
    subscription guildConfig($guildId: String!) {
  updatedGuildConfig(id: $guildId) {
    id
    prefix
    premium
    guildSettings {
      defaultJoinRole
      djRole
      globalCooldown
      nsfw
      musicTimeOut
      id
    }
    guildPlugins {
      anime
      autoMod
      id
    }
  }
}
    `;

/**
 * __useGuildConfigSubscription__
 *
 * To run a query within a React component, call `useGuildConfigSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGuildConfigSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildConfigSubscription({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildConfigSubscription(baseOptions: Apollo.SubscriptionHookOptions<GuildConfigSubscription, GuildConfigSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GuildConfigSubscription, GuildConfigSubscriptionVariables>(GuildConfigDocument, options);
      }
export type GuildConfigSubscriptionHookResult = ReturnType<typeof useGuildConfigSubscription>;
export type GuildConfigSubscriptionResult = Apollo.SubscriptionResult<GuildConfigSubscription>;
export const UpdateGuildByIdDocument = gql`
    mutation updateGuildById($guildId: String!, $guildUpdateInput: GuildUpdateInput!) {
  updateGuildById(guildId: $guildId, guildUpdateInput: $guildUpdateInput) {
    id
    prefix
    premium
    guildPlugins {
      anime
      autoMod
    }
  }
}
    `;
export type UpdateGuildByIdMutationFn = Apollo.MutationFunction<UpdateGuildByIdMutation, UpdateGuildByIdMutationVariables>;

/**
 * __useUpdateGuildByIdMutation__
 *
 * To run a mutation, you first call `useUpdateGuildByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGuildByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGuildByIdMutation, { data, loading, error }] = useUpdateGuildByIdMutation({
 *   variables: {
 *      guildId: // value for 'guildId'
 *      guildUpdateInput: // value for 'guildUpdateInput'
 *   },
 * });
 */
export function useUpdateGuildByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGuildByIdMutation, UpdateGuildByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGuildByIdMutation, UpdateGuildByIdMutationVariables>(UpdateGuildByIdDocument, options);
      }
export type UpdateGuildByIdMutationHookResult = ReturnType<typeof useUpdateGuildByIdMutation>;
export type UpdateGuildByIdMutationResult = Apollo.MutationResult<UpdateGuildByIdMutation>;
export type UpdateGuildByIdMutationOptions = Apollo.BaseMutationOptions<UpdateGuildByIdMutation, UpdateGuildByIdMutationVariables>;