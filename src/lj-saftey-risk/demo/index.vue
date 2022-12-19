<template>
  <lj-saftey-risk :type="2" :risk-list="riskList" @handelRisk="fnHandelRisk">
    <template #detailTarget>
      <i class="el-icon-arrow-right" @click="handelTarget"></i>
    </template>
  </lj-saftey-risk>
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
    handelTarget() {
      console.log('跳');
    },
    fnHandelRisk(val) {
      console.log('点击哪一个风险等级', val)
    }
  },
};
</script>