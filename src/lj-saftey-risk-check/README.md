# ljSafteyRiskCheck 漏洞和许可证风险等级

### 介绍
ljSafteyRiskCheck组件是安全风险等级切换使用
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
| labelData | 风险类型 | _object_ | `{'': '全部',4: '严重',3: '高危',2: '中危',1: '低危',0: '未评级','-1': '无风险'},` |

### 方法
| name | 说明 | 参数 |
|------|------|-----|
| handelRisk | 切换风险等级click事件 | _array_ |