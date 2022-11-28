import LjUpload from './upload.vue'

LjUpload.install = (Vue) => {
  Vue.component(LjUpload.name, LjUpload)
}

export default LjUpload