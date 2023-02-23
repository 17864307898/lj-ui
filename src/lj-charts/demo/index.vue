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
              size: 39768,
              line: 43,
            },
            {
              language: 'test2',
              size: 23134,
              line: 20,
            },
            {
              language: 'test3',
              size: 11108,
              line: 30,
            },
            {
              language: 'test4',
              size: 3123,
              line: 40,
            },
            {
              language: 'test5',
              size: 2324,
              line: 50,
            },
            {
              language: 'test6',
              size: 3333,
              line: 60,
            },
            {
              language: 'test7',
              size: 2222,
              line: 70,
            },
            {
              language: 'test8',
              size: 1111,
              line: 80,
            },
            {
              language: 'test9',
              size: 545,
              line: 90,
            },
            {
              language: 'test10',
              size: 2342,
              line: 100,
            },
            {
              language: 'test11',
              size: 12313,
              line: 110,
            },
          ],
          2: [
            {
              type: 'Ada',
              count: 3624,
            },
            {
              type: 'Gcc',
              count: 1956,
            },
            {
              type: 'PHP',
              count: 234,
            },
            {
              type: 'C#',
              count: 989,
            },
            {
              type: 'Java',
              count: 1867,
            },
            {
              type: 'Java2',
              count: 1867,
            },
            {
              type: 'Java3',
              count: 1867,
            },
            {
              type: 'Java4',
              count: 1867,
            },
            {
              type: 'Java5',
              count: 1867,
            },
            {
              type: 'Java6',
              count: 1867,
            },
            {
              type: 'Java7',
              count: 1867,
            },
            {
              type: 'Java8',
              count: 1867,
            },
            {
              type: 'Java9',
              count: 1867,
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