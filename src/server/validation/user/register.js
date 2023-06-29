import Joi from '@hapi/joi'

const registerValidatorSchema = Joi.object().keys({
  email: Joi.string().email({minDomainSegments: 2}),
  password: Joi.string()
    .min(3)
    .max(30)
    .required(),
  name: Joi.string().required(),
})

export default registerValidatorSchema
