import { deepClone } from '../../../utils'

/**
 * echarts配置
 * @param {*} data 数据集
 * @param {*} canDrag 视图是否存在可拖拽栏
 * @returns 
 */
export const handleOptions = function() {
  const { data, canDrag, valueKey, nameKey, color, order } = this
  const  dataZoom = [
    {
      type: 'slider'
    }
  ]

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: 70,
      bottom: canDrag ? 80 : 20,
    },
    xAxis: {
      data: formatData(data, valueKey, order).map((x) => x[nameKey]),
      silent: false,
      splitLine: {
        show: false
      },
      splitArea: {
        show: false
      }
    },
    yAxis: {
      splitArea: {
        show: false
      }
    },
    series: [
      {
        color,
        type: 'bar',
        data: formatData(data, valueKey, order).map((x) => ({
          name: x[nameKey],
          value: x[valueKey],
        })),
        // large: true
      }
    ]
  }

  if (canDrag) option.dataZoom = dataZoom

  return option
}

/**
 * 数据处理
 * @param {*} data 
 * @returns 
 */
export function formatData(data = [], valueKey, order) {
  const res = deepClone(data)
  if (!order) return res

  res.sort((x, y) => {
    if (order === 'desc') {
      return y[valueKey] - x[valueKey]
    } else if (order === 'asc') {
      return x[valueKey] - y[valueKey]
    }
  })
  return res
}