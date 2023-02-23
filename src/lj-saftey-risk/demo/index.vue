<template>
  <lj-saftey-risk
    :type="2"
    :risk-list="riskList"
    :targetShow="true"
    @handleTarget="fnHandleTarget"
    @handleRisk="fnHandleRisk"
  ></lj-saftey-risk>
</template>

<script>
export default {
  data() {
    return {
      riskList: {
        critical: 1,
        high: 6,
        low: 12,
        mid: 14,
        unknown: 3,
      },
    };
  },
  methods: {
    fnHandleTarget() {
      console.log('详情跳转');
    },
    fnHandelRisk(val) {
      console.log('点击哪一个风险等级', val);
    },
  },
};
</script>
