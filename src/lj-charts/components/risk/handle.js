import { deepClone } from '../../../utils'
import { t } from '../distribute/handle'
import style from '../../../style/var.scss'

export default t

// 风险等级颜色配置
const RISK_COLORS = style['risk-color-list'].split(',')
const REVERSE_COLOR = deepClone(RISK_COLORS)
REVERSE_COLOR.reverse()

// 许可证
const LICENSE_LIST = [
  t('vulUnknown'),
  t('lowRiskFile'),
  t('midRiskFile'),
  t('highRiskFile'),
]

// 漏洞
const RISK_LIST = [
  t('noRated'),
  t('vulLow'),
  t('vulMid'),
  t('vulHigh'),
  t('vulCritical'),
]

const TYPE_MAP = {
  // 许可证
  1: {
    yMap: LICENSE_LIST,
    xKey: [],
  },
  // 漏洞
  2: {
    yMap: RISK_LIST,
    xKey: [
      'vulUnknown',
      'vulLow',
      'vulMid',
      'vulHigh',
      'vulCritical',
    ],
  },
}
console.log(TYPE_MAP)
/**
 * echarts配置
 * @param {*} data 数据集
 * @param {*} chartType 图表类型 1 许可证 2 漏洞
 * @param {*} type 业务类型
 * @returns 
 */
export const handleOptions = function () {
  const { chartType = 1 } = this
  const config = TYPE_MAP[chartType]

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    color: REVERSE_COLOR.slice(1),
    grid: {
      top: '6%',
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: config.yMap,
    },
    series: [
      {
        type: 'bar',
        colorBy: 'data',
        data: formatData.call(this, config),
      },
    ],
  }

  return option
}

/**
 * 数据处理
 * @param {*} data 
 * @returns 
 */
export function formatData(config = {}) {
  const { data, chartType = 1 } = this
  const cloneData = deepClone(data)
  const { xKey = [] } = config

  // 许可证
  if (chartType === 1) {
    const list = cloneData?.licenseRiskInfos || []
    list.sort((x, y) => x.riskLevel - y.riskLevel)

    return list.map((x) => x.riskLevelCount)
  } else {
    return xKey.map((x) => cloneData[x] || 0)
  }
}

export function handleRightConfig() {
  const {
    chartType = 1,
    config,
    source = false,
    data,
  } = this

  // 许可证
  if (chartType === 1) {
    return [
      {
        title: t('compatibilityRisk'),
        list: [
          {
            key: 'notCompatibleCount',
            title: t('notCompatibleCount'),
          },
          {
            key: 'indirectCompatibleCount',
            title: t('indirectCompatibleCount'),
          },
        ],
        type: 1,
      },
      {
        title: t('tamperingRisk'),
        list: [
          {
            key: 'licenseChangeCount',
            title: t('licenseChangeCount'),
          },
          {
            key: 'copyrightChangeCount',
            title: t('copyrightChangeCount'),
          },
        ],
        type: 2,
        isSource: true,
      },
    ].filter((x) => {
      if (x?.isSource) return source

      return true
    })
  }

  const list = [
    {
      key: 'repoVulDistribute',
      title: t('vulnerabilityComponent'),
      type: 1,
    },
    {
      key: 'fileVulDistribute',
      title: t('buggyFile'),
      type: 2,
    },
    {
      key: 'sourceProjectVulDistribute',
      title: t('IncludingTraceability'),
      type: 3,
      isSource: true,
    },
  ]
    .filter((x, i) => config.includes(i))
    .filter((x) => {
      if (x?.isSource) return source

      return true
    })
  console.log(list)
  
  return list.map((x) => {
    return {
      ...x,
      list: [sumTotal(data, x.key)],
    }
  })
}

function sumTotal(data, key) {
  const current = deepClone(data[key])
  if (!current) return 0

  return Object.values(current).reduce((total, x) => {
    total += +x

    return total
  }, 0)
}
