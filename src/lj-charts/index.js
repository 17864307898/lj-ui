import LjCharts from './lj-charts.vue'

LjCharts.install = (Vue) => {
  Vue.component(LjCharts.name, LjCharts)
}

export default LjCharts