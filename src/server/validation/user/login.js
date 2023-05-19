import Joi from '@hapi/joi'

const loginValidatorSchema = Joi.object().keys({
  email: Joi.string().email({minDomainSegments: 2}),
  password: Joi.required(),
})

export default loginValidatorSchema
