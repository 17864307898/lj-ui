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
| labelData | 风险类型 | _object_ | -- |
| selected | 初始选中值`需根据是否多选传入不同值` | _array_`|`_number_`|`_string_ | -- |
| multiple | 是否可以多选 | _boolean_ | `true` |
| countInfo | 初始化数量 | _object_ | -- |
|  |  |  |  |
> 注：`countInfo`需根据id返回对应的值 es: `{ 1: 20, 2: 30 }`

### Events
| name | 说明 | 回调参数 |
|------|------|-----|
| change | 风险等级切换 | 选中的值 |