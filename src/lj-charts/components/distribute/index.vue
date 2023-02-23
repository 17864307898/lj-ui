<template>
  <div class="content-wrap">
    <div class="title-wrap">
      <span class="title">{{ title || t('distributeTitle') }}</span>
    </div>
    <div class="title-wrap">
      <el-select v-model="chartType" @change="handleInit">
        <el-option
          v-for="(item, index) in chartList"
          :key="`${item.value}_${index}`"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <!-- 分布类型 -->
      <div v-if="chartType === 1" class="fr">
        <el-switch
          v-model="currentType"
          :active-text="t('files')"
          :active-value="1"
          :inactive-text="t('codes')"
          :inactive-value="2"
          @change="handleInit"
        />
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
      size="mini"
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
  import { handleOptions, formatData, t } from './handle'
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
      // 排序 desc 降序 asc 升序 
      order: {
        type: String,
        default: () => 'desc',
      },
      // 自定义val
      valueKey: {
        type: String,
        default: () => 'count',
      },
      // 自定义name
      nameKey: {
        type: String,
        default: () => 'type',
      },
      // 自定义表格配置
      customColumns: {
        type: Array,
        default: () => undefined,
      },
    },
    data(){
      return {
        currentType: 2,
        chartList: [
          {
            label: t('languageDistribution'),
            value: 1,
          },
          {
            label: t('fileTitle'),
            value: 2,
          },
        ],
        chartType: 1,
      }
    },
    computed: {
      // 表格配置
      columns() {
        if (this.chartType === 1) return handleColumns(this.currentType)
      
        if (this.customColumns) return this.customColumns

        return [
          {
            label: t('index'),
            type: 'index',
          },
          {
            label: t('fileName'),
            prop: this.nameKey,
          },
          {
            label: t('fileCount'),
            prop: this.valueKey,
          },
        ]
      },
    },
    methods: {
      // 类型切换
      handleInit() {
        this.handleInitChart()
        this.handleInitTable()
      },
      // 初始化echarts
      handleInitChart() {
        if (!this.isChart) return

        const option = handleOptions.call(this)
        this.handleEcharts(option)
      },
      // 数据处理
      formatData() {
        return formatData.call(this, true)
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
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: 600;
      }
    }
    .last-line {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>