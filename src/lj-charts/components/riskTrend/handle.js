import * as echarts from 'echarts'
import elementResizeDetectorMaker from 'element-resize-detector'

export function parseRecordsLineS() {
  const { parseRecordsLine: data } = this
  let option = {
    title: {
      show: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      show: false,
      data: data.risk.map((x) => x.name),
    },
    grid: {
      bottom: '2%',
      left: '4%',
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

  console.log(option)
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
