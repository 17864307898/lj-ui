<template>
  <div class="content-wrap">
    <div class="title-wrap">
      <div class="title">
        {{ defaultTitle }}
      </div>

      <el-select
        v-if="chartType === 1"
        v-model="currentType"
        @change="handleInitChart"
      >
        <el-option
          v-for="(item, index) in options"
          :key="`${item.value}_${index}`"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <!-- chart视图 -->
    <div ref="echarts" :style="`height: ${chartHeight}`"></div>

    <!-- 详情 -->
    <div class="last-line">
      <el-button type="text" @click="handleViewDetails">
        {{ t('details') }}
      </el-button>
    </div>
  </div>
</template>

<script>
  import mixins from '../../mixins'
  import t, { handleOptions } from './handle'

  export default {
    name: 'adapt-license-risk',
    components:{},
    mixins: [mixins],
    props: {
      // 图表类型  1 许可证  2 漏洞
      chartType: {
        type: [Number, String],
        default: () => 1,
      },
    },
    data(){
      return {
        currentType: 1,
      }
    },
    computed: {
      // 下拉选项
      options() {
        return [
          {
            value: 1,
            label: t('licenseRisk'),
          },
          {
            value: 2,
            label: t('compatibilityRisk'),
          },
          {
            value: 3,
            label: t('tamperingRisk'),
          },
        ]
      },
      // 默认标题
      defaultTitle() {
        if (this.title) return this.title

        const map = {
          1: 'licenseRiskStatistics',
          2: 'holeRiskStatistics',
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
      // 查看详情
      handleViewDetails() {
        this.$emit('detail', this.currentType)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .content-wrap {
    width: 100%;
    .title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
    }

    .last-line {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>