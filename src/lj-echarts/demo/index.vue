<template>
  <lj-echarts
    class="charts-wrap"
    :data="mockData"
    :handle-option="handleOptions"
    :loading="loading"
    :loadingOption="loadingOption"
  />
</template>

<script>
  export default {
    name: '',
    components:{},
    props:{},
    data(){
      return {
        mockData: [],
        loading: false,
        loadingOption: {
          textColor: '#333'
        }
      }
    },
    created() {
      this.loading = true

      this.simulateReuqest().then((data) => {
        this.mockData = data
        this.loading = false
      })
    },
    methods: {
      // 模拟异步
      simulateReuqest() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([1, 2, 3])
          }, 2000)
        })
      },

      // 处理option
      handleOptions(data) {
        if (!data?.length) return {}

        return {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: false,
                }
              },
              labelLine: {
                show: true
              },
              data: [
                { value: 1048, name: 'data1' },
                { value: 735, name: 'data2' },
                { value: 580, name: 'data3' },
                { value: 484, name: 'data4' },
                { value: 300, name: 'data5' }
              ]
            }
          ]
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .charts-wrap {
    width: 500px;
    height: 400px;
    // background-color: #404360;
  }
</style>