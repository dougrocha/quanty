import mongoose from 'mongoose'

import {
  guildsSchema,
  guildsModel,
  guildsDocument,
} from '../../types/mongoose.gen'

const { model, Schema } = mongoose

const schema: guildsSchema = new Schema(
  {
    guildId: {
      type: String,
      unique: true,
      required: [true, 'Guild id cannot be missing'],
    },
    prefix: {
      type: String,
      default: 'q!',
    },
    blacklistedWords: { type: [String], lowercase: true },
    music: {
      immortal: { type: Boolean, default: false },
      plugin: { type: Boolean, default: false },
      musicChannel: { type: String },
    },
    moderation: {
      autoMod: { type: Boolean, default: false },
      plugin: { type: Boolean, default: true },
    },
    anime: {
      nsfw: { type: Boolean, default: false },
      plugin: { type: Boolean, default: false },
    },
    ticketChannel: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
)

const Guild: guildsModel = model<guildsDocument, guildsModel>('guilds', schema)
export default Guild
