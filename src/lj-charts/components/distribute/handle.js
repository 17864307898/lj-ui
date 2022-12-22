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
  const { colors: color = DEFAULT_COLORS } = this

  const option = {
    title: {
      show: false,
      subtext: '',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        color,
        type: 'pie',
        top: '0%',
        radius: '70%',
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
 * 格式化数据 限制10个
 * @param {*} data 数据集
 * @param {*} type 展示类型 1 文件 2 代码
 * @param {*} onlySort 仅排序
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

  // 排序
  res.sort((x, y) => {
    return y[key] - x[key]
  })
  if (onlySort) return res

  const key = TYPE_MAP[type] || 'num'
  let list = []
  let num = 0

  // 长度大于十 其余归为其他类
  if (res.length > 10) {
    list = res.slice(0, 9).map(x => ({
      value: x[key],
      name: x.language,
    }))

    num = res.slice(9).reduce((total, x) => {
      total += +x[key]

      return total
    }, 0)

    list.push({
      value: num,
      name: t('others'),
    })

    return list
  }

  list = res.slice(0, 10).map(x => ({
    value: x[key],
    name: x.language,
  }))

  return list
}

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

    const num = res.slice(9).reduce((total, x) => {
      total += +x[valueKey]

      return total
    }, 0)

    list.push({
      value: num,
      name: t('others'),
    })

    return list
  }

  return res.slice(0, 10).map(x => ({
    value: x[valueKey],
    name: x[nameKey],
  }))
}