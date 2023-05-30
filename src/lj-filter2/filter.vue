<template>
  <el-card class="lj-form-filter2-box">
    <el-collapse-transition>
      <div class="lj-form-filter-con">
        <!-- 表单筛选项 start -->
        <slot name="filter-items">
          <el-form ref="formData" :model="form">
            <div class="collapse-head-box">
              <el-form-item
                v-for="(item, index) in formListTop"
                :key="`${item.code}_${index}`"
                :class="fnFormItemClass(item)"
                :label="item.label"
                :label-width="labelWidth"
                :prop="item.field"
                :style="{ width: item.width }"
              >
                <span
                  class="filter-btn"
                  v-if="item.className === 'filter-icon'"
                  @click="handleFilter"
                >
                  <slot name="reference">
                    <i class="el-icon-ice-cream"></i>
                  </slot>
                </span>

                <lj-input
                  v-else
                  v-model="form[item.field]"
                  v-bind="item"
                  @blur="handleBlur"
                  @change="handleChange"
                  @input="handleInput"
                />
              </el-form-item>
            </div>
            <el-collapse-transition v-if="filterVisble">
              <div class="collapse-box">
                <el-form-item
                  v-for="(item, index) in formListContent"
                  :key="`${item.code}_${index}`"
                  :class="fnFormItemClass(item)"
                  :label="item.label"
                  label-width="110px"
                  :prop="item.field"
                  :style="{ width: item.width }"
                >
                  <lj-input
                    v-model="form[item.field]"
                    v-bind="item"
                    @blur="handleBlur"
                    @change="handleChange"
                    @input="handleInput"
                  />
                </el-form-item>
              </div>
            </el-collapse-transition>
          </el-form>
        </slot>
        <!-- 表单筛选项 end -->
        <div class="box-bottom">
          <div>
            <el-button size="mini" @click="fnReset()">
              {{ translate('reset') }}
            </el-button>
            <el-button size="mini" type="primary" @click="fnFilter()">
              {{ translate('search') }}
            </el-button>
          </div>
          <p class="closeFilter" @click="handleFilter">
           {{ translate('moreFilter')}}
            <i
              :class="filterVisble ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            ></i>
          </p>
        </div>
      </div>
    </el-collapse-transition>
  </el-card>
</template>
<script>
import './import';
import { translate } from '../utils/translate';
const t = translate('ljFilter');
export default {
  name: 'LjFilter2',
  props: {
    labelWidth: {
      type: String,
      default: '110px',
    },
    formList: {
      // table选择项
      type: Array,
      default: () => {
        return [];
      },
    },
    filterHeadNum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {},
      filterVisble: true,
      formListTop: [],
      formListContent: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let filterIndex = 0;
      this.formList.forEach((el, index) => {
        if (el.className === 'filter-icon') {
          filterIndex = index;
        }
      });
      this.formListTop = this.formList.filter((el, index) => {
        return index < filterIndex + 1;
      });
      this.formListContent = this.formList.filter((el, index) => {
        return index >= filterIndex + 1;
      });
    },
    // 表单内单个class
    fnFormItemClass(item) {
      let data = '';
      switch (item.className) {
        case 'filter-icon':
          data = 'item-filter-icon';
          break;
        case 'no-title':
          data = 'item-no-title';
          break;
        default:
          data = '';
          break;
      }
      return data;
    },
    // 置空
    fnReset() {
      this.$refs.formData ? this.$refs.formData.resetFields() : null;
      this.$emit('form-data', {});
    },
    // 筛选按钮
    fnFilter() {
      this.$emit('form-data', this.form);
    },
    // 更多筛选
    handleFilter() {
      this.filterVisble = !this.filterVisble;
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
<style lang="scss" scoped>

</style>
