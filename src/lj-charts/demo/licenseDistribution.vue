<template>
  <lj-charts
    :chart-type="1"
    :config="[2]"
    :data="data"
    :source="true"
    :type="104"
    :height="240"
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
          sourceProjectDistribute: {
            high: 0,
            mid: 0,
            low: 0,
            no: 1721,
            unknown: 0,
          },
          packageDistribute: {
            high: 3,
            mid: 31,
            low: 19,
            no: 21,
            unknown: 19,
          },
          fileDistribute: {
            high: 72,
            mid: 21,
            low: 10,
            no: 42,
          },
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