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
          highRiskCount: 9,
          // test
          severityRisk: 20,
          highRisk: 9,
          mediumRisk: 39,
          lowRisk: 7,
          noRated: 14,
        },
      }
    },
  }
</script>
<style lang="scss" scoped>
  .card-wrap {
    width: 500px;
  }
</style>