import {faker} from '@faker-js/faker'
import fakerObj from '../constants/fakerModel'

export const isSpecialCharacter = input => {
  const format = /[!~@#$%^&*()+\=[\]{}; ':"\\|,.<>/?]+/
  if (format.test(input)) {
    return false
  }
  return true
}

export const parseUrl = (search) => {
  const urlParams = new URLSearchParams(search)
  delete urlParams.delete("iRest-auth-token")
  delete urlParams.delete("IREST_RECORD_ID")
  delete urlParams.delete("rapidDoc")
  const queryParams = Object.fromEntries(urlParams)
  const query = Object.keys(queryParams).length === 0 ? "" : `?${urlParams.toString()}`
  return query
}
 
export const IsJsonString = str => {
  try {
    if (str.length === 0) {
      return str.length === 0
    }
    const jsn = JSON.parse(str)
    if (typeof jsn === 'object') {
      return true
    }
  } catch (e) {
    return false
  }
}

export const isJson = (str) => {
  if (typeof str === "object") {
    return true
  }
  try {
      JSON.parse(str)
  } catch (e) {
      return false
  }
  return true
}

export const manipulateData = fdata => {
  const actual = []

  /* eslint-disable guard-for-in */
  for (const k in fdata) {
    const key = k
    const value = fdata[key]
    const b = {name: key, parent: 'Sample Object'}
    b.children = []
    value.forEach((f) => {
      b.children.push({name: f.displayValue, parent: key})
    })
    actual.push(b)
  }
  return actual
}

let n =0
const increment = () => {
  n += 1
  return n
}

export const getFakerData =(key,ele, prop)=>{
  let customData
  if (key === 'custom') {
    switch (ele.toLowerCase()) {
      case 'number':
        customData = increment()
        break
      case 'boolean':
        customData = Math.random() < 0.5
        break
      case "string":
        customData = `${prop} ${n}`
        break
      case "array":
        customData  = []
        break
      case "object":
        customData = {}
        break
      case 'date':
        customData = parseInt(Date.now()/1000, 10)
        break
      default:
        customData = ''
        break
    }
    return customData
  }
  
  return faker.helpers.fake(`{{${key}.${ele}}}`)
}

export const generateFakerData = (obj, req, objectArr, isObject, realObj, isStreamline) => {
  const realObject = JSON.parse(JSON.stringify(realObj))
  let isAnyObj = isObject
  if (obj!==null) {
    Object.keys(obj).forEach(property => {
      if (Array.isArray(obj[property])) {
        for (let i=0; i<obj[property].length; i++) {
          if (typeof obj[property][i] === 'object') {
           generateFakerData(obj[property][i], req, objectArr, false,realObj,isStreamline)
          }
          else if (typeof obj[property][i] !== 'object' && obj[property][i].constructor !== Object && (obj[property][i]).toString().includes("$")) {
            const getArr = obj[property][i].split(".")
            const baseKey = getArr[0].slice(1)
            const baseEle = getArr[1]
            const data = getFakerData(baseKey,baseEle)
            // eslint-disable-next-line no-param-reassign
            obj[property][i] = data
          }
        }
      }
      if (typeof obj[property] !== 'object') {
        if (obj[property].toString().includes("$")) {
          const getArr = obj[property].split(".")
          const category = getArr[0].slice(1)
          const subCategory = getArr[1]
          // eslint-disable-next-line no-prototype-builtins
          if (fakerObj.hasOwnProperty(category) || category.toLowerCase() === 'custom') {
            const data = getFakerData(category,subCategory,property)
            isAnyObj = false
            // eslint-disable-next-line no-param-reassign
            obj[property] = data
          }
        }
      } else if (obj[property] !== null && typeof obj[property] === 'object' && obj[property].constructor === Object) {
        generateFakerData(obj[property], req, objectArr, true, realObj, isStreamline)
      }
    })
  }
  
  if (!isAnyObj && obj !== null) {
    const objKey = Object.keys(obj)
    const realObjKey = Object.keys(realObject)
    const isMismatch = objKey.filter(e => !realObjKey.includes(e))
    if (isMismatch.length===0) {
      if (isStreamline) {
        return {...obj}
      }
      objectArr.push(JSON.parse(JSON.stringify(obj)))
    }
    return objectArr
  }
}

export const parseCookies=(request)=> {
  const list = {}
  const cookieHeader = request.headers.cookie
  if (!cookieHeader) return list

  cookieHeader.split(`;`).forEach((cookie)=>{
      const [name, ...rest] = cookie.split(`=`)
      const cookieName = name.trim()
      if (!cookieName) return
      const value = rest.join(`=`).trim()
      if (!value) return
      list[cookieName] = decodeURIComponent(value)
  })
  return list
}