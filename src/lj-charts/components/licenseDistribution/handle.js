import { deepClone } from "../../../utils"
import { t } from "../distribute/handle"

/**
 * 
 * @param {*} data 
 * @param {*} config 展示项下标
 * @param {*} source 是否开启溯源
 * @returns 
 */
export const handleOptions = (data, config = [0, 1, 2], source = true) => {
  const yAxisData = formatYData(data, config, source)

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: yAxisData.map((x) => t(x))
    },
    series: formatXData(data, yAxisData)
  }

  return option
}

// x轴数据默认展示
const defaultXData = {
  name: '',
  type: 'bar',
  stack: 'total',
  label: {
    show: true
  },
  emphasis: {
    focus: 'series'
  },
  data: [],
}

// legend
const xData = [
  {
    name: t('highRiskFile'),
    color: 'rgb(137, 22, 25)',
  },
  {
    name: t('midRiskFile'),
    color: 'rgb(223, 118, 116)',
  },
  {
    name: t('lowRiskFile'),
    color: 'rgb(136, 137, 138)',
  },
  {
    name: t('noRiskFile'),
    color: 'rgb(241, 234, 171)',
  },
]

const X_KEY_LIST = ['high', 'mid', 'low', 'no']

const yData = [
  {
    key: 'sourceProjectDistribute',
    source: true,
  },
  {
    key: 'packageDistribute',
    source: false,
  },
  {
    key: 'fileDistribute',
    source: false,
  },
]

// x轴数据展示
function formatXData(data, yList) {
  const res = deepClone(data)
  const list = yList.map((x) => res[x])
  
  return xData.map((x, i) => {
    const defaultData = deepClone(defaultXData)
    const key = X_KEY_LIST[i]
    defaultData.data = Object.values(list).map((y) => y[key]).filter((y) => y > 0)

    return {
      ...defaultData,
      ...x,
    }
  })
}

// y轴数据展示
function formatYData(data, config, source) {
  const res = deepClone(data)
  const list = yData.filter((x, i) => config.includes(i))

  return list.filter((x) => {
    const { source: configSource, key } = x
    const current = res[key]
    
    return current && (configSource ? source : true)
  }).map((x) => {
    return x.key
  })
}