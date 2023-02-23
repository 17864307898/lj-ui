// 输入框失去焦点时自动trim
export default {
  install(vue) {
    vue.directive('trim', {
      inserted: (el, binding, vNode) => {
        // 获取当前使用该指令的父组件
        const parent = vNode.context
        // 获取当前组件
        const self = el.__vue__
        const input = el.querySelector('input') || el.querySelector('textarea')

        // 添加及取消blur事件
        input.addEventListener('blur', handleBlur)
        parent.$once('hook:beforeDestroy', () => {
          input.removeEventListener('blur', handleBlur)
        })

        // blur事件监听
        function handleBlur() {
          const val = input.value.trim()
          input.value = val
          self.$emit('input', val)
          self.$emit('change', val)
        }
      }
    })
  }
}