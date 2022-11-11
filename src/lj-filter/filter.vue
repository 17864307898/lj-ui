<template>
  <div class="form-filter-box">
    <div class="form-filter-head">
      <slot name="query"></slot>
      <el-popover
        v-if="filterShow"
        v-model="popoverShow"
        placement="bottom-start"
        trigger="click"
        width="400"
      >
        <div class="form-filter-con">
          <h1>筛选方式</h1>
          <!-- 表单筛选项 start -->
          <slot
            :filterClose="filterClose"
            :filterSure="filterSure"
            name="filterItems"
            :resetData="resetData"
          ></slot>
          <!-- 表单筛选项 end -->
          <div class="box-bottom">
            <el-button type="text" @click="resetBtn()">重置</el-button>
            <div>
              <el-button size="mini" @click="popoverShow = false"
                >取消</el-button
              >
              <el-button size="mini" type="primary" @click="filterBtn()">
                筛选
              </el-button>
            </div>
          </div>
        </div>
        <div slot="reference">
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
          {{copyWriting.chooseDoc}}：{{ tableSelArr.length || '' }}
          <!-- 批量删除 -->
          <slot
            v-if="tableSelArr && tableSelArr.length > 0"
            name="batchRemove"
          ></slot>
          <!-- 批量忽略 -->
          <slot
            v-if="tableSelArr && tableSelArr.length > 0"
            name="batchIgnore"
          ></slot>
        </p>
        <!-- 表单筛选tag start -->
        <el-tag
          v-for="(tag, index) in filterChooseList"
          :key="tag.type"
          closable
          :disable-transitions="false"
          @close="filterChooseClose(tag, index)"
        >
          {{ tag.type }} :
          <b v-if="typeof tag.item == 'string'">{{ tag.item }}</b>
          <span v-else>
            <b v-for="(el, ind) in tag.item" :key="ind">{{ el }}</b>
          </span>
        </el-tag>
        <el-tag v-if="filterChooseList && filterChooseList.length > 0">
          <p class="reset" @click="fnResetFilter">
            {{copyWriting.resetDoc}}
            <i class="el-icon-error"></i>
          </p>
        </el-tag>
      </div>
      <!-- 表单筛选tag end -->
      <!-- 右侧内容 -->
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
import Vue from 'vue';
import {
  Form,
  FormItem,
  Select,
  Switch,
  Popover,
  Option,
  Button,
  Tag,
  Link,
} from 'element-ui';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Popover);
Vue.use(Option);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Link);

export default {
  name: 'lj-filter',
  props: {
    filterShow: {
      type: Boolean,
      default: false,
    },
    copyWriting: {
      // 表单筛选项
      type: Object,
      default: () => {
        return {};
      },
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
      resetData: 1,
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
    resetBtn() {
      this.resetData += this.resetData;
    },
    // 筛选按钮
    filterBtn() {
      this.filterSure += this.filterSure;
      this.popoverShow = false;
    },
    // 关闭哪个
    filterChooseClose(tag) {
      this.filterClose = tag;
    },
    // 清空
    fnResetFilter() {
      this.resetBtn();
    },
  },
};
</script>
