<template>
  <div v-if="(completed && uncompleted)" class="jcnr">
    <!-- 多行展示 -->
    <div
      v-for="(item, index) in config"
      :key="`${item.key}_${index}`"
      class="line"
    >
      <span class="title">{{ item.label }}</span>

      <!-- 进度条 -->
      <div class="progress">
        
        <!-- 已检测 -->
        <el-tooltip
          class="item"
          :content="t('participateTesting') + handleText(item.key, 1, item.isSize)"
          effect="light"
          :disabled="!showTrace"
          placement="top"
        >
          <div class="fl" :style="`width: ${handlePercent(item.key)}`">
            {{ handleText(item.key, 1, item.isSize) }}
          </div>
        </el-tooltip>

        <!-- 未检测 -->
        <el-tooltip
          class="item"
          :content="t('unParticipateTesting') + handleText(item.key, 2, item.isSize)"
          effect="light"
          :disabled="!showTrace"
          placement="top"
        >
          <div class="fr" :style="`width: ${handlePercent(item.key, 2)}`">
            {{ handleText(item.key, 2, item.isSize) }}
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import { handleFormat, t } from './format'
  import { byteConvert } from '../utils'

  export default {
    name: 'lj-check',
    components: {},
    props: {
      // 数据集
      data: {
        type: Array,
        default: () => undefined,
      },
      // 自定义配置
      customConfig: {
        type: Array,
        default: () => undefined,
      },
      // 自定义格式化 需返回completed 及 uncompleted
      format: {
        type: Function,
        default: handleFormat,
      },
      // 是否开启溯源
      showTrace: {
        type: Boolean,
        default: () => true,
      },
    },
    data() {
      return {
        completed: null, // 已完成检测
        uncompleted: null, // 未完成检测
      }
    },
    computed: {
      // 最终配置
      config() {
        if (this.customConfig) return this.customConfig

        // 默认配置
        const DEFAULT_CONFIG = [
          {
            label: t('codeLines'), // 左侧文案
            key: 'line', // 取值
            isSize: false, // 是否为文件大小
            completeColor: '',  // 已完成的颜色
            unCompleteColor: '', // 未完成的颜色
            needTip: true, // 是否需要toolTip
          },
          {
            label: t('fileCount'), // 左侧文案
            key: 'count', // 取值
            isSize: false, // 是否为文件大小
            completeColor: '',  // 已完成的颜色
            unCompleteColor: '', // 未完成的颜色
            needTip: true, // 是否需要toolTip
          },
          {
            label: t('capacity'), // 左侧文案
            key: 'size', // 取值
            isSize: true, // 是否为文件大小
            completeColor: '',  // 已完成的颜色
            unCompleteColor: '', // 未完成的颜色
            needTip: true, // 是否需要toolTip
          },
        ]

        return DEFAULT_CONFIG
      },
    },
    created() {
      this.formatCheckTotal()
    },
    methods: {
      // 国际化
      t(path) {
        return t(path)
      },
      // 展示处理
      handleText(key, type/**1 已完成 2 未完成 */, byte/**需要转换字节 */) {
        const num = type === 1 ? this.completed[key] : this.uncompleted[key]

        if (!byte) return num

        return byteConvert(num)
      },
      // 检测内容统计 格式化
      formatCheckTotal() {
        const {
          completed,
          uncompleted,
        } = this.format(this.data)

        this.completed = completed
        this.uncompleted = uncompleted
      },
      // 格式化为百分比
      handlePercent(key, type = 1/**1 已完成 2 未完成 */) {
        const total = this.completed[key] + this.uncompleted[key]
        const current = type === 1 ? this.completed[key] : this.uncompleted[key]

        const percent = Math.max((current / total) * 100, 10)
        return `${percent}%`
      }
    }
  }
</script>
