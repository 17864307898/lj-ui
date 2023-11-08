import LjTable from './table.vue'

LjTable.install = (Vue) => {
  // 传入配置选项
  Vue.component(LjTable.name, LjTable)
}

export default LjTable