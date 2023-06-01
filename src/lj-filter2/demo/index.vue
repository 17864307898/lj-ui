<template>
  <lj-filter2
    :form-list="formList"
    :head-num="3"
    @form-data="fnGetformDatas"
  />
</template>

<script>
export default {
  data() {
    var VUL_RISK_LEVEL_LIST = [
      {
        label: '严重',
        value: 4,
        disabled: true
      },
      {
        label: '高危',
        value: 3,
      },
      {
        label: '中危',
        value: 2,
      },
      {
        label: '低危',
        value: 1,
      },
      {
        label: 'Not-standard',
        value: 0,
      },
    ];
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
          code: 101,
          showWordLimit: true,
          maxlength: 30,
          label: '版本',
          placeholder: '请输入版本',
          field: 'key3',
          className: 'no-title',
        },
        {
          code: 103,
          label: '利用成熟度',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key4',
        },
        {
          code: 103,
          label: '作用域',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key5',
        },
        {
          code: 103,
          label: '漏洞类型',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key6',
        },
        {
          code: 107,
          label: '漏洞等级',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key7',
          width: '100%',
        },
        {
          code: 109,
          label: '许可证等级',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key8',
          width: '100%',
        },
        {
          code: 109,
          label: '其它等级',
          options: VUL_RISK_LEVEL_LIST,
          filterable: true,
          multiple: true,
          field: 'key9',
          width: '100%',
        },
        {
          code: 108,
          labelText: 'switch开关',
          activeText: '打开',
          inactiveText: '关闭',
          field: 'key10',
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
