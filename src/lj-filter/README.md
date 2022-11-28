# LjFilter 筛选

### 介绍
LjFilter是一个为筛选table数据的组件，展示筛选框以及筛选项
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
| filterContent | 筛选文案 | _string_ | `{name: '组件', empty: '清空', title: '筛选方式', sure: '筛选', cancel: '取消', reset: '重置', selected: '已选择'}` |
| filterChooseList | 筛选选择完的数据 | _array_ | `[]` |
| tableSelArr | table选择项 | _array_ | `[]` |

### slots

| name | 说明 | 参数 |
|------|------|-----|
| query | 顶部左侧搜索栏 | - |
| filterItems | 筛选表单内容 | ` 关闭单个tag：filterClose ；筛选按钮：filterSure；置空：resetData` |
| reference | 筛选按钮icon | - |
| batchRemove | 批量删除 | - |
| batchIgnore | 批量忽略 | - |
| right-content | 顶部右侧栏 | - |

### 方法

| name | 说明 | 参数 |
|------|------|-----|
| fnReset | 置空 | - |
| fnEmpty | 清空 | - |
| fnFilter | 筛选按钮 | - |
| fnChooseClose | 关闭单个tag | - |