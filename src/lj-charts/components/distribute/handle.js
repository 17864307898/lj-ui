import { deepClone } from '../../../utils'
import { translate } from '../../../utils/translate'
export const t = translate('ljCharts')

const DEFAULT_COLORS = [
  '#5970C0',
  '#9ECA7D',
  '#F2CA6A',
  '#DE6E6B',
  '#85BDDC',
  '#579F74',
  '#EC8A5D',
  '#9264AF',
  '#DC83C6',
  '#737189',
]
export const TYPE_MAP = {
  1: 'size', // 文件
  2: 'line', // 代码
}

/**
 * 返回echarts配置
 * @param {*} data 
 * @param {*} type 
 * @param {*} color 
 * @returns 
 */
export function handleOptions() {
  const {
    colors: color = DEFAULT_COLORS,
    chartType = 1,
    currentType = 1,
    nameKey = 'type',
  } = this

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function({ marker, name, value, data }) {
        if (data.otherList) {
          let key = ''
          if (chartType === 1) {
            key = TYPE_MAP[currentType]
          } else {
            key = 'count'
          }

          const name = chartType === 1 ? 'language' : nameKey
          return data.otherList.map((x) => {
            return `${x[name]} :  ${x[key]}`
          }).join('<br />')
        }
        
        return `${marker} ${name}   ${value}`
      }
    },
    series: [
      {
        color,
        type: 'pie',
        top: '0%',
        radius: '60%',
        center: ['50%', '60%'],
        minAngle: 8,
        avoidLabelOverlap: true,
        data: formatData.call(this),
        label: {
          normal: {
            textStyle: {
              color: '#666666',
            },
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  return option
}

export function formatData(onlySort = false) {
  const { chartType = 1 } = this

  if (chartType === 1) return formatData1.call(this, onlySort)

  return formatData2.call(this, onlySort)
}

/**
 * 语言分布
 * 格式化数据 限制10个
 * @param {Boolean} onlySort 仅排序
 * @returns 
 */
export function formatData1(onlySort = false) {
  const {
    data: map = {},
    currentType: type = 1,
    chartType = 1,
  } = this
  const data = map[chartType]
  
  const res = deepClone(data)

  // 转换KB
  function translateKb(val) {
    return type === 1 ? +(val/1024).toFixed(2) : +val
  }

  const key = TYPE_MAP[type] || 'num'
  // 排序
  res.sort((x, y) => {
    return y[key] - x[key]
  })

  // 仅排序直接全量返回
  if (onlySort) {
    if (chartType === 1 && type === 1) {
      return res.map((x) => ({
        ...x,
        [key]: translateKb(x[key]),
      }))
    }
    
    return res
  }

  let list = []

  // 长度大于十 其余归为其他类
  if (res.length > 10) {
    let num = 0
    list = res.slice(0, 9).map(x => ({
      value: translateKb(x[key]),
      name: x.language,
    }))

    const otherList = res.slice(9).map((x) => {
      num += translateKb(x[key])

      return {
        ...x,
        [key]: translateKb(x[key]),
      }
    })

    list.push({
      value: num,
      name: t('others'),
      otherList,
    })

    return list
  }

  list = res.slice(0, 10).map(x => ({
    value: translateKb(x[key]),
    name: x.language,
  }))

  return list
}

/**
 * 文件类型分布
 * @param {Boolean} onlySort 仅排序
 * @returns 
 */
export function formatData2(onlySort = false) {
  const {
    data: map = {},
    valueKey,
    nameKey,
    chartType = 1,
    order = 'desc',
  } = this
  const data = map[chartType]

  const res = deepClone(data)
  if (!order) return res

  // 排序
  res.sort((x, y) => {
    if (order === 'desc') {
      return y[valueKey] - x[valueKey]
    } else if (order === 'asc') {
      return x[valueKey] - y[valueKey]
    }
  })
  
  if (onlySort) return res

  // 长度大于十 其余归为其他类
  if (res.length > 10) {
    const list = res.slice(0, 9).map(x => ({
      value: x[valueKey],
      name: x[nameKey],
    }))

    let num = 0
    const otherList = res.slice(9).map((x) => {
      num += +x[valueKey]

      return {
        ...x,
        [valueKey]: +x[valueKey],
      }
    })

    list.push({
      value: num,
      name: t('others'),
      otherList,
    })

    return list
  }

  return res.slice(0, 10).map(x => ({
    value: x[valueKey],
    name: x[nameKey],
  }))
}