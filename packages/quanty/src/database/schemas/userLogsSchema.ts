import { model, Schema } from 'mongoose'
import {
  userLogsDocument,
  userLogsModel,
  userLogsSchema,
} from '../../types/mongoose.gen'

const schema: userLogsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    require: true,
  },
  infractions: {
    type: Number,
    default: 0,
  },
  warnings: [
    {
      moderator: String,
      reason: String,
      issueDate: Date,
    },
  ],
})

const UserLogs: userLogsModel = model<userLogsDocument, userLogsModel>(
  'userLogs',
  schema,
)

export default UserLogs
