<template>
  <div class="content-wrap">
    <div class="title">
      {{ defaultTitle }}
    </div>

    <!-- chart视图 -->
    <div ref="echarts" :style="`height: ${chartHeight}`"></div>
  </div>
</template>

<script>
  import mixins from '../../mixins'
  import { handleOptions } from './handle'

  export default {
    name: 'adapt-license-distribution',
    components: {},
    mixins: [mixins],
    props: {
      // 图表类型  1 许可证  2 漏洞
      chartType: {
        type: [Number, String],
        default: () => 1,
      },
      // y轴需要展示信息的下标 倒序
      config: {
        type: Array,
        default: () => [0, 1, 2],
      },
      // 是否开启溯源
      source: {
        type: Boolean,
        default: () => true,
      },
    },
    data() {
      return {}
    },
    computed: {
      // 默认标题
      defaultTitle() {
        if (this.title) return this.title

        const map = {
          1: 'licenseRiskDistribution',
          2: 'holeRiskDistribution',
        }

        return this.t(map[this.chartType])
      },
    },
    methods: {
      // 初始化
      handleInitChart() {
        const option = handleOptions.call(this)
        
        this.handleEcharts(option)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .content-wrap {
    width: 100%;
    .title {
      font-size: 18px;
      font-weight: 600;
    }
  }
</style>
