import title from './title'
import press from './press'
import trim from './trim'

const directives = [title, press, trim]

export {
  title,
  press,
  trim,
}

// 保证可以全局引入及按需引入
export default {
  install: (Vue) => {
    directives.forEach((directive) => {
      if (directive.install) {
        Vue.use(directive)
      } else {
        Vue.directive(directive.name, directive)
      }
    })
  }
}