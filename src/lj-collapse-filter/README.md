# LjCollapseFilter 筛选

### 介绍

LjCollapseFilter 是一个为折叠筛选 table 数据的组件，表单使用了 LjInput 组件，展示筛选项。（基于 ElementUI 下的 el-row、el-form、el-collapse-transition）

### 引入

```js
import Vue from 'vue';
import { LjCollapseFilter } from 'lj-design';

Vue.use(LjCollapseFilter);
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### props

| 参数            | 说明                   | 类型      | 默认值                                                                                                                                                          |
| --------------- | ---------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| formList        | 表单列表               | _object_  | `{ljItemSpan: 24,//表单筛选一行个数，ljCol: {},//表单筛选框el-col属性，ljFormItem：{}//表单item属性，ljRelations：[] 关联子集清空 ...(更多请查看lj-input参数)}` |
| headNum         | 表单头部显示个数       | _number_  | `1`                                                                                                                                                             |
| ljSpan          | 表单筛选一行个数       | _number_  | `null`                                                                                                                                                          |
| ljRow           | 表单筛选框 el-row 属性 | _object_  | `{}`                                                                                                                                                            |
| ljForm          | 表单 el-rorm 属性      | _object_  | `{}`                                                                                                                                                            |
| filterContent   | 表单文案               | _object_  | {reset: '', search: '',}                                                                                                                                        |
| value / v-model | 绑定值                 | _object_  | `{}`                                                                                                                                                            |
| filterSwitcher  | 筛选收起/展开          | _Boolean_ | `false`                                                                                                                                                         |
| filterShow/searchShow/resetShow      | 筛选/搜索/重置开关               | _Boolean_ | `true`                                                                                                                                                          |

### slots

| name      | 说明                 | 参数                          |
| --------- | -------------------- | ----------------------------- |
| key`N`    | 筛选表单数据插槽内容 | - N 为每条 item 的 field 数值 |
| head-left    | 筛选表单头部左侧插槽内容 | -  |
| filter-icon-left    | 筛选按钮左侧内容 | - |
| filter-icon-left    | 筛选按钮右侧内容 | - |
| reset-btn | 重置按钮 | - |
| search-btn | 重置按钮 | - |
| head-filter-right    | 筛选表单头部左侧筛选后边插槽内容 | - |
| head-right    | 筛选表单头部右侧插槽内容 | - |

### 事件

| name         | 说明             | 参数                |
| ------------ | ---------------- | ------------------- |
| @form-data   | 返回筛选完的数据 | _object_ {表单数据} |
| @form-change | 返回筛选完的数据 | _object_ {表单数据} |
| @form-input  | 返回筛选完的数据 | _object_ {表单数据} |
| @form-blur   | 返回筛选完的数据 | _object_ {表单数据} |
| @form-enter  | 返回筛选完的数据 | _object_ {表单数据} |
| @form-clear  | 返回筛选完的数据 | _object_ {表单数据} |

### 方法

| name         | 说明     | 参数 |
| ------------ | -------- | ---- |
| handleReset  | 置空方法 | `--` |
| handleFilter | 筛选方法 | `--` |
