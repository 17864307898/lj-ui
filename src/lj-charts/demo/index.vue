<template>
  <lj-charts
    :data="data"
    :type="102"
    :height="300"
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
            num: 20,
            line: 43,
          },
          {
            language: 'test2',
            num: 43,
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