import { model, Schema } from 'mongoose'
import {
  userGuildDocument,
  userGuildModel,
  userGuildSchema,
} from '../../types/mongoose.gen'

const schema: userGuildSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  inventory: [
    {
      name: String,
      price: Number,
      rarity: String,
    },
  ],
  wallet: {
    type: Number,
    default: 1000,
  },
  bank: {
    type: Number,
    default: 0,
  },
  job: {
    type: String,
    default: 'none',
  },
  level: {
    type: Number,
    default: 1,
  },
})

const UserGuild: userGuildModel = model<userGuildDocument, userGuildModel>(
  'userGuild',
  schema,
)

export default UserGuild
