import AdaptInput from './adaptInput.vue'
import initOptions from './_init'

AdaptInput.install = (Vue) => {
  Vue.component(AdaptInput.name, AdaptInput)
  Vue.prototype.$initInput = initOptions
}

export default AdaptInput
