import title from './title'

const directives = [title]

export {
  title,
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