/**
 * session 单次缓存
 * @param {*} key session key值
 * @param {*} val session val值
 * @returns 仅在不传入val值时返回当前key值对应的session值
 */
export function onceSession(key, val) {
  if (arguments.length === 0) return

  if (val || val === 0) {
    sessionStorage.setItem(key, val)
  } else {
    const val = sessionStorage.getItem(key)
    sessionStorage.removeItem(key)

    return val
  }
}

/**
 * 深拷贝
 * @param {Object} target 源数据
 * @returns {Array, Object} 深拷贝后的数据
 * */ 
 export const deepClone = (target) => {
  function _deepClone (_target) {
    if (_target instanceof Date) return new Date(_target)
    if (_target instanceof RegExp) return new RegExp(_target)
    if (typeof _target !== 'object' || !_target) return _target

    let obj = {}

    if (_target instanceof Array) obj = []

    Object.keys(_target).forEach((key) => {
      obj[key] = _deepClone(_target[key])
    })

    return obj
  }

  return _deepClone(target);
}

/**
 * 移除对象中为空的属性
 * @param {*} object
 * @returns
 */
 export function cleanObjectEmpty(object) {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') {
      if (Object.prototype.toString.call(v) === '[object Array]') {
        if (!v.length) {
          delete object[k]
        }
      }
      cleanObjectEmpty(v)
    }
    if (!v && v !== 0) {
      delete object[k]
    }
  })
  return object
}

/**
 * @description 字节单位转换
 * @param number
 * @returns {*}
 */
 export function byteConvert(bytes) {
  if (isNaN(bytes)) return ''

  const symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let exp = Math.floor(Math.log(bytes)/Math.log(2))

  if (exp < 1) {
      exp = 0
  }
  const i = Math.floor(exp / 10)
  bytes /= 2 ** (10 * i)

  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
      bytes = bytes.toFixed(2)
  }

  return bytes + ' ' + symbols[i]
}

/**
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {{}|any}
 */
export function paramObj(url) {
  if (!url) return {}

  const search = url.split('?')[1]
  if (!search) return {}

  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @description m到n的随机数
 * @param m
 * @param n
 * @returns {number}
 */
export function randomNumber(m, n) {
  return Math.floor(Math.random() * (m - n) + n)
}