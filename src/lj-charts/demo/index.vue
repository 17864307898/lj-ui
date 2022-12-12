<template>
  <lj-charts
    :data="data"
    :type="101"
    :height="200"
  />
</template>

<script>
  export default {
    name: '',
    components:{},
    props:{},
    data(){
      return {
        data: [
          {
            language: 'test1',
            size: 20,
            line: 43,
          },
          {
            language: 'test2',
            size: 43,
            line: 20,
          },
        ],
      }
    },
  }
</script>
<style lang="scss" scoped>
  .card-wrap {
    width: 500px;
  }
</style>