<template>
  <div class="lj-form-filter-box">
    <div class="form-filter-head">
      <div>
        <!-- query左边输入框内容 -->
        <slot name="left-box"></slot>
        <el-popover
          v-if="filterShow"
          v-model="popoverShow"
          placement="bottom-start"
          trigger="click"
          width="400"
        >
          <div class="lj-form-filter-con">
            <h1>{{ translate('screenMethod') }}</h1>
            <!-- filterItems表单筛选项 start -->
            <slot
              :filterClose="filterClose"
              :filterSure="filterSure"
              name="filter-items"
              :filterReset="filterReset"
            >
              <el-form ref="formData" :model="form">
                <el-form-item
                  v-for="(item, index) in formList"
                  :key="`${item.code}_${index}`"
                  label-width="110px"
                  :label="item.label"
                  :prop="item.field"
                >
                  <lj-input
                    v-model="form[item.field]"
                    v-bind="item"
                    @change="handleChange"
                    @input="handleInput"
                    @blur="handleBlur"
                  />
                </el-form-item>
              </el-form>
            </slot>
            <!-- 表单筛选项 end -->
            <div class="box-bottom">
              <el-button type="text" @click="fnReset()">{{
                translate('reset')
              }}</el-button>
              <div>
                <el-button size="mini" @click="popoverShow = false">{{
                  translate('cancel')
                }}</el-button>
                <el-button size="mini" type="primary" @click="fnFilter()">
                  {{ translate('screen') }}
                </el-button>
              </div>
            </div>
          </div>
          <div slot="reference">
            <!-- reference筛选icon -->
            <slot name="reference"><i class="el-icon-ice-cream"></i></slot>
          </div>
        </el-popover>
      </div>
      <!-- query右边输入框内容 -->
      <slot name="right-box"></slot>
    </div>
    <div class="filter-choose-box">
      <div class="filter-choose-left">
        <div>
          <!-- 表单筛选tag左侧内容 -->
          <slot name="tag-left-box"></slot>
          <!-- 表单筛选tag start -->
          <el-tag
            v-for="(tag, index) in filterChooseList"
            :key="tag.type"
            closable
            :disable-transitions="false"
            @close="fnChooseClose(tag, index)"
          >
            {{ tag.type }} :

            <span v-if="typeof tag.item == 'object'">
              <b v-for="(el, ind) in tag.item" :key="ind">{{ el }}</b>
            </span>
            <b v-else>{{ tag.item }}</b>
          </el-tag>
          <el-tag v-if="filterChooseList && filterChooseList.length > 0">
            <p class="reset" @click="fnEmpty">
              {{ translate('clear') }}
              <i class="el-icon-error"></i>
            </p>
          </el-tag>
          <!-- 表单筛选tag end -->
        </div>
        <!-- 表单筛选tag右侧内容 -->
        <slot name="tag-right-box"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import './import';
import { translate } from '../utils/translate';
const t = translate('ljFilter');

export default {
  name: 'lj-filter',
  props: {
    filterShow: {
      type: Boolean,
      default: false,
    },
    filterList: {
      // 表单筛选项
      type: Array,
      default: () => {
        return [];
      },
    },
    formList: {
      // table选择项
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    filterList: {
      handler(val) {
        this.filterChooseList = [...val];
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      popoverShow: false,
      filterReset: 1,
      filterSure: 1,
      filterClose: {},
      form: {},
      filterChooseList: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {},
    // 置空
    fnReset() {
      this.filterReset += this.filterReset;
      this.filterChooseList = [];
      this.$refs.formData ? this.$refs.formData.resetFields() : null;
      this.$emit('form-data', {});
    },
    // 筛选按钮
    fnFilter() {
      this.filterChooseList = [];
      this.formList.forEach((el) => {
        // 数据处理
        // 多选
        if (typeof this.form[el.field] == 'object') {
          let riskLevelArr = [];
          el.options.forEach((el2) => {
            this.form[el.field].forEach((el3) => {
              if (el3 == el2.value) {
                riskLevelArr.push(el2.label);
              }
            });
          });
          if (this.form[el.field].length > 0) {
            this.filterChooseList.push({
              id: el.field,
              type: el.label,
              item: riskLevelArr,
            });
            riskLevelArr = [];
          }
        } else {
          // 单选
          if (this.form[el.field] && el.multiple === false) {
            let riskLevelArr = [];
            el.options.forEach((el2) => {
              if (this.form[el.field] == el2.value) {
                riskLevelArr.push(el2.label);
              }
            });
            this.filterChooseList.push({
              id: el.field,
              type: el.label,
              item: riskLevelArr,
            });
            riskLevelArr = [];
          } else if (this.form[el.field]) {
            // 单输入内容
            this.filterChooseList.push({
              id: el.field,
              type: el.label,
              item: this.form[el.field],
            });
          }
        }
      });
      this.$emit('form-data', {
        form: this.form,
        filterChooseList: this.filterChooseList,
      });
      this.filterSure += this.filterSure;
      this.popoverShow = false;
    },
    // 关闭哪个
    fnChooseClose(tag) {
      if (this.filterChooseList.length > 1) {
        this.filterChooseList = this.filterChooseList.filter((el) => {
          return el.id !== tag.id;
        });
      } else {
        this.fnEmpty();
      }
      this.$emit('tag-close', tag);
      this.filterClose = tag;
    },
    // 清空
    fnEmpty() {
      this.fnReset();
    },
    // 翻译
    translate(path) {
      return t(path);
    },
    handleChange() {
      // console.log('handleChange', arguments);
    },
    handleInput() {
      // console.log('handleInput', arguments);
    },
    handleBlur() {},
  },
};
</script>
