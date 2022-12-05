<template>
  <lj-saftey-risk-check :label-data="riskLabel" @handelRisk="fnHandelRisk" />
</template>

<script>
export default {
  data() {
    return {
      riskLabel: {
        '': '全部',
        4: '严重',
        3: '高危',
        2: '中危',
        1: '低危',
        0: '未评级',
        '-1': '无风险',
      },
    };
  },
  methods: {
    fnHandelRisk(val) {
      console.log('切换展示哪几个风险等级数据', val);
    },
  },
};
</script>
