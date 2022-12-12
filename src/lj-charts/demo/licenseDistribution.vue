<template>
  <lj-charts
    :chart-type="2"
    :config="[0, 1, 2]"
    :data="data"
    :source="false"
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
            high: 38,
            mid: 21,
            low: 55,
            no: 7,
          },
          packageDistribute: {
            high: 3,
            mid: 31,
            low: 19,
            no: 21,
          },
          fileDistribute: {
            high: 72,
            mid: 21,
            low: 10,
            no: 42,
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