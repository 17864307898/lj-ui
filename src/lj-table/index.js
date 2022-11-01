import LjTable from './table.vue'

LjTable.install = (Vue) => {
  Vue.component(LjTable.name, LjTable)
}

export default LjTable
export {
  LjTable
}