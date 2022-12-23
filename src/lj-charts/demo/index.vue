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
        data: {
          1: [
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
          2: [
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
            {
              type: 'Java2',
              size: 1867,
            },
            {
              type: 'Java3',
              size: 1867,
            },
            {
              type: 'Java4',
              size: 1867,
            },
            {
              type: 'Java5',
              size: 1867,
            },
            {
              type: 'Java6',
              size: 1867,
            },
            {
              type: 'Java7',
              size: 1867,
            },
            {
              type: 'Java8',
              size: 1867,
            },
            {
              type: 'Java9',
              size: 1867,
            },
          ],
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