<template>
  <el-form
    ref="formItems"
    :inline="true"
    label-width="140px"
    :model="queryForm"
    @submit.native.prevent
  >
    <el-form-item label="来源">
      <el-select
        v-model="queryForm.importType"
        clearable
        placeholder="请选择"
        value-key="label"
      >
        <el-option
          v-for="item in publicListData.importList"
          :key="item.id"
          :label="item.type"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
import Vue from 'vue';
import { Form, FormItem, Select, Option } from 'element-ui';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);

export default {
  name: 'security-vulnerability',
  props: {
    publicListData: {
      type: Object,
      default: () => ({}),
    },
    filterClose: {
      type: Object,
      default: () => ({}),
    },
    filterReset: {
      type: Number,
      default: 0,
    },
    filterSure: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      popoverShow: false,
      queryForm: {
        importType: '',
      },
    };
  },
  watch: {
    filterClose: {
      handler(newVal) {
        switch (newVal.id) {
          case 1:
            this.queryForm.importType = '';
            break;
          default:
            break;
        }
        this.filterBtn();
      },
    },
    filterReset: {
      handler(newVal) {
        if (newVal) {
          this.resetBtn();
        }
      },
    },
    filterSure: {
      handler(newVal) {
        if (newVal) {
          this.filterBtn();
        }
      },
    },
    immediate: true,
    deep: true,
  },
  methods: {
    resetBtn() {
      this.queryForm = {
        importType: '',
      };
      this.$emit('filterChooseData', this.queryForm);
    },
    filterBtn() {
      this.$emit('filterChooseData', this.queryForm);
      this.popoverShow = false;
    },
  },
};
</script>
<style lang="scss">
.el-form {
  .el-form-item {
    margin-bottom: 5px;
  }
}
</style>
