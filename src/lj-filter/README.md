# LjFilter 筛选

### 介绍
LjFilter是一个为筛选table数据的组件，表单使用了LJInput组件，展示筛选框以及筛选项。（基于ElementUI下的el-popover）
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
| filterChooseList | 筛选选择完的数据 | _array_ | `[]` |

### slots

| name | 说明 | 参数 |
|------|------|-----|
| left-box | 顶部左侧搜索栏 | - |
| right-box | 顶部右侧搜索栏 | - |
| tag-left-box | 筛选tag左侧内容 | - |
| tag-right-box | 筛选tag右侧内容 | - |
| filter-items | 筛选表单内容(父组件根据此三个值监听，将筛选的数据处理取回)| `filterClose`_object_ 关闭单个tag的item ；`filterSure`筛选确认触发 ；`filterReset`置空触发 | `filterClose`_string_  |
| reference | 筛选按钮Icon | - |

### 方法

| name | 说明 | 参数 | 
|------|------|-----|
| @tag-close | tag清空 | _object_ 选择关闭Item |
| @form-data | 返回筛选完的数据 | _object_ {filterChooseList：[tag数据], form: {表单数据}} |