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
  const yAxisData = formatYData(config, source)

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
      data: yAxisData
    },
    series: formatXData(data, yAxisData.length)
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
  data: [3, 2, 1],
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

const yData = [
  {
    key: t('licenseSource'),
  },
  t('licenseComponent'),
  t('licenseFile'),
]

// x轴数据展示
function formatXData(data, max = 1) {
  const defaultData = deepClone(defaultXData)

  defaultData.data = defaultData.data.slice(0, max)
  const list = xData.map((x) => {
    return {
      ...defaultData,
      ...x,
    }
  })

  return list
}

// y轴数据展示
function formatYData(config, source) {
  const list = yData.filter((x, i) => config.includes(i))

  return list.filter((x) => {
    if (typeof x === 'object') {
      return source
    } else {
      return x
    }
  }).map((x) => {
    return typeof x === 'object' ? x.key : x
  })
}