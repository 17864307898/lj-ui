<template>
  <div class="lj-level-box">
    <div>
      <slot name="left-box">
        <h1>{{ t('riskGrade') }}</h1>
      </slot>
      <div class="risk-box">
        <span
          v-for="item in screenList"
          :key="item.label"
          :class="{
            isActive: handleHasChecked(item),
            is_disabled: +item.num === 0 && item.value !== '',
          }"
          @click="handleItemClick(item)"
        >
          <b>{{ item.num }}</b>
          {{ t(item.label) || item.label }}
          <i v-if="handleHasChecked(item)" class="el-icon-check"></i>
        </span>
      </div>
    </div>
    <slot name="right-box"></slot>
  </div>
</template>

<script>
import { translate } from '../utils/translate';
const t = translate('ljSafteyCheck');

export default {
  name: 'lj-saftey-risk-check',
  props: {
    // 自定义label
    labelData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      screenList: [],
      localData: undefined, // 选中值
    };
  },
  watch: {
    labelData: {
      handler() {
        this.handleInit();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 初始化
    handleInit() {
      // 自定义label
      if (this.labelData) {
        this.screenList = this.labelData;
      }
      this.handleInitSelect();
    },
    // 数量初始化
    handleInitNum() {
      this.screenList.forEach((item) => {
        item.num = this.countInfo[item.id] || 0;
      });
    },
    // 初始有选中值时初始化
    handleInitSelect() {
      if (this.multiple) {
        this.localData = [];
        this.screenList.forEach((x) => {
          if (x.num > 0 && x.checked) this.localData.push(x.value);
        });

        if (!this.localData.length) this.localData = [''];
      } else {
        this.localData = '';
      }
    },
    // 点击选项(单选or多选)
    handleItemClick(item) {
      if (this.multiple) {
        this.handleMultiple(item);
      } else {
        this.handleSingle(item);
      }
    },
    // 单选处理方式
    handleSingle({ value, num }) {
      // 除全部外，其他安全风险等级数量为0 置灰
      if (+num === 0 && value !== '') {
        return;
      }
      this.localData = value;
      this.handleEmitData();
    },
    // 多选处理方式
    handleMultiple({ value, num }) {
      // 除全部外，其他安全风险等级数量为0 置灰
      if (+num === 0 && value !== '') {
        return;
      }

      // 点击全部，置空其他
      if (value === '') {
        const i = this.localData.findIndex((x) => x === value);
        if (i >= 0) return;

        this.localData = [''];
        this.handleEmitData();
        return;
      }

      // 存在的清空
      if (this.localData.includes(value)) {
        const i = this.localData.findIndex((x) => x === value);
        this.localData.splice(i, 1);
      } else {
        const i = this.localData.findIndex((x) => x === '');
        if (i >= 0) this.localData.splice(i, 1);

        this.localData.push(value);
      }

      // 默认选中全部tab栏
      if (this.localData.length === 0) {
        this.localData.push('');
      }

      this.handleEmitData();
    },
    // 判断是否已选中
    handleHasChecked({ value = '' }) {
      if (this.multiple) {
        return this.localData?.includes(value);
      }
      return this.localData === value;
    },
    // 导出事件
    handleEmitData() {
      this.$emit('change', this.localData);
    },
    // 国际化
    t(path) {
      return t(path);
    },
  },
};
</script>
