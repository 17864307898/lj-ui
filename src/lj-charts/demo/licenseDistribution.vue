<template>
  <lj-charts
    :chart-type="1"
    :config="[0, 1, 2]"
    :data="data"
    source
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
        data: [],
      }
    },
  }
</script>
<style lang="scss" scoped>
  .card-wrap {
    width: 500px;
  }
</style>