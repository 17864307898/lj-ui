import { deepClone } from '../../../utils'
import t, { RISK_COLORS, RISK_LABELS } from '../licenseRisk/handle'

const colors = RISK_COLORS
const levels = handleReverse(RISK_LABELS)
// series默认项
const DEFAULT_SERIES_DATA = {
  name: '',
  type: '',
  data: [],
}

const TYPE_MAP = {
  1: {
    key: 'vulInfoList',
    list: [],
  },
  2: {
    key: 'licenseInfoList',
    list: [],
  },
}

export const handleOptions = function() {
  // const { data = [] } = this
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    yAxis: {
      type: 'value'
    },
    series: levels.map((x, i) => {
      return {
        name: t(x),
        color: colors[i],
        data: new Array(5).fill('').map((y, z) => {
          return Math.pow(z, i)
        }),
        type: 'line',
      }
    }),
  }

  return option
}

function formatData(data) {
  const list = deepClone(data)

  return list.map((x) => {
    return {
      ...DEFAULT_SERIES_DATA
    }
  })
}

// 反转数组
function handleReverse(data) {
  const list = deepClone(data)

  return list.reverse()
}