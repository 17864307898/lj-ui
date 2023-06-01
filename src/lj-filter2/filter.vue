<template>
  <el-card class="lj-form-filter2-box">
    <div class="lj-form-filter-con">
      <!-- 表单筛选项 start -->
      <el-form ref="formData" :model="form">
        <div class="collapse-head-box">
          <!-- 筛选头部左侧其它内容 -->
          <slot name="head-left"></slot>
          <el-form-item
            v-for="(item, index) in formListTop"
            :key="`${item.code}_${index}`"
            :class="fnFormItemClass(item)"
            :label="item.label"
            :label-width="labelWidth"
            :prop="item.field"
            :style="{ width: item.width }"
          >
            <slot v-if="item.code === 110" :name="item.field"></slot>
            <lj-input
              v-else
              v-model="form[item.field]"
              v-bind="item"
              @blur="handleBlur"
              @change="handleChange"
              @input="handleInput"
              @keyup.enter.native="handleEnter()"
            />
          </el-form-item>
          <!-- 筛选头部右侧按钮 -->

          <div class="head-right">
            <p @click="handleFilter">
              <slot name="reference">
                <span class="closeFilter">
                  {{ filterVisble ? translate('retract') : translate('moreFilter') }}
                  <i
                    :class="
                      filterVisble ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                    "
                  ></i>
                </span>
              </slot>
            </p>
            <el-button size="mini" @click="fnReset()">
              {{ filterContent.reset || translate('reset') }}
            </el-button>
            <el-button size="mini" type="primary" @click="fnFilter()">
              {{ filterContent.search || translate('search') }}
            </el-button>
          </div>
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
              <slot v-if="item.code === 110" :name="item.field"></slot>
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
        </el-collapse-transition>
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
  name: 'LjFilter2',
  props: {
    filterContent: {
      type: Object,
      default: {
        reset: '',
        search: '',
      }
    },
    headNum: {
      type: Number,
      default: 0,
    },
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
      this.formListTop = this.formList.filter((el, index) => {
        return index < this.headNum;
      });
      this.formListContent = this.formList.filter((el, index) => {
        return index >= this.headNum;
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
      // console.log('handleInput', arguments);
      this.$emit('handleFormChange', this.form);
    },
    handleInput() {
      this.$emit('handleFormInput', this.form);
    },
    handleBlur() {
      this.$emit('handleFormBlur', this.form);
    },
    handleEnter() {
      this.$emit('handleFormEnter', this.form);
    },
  },
};
</script>
<style lang="scss" scoped></style>
