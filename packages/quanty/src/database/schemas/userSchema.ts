import { model, Schema } from 'mongoose'
import { userSchema, userModel, userDocument } from '../../types/mongoose.gen'

const schema: userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  pets: [
    {
      name: String,
      type: String,
    },
  ],
  premium: {
    type: Boolean,
    default: false,
  },
  premiumSince: String,
  language: {
    type: String,
    default: 'en-US',
  },
})

const User: userModel = model<userDocument, userModel>('user', schema)

export default User
