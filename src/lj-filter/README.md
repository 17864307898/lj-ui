# LjFilter 筛选

### 介绍
LjFilter是一个为筛选table数据的组件，展示筛选框以及筛选项。（基于ElementUI下的el-popover）
### 引入

```js
  import Vue from 'vue';
  import { LjFilter } from 'lj-design';
  
  Vue.use(LjFilter);
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### props

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| filterShow | 漏斗显示 | _boolean_ | `true` |
| filterContent | 筛选文案 | _string_ | {`name`: '组件', `empty`: '清空', `title`: '筛选方式', `sure`: '筛选', `cancel`: '取消', `reset`: '重置', `selected`: '已选择'} |
| filterChooseList | 筛选选择完的数据 | _array_ | `[]` |
| tableSelArr | table选择项 | _array_ | `[]` |

### slots

| name | 说明 | 参数 |
|------|------|-----|
| left-query | 顶部左侧搜索栏 | - |
| filter-items | 筛选表单内容(父组件可根据这三个值监听，将筛选的数据处理取回)| `filterClose`_object_ 关闭单个tag的item ；`filterSure`筛选确认触发 ；`filterReset`置空触发 | `filterClose`_string_  |
| reference | 筛选按钮icon | - |
| batch-remove | 批量删除 | - |
| batch-ignore | 批量忽略 | - |
| right-content | 顶部右侧栏 | - |

### 方法

| name | 说明 | 参数 | 
|------|------|-----|
| fnReset | 置空（父组件根据slots名filter-items的参数filterReset监听清空props里filterChooseList的数据），调用此组件不用写这个方法 | - |
| fnEmpty | 清空（调用了fnReset方法清空），不必调用 | - |
| fnChooseClose | 关闭单个tag（父组件根据slots名filter-items的参数filterClose监听关闭的item值清空filterChooseList对应值，此组件重新对filterChooseList数据赋值），不必调用 | - |