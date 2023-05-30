/* eslint-disable no-unused-expressions */
import sizeof from '../../../helpers/sizeof'
import {generateFakerData} from '../../../helpers/util'
import {getBulkCount, getBulkSize, getDynamicCount, getDynamicSize} from '../../../helpers/responseHelper'

const {faker} = require('@faker-js/faker')

export default function streamlineResponse(req, res) {
  const {statusCode, contentType} = req.mockData
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Transfer-Encoding': 'chunked',
  })

  getBulkResponse(req, res)
  return res.end()
}

export function findAndReplace(req, res, obj, specificKey) {
  const elm = obj[specificKey]
  // eslint-disable-next-line no-param-reassign
  delete obj[specificKey]
  Object.keys(obj).forEach(key => {
    const el = obj[key]
    if (typeof el === 'string') {
      res.write(`"${key}": "${el}",`)
    } else {
      res.write(`"${key}": ${el},`)
    }
  })

  if (typeof elm === 'object' && elm.constructor === Array) {
    res.write(`"${specificKey}": [`)
    if (req.requestData.dataCount) {
      const dynamicData = req.mockData.dynamicResponseRandom
        ? JSON.stringify(faker.lorem.sentences())
        : JSON.stringify(req.requestData.dynamicData)
      for (let i = 0; i < getDynamicCount(req); i++) {
        // eslint-disable-next-line no-unused-expressions
        i === (getDynamicCount(req) - 1) ? res.write(`${dynamicData}`) : res.write(`${dynamicData},`)
      }
    }

    if (req.requestData.dataSize) {
      const dataSizeBytes = getDynamicSize(req) * 1024
      let dataSize = 0
      const dynamicData = req.mockData.dynamicResponseRandom
        ? JSON.stringify(faker.lorem.sentences())
        : JSON.stringify(req.requestData.dynamicData)
      while (dataSize < dataSizeBytes) {
        dataSize += sizeof(req.requestData.dynamicData)
        // eslint-disable-next-line no-unused-expressions
        dataSize > dataSizeBytes ? res.write(`${dynamicData}`) : res.write(`${dynamicData},`)
      }
    }

    res.write(']')
  } else if (typeof elm === 'object' && elm.constructor === Object) {
    res.write(`"${specificKey}": {`)
    if (req.requestData.dataCount) {
      const dynamicData = req.mockData.dynamicResponseRandom
        ? JSON.stringify(faker.lorem.sentences())
        : JSON.stringify(req.requestData.dynamicData)
      for (let i = 0; i < getDynamicCount(req); i++) {
        // eslint-disable-next-line no-unused-expressions
        i === (getDynamicCount(req) - 1) ? res.write(`"${i}": ${dynamicData}`) : res.write(`"${i}": ${dynamicData},`)
      }
    }

    if (req.requestData.dataSize) {
      const dataSizeBytes = getDynamicSize(req) * 1024
      let dataSize = 0
      let i = 0
      const dynamicData = req.mockData.dynamicResponseRandom
        ? JSON.stringify(faker.lorem.sentences())
        : JSON.stringify(req.requestData.dynamicData)
      while (dataSize < dataSizeBytes) {
        dataSize += sizeof(req.requestData.dynamicData)
        // eslint-disable-next-line no-unused-expressions
        dataSize > dataSizeBytes ? res.write(`"${i}": ${dynamicData}`) : res.write(`"${i}": ${dynamicData},`)
        i += 1
      }
    }

    res.write('}')
  } else {
    res.write(`"${specificKey}": "`)

    if (req.requestData.dataCount) {
      const dynamicData = req.mockData.dynamicResponseRandom
        ? JSON.stringify(faker.lorem.sentences()).replace(/(["'])/g, "")
        : JSON.stringify(req.requestData.dynamicData).replace(/(["'])/g, "")
      for (let i = 1; i <= getDynamicCount(req); i++) {
        res.write(dynamicData)
      }
    }

    if (req.requestData.dataSize) {
      const dataSizeBytes = getDynamicSize(req) * 1024
      let dataSize = 0
      const dynamicData = req.mockData.dynamicResponseRandom
        ? JSON.stringify(faker.lorem.sentences()).replace(/(["'])/g, "")
        : JSON.stringify(req.requestData.dynamicData).replace(/(["'])/g, "")
      while (dataSize < dataSizeBytes) {
        res.write(dynamicData)
        dataSize += sizeof(dynamicData)
      }
    }

    res.write('"')
  }
}

export function findInObject(req, res, el, key, specificKey, dataIndex) {
  if (Object.keys(el).length === 0) {
    res.write(`"${key}": {}`)
  } else {
    res.write(`"${key}": `)
    composeResponse(req, res, el, specificKey, true, dataIndex)
  }
}

export function findInArray(req, res, el, key, specificKey, index) {
  if (el.length === 0) {
    res.write(`"${key}": []`)
  } else {
    res.write(`"${key}": [`)
    for (let j = 0; j < el.length; j++) {
      if (index!==j) {
        const elm = el[j]
        res.write(JSON.stringify(elm))
        // eslint-disable-next-line no-unused-expressions
        j !== el.length-1 && res.write(',')
      }
      if (index === j) {
        const elm = el[j]
      if (typeof elm === 'object' && elm.constructor === Array) {
        findInArray(req, res, elm, key, specificKey, index)
      } else if (typeof elm === 'object' && elm.constructor === Object) {
        const isTrailingComma = j === el.length-1
        composeResponse(req, res, elm, specificKey, isTrailingComma, index)
      } else if (typeof elm === 'string') {
        // eslint-disable-next-line no-unused-expressions
        el.length - 1 === j ? res.write(`"${elm}"`) : res.write(`"${elm}",`)
      } else {
        // eslint-disable-next-line no-unused-expressions
        el.length - 1 === j ? res.write(`${elm}`) : res.write(`${elm},`)
      }
      }
    }
    res.write(`]`)
  }
}

export function composeResponse(req, res, obj, specificKey, noTrailComma, dataIndex) {
  res.write('{')
  if (Object.prototype.hasOwnProperty.call(obj, specificKey)) {
    findAndReplace(req, res, obj, specificKey)
  } else {
    const objLen = Object.keys(obj).length
    Object.keys(obj).forEach((key, index) => {
      const el = obj[key]
      if (typeof el === 'object' && el.constructor === Object) {
        findInObject(req, res, el, key, specificKey, dataIndex)
      } else if (typeof el === 'object' && el.constructor === Array) {
        findInArray(req, res, el, key, specificKey, dataIndex)
      } else if (typeof el === 'string') {
        res.write(`"${key}": "${el}"`)
      } else {
        res.write(`"${key}": ${el}`)
      }
      if (index !== (objLen - 1)) {
        res.write(',')
      }
    })
  }
  res.write('}')
  if (noTrailComma === false) {
    res.write(',')
  }
}

export function getBulkResponse(req, res) {
  const getObj =()=> {
    const objData = JSON.parse(JSON.stringify(req.requestData.inputData))
    return objData
  }
  res.write(`{"data":[`)
  if (req.requestData.dataSize || req.requestData.dataCount) {
    const data = JSON.parse(req.requestData.specificKey)
    const lastEle = data[data.length - 1]
    const indexArr = data.filter((val)=>typeof val==='number')
    const index = indexArr[0]
    if (req.requestData.bulkDataCount) {
      for (let i = 1; i <= getBulkCount(req); i++) {
        composeResponse(req, res,getObj(), lastEle, null, index)
        // eslint-disable-next-line no-unused-expressions
        i < getBulkCount(req) && res.write(',')
      }
    }
    if (req.requestData.bulkDataSize) {
      const dataSizeBytes = getBulkSize(req) * 1024
      let dataSize = 0
      while (dataSize < dataSizeBytes) {
        dataSize += sizeof(req.requestData.inputData)
        composeResponse(req, res,getObj(), lastEle, null, index)
        dataSize < dataSizeBytes ? res.write(',') : res.write('')
      }
    }
  } else {
  if (req.requestData.bulkDataCount) {
    for (let i = 1; i <= getBulkCount(req); i++) {
      const obj= JSON.parse(JSON.stringify(req.requestData.inputData))
      const data = generateFakerData(obj,req,null,false,req.requestData.inputData,true)
      res.write(JSON.stringify(data))
      i < getBulkCount(req) && res.write(',')
    }
  }

  if (req.requestData.bulkDataSize) {
    const dataSizeBytes = getBulkSize(req) * 1024
    let dataSize = 0
    while (dataSize < dataSizeBytes) {
      const obj= JSON.parse(JSON.stringify(req.requestData.inputData))
      const data = generateFakerData(obj,req,null,false,req.requestData.inputData,true)
      dataSize += sizeof(req.requestData.inputData)
      dataSize > dataSizeBytes ? res.write(JSON.stringify(data)) : res.write(`${JSON.stringify(data)},`)
    }
  }
  }

  res.write(`]}`)
}
