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
      riskData: {
        1: {
          // 漏洞风险文案映射
          critical: '严重',
          high: '高危',
          mid: '中危',
          low: '低危',
          unknown: '未评级',
          noRisk: '无风险',
        },
        2: {
          // 许可证风险文案映射
          critical: '严重',
          high: '高风险',
          mid: '中风险',
          low: '低风险',
          unknown: '未知',
          noRisk: '无风险',
        },
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
