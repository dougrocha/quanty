import Joi from 'joi'

export const prefixSchema = Joi.object({
  prefix: Joi.string().required().min(1).max(5).messages({
    'string.min': 'Prefix cannot be empty.',
    'string.max': 'Prefix cannot exceed 5 characters.',
    'string.empty': 'Prefix is required.',
  }),
})
