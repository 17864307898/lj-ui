<template>
  <div class="content-wrap">
    <div class="title-wrap">
      <span class="title">{{ title || translate('distributeTitle') }}</span>

      <!-- 分布类型 -->
      <div class="fr">
        <el-button
          :plain="currentType === 1 ? false : true"
          size="mini"
          :type="currentType === 1 ? 'primary' : ''"
          @click="handleClick(1)"
        >
          {{ translate('files') }}
        </el-button>

        <el-button
          :plain="currentType === 2 ? false : true"
          size="mini"
          :type="currentType === 2 ? 'primary' : ''"
          @click="handleClick(2)"
        >
          {{ translate('codes') }}
        </el-button>
      </div>
    </div>

    <!-- chart视图 -->
    <div
      v-if="isChart"
      id="echarts"
      :style="`height: ${chartHeight}`"
    ></div>
    
    <!-- 表格视图 -->
    <lj-table
      v-else
      :columns="columns"
      :data="tableList"
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
  import { handleOptions, t, formatData } from './handle'
  import { handleColumns } from './config'
  import mixins from '../../mixins'

  export default {
    name: 'adapt-distribute',
    components:{},
    mixins: [mixins],
    props:{
      // 标题
      title: {
        type: String,
        default: () => '',
      },
      // 数据集
      data: {
        type: Array,
        default: () => undefined,
      },
      // 自定义颜色
      colors: {
        type: Array,
        default: () => undefined,
      },
    },
    data(){
      return {
        currentType: 1,
        isChart: true, // 展示为图表
        tableList: [], // 表格数据
        tableLoading: false,
      }
    },
    computed: {
      // 切换文字
      switchText() {
        if (this.isChart) return t('switchTable')

        return t('switchChart')
      },
      // 表格配置
      columns() {
        return handleColumns(this.currentType)
      },
    },
    watch: {
      data: {
        handler(val) {
          if (val) {
            this.handleInitChart()
          }
        },
        immediate: true,
        deep: true,
      },
    },
    methods: {
      // 国际化
      translate(path) {
        return t(path)
      },
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
        
        if (this.chart) {
          this.chart.dispose()
          this.chart = null
        }
        this.tableList = formatData(this.data, this.currentType, true)
        this.tableLoading = false
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