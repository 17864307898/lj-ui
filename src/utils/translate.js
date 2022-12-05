function get(object, path) {
  const keys = path.split('.');
  let result = object;

  keys.forEach((key) => {
    result = isObject(result) ? result[key] ?? '' : ''
  })

  return result;
}

function isObject(val) {
  return val !== null && typeof val === 'object'
}

import locale from '../locale';

/**
 * 翻译
 * @param {*} path key值
 * @returns 
 */
export function translate(name) {
  const prefix = name + '.'

  return function (path) {
    console.log(prefix + path)
    const messages = locale.messages()
    const message = get(messages, prefix + path) || get(messages, path)

    return message
  }
}