<template>
  <!-- 风险趋势 -->
  <div class="content-wrap">
    <div class="title-wrap">
      <span class="title">{{ title || t('riskTrend') }}</span>

      <!-- 趋势类型 -->
      <div class="fr">
        <el-button
          v-for="item in btnList"
          :key="item.type"
          :plain="!(currentType === item.type)"
          size="mini"
          :type="currentType === item.type ? 'primary' : ''"
          @click="handleClick(item.type)"
        >
          {{ item.label }}
        </el-button>
      </div>
    </div>

    <!-- chart视图 -->
    <div ref="echarts" :style="`height: ${chartHeight}`"></div>
  </div>
</template>

<script>
  import { handleOptions } from './handle'
  import mixins from '../../mixins'

  export default {
    name: 'adapt-risk-trend',
    components:{},
    mixins: [mixins],
    props:{},
    data(){
      return {
        currentType: 1,
      }
    },
    computed: {
      // 按钮配置
      btnList() {
        return [
          {
            type: 1,
            label: this.t('vulnerabilityRisk'),
          },
          {
            type: 2,
            label: this.t('licenseRisk'),
          },
        ]
      },
    },
    methods: {
      // 初始化
      handleInitChart() {
        const option = handleOptions.call(this)
        
        this.handleEcharts(option)
      },
      // 切换模式
      handleClick(type) {
        this.currentType = type

        this.handleInitChart()
      },
    }
  }
</script>
<style lang="scss" scoped>
  .content-wrap {
    width: 100%;
    .title-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
</style>
