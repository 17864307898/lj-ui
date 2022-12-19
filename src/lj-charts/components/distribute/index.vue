<template>
  <div class="content-wrap">
    <div class="title-wrap">
      <span class="title">{{ title || t('distributeTitle') }}</span>

      <!-- 分布类型 -->
      <div class="fr">
        <el-button
          :plain="currentType === 1 ? false : true"
          size="mini"
          :type="currentType === 1 ? 'primary' : ''"
          @click="handleClick(1)"
        >
          {{ t('files') }}
        </el-button>

        <el-button
          :plain="currentType === 2 ? false : true"
          size="mini"
          :type="currentType === 2 ? 'primary' : ''"
          @click="handleClick(2)"
        >
          {{ t('codes') }}
        </el-button>
      </div>
    </div>

    <!-- chart视图 -->
    <div
      v-if="isChart"
      ref="echarts"
      :style="`height: ${chartHeight}`"
    ></div>
    
    <!-- 表格视图 -->
    <lj-table
      v-else
      :columns="columns"
      :data="tableList"
      :need-pagination="false"
      :style="`height: ${chartHeight}`"
    />

    <!-- 切换按钮 -->
    <div class="last-line">
      <el-button type="text" @click="handleView">
        {{ switchText }}
      </el-button>
    </div>
  </div>
</template>

<script>
  import { handleOptions, formatData } from './handle'
  import { handleColumns } from './config'
  import mixins from '../../mixins'

  export default {
    name: 'adapt-distribute',
    components:{},
    mixins: [mixins],
    props:{
      // 自定义颜色
      colors: {
        type: Array,
        default: () => undefined,
      },
    },
    data(){
      return {
        currentType: 1,
      }
    },
    computed: {
      // 表格配置
      columns() {
        return handleColumns(this.currentType)
      },
    },
    methods: {
      // 类型切换
      handleClick(type = 1) {
        this.currentType = type

        this.handleInitChart()
        this.handleInitTable()
      },
      // 初始化echarts
      handleInitChart() {
        if (!this.isChart) return

        const option = handleOptions(this.data, this.currentType, this.colors)
        this.handleEcharts(option)
      },
      // 数据处理
      formatData() {
        return formatData(this.data, this.currentType, true)
      },
    },
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
    .last-line {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>