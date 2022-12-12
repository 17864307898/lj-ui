<template>
  <!-- 普通柱状图展示 -->
  <div class="content-wrap">
    <div class="title">
      {{ title || t('fileTitle') }}
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
    <div v-if="canSwitch" class="last-line">
      <el-button type="text" @click="handleView">
        {{ switchText }}
      </el-button>
    </div>
  </div>
</template>

<script>
  import mixins from '../../mixins'
  import { t } from '../distribute/handle'
  import { handleOptions, formatData } from './handle'

  export default {
    name: 'adapt-file-type',
    components:{},
    mixins: [mixins],
    props:{
      // 是否可切换表格
      canSwitch: {
        type: Boolean,
        default: () => true,
      },
      // 视图是否存在可拖拽栏
      canDrag: {
        type: Boolean,
        default: () => true,
      },
      // 自定义颜色
      color: {
        type: String,
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
        default: () => 'size',
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
      return {}
    },
    computed: {
      columns() {
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
            label: t('fileSize'),
            prop: this.valueKey,
          },
        ]
      }
    },
    methods: {
      // 初始化
      handleInitChart() {
        const option = handleOptions.call(this)
        this.handleEcharts(option)
      },
      // 数据处理
      formatData() {
        return formatData(this.data, this.valueKey, this.order)
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

    .last-line {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>