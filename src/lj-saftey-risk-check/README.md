# ljSafteyRiskCheck 漏洞和许可证风险等级

### 介绍
ljSafteyRiskCheck组件用于安全风险等级筛选使用
### 引入

```js
  import Vue from 'vue';
  import { ljSafteyRiskCheck } from 'lj-design';
  
  Vue.use(ljSafteyRiskCheck);
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### props

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| labelData | 风险类型 | _Arrary_ | [{label: '严重',value: '4',num: 0}] |
| multiple | 是否可以多选 | _boolean_ | `true` |
|  |  |  |  |
> 注：`labelData`如果默认有选中的，则加上checked字段 eg: [{label: '严重',value: '4',num: 0,checked: true}]

### slot

| name | 说明 | 参数 | 默认值
|------|------|-----|-----|
| left-box | 左侧内容 | — | 安全风险等级 |
| right-box | 右侧内容 | — | — |

### Events
| name | 说明 | 回调参数 |
|------|------|-----|
| change | 风险等级切换 | 选中的值 |