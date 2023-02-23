import { deepClone } from "../../../utils"
import { t } from "../distribute/handle"
import { RISK_COLORS } from '../licenseRisk/handle'

const LENGTH_MAP = {
  1: {
    top: '35%',
    bottom: '35%',
  },
  2: {
    top: '18%',
    bottom: '18%',
  },
  3: {
    top: '4%',
    bottom: '4%',
  },
}
/**
 * 
 * @param {*} data 
 * @param {*} config 展示项下标
 * @param {*} source 是否开启溯源
 * @returns 
 */
export const handleOptions = function () {
  const yAxisData = formatYData.call(this)
  const series = formatXData.call(this, yAxisData)

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      containLabel: true,
      ...LENGTH_MAP[yAxisData.length],
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: yAxisData.map((x) => t(x.name))
    },
    series,
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
    name: t('vulCritical'),
    color: RISK_COLORS[0],
    include: [2],
  },
  {
    name: t('highRiskFile'),
    color: RISK_COLORS[1],
    include: [1, 2],
  },
  {
    name: t('midRiskFile'),
    color: RISK_COLORS[2],
    include: [1, 2],
  },
  {
    name: t('lowRiskFile'),
    color: RISK_COLORS[3],
    include: [1, 2],
  },
  {
    name: t('vulUnknown'),
    color: RISK_COLORS[4],
    include: [1, 2],
  },
  {
    name: t('noRiskFile'),
    color: RISK_COLORS[5],
    include: [1],
  },
]

const X_KEY_LIST = {
  1: ['high', 'mid', 'low', 'unknown', 'no'],
  2: ['critical', 'high', 'mid', 'low', 'unknown'],
}

const yData = [
  {
    key: {
      1: 'sourceProjectDistribute',
      2: 'sourceProjectVulDistribute',
    },
    name: 'sourceProjectDistribute',
    source: true,
  },
  {
    key: {
      1: 'packageDistribute',
      2: 'repoVulDistribute',
    },
    name: 'packageDistribute',
    source: false,
  },
  {
    key: {
      1: 'fileDistribute',
      2: 'fileVulDistribute',
    },
    name: 'fileDistribute',
    source: false,
  },
]

// x轴数据展示
function formatXData(yList) {
  const { data, chartType } = this
  const res = deepClone(data)
  const list = yList.map((x) => res[x.key[chartType]])
  
  return xData
    .filter((x) => x.include.includes(chartType))
    .map((x, i) => {
      const defaultData = deepClone(defaultXData)
      const key = X_KEY_LIST[chartType][i]
      defaultData.data = Object.values(list)
        .map((y) => y[key])
        // .filter((y) => y > 0)

      return {
        ...defaultData,
        ...x,
      }
    })
}

// y轴数据展示
function formatYData() {
  const { data, config, source, chartType = 1 } = this
  const res = deepClone(data)
  const list = yData.filter((x, i) => config.includes(i))

  return list.filter((x) => {
    const { source: configSource, key: map } = x
    const key = map[chartType]
    const current = res[key]
    
    return current && (configSource ? source : true)
  })
}
