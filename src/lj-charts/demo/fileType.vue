<template>
  <lj-charts
    :data="data"
    :type="102"
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
        data: [
          {
            name: 'Ada',
            count: 3624,
          },
          {
            name: 'Gcc',
            count: 1956,
          },
          {
            name: 'PHP',
            count: 234,
          },
          {
            name: 'C#',
            count: 989,
          },
          {
            name: 'Java',
            count: 1867,
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