import { deepClone } from '../../../utils'
import { t } from '../distribute/handle'

export default t

// 风险等级颜色配置
export const RISK_COLORS = ['rgb(126, 33, 33)', 'rgb(195, 71, 52)', 'rgb(231, 122, 62)', 'rgb(243, 212, 100)', 'rgb(136, 137, 138)']
// 风险等级文案
export const RISK_LABELS = ['noRated', 'lowRisk', 'mediumRisk', 'highRisk', 'severityRisk']

const TYPE_MAP = {
  // 许可证
  1: {
    color: ['rgb(195, 71, 52)', 'rgb(231, 122, 62)', 'rgb(243, 212, 100)', 'rgb(136, 137, 138)'],
    map: {
      1: ['highRiskCount'],
      2: {
        color: ['rgb(108, 99, 215)', 'rgb(207, 100, 106)'],
        list: ['indirectCompatibleCount', 'notCompatibleCount'],
      },
      3: {
        color: ['rgb(195, 71, 52)', 'rgb(231, 122, 62)'],
        list: ['licenseChangeCount', 'copyrightChangeCount'],
      },
    },
  },
  // 漏洞
  2: {
    color: RISK_COLORS,
    map: {
      1: RISK_LABELS,
    },
  },
}

/**
 * echarts配置
 * @param {*} data 数据集
 * @param {*} chartType 图表类型 1 许可证 2 漏洞
 * @param {*} type 业务类型
 * @returns 
 */
export const handleOptions = function () {
  const { data, chartType = 1, currentType: type = 1 } = this
  const { color = [], list = [] } = getConfig(chartType, type)
  
  const option = {
    title: {
      show: false,
      text: '',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    color,
    legend: {
      orient: 'vertical',
      bottom: 'center',
      left: 'left',
      itemHeight: 10, //图例的高度
      itemGap: 8, //图例之间的间距
      data: formatData(data, list).map((x) => x.name),
    },
    series: [
      {
        // name: '许可证',
        type: 'pie',
        radius: ['55%', '80%'],
        data: formatData(data, list),
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
export function formatData(data = {}, list = []) {
  const cloneData = deepClone(data)

  // data为数组时特殊处理
  if (Array.isArray(cloneData)) {
    cloneData.sort((x, y) => y.level - x.level)
    console.log(cloneData)

    const res = cloneData.map((x) => {
      const { level, repo } = x

      return {
        name: t(list[level]),
        value: repo,
      }
    })
    return res
  }
  
  const res = Object.entries(cloneData)
    .filter(([key]) => list.includes(key))
    .map(([key, val]) => {
      return {
        name: t(key),
        value: val,
      }
    })

  return res
}

// 获取颜色及文案配置
function getConfig(chartType, type) {
  const { color: first_color = [], map = {} } = TYPE_MAP[chartType]
  let color = first_color || []
  let list = []

  const res = map[type]
  if (Array.isArray(res)) {
    // const { color: newColor = [], list: newList = [] } = list
    list = res
  } else {
    const { color: newColor = [], list: newList = [] } = res
    color = newColor
    list = newList
  }

  return {
    color,
    list,
  }
}