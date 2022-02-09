import { ModelOptions, Prop, Ref, getModelForClass } from '@typegoose/typegoose'

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Guild {}

const GuildModel = getModelForClass<typeof Guild>(Guild)
export default GuildModel
