import * as echarts from 'echarts'
const DEFAULT_HEIGHT = '180px'

export default {
  props:{
    // 图表高度
    height: {
      type: [String, Number],
      default: () => undefined,
    },
  },
  computed: {
    // 图表高度
    chartHeight() {
      if (!this.height) return DEFAULT_HEIGHT

      if (isNaN(this.height)) return this.height

      return this.height + 'px'
    },
  },
  methods: {
    // 初始化echarts
    handleEcharts(option) {
      this.$nextTick(() => {
        if (this.chart) {
          this.chart.setOption(option)
          return
        }

        this.chart = echarts.init(document.querySelector('#echarts'))

        this.chart.setOption(option)

        const handleEvents = () => {
          this.chart.resize()
        }
        window.addEventListener('resize', handleEvents)

        // 移除事件监听及echarts实例
        this.$once('hook:beforeDestroy', () => {
          window.removeEventListener('resize', handleEvents)
          this.chart.dispose()
          this.chart = null
        })
      })
    },
  },
}