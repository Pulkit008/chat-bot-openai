import '@core/declarations'
import { IBaseModel } from '@core/database'
import { Schema, model as Model } from 'mongoose'

export interface IChat extends IBaseModel {
  _user?: string
  query?: string
  response?: string
}

const schema = new Schema<IChat>(
  {
    _user: { type: String },
    query: { type: String },
    response: { type: String },

    // From Base Model
    isActive: { type: Boolean, default: true },
  },
  {
    autoIndex: true,
    versionKey: false,
    timestamps: true,
  }
)

// All Done
export const ChatModel = Model<IChat>('Chat', schema)
