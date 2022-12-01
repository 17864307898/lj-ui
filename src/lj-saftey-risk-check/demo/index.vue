<template>
  <lj-saftey-risk-check @handelRisk="fnHandelRisk">
    <template #detailTarget>
      <i class="el-icon-arrow-right" @click="handelTarget"></i>
    </template>
  </lj-saftey-risk-check>
</template>

<script>
export default {
  data() {
    return {
      queryForm: {
        levelChoose: [0],
      }
    };
  },
  methods: {
    fnHandelRisk(val) {
      this.queryForm.levelChoose = 0
      console.log('切换展示哪几个风险等级数据', val)
    }
  },
};
</script>