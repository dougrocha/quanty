import mongoose, { Schema } from 'mongoose'

export function getModelFromClass<T>(name: string, schema?: Schema) {
  return mongoose.model<T>(name, schema)
}
