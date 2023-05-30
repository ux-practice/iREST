import {generateFakerData} from '../../../helpers/util'
import sizeof from '../../../helpers/sizeof'
import {getBulkCount, getBulkSize, getDynamicCount, getDynamicSize} from '../../../helpers/responseHelper'
import logger from '../../../logger'
import {serverErrorMessage} from '../../../constants/messages'

const {faker} = require('@faker-js/faker')

export default function collectResponse(req, res) {
  getBulkResponse(req, res)
}

export function findAndReplace(req, res, obj, specificKey) {
  const elm = obj[specificKey]
  let specificKeyValue
  if (Array.isArray(elm) || (elm.constructor !== Object && elm.includes("custom.Array"))) {
    specificKeyValue = []
    if (req.requestData.dataCount) {
      const dynamicData = req.mockData.dynamicResponseRandom
        ? faker.lorem.sentences()
        : req.requestData.dynamicData
      if (getDynamicCount(req) === 1) {
        specificKeyValue = dynamicData
      } else {
        for (let i = 1; i <= getDynamicCount(req); i++) {
          specificKeyValue.push(dynamicData)
        }
      }
      
    }
    if (req.requestData.dataSize) {
      const dataSizeBytes = getDynamicSize(req) * 1024
      let dataSize = 0
      const dynamicData = req.mockData.dynamicResponseRandom
        ? faker.lorem.sentences()
        : req.requestData.dynamicData
      while (dataSize < dataSizeBytes) {
        specificKeyValue.push(dynamicData)
        dataSize = sizeof(specificKeyValue)
      }
    }
  } else if (typeof elm === 'object' && elm.constructor === Object || elm.includes('custom.Object')) {
    specificKeyValue = {}
    if (req.requestData.dataCount) {
      const dynamicData = req.mockData.dynamicResponseRandom
        ? faker.lorem.sentences()
        : req.requestData.dynamicData
      for (let i = 0; i <= getDynamicCount(req)-1; i++) {
        specificKeyValue = Object.assign(specificKeyValue, {[i]: dynamicData})
      }
    }
    if (req.requestData.dataSize) {
      const dataSizeBytes = getDynamicSize(req) * 1024
      let dataSize = 0
      let i = 0
      const dynamicData = req.mockData.dynamicResponseRandom
        ? faker.lorem.sentences()
        : req.requestData.dynamicData
      while (dataSize < dataSizeBytes) {
        specificKeyValue = Object.assign(specificKeyValue, {[i]: dynamicData})
        dataSize = sizeof(specificKeyValue)
        i += 1
      }
    }
  } else {
    specificKeyValue = ''
    if (req.requestData.dataCount) {
      const dynamicData = req.mockData.dynamicResponseRandom
        ? faker.lorem.sentences()
        : JSON.stringify(req.requestData.dynamicData).replace(/(["'])/g, "")
      for (let i = 1; i <= getDynamicCount(req); i++) {
        specificKeyValue = String.prototype.concat.call(specificKeyValue, dynamicData)
      }
    }
    if (req.requestData.dataSize) {
      const dataSizeBytes = getDynamicSize(req) * 1024
      let dataSize = 0
      const dynamicData = req.mockData.dynamicResponseRandom
        ? faker.lorem.sentences()
        : JSON.stringify(req.requestData.dynamicData).replace(/(["'])/g, "")
      while (dataSize < dataSizeBytes) {
        specificKeyValue = String.prototype.concat.call(specificKeyValue, dynamicData)
        dataSize = sizeof(specificKeyValue)
      }
    }
  }

  // eslint-disable-next-line no-param-reassign
  obj[specificKey] = specificKeyValue

  return req.requestData.inputData
}

export function findInObject(req, res, el, key, specificKey, index) {
  if (Object.keys(el).length !== 0) {
    composeResponse(req, res, el, specificKey, index)
  }
}

export function findInArray(req, res, el, key, specificKey, index) {
  if (el.length !== 0) {
    for (let j = 0; j < el.length; j++) {
      const elm = el[j]
      if (typeof elm === 'object' && elm.constructor === Array) {
        findInArray(req, res, elm, key, specificKey, index)
      }
      if (typeof elm === 'object' && elm.constructor === Object) {
        composeResponse(req, res, elm, specificKey, index)
      }
    }
  }
}

export function composeResponse(req, res, obj, specificKey, index) {
  if (Object.prototype.hasOwnProperty.call(obj, specificKey)) {
    findAndReplace(req, res, obj, specificKey)
  } else {
    Object.keys(obj).forEach(key => {
      const el = Array.isArray(obj[key]) ? obj[key][index] : obj[key]
      if (typeof el === 'object' && el.constructor === Object) {
        findInObject(req, res, el, key, specificKey, index)
      } else if (typeof el === 'object' && el.constructor === Array) {
        findInArray(req, res, el, key, specificKey, index)
      }
    })
  }
}

export function getBulkResponse(req, res) {
  if (req.requestData.dataSize || req.requestData.dataCount) {
    const data = JSON.parse(req.requestData.specificKey)
    const lastEle = data[data.length - 1]
    const indexArr = data.filter((val)=>typeof val==='number')
    const index = indexArr[0]
    composeResponse(req, res, req.requestData.inputData, lastEle, index)
  }

  let dataArr =[]
  let fakeData=[]
  const objectArr=[]
  const {mockData} = req
  const {statusCode} = mockData
  const ApiResponseSchemaTypes = req.isPreview ? mockData.TempApiResponseSchemaTypes : mockData.ApiResponseSchemaTypes
  const schema = ApiResponseSchemaTypes.find(e => e.method === req.method)
  let {successResponse} = schema

  if (req.requestData.bulkDataCount) {
    for (let i = 1; i <= getBulkCount(req); i++) {
      const obj= JSON.parse(JSON.stringify(req.requestData.inputData))
      fakeData = generateFakerData(obj, req, objectArr, false, req.requestData.inputData)
    }
    dataArr=[...fakeData]
  }

  if (req.requestData.bulkDataSize) {
    const dataSizeBytes = getBulkSize(req) * 1024
    let dataSize = 0
    while (dataSize < dataSizeBytes) {
      const obj= JSON.parse(JSON.stringify(req.requestData.inputData))
      fakeData = generateFakerData(obj, req, objectArr, false, req.requestData.inputData)
      dataArr=[...fakeData]
      dataSize = sizeof(dataArr)
    }
  }
  req.requestData.inputData = Array.isArray(dataArr) ? dataArr.length === 1 ? dataArr[0] : dataArr : dataArr
  try {
    successResponse = successResponse.replace(`"$data"`,JSON.stringify(req.requestData.inputData))
    successResponse = JSON.parse(successResponse)
  } catch (error) {
    logger.error(error)
    return res.status(500).send({message:serverErrorMessage,status: 500,error})
  }
  return res.status(statusCode).send(Object.keys(successResponse).length === 0 ? req.requestData.inputData : successResponse)

}
