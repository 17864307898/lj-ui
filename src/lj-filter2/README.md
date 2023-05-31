# LjFilter2 筛选

### 介绍
LjFilter2是一个为筛选table数据的组件，表单使用了LJInput组件，展示筛选框以及筛选项。（基于ElementUI下的el-popover）
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

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| formList | 表单列表 | _object_ | `{}` |
| labelWidth | 表单内容标签宽度 | _string_ | `110px` |

### slots

| name | 说明 | 参数 |
|------|------|-----|
| head-left | 顶部左侧搜索栏 | - |
| reference | 筛选按钮Icon | - |
| bottom-left | 底部左侧搜索栏 | - |
| bottom-right | 底部左侧搜索栏 | - |

### 方法

| name | 说明 | 参数 | 
|------|------|-----|
| @form-data | 返回筛选完的数据 | _object_ {表单数据} |