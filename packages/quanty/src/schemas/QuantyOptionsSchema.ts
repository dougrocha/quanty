import Joi from 'joi'

const quantyDefaultCommandsSchema = Joi.object({
  ping: Joi.boolean().optional(),
  help: Joi.boolean().optional(),
})
const quantyDefaultEventsSchema = Joi.object({
  interaction: Joi.boolean().optional(),
  ready: Joi.boolean().optional(),
})

const quantyDefaultsSchema = Joi.object({
  commands: Joi.alternatives()
    .try(Joi.boolean(), quantyDefaultCommandsSchema)
    .optional(),

  events: Joi.alternatives()
    .try(Joi.boolean(), quantyDefaultEventsSchema)
    .optional(),
})

const defaultSchema = Joi.alternatives().try(
  Joi.boolean(),
  quantyDefaultsSchema,
)

export const QuantyOptionsSchema = Joi.object({
  owner: Joi.alternatives()
    .try(Joi.array().items(Joi.string()), Joi.string())
    .required(),

  prefix: Joi.string().lowercase().default('q!'),
  mentionPrefix: Joi.boolean().default(true),

  baseDir: Joi.string().default('src/'),
  commandDir: Joi.string().default('commands/'),
  eventDir: Joi.string().default('events/'),
  outDir: Joi.string().default('dist/'),

  defaults: defaultSchema.default(true),

  devGuilds: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string(),
  ),

  commandNotFoundError: Joi.string(),
  rateLimitExceededError: Joi.string(),

  logLevel: Joi.string().valid('DEBUG', 'ALL', 'WARN', 'ERROR').default('ALL'),
}).meta({ className: 'QuantyOptions' })
