import * as echarts from 'echarts'
import elementResizeDetectorMaker from 'element-resize-detector'

export function parseRecordsLineS() {
  const { parseRecordsLine: data } = this
  this.chart&&this.chart.dispose()
  let option = {
    title: {
      show: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      show: false,
      data: data.riskData.map((x) => x.name),
    },
    grid: {
      top: '10%',
      bottom: '10%',
      left: '10%',
      right: '4%',
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      splitLine: { show: false },
      data: data.name,
    },
    yAxis: {
      type: 'value',
      minorSplitLine: {
        show: false,
      },
    },
    series: data.riskData,
  }

  const dom = this.$refs.echarts
  this.chart = echarts.init(dom)
  this.chart.setOption(option)

  const handleEvents = () => {
    this.chart.resize()
  }
  window.addEventListener('resize', handleEvents)
  // 随外层div的大小变化自适应
  let erd = elementResizeDetectorMaker()
  erd.listenTo(dom, handleEvents)

  // 移除事件监听及echarts实例
  this.$once('hook:beforeDestroy', () => {
    window.removeEventListener('resize', handleEvents)
    erd.removeListener(dom, handleEvents)
    this.chart.dispose()
  })
}

export const NAME_MAP = {
  1: ['vulCritical', 'vulHigh', 'vulMid', 'vulLow', 'noRated'],
  2: ['highRiskFile', 'midRiskFile', 'lowRiskFile', 'vulUnknown'],
}
