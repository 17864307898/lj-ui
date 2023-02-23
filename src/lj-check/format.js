import { deepClone } from '../utils'
import { translate } from '../utils/translate'
export const t = translate('ljCheck')

// 排除的key值
const EXCLUDE_KEY_LIST = ['file_type', 'match_type']

// 默认格式化
export function handleFormat(data) {
  // 为空不做处理
  if (!data) {
    return {
      completed: null,
      uncompleted: null,
    }
  }

  const completed = {}
  const uncompleted = {}

  const list = deepClone(data) || []

  list?.forEach((item) => {
    if (+item.match_type === 0) {
      handleAssign(uncompleted, item)
    } else {
      handleAssign(completed, item)
    }
  })

  return {
    completed,
    uncompleted,
  }
}

// 赋值
function handleAssign(data1, data2) {
  Object.entries(data2).forEach(([key, val]) => {
    if (!EXCLUDE_KEY_LIST.includes(key)) {
      if (Object.prototype.hasOwnProperty.call(data1, key)) {
        data1[key] += +val
      } else {
        data1[key] = +val
      }
    }
  })
}