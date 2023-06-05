# LjFilter2 筛选

### 介绍

LjFilter2 是一个为筛选 table 数据的组件，表单使用了 LJInput 组件，展示筛选框以及筛选项。（基于 ElementUI 下的 el-popover）

### 引入

```js
import Vue from 'vue';
import { LjFilter2 } from 'lj-design';

Vue.use(LjFilter2);
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### props

| 参数          | 说明             | 类型     | 默认值                   |
| ------------- | ---------------- | -------- | ------------------------ |
| formList      | 表单列表         | _object_ | `{ljColNum: 24, ljSlotSwitch: false, ...(更多请查看lj-input参数)}`                     |
| headNum       | 表单头部显示个数 | _number_ | `1`                     |
| labelWidth    | 表单内容标签宽度 | _string_ | `110px`                  |
| filterContent | 表单文案         | _object_ | {reset: '', search: '',} |

### slots

| name      | 说明                            | 参数                          |
| --------- | ------------------------------- | ----------------------------- |
| reference | 筛选按钮 Icon                   | -                             |
| key`N`    | 筛选表单数据插槽内容 | - N 为每条 item 的 field 数值 |

### 方法

| name       | 说明             | 参数                |
| ---------- | ---------------- | ------------------- |
| @form-data | 返回筛选完的数据 | _object_ {表单数据} |
