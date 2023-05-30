import Joi from '@hapi/joi'
import {status} from '../../constants/schemaDefaults'

const {ENABLED, DISABLED} = status

const mockStatusValidatorSchema = Joi.object().keys({
  mockStatus: Joi.string().valid(ENABLED, DISABLED).required(),
})

export default mockStatusValidatorSchema
