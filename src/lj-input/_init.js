// 单行输入绑定props
function inputOptions(item, options) {
  return {
    key: item.field,
    clearable: true,
    'show-word-limit': true,
    ...item,
    ...options,
  }
}

// 多行输入绑定props
function inputAreaOptions(item, options) {
  return {
    key: item.field,
    clearable: true,
    'show-word-limit': true,
    ...item,
    ...options,
  }
}

// 下拉绑定props
function selectOptions(item, options) {
  return {
    key: item.field,
    clearable: true,
    filterable: true,
    options: item.map,
    ...item,
    ...options,
  }
}

// 级联绑定props
function cascaderOptions(item, options) {
  return {
    key: item.field,
    clearable: true,
    filterable: true,
    options: item.map,
    props: {
      expandTrigger: 'hover',
      emitPath: !!item.emitPath,
    },
    ...item,
    ...options,
  }
}

// 数值绑定props
function numberOptions(item, options) {
  return {
    key: item.field,
    max: 99999999,
    min: 0,
    ...item,
    ...options,
  }
}

// 时间选择器绑定props
function datePickerOptions(item, options) {
  return {
    key: item.field,
    clearable: true,
    editable: false,
    format: item.format || 'yyyy-MM-dd',
    'value-format': 'timestamp',
    ...item,
    type: item.type || 'datetime',
    ...options,
  }
}

// 单选绑定props
function radioOptions(item, options) {
  return {
    key: item.field,
    options: item.map,
    ...item,
    ...options,
  }
}

/**
 * 处理不同数据格式默认值
 * @param {Object} item 当前项
 * @param {Object} options 自定义props
 * @returns
 */
 export default function initOptions(item = {}, options = {}) {
  switch (+item.code) {
    case 101:
      return inputOptions(item, options)
    case 102:
      return inputAreaOptions(item, options)
    case 103:
      return selectOptions(item, options)
    case 104:
      return cascaderOptions(item, options)
    case 105:
      return datePickerOptions(item, options)
    case 106:
      return numberOptions(item, options)
    case 107:
      return radioOptions(item, options)
    default:
      return {
        ...item,
        ...options,
      }
  }
}
