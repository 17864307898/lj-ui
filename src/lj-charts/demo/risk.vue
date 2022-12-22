<template>
  <lj-charts
    :chart-type="2"
    :config="[0, 1]"
    :data="data"
    :source="true"
    :type="106"
    :height="220"
  />
</template>

<script>
  export default {
    name: '',
    components:{},
    props:{},
    data(){
      return {
        // data: {
        //   indirectCompatibleCount: 37,
        //   notCompatibleCount: 86,
        //   licenseChangeCount: 122,
        //   copyrightChangeCount: 157,
        //   licenseRiskInfos: [
        //     {
        //       riskLevel: 0,
        //       riskLevelCount: 36,
        //     },
        //     {
        //       riskLevel: 2,
        //       riskLevelCount: 15,
        //     },
        //     {
        //       riskLevel: 1,
        //       riskLevelCount: 7,
        //     },
        //     {
        //       riskLevel: 3,
        //       riskLevelCount: 9,
        //     },
        //   ],
        // },
        // chart-type为2时传入
        data: {
          vulUnknown: 12,
          vulLow: 39,
          vulMid: 27,
          vulHigh: 6,
          vulCritical: 52,
          repoVulDistribute: {
            high: 72,
            mid: 21,
            low: 10,
            critical: 42,
            unknown: 3,
          },
          sourceProjectVulDistribute: {
            high: 38,
            mid: 21,
            low: 55,
            critical: 7,
            unknown: 19,
          },
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .card-wrap {
    width: 500px;
  }
</style>