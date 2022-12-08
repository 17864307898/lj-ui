<template>
  <lj-saftey-risk-check
    :count-info="countInfo"
    :multiple="true"
    :label-data="riskLabel"
    :risk-label="riskLabel"
    :selected="selected"
    @change="fnHandelRisk"
  />
</template>

<script>
export default {
  data() {
    return {
      riskLabel: {
        // '': '全部',
        // 4: '严重',
        // 3: '高危',
        // 2: '中危',
        // 1: '低危',
        // 0: '未评级',
        // '-1': '无风险',
      },
      selected: [1, 2, 3],
      countInfo: {
        // '': 53,
        // 4: 0,
        // 3: 0,
        // 2: 0,
        // 1: 1,
        // 0: 0,
        // '-1': 1,
      },
    }
  },
  methods: {
    fnHandelRisk(val) {
      console.log(val)
    },
  },
}
</script>
