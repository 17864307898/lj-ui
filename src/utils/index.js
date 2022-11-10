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