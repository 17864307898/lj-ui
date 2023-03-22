<template>
  <lj-saftey-risk-check
    :multiple="true"
    :label-data="riskLabel"
    @change="fnHandelRisk"
  />
</template>

<script>
export default {
  data() {
    return {
      riskLabel: [
        {
          label: '全部',
          value: '',
          num: 0,
        },
        {
          label: '严重',
          value: '4',
          num: 17,
        },
        {
          label: '高危',
          value: '3',
          num: 15,
        },
        {
          label: '中危',
          value: '2',
          num: 0,
        },
        {
          label: '低危',
          value: '1',
          num: 0,
        },
        {
          label: '未评级',
          value: '0',
          num: 0,
        },
        {
          label: '无风险',
          value: '-1',
          num: 0,
        },
      ],
    };
  },
  methods: {
    fnHandelRisk(val) {
      console.log(val);
    },
  },
};
</script>
