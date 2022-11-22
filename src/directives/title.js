// title框最大宽度
const MAX_DOM_WIDTH = 600
let popover = null // 悬浮框元素
let inPop = false // 是否进入悬浮框

/**
 * 指令 v-title
 * 为指定元素添加提示信息
 * v-title="test"
 * v-title[:自定义修饰符] ex: input 输入类型组件
 * @param title 提示信息
 */
export default {
  install: (Vue) => {
    Vue.directive('title', {
      inserted: addEvent,
      componentUpdated: addEvent,
      unbind: () => {
        popover && popover.remove()
        popover = null
        inPop = false
      },
    })
  },
}

// 添加自定义事件
function addEvent(el, binding, vnode) {
  // 获取当前实例
  const self = vnode.context

  // 绑定无值时不做任何操作
  if ((binding.value || binding.value === 0) && checkDom(el, binding)) {
    el.addEventListener('mouseenter', handleMouseEnter, true)
    el.addEventListener('mouseleave', handleMouseLeave, true)

    // 组件销毁时及时移除监听事件
    self.$once('hook:beforeDestroy', () => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
    })
  }

  // mouseEnter事件
  function handleMouseEnter(e) {
    clearDom(popover)

    createDom(el, binding, vnode, e)
    document.body.appendChild(popover)
  }
  // mouseLeave事件
  function handleMouseLeave() {
    clearDom(popover)
  }

  function clearDom(dom) {
    if (!dom) return
    dom.remove()

    dom = null
  }
}

// 创建气泡元素
function createDom(el, binding, vnode, e) {
  const elRect = el.getBoundingClientRect()

  // 模拟元素获取hover元素的实际宽高
  const spanDom = document.createElement('span')
  spanDom.innerHTML = binding.value
  spanDom.style.fontSize = '12px'
  document.body.append(spanDom)
  const { width, height } = spanDom.getBoundingClientRect()
  const spanWidth = Math.min(width, MAX_DOM_WIDTH) + 20 // 加上padding值
  const spanHeight = height + 20
  spanDom.remove()

  // 判断hover元素是否会溢出屏幕右侧
  const x = e.x + 12
  const documentWidth = document.body.clientWidth
  const documentHeight = document.body.clientHeight

  const left =
    x + spanWidth > documentWidth ? documentWidth - spanWidth : x

  // 判断hover元素是否会溢出屏幕底部
  const y = elRect.bottom + 2
  const top =
    y + spanHeight > documentHeight ? documentHeight - spanHeight : y

  const cssText = `
    position: fixed; 
    left: ${left}px; 
    top: ${top - 4}px; 
    color: #333; 
    max-width: ${MAX_DOM_WIDTH}px;
    box-shadow: 0 4px 20px rgb(63 65 74 / 12%);
    background: #fff; 
    z-index: 2000;
    border-radius: 4px;
    font-size: 12px;
    line-height: 1.2;
    white-space: normal;
    padding: 10px
  `
  const dom = document.createElement('div')
  dom.innerHTML = binding.value
  dom.style.cssText = cssText
  spanDom.remove()
  // 阻止事件冒泡
  dom.addEventListener('click', function (e) {
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true)
  })

  popover = dom
}

// 返回当前需要判断的元素是否超出
function checkDom(el, { modifiers, value }) {
  let dom = el
  // 输入框组件时传入
  if (modifiers.input) {
    dom = el.querySelector('input')
  }

  const spanDom = document.createElement('span')
  const currentStyle = window.getComputedStyle(dom, '')
  spanDom.style.cssText = `
    position: fixed;
    opacity: 0;
    font-size: ${currentStyle.fontSize};
    font-weight: ${currentStyle.fontWeight};
    font-family: ${currentStyle.fontFamily};
  `
  spanDom.innerHTML = value
  document.body.appendChild(spanDom)

  const result = spanDom.offsetWidth > dom.offsetWidth
  spanDom.remove()
  return result
}
