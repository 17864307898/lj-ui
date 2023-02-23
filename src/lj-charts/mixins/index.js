import * as echarts from 'echarts'
import { t } from '../components/distribute/handle'
const DEFAULT_HEIGHT = '180px'

export default {
  data() {
    return {
      isChart: true, // 展示为图表
      tableList: [], // 表格数据
      tableLoading: false,
    }
  },
  props:{
    // 标题
    title: {
      type: String,
      default: () => '',
    },
    // 数据集
    data: {
      type: [Array, Object],
      default: () => undefined,
    },
    // 图表高度
    height: {
      type: [String, Number],
      default: () => undefined,
    },
  },
  computed: {
    // 切换文字
    switchText() {
      if (this.isChart) return t('switchTable')

      return t('switchChart')
    },
    // 图表高度
    chartHeight() {
      if (!this.height) return DEFAULT_HEIGHT

      if (isNaN(this.height)) return this.height

      return this.height + 'px'
    },
  },
  watch: {
    data: {
      handler(val) {
        if (val && this.isChart) {
          this.handleInitChart()
        }
      },
      immediate: true,
      deep: true,
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

        this.chart = echarts.init(this.$refs.echarts)

        this.chart.setOption(option)

        const handleEvents = () => {
          this.chart.resize()
        }
        window.addEventListener('resize', handleEvents)

        // 移除事件监听及echarts实例
        this.$once('hook:beforeDestroy', () => {
          window.removeEventListener('resize', handleEvents)
          this.handleClearChart()
        })
      })
    },
    // 国际化
    t(path) {
      return t(path)
    },
    /**************** 仅在带有表格切换时使用 ***************/
    // 视图转换
    handleView() {
      this.isChart = !this.isChart

      if (this.isChart) {
        this.handleInitChart()

        return
      }

      this.handleInitTable()
    },
    // 表格试图初始化
    handleInitTable() {
      if (this.isChart) return

      this.tableLoading = true
      this.handleClearChart()
      this.tableList = this.formatData()
      this.tableLoading = false
    },
    // 手动清除chart
    handleClearChart() {
      if (!this.chart) return

      this.chart.dispose()
      this.chart = null
    },
  },
}