<template>
  <div :ref="echartsRef"></div>
</template>

<script>
  import * as echarts from 'echarts'
  // echarts默认的loading配置项
  const DEFAULT_LOADING_OPTION = {
    text: 'Loading',
    effect: 'whirling',
    maskColor: 'rgba(0, 0, 0, 0)',
    textColor: '#fff',
  }

  export default {
    name: 'lj-echarts',
    components: {},
    props: {
      // 传入的数据
      data: {
        type: [Array, Object],
        default: () => undefined,
      },
      // 处理options的方法
      handleOption: {
        type: Function,
        default: undefined,
      },
      // 加载状态
      loading: {
        type: Boolean,
        default: () => false
      },
      // loading配置参数
      loadingOption: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        echartsRef: `echarts_${Date.now()}`,
      }
    },
    computed: {
      // 最终的loading配置项
      finalOption() {
        return Object.assign({}, DEFAULT_LOADING_OPTION, this.loadingOption)
      }
    },
    watch: {
      // 监听data值变化
      data: {
        handler(val) {
          if (val) this.handleInitEcharts()
        },
        immediate: true,
        deep: true,
      },

      // 加载状态
      loading: {
        handler (nVal, oVal) {
          this.$nextTick(() => {
            if (!oVal && nVal) {
              this.chart?.showLoading(this.finalOption)
            } else if (oVal && !nVal) {
              this.chart?.hideLoading()
            }
          })
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      this.chart = null
    },
    methods: {
      // 初始化echarts实例
      handleInitEcharts() {
        // 处理的方法必填
        if (typeof this.handleOption !== 'function') {
          console.error('handleOption is required and must be function')
          return
        }

        const options = this.handleOption(this.data)

        // 必须返回echarts配置项
        if (
          !options ||
          Object.prototype.toString.call(options) !== '[object Object]'
        ) {
          console.error('handleOption must be returned and is of type object')
          return
        }

        // 初始过的实例只需重新设置option
        if (this.chart) {
          this.chart.clear()
          this.chart.setOption(options)
          this.chart.hideLoading()
          return
        }

        this.$nextTick(() => {
          // 仅初始化一次
          const dom = this.$refs[this.echartsRef]
          // 初始化实例
          this.chart = echarts.init(dom)
          this.$emit('on-init', this.chart)

          // 设置option
          this.chart.setOption(options)
          this.chart.hideLoading()
          this.$emit('on-options', this.chart)

          // 添加监听事件
          const handleResize = () => {
            this.chart.resize()
          }
          window.addEventListener('resize', handleResize)

          // 及时销毁事件监听及echarts实例
          this.$once('hook:beforeDestroy', () => {
            window.removeEventListener('resize', handleResize)
            this.$emit('on-destroy', this.chart)
            this.chart?.dispose()
            this.chart = null
          })
        })
      },
    },
  }
</script>