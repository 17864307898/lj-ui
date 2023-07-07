import LjEcharts from './index.vue'

import * as echarts from 'echarts'

LjEcharts.install = (Vue) => {
  Vue.prototype.$echarts = echarts
  Vue.component(LjEcharts.name, LjEcharts)
}

export default LjEcharts