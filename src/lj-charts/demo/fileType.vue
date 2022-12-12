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
            type: 'Ada',
            size: 3624,
          },
          {
            type: 'Gcc',
            size: 1956,
          },
          {
            type: 'PHP',
            size: 234,
          },
          {
            type: 'C#',
            size: 989,
          },
          {
            type: 'Java',
            size: 1867,
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