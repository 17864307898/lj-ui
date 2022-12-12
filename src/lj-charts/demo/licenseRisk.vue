<template>
  <lj-charts
    :chart-type="1"
    :data="data"
    :type="103"
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
        data: {
          indirectCompatibleCount: 37,
          notCompatibleCount: 86,
          licenseChangeCount: 122,
          copyrightChangeCount: 157,
          licenseRiskInfos: [
            {
              riskLevel: 0,
              riskLevelCount: 36,
            },
            {
              riskLevel: 2,
              riskLevelCount: 15,
            },
            {
              riskLevel: 1,
              riskLevelCount: 7,
            },
            {
              riskLevel: 3,
              riskLevelCount: 9,
            },
          ],
        },
        // chart-type为2时传入
        // data: [
        //   {
        //     "level": 4,
        //     "repo": 106,
        //     "other": 1
        //   },
        //   {
        //     "other": 0,
        //     "level": 3,
        //     "repo": 420
        //   },
        //   {
        //     "other": 0,
        //     "level": 0,
        //     "repo": 110
        //   },
        //   {
        //     "other": 0,
        //     "level": 2,
        //     "repo": 392
        //   },
        //   {
        //     "other": 0,
        //     "level": 1,
        //     "repo": 70
        //   },
        // ],
      }
    },
  }
</script>
<style lang="scss" scoped>
  .card-wrap {
    width: 500px;
  }
</style>