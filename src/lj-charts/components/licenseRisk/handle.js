import { deepClone } from '../../../utils'
import { t } from '../distribute/handle'
import style from '../../../style/var.scss'

export default t

// 风险等级颜色配置
export const RISK_COLORS = style['risk-color-list'].split(',')
const REVERSE_COLOR = deepClone(RISK_COLORS)
REVERSE_COLOR.reverse()
// 风险等级文案
export const RISK_LABELS = [
  'noRated',
  'vulLow',
  'vulMid',
  'vulHigh',
  'vulCritical',
]

const TYPE_MAP = {
  // 许可证
  1: {
    map: {
      1: {
        color: REVERSE_COLOR.slice(1),
        isList: true,
        listKey: 'licenseRiskInfos',
        valKey: 'riskLevelCount',
        nameKey: 'riskLevel',
      },
      2: {
        color: ['rgb(108, 99, 215)', 'rgb(207, 100, 106)'],
        list: ['indirectCompatibleCount','notCompatibleCount'],
      },
      3: {
        color: ['rgb(195, 71, 52)', 'rgb(231, 122, 62)'],
        list: ['licenseChangeCount', 'copyrightChangeCount'],
      },
    },
  },
  // 漏洞
  2: {
    map: {
      1: {
        list: [
          'vulCritical',
          'vulHigh',
          'vulMid',
          'vulLow',
          'vulUnknown',
        ],
      },
    },
  },
}

// 漏洞映射
const RISK_MAP = {
  4: t('vulCritical'),
  3: t('vulHigh'),
  2: t('vulMid'),
  1: t('vulLow'),
  0: t('vulUnknown'),
}

/**
 * echarts配置
 * @param {*} data 数据集
 * @param {*} chartType 图表类型 1 许可证 2 漏洞
 * @param {*} type 业务类型
 * @returns 
 */
export const handleOptions = function () {
  const {
    data,
    chartType = 1,
    currentType: type = 1,
  } = this
  // 获取配置
  const config = getConfig(chartType, type)
  const { list = [], color } = formatData(data, config)

  const option = {
    title: {
      show: false,
      text: '',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    color: config.color,
    legend: {
      orient: 'vertical',
      bottom: 'center',
      left: 'left',
      itemHeight: 10, //图例的高度
      itemGap: 8, //图例之间的间距
      data: list.map((x) => x.name),
    },
    series: [
      {
        // name: '许可证',
        color,
        type: 'pie',
        radius: ['55%', '80%'],
        data: list,
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
 * 数据处理
 * @param {*} data 
 * @returns 
 */
export function formatData(data = [], config = {}) {
  const cloneData = deepClone(data)
  const {
    list,
    isList = false,
    listKey,
    valKey,
    nameKey,
    color,
  } = config

  // 单项为list取值
  if (isList) {
    const res = cloneData[listKey]
    res?.sort((x, y) => y[nameKey] - x[nameKey])

    const resColor = []
    const resList = res?.map((x) => {
      resColor.push(color[x[nameKey]])

      return {
        name: RISK_MAP[x[nameKey]],
        value: x[valKey],
      }
    }) || []

    return {
      list: resList,
      color: resColor,
    }
  } else {
    const resColor = []
    const res = []
    
    list.forEach((x, i) => {
      const count = cloneData[x]

      if (count >= 0) {
        resColor.push(RISK_COLORS[i])
        res.push({
          name: t(x),
          value: count,
        })
      }
    })
    
    return {
      list: res,
      color: color || resColor,
    }
  }
}

// 获取颜色及文案配置
function getConfig(chartType, type) {
  const { map = {} } = TYPE_MAP[chartType]
  const res = map[type]
  
  return res
}