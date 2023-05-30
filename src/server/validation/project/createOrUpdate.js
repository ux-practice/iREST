import Joi from '@hapi/joi'

const projectCreateValidatorSchema = Joi.object().keys({
  projectName: Joi.string()
    .regex(/^[a-z\d\-_\s]+$/i)
    .required(),
})

export default projectCreateValidatorSchema
