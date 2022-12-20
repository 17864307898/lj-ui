<template>
  <div class="form-filter-box">
    <div class="form-filter-head">
      <!-- query左边输入框内容 -->
      <slot name="left-query"></slot>
      <el-popover
        v-if="filterShow"
        v-model="popoverShow"
        placement="bottom-start"
        trigger="click"
        width="400"
      >
        <div class="form-filter-con">
          <h1>{{ translate('screenMethod') }}</h1>
          <!-- filterItems表单筛选项 start -->
          <slot
            :filterClose="filterClose"
            :filterSure="filterSure"
            name="filter-items"
            :filterReset="filterReset"
          ></slot>
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
    <div class="filter-choose-box">
      <div class="filter-choose-left">
        <p
          v-if="
            (filterChooseList && filterChooseList.length > 0) ||
            (tableSelArr && tableSelArr.length > 0)
          "
        >
          {{ filterContent.selected || translate('selected') }}：{{ tableSelArr.length || '' }}
          <!-- batchRemove批量删除 -->
          <slot
            v-if="tableSelArr && tableSelArr.length > 0"
            name="batch-remove"
          ></slot>
          <!-- batchIgnore批量忽略 -->
          <slot
            v-if="tableSelArr && tableSelArr.length > 0"
            name="batch-ignore"
          ></slot>
        </p>
        <!-- 表单筛选tag start -->
        <el-tag
          v-for="(tag, index) in filterChooseList"
          :key="tag.type"
          closable
          :disable-transitions="false"
          @close="fnChooseClose(tag, index)"
        >
          {{ tag.type }} :
          <b v-if="typeof tag.item == 'string'">{{ tag.item }}</b>
          <span v-else>
            <b v-for="(el, ind) in tag.item" :key="ind">{{ el }}</b>
          </span>
        </el-tag>
        <el-tag v-if="filterChooseList && filterChooseList.length > 0">
          <p class="reset" @click="fnEmpty">
            {{ translate('clear') }}
            <i class="el-icon-error"></i>
          </p>
        </el-tag>
      </div>
      <!-- 表单筛选tag end -->
      <!-- right-content右侧内容 -->
      <p
        class="r_pos"
        :class="{
          r_pos_bottom: filterChooseList.length > 0 || tableSelArr.length > 0,
        }"
      >
        <slot name="right-content"></slot>
      </p>
    </div>
  </div>
</template>
<script>
  import './import'
  import { translate } from '../utils/translate'
  const t = translate('ljFilter')

  export default {
    name: 'lj-filter',
    props: {
      filterContent: {
        // 表单文案
        type: Object,
        default: () => {
          return {};
        },
      },
      filterShow: {
        type: Boolean,
        default: false,
      },
      filterChooseList: {
        // 表单筛选项
        type: Array,
        default: () => {
          return [];
        },
      },
      tableSelArr: {
        // table选择项
        type: Array,
        default: () => {
          return [];
        },
      },
    },
    data() {
      return {
        popoverShow: false,
        filterReset: 1,
        filterSure: 1,
        filterClose: {},
      };
    },
    mounted() {
      this.initData();
    },
    methods: {
      initData() {},
      // 置空
      fnReset() {
        this.filterReset += this.filterReset
      },
      // 筛选按钮
      fnFilter() {
        this.filterSure += this.filterSure
        this.popoverShow = false
      },
      // 关闭哪个
      fnChooseClose(tag) {
        this.filterClose = tag
      },
      // 清空
      fnEmpty() {
        this.fnReset()
      },
      // 翻译
      translate(path) {
        return t(path)
      },
    },
  };
</script>
