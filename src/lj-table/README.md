# LjTable 表格

### 介绍

lj-table 使用配置的方式初始化表格 用简单的方式去开发业务（基于ElementUI下的el-table）

### 引入

```js
  import Vue from 'vue';
  import { LjTable } from 'lj-design';
  
  Vue.use(LjTable);
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### props

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| columns `具体配置参考下面column配置` | 表头配置 | _array_ | `[]` |
| data | 数据集 | _array_ | `[]` |
| needPagination | 是否需要底部分页 | _boolean_ | `true` |
| customPagination | 自定义分页配置 `具体配置参考element-ui分页配置` <https://element.eleme.io/#/zh-CN/component/pagination> | _object_ | `null` |

### columns配置

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| label | 表头展示文案 | _string_ | - |
| prop | 对应列内容的字段名 | _string_ | - |
| - | `其余配置遵循element-ui Table-column配置`  <https://element.eleme.io/#/zh-CN/component/table> |

### slots

| name | 说明 | 参数 |
|------|------|-----|
| query | 顶部搜索栏 | - |
| empty | 表格数据为空时展示 | - |
| pagination | 分页组件,needPagination为true时展示 | `{ pagination }` |
| - | 每一列均有和当前列prop对应的插槽名称 | `{ $index, col, column, row }` |
