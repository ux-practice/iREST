import {serverErrorMessage} from '../constants/messages'

export default function responseHandler(req, res) {
  const statusCode = req.statusCode || 500
  const responseMessage = req.responseMessage || serverErrorMessage

  const responseJson = {
    message: responseMessage,
    status: statusCode,
  }

  if (req.error) {
    responseJson.error = req.error
  }

  if (req.responseData) {
    responseJson.data =  req.responseData
  }

  if (req.statusCode === 204) {
    return res.status(statusCode).send()
  }

  return res.status(statusCode).json(req.mockApi ? req.responseData : responseJson)
}

export function getBulkCount(req) {
  let count
  if (req?.isPreview || req?.isRapidDoc) {
   if (req.requestData.bulkDataCount <= process.env.MAX_BULK_PREVIEW_COUNT) {
    count = req.requestData.bulkDataCount
   }
   else {
     count = process.env.MAX_BULK_PREVIEW_COUNT
   }
  }
  else {
    count = req.requestData.bulkDataCount
  }
  return count
}

export function getBulkSize(req) {
  let size
  if (req?.isPreview || req?.isRapidDoc) {
   if (req.requestData.bulkDataSize <= process.env.MAX_BULK_PREVIEW_SIZE) {
    size = req.requestData.bulkDataSize
   }
   else {
    size = process.env.MAX_BULK_PREVIEW_SIZE
   }
  }
  else {
    size = req.requestData.bulkDataSize
  }
  return size
}

export function getDynamicCount(req) {
  let count
  if (req?.isPreview || req?.isRapidDoc) {
   if (req.requestData.dataCount <= process.env.MAX_DYNAMIC_PREVIEW_COUNT) {
    count = req.requestData.dataCount
   }
   else {
     count = process.env.MAX_DYNAMIC_PREVIEW_COUNT
   }
  }
  else {
    count = req.requestData.dataCount
  }
  return count
}

export function getDynamicSize(req) {
  let size
  if (req?.isPreview || req?.isRapidDoc) {
   if (req.requestData.dataSize <= process.env.MAX_DYNAMIC_PREVIEW_SIZE) {
    size = req.requestData.dataSize
   }
   else {
    size = process.env.MAX_DYNAMIC_PREVIEW_SIZE
   }
  }
  else {
    size = req.requestData.dataSize
  }
  return size
}
