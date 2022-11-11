# LjFilter 筛选

### 介绍

### 引入

```js
  import Vue from 'vue';
  import { LjFilter } from 'lj-filter';
  
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
| copyWriting | 筛选文案 | _string_ | `''` |
| filterChooseList | 筛选选择完的数据 | _array_ | `[]` |
| tableSelArr | table选择项 | _array_ | `[]` |

### slots

| name | 说明 | 参数 |
|------|------|-----|
| query | 顶部左侧搜索栏 | - |
| filterItems | 筛选表单选择数据 | - |
| reference | 漏洞icon | `{ pagination }` |
| batchRemove | 批量删除 | - |
| batchIgnore | batchIgnore | - |
| right-content | 筛选框右侧内容 | - |
