<template>
  <lj-filter2
    :form-list="formList"
    :head-num="2"
    @form-data="fnGetformDatas"
  >
    <template #key9>
      <el-input placeholder="其它内容"></el-input>
    </template>
  </lj-filter2>
</template>

<script>
import {VUL_RISK_LEVEL_LIST, LIST} from './const'
export default {
  data() {
    return {
      // 筛选表单数据
      formList: [
        {
          code: 104,
          label: '分组',
          options: [
            { label: '漏洞', type: '漏洞', value: 2 },
            { label: '组件', type: '组件', value: 0 },
          ],
          filterable: true,
          multiple: true,
          field: 'key1',
        },
        {
          code: 101,
          showWordLimit: false,
          maxlength: 30,
          label: '漏洞编号',
          clearable: true,
          placeholder: '请输入漏洞编号',
          field: 'key2',
          className: 'no-title',
        },
        {
          code: 103,
          label: '利用成熟度',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key3',
          ljColNum: 8,
        },
        {
          code: 103,
          label: '作用域',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key4',
          ljColNum: 8,
        },
        {
          code: 103,
          label: '漏洞类型',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key5',
          ljColNum: 8,
        },
        {
          code: 107,
          label: '漏洞等级',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key6',
          ljWidth: '100%',
        },
        {
          code: 109,
          label: '许可证等级',
          options: LIST,
          filterable: true,
          multiple: true,
          field: 'key7',
          ljWidth: '50%',
          ljColNum: 12,
        },
        {
          code: 109,
          label: '许可证等级',
          options: LIST,
          filterable: true,
          multiple: true,
          field: 'key7',
          ljWidth: '50%',
          ljColNum: 12,
        },
        {
          code: 108,
          label: 'switch开关',
          activeText: '打开',
          inactiveText: '关闭',
          field: 'key8'
        },
        {
          code: 110,
          ljSlotSwitch: true,
          field: 'key9',
          className: 'no-title',
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
  },
};
</script>

<style lang="scss" scoped></style>
