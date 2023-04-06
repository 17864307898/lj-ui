<template>
  <lj-charts :data="data" :type="105" :height="240" />
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      data: {
        writeData: {
          1: ['严重', '高危', '中危', '低危', 'Not-standard'],
          2: ['高风险', '中风险', '低风险', 'Not-standard'],
          title: '风险趋势',
          switchList: ['漏洞风险', '许可证风险'],
          changeOver: '查看详情',
        },
        vulInfoList: [
          {
            vulCritical: 31,
            vulHigh: 0,
            vulLow: 23,
            vulMid: 0,
            vulUnknown: 0,
            time: 1671430007199,
          },
        ],
        licenseInfoList: [
          {
            high: 1,
            mid: 3,
            low: 3,
            unknown: 6,
            time: 1671430007199,
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.card-wrap {
  width: 500px;
}
</style>
