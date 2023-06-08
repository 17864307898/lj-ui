<template>
  <el-card class="lj-form-filter2-box">
    <div class="lj-form-filter-con">
      <!-- 表单筛选项 start -->
      <el-form ref="formData" :model="form" v-bind="ljForm">
        <!-- 表单头部  start -->
        <div class="collapse-head-box">
          <el-form-item
            v-for="(item, index) in formListTop"
            :key="`${item.code}_${index}`"
            :class="item.label ? '' : 'no-title'"
            :label="item.label"
            :prop="item.field"
            v-bind="item.ljFormItem"
          >
            <slot :name="item.field" :form="form" :item="item" :index="index">
              <lj-input
                v-model="form[item.field]"
                v-bind="item"
                @blur="handleBlur($event, item)"
                @change="handleChange($event, item)"
                @input="handleInput($event, item)"
                @keyup.enter.native="handleEnter($event, item)"
              />
            </slot>
          </el-form-item>
          <!-- 头部右侧筛选按钮 -->
          <div class="head-right">
            <span
              @click="handleMore"
              v-if="(formList && formList.length) > headNum"
            >
              <slot name="reference">
                <span class="closeFilter">
                  {{
                    filterVisble
                      ? translate('retract')
                      : translate('moreFilter')
                  }}
                  <i
                    :class="
                      filterVisble ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                    "
                  ></i>
                </span>
              </slot>
            </span>
            <el-button size="mini" @click="handleReset()">
              {{ filterContent.reset || translate('reset') }}
            </el-button>
            <el-button size="mini" type="primary" @click="handleFilter()">
              {{ filterContent.search || translate('search') }}
            </el-button>
          </div>
        </div>
        <!-- 表单头部  end -->
        <!-- 表单筛选底部  start -->
        <el-collapse-transition v-if="filterVisble">
          <div class="collapse-box">
            <el-row v-bind="ljRow">
              <el-col
                v-for="(item, index) in formListContent"
                :key="`${item.code}_${index}`"
                v-bind="item.ljCol"
                :span="item.ljItemSpan || ljSpan || null"
              >
                <el-form-item
                  :key="`${item.code}_${index}`"
                  :class="item.label ? '' : 'no-title'"
                  :label="item.label"
                  :prop="item.field"
                  v-bind="item.ljFormItem"
                >
                  <slot
                    :name="item.field"
                    :form="form"
                    :item="item"
                    :index="index"
                  >
                    <lj-input
                      v-model="form[item.field]"
                      v-bind="item"
                      @blur="handleBlur($event, item)"
                      @change="handleChange($event, item)"
                      @input="handleInput($event, item)"
                    />
                  </slot>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
        <!-- 表单筛选底部  end -->
      </el-form>
      <!-- 表单筛选项 end -->
    </div>
  </el-card>
</template>
<script>
import './import';
import { translate } from '../utils/translate';
const t = translate('ljFilter');
export default {
  name: 'LjCollapseFilter',
  props: {
    // 表单筛选内容一行显示几个
    ljSpan: {
      type: [Number, String],
      default: '',
    },
    // 表单筛选el-row属性
    ljRow: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 表单筛选el-form属性
    ljForm: {
      type: Object,
      default: () => {
        return {
          labelWidth: '100px',
        };
      },
    },
    // 表单筛选按钮文案
    filterContent: {
      type: Object,
      default: () => {
        return {
          reset: '',
          search: '',
        };
      },
    },
    // 表单头部左侧显示个数
    headNum: {
      type: Number,
      default: 1,
    },
    formList: {
      // form列表
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {
      // form值
      type: Object,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      form: {},
      filterVisble: false,
      formListTop: [],
      formListContent: [],
    };
  },
  watch: {
    // 更改form值
    value: {
      handler(val) {
        this.form = val
      },
      immediate: true,
      deep: true,
    },
    // 监听form值
    form: {
      handler(val) {
        this.$emit('input', val)
      },
      immediate: true,
      deep: true,
    },
    // 监听form列表
    formList: {
      handler() {
        this.initData();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    initData() {
      // 将表单列表分为头部和底部内容
      this.formListTop = this.formList.filter((el, index) => {
        return index < this.headNum;
      });
      this.formListContent = this.formList.filter((el, index) => {
        return index >= this.headNum;
      });
    },
    // 置空
    handleReset() {
      this.$refs.formData ? this.$refs.formData.resetFields() : null;
      this.$emit('form-data', {});
    },
    // 筛选按钮
    handleFilter() {
      this.$emit('form-data', this.form);
    },
    // 更多筛选
    handleMore() {
      this.filterVisble = !this.filterVisble;
    },
    // 翻译
    translate(path) {
      return t(path);
    },
    // 关联处理
    fnRelations(item) {
      if (item.ljRelations) {
        let data =
          typeof item.ljRelations === 'string'
            ? item.ljRelations.split(',')
            : item.ljRelations;
        data.forEach((el) => {
          this.$set(this.form, el, undefined);
        });
      }
    },
    handleChange(val, item) {
      this.fnRelations(item);
      this.$emit('form-change', item.field, this.form[item.field], this.form);
    },
    handleInput(val, item) {
      this.$emit('form-input', item.field, this.form[item.field], this.form);
    },
    handleBlur(val, item) {
      this.fnRelations(item);
      this.$emit('form-blur', item.field, this.form[item.field], this.form);
    },
    handleEnter(val, item) {
      this.fnRelations(item);
      this.$emit('form-enter', item.field, this.form[item.field], this.form);
    },
  },
};
</script>
<style lang="scss" scoped></style>
