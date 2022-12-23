import { deepClone } from '../../../utils'

/**
 * echarts配置
 * @param {*} data 数据集
 * @param {*} canDrag 视图是否存在可拖拽栏
 * @returns 
 */
export const handleOptions = function() {
  const { data, canDrag, valueKey, nameKey, color, order } = this
  const list = formatData(data, valueKey, order)
  const  dataZoom = [
    {
      type: 'inside',
      start: 0,
      end: list.length > 100 ? 10 : 40,
    },
    {
      type: 'slider',
      dataBackground: {
        lineStyle: {
          width: 2
        }
      }
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
      top: '5%',
      left: 90,
      bottom: canDrag ? 70 : 20,
    },
    xAxis: {
      data: list.map((x) => x[nameKey]),
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
        data: list.map((x) => ({
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