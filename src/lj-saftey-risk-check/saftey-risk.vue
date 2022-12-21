<template>
  <div class="lj-level-box">
    <h1>{{ t('riskGrade') }}</h1>
    <div>
      <span
        v-for="(item) in screenList"
        :key="item.type"
        :class="{
          isActive: handleHasChecked(item),
          is_disabled: +item.num === 0 && item.id !== '',
        }"
        @click="handleItemClick(item)"
      >
        <b>{{ item.num }}</b>
        {{ item.type }}
        <i v-if="handleHasChecked(item)" class="el-icon-check"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import { translate } from '../utils/translate'
  const t = translate('ljSafteyCheck')

  export default {
    name: 'lj-saftey-risk-check',
    props: {
      // 自定义label
      labelData: {
        type: Object,
        default: () => undefined,
      },
      // 选中值
      selected: {
        type: [Array, Number, String],
        default: () => undefined,
      },
      // 是否支持多选
      multiple: {
        type: Boolean,
        default: () => true,
      },
      // 初始化数量
      countInfo: {
        type: Object,
        default: () => undefined,
      },
    },
    data() {
      return {
        screenList: [
          { id: '', type: t('all'), num: 0 },
          { id: 4, type: t('vulCritical'), num: 0 },
          { id: 3, type: t('vulHigh'), num: 0 },
          { id: 2, type: t('vulMid'), num: 0 },
          { id: 1, type: t('vulLow'), num: 0 },
          { id: 0, type: t('noRated'), num: 0 },
          { id: -1, type: t('riskFree'), num: 0 },
        ],
        localData: undefined, // 选中值
      }
    },
    watch: {
      countInfo: {
        handler(val) {
          if (val) {
            this.handleInitNum()
          }
        },
        immediate: true,
        deep: true,
      }
    },
    mounted() {
      this.handleInit()
    },
    methods: {
      // 初始化
      handleInit() {
        this.handleInitSelect()

        // 自定义label
        if (this.labelData) {
          this.screenList.forEach((item) => {
            item.type = this.labelData[item.id] || item.type
          })
        }
      },
      // 数量初始化
      handleInitNum() {
        this.screenList.forEach((item) => {
          item.num = this.countInfo[item.id] || 0
        })
      },
      // 初始有选中值时初始化
      handleInitSelect() {
        if (!this.selected && this.selected !== 0) {
          this.localData = this.multiple ? [''] : ''
          
          return
        }

        this.localData = this.selected
        if (this.multiple) {
          this.localData = []
          this.selected.forEach((x) => {
            const current = this.screenList.find((y) => y.id === x)

            if (current?.num) this.localData.push(x)
          })

          if (!this.localData.length) this.localData = ['']
        } else {
          const current = this.screenList.find((y) => y.id === this.selected)

          this.localData = current?.num ? this.selected : ''
        }
      },
      // 点击选项
      handleItemClick(item) {
        if (this.multiple) {
          this.handleMultiple(item)
        } else {
          this.handleSingle(item)
        }
      },
      // 单选处理方式
      handleSingle({ id, num }) {
        // 除全部外，其他安全风险等级数量为0 置灰
        if (+num === 0 && id !== '') {
          return
        }

        this.localData = id
        this.handleEmitData()
      },
      // 多选处理方式
      handleMultiple({ id, num }) {
        // 除全部外，其他安全风险等级数量为0 置灰
        if (+num === 0 && id !== '') {
          return
        }

        // 点击全部，置空其他
        if (id === '') {
          const i = this.localData.findIndex((x) => x === id)
          if (i >= 0) return
          
          this.localData = ['']
          this.handleEmitData()
          return
        }

        // 存在的清空
        if (this.localData.includes(id)) {
          const i = this.localData.findIndex((x) => x === id)
          this.localData.splice(i, 1)
        } else {
          const i = this.localData.findIndex((x) => x === '')
          if (i >= 0) this.localData.splice(i, 1)

          this.localData.push(id)
        }

        // 默认选中全部tab栏
        if (this.localData.length === 0) {
          this.localData.push('')
        }

        this.handleEmitData()
      },
      // 判断是否已选中
      handleHasChecked({ id = '' }) {
        if (this.multiple) {
          return this.localData?.includes(id)
        }

        return this.localData === id
      },
      // 导出事件
      handleEmitData() {
        this.$emit('change', this.localData)
      },
      // 国际化
      t(path) {
        return t(path)
      },
    },
  }
</script>
