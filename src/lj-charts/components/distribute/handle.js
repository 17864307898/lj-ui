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
export function handleOptions(data = [], type = 1, color = DEFAULT_COLORS) {
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
        data: formatData(data, type),
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

/**
 * 格式化数据 限制10个
 * @param {*} data 数据集
 * @param {*} type 展示类型 1 文件 2 代码
 * @param {*} onlySort 仅排序
 * @returns 
 */
export function formatData(data, type = 1, onlySort = false) {
  const res = deepClone(data)
  const list = []
  let otherNum = 0
  const key = TYPE_MAP[type] || 'num'

  // 排序
  res.sort((x, y) => {
    return y[key] - x[key]
  })
  if (onlySort) return res

  res.forEach((item, idx) => {
    if (idx < 8) {
      list.push({
        value: item[key],
        name: item.language,
      })
    }
    if (idx >= 8) {
      otherNum += item[key]
    }
  })

  if (otherNum > 0) {
    list.push({
      value: otherNum,
      name: t('others'),
    })
  }
    
  return list
}