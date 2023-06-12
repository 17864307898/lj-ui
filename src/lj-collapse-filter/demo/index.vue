<template>
  <lj-collapse-filter
    :form-list="formList"
    :head-num="2"
    :value="form"
    v-model="form"
    @form-data="fnGetformDatas"
    @form-change="fnFormChange"
  >
    <template #key9>
      <el-rate
        v-model="value"
        show-score
        text-color="#ff9900"
        score-template="{value}"
      >
      </el-rate>
    </template>
  </lj-collapse-filter>
</template>

<script>
import { VUL_RISK_LEVEL_LIST, LIST } from './const';
export default {
  data() {
    return {
      form: {},
      value: 2,
      // 筛选表单数据
      formList: [
        {
          code: 103,
          label: '分组',
          options: [
            { label: '漏洞', type: '漏洞', value: 2 },
            { label: '组件', type: '组件', value: 0 },
          ],
          filterable: true,
          clearable: true,
          multiple: false,
          field: 'key1',
          ljRelations: ['key2'],
          ljFormItem: {
            labelWidth: '50px',
          },
        },
        {
          code: 101,
          showWordLimit: false,
          maxlength: 30,
          label: '',
          clearable: true,
          placeholder: '请输入漏洞编号',
          field: 'key2',
          size: 'mini',
          ljRelations: ['key3'],
        },
        {
          code: 103,
          label: '利用成熟度',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key3',
          // ljItemSpan: 8,
        },
        {
          code: 103,
          label: '作用域',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key4',
          // ljItemSpan: 8,
        },
        {
          code: 103,
          label: '漏洞类型',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key5',
          // ljItemSpan: 8,
        },
        {
          code: 107,
          label: '漏洞等级',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key6',
        },
        {
          code: 109,
          label: '许可证等级',
          options: LIST,
          filterable: true,
          multiple: true,
          field: 'key7',
          ljItemSpan: 12,
        },
        {
          code: 109,
          label: '许可证等级',
          options: LIST,
          filterable: true,
          multiple: true,
          field: 'key7',
          ljItemSpan: 12,
        },
        {
          code: 108,
          label: 'switch开关',
          activeText: '打开',
          inactiveText: '关闭',
          field: 'key8',
        },
        {
          field: 'key9',
        },
      ],
    };
  },
  created() {},
  methods: {
    // 筛选表单数据
    fnGetformDatas(data) {
      console.log('取得表单数据', data);
    },
    fnFormChange(index, data, forms) {
      console.log('取得单个表单内容', index, data, forms);
    },
  },
};
</script>

<style lang="scss" scoped></style>
