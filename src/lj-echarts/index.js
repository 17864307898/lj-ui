import LjEcharts from './index.vue'

LjEcharts.install = (Vue) => {
  Vue.component(LjEcharts.name, LjEcharts)
}

export default LjEcharts