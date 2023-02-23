// 防止同一元素短时间内多次点击
const DEFAULT_DURATION = 1000

export default {
  install(vue) {
    vue.directive('press', {
      inserted: (ele, binding, vNode) => {
        const duration = binding.arg || DEFAULT_DURATION
        const bindFunction = binding.value
        let timer

        ele.addEventListener('click', handleClick)

        // 获取当前组件实例
        const self = vNode.context
        self.$once('hook:beforeDestroy', () => {
          ele.removeEventListener('click', handleClick)
        })

        // 点击事件
        function handleClick(e) {
          if (timer) return

          bindFunction(e)
          timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
          }, duration)
        }
      },
    })
  }
}
