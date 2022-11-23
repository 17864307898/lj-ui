# ljSafteyRisk 漏洞和许可证风险等级

### 介绍

### 引入

```js
  import Vue from 'vue';
  import { LjSafteyRisk } from 'lj-design';
  
  Vue.use(LjSafteyRisk);
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### props

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| type | 风险类型 | _number_ | `1：漏洞 2：许可证` |
| riskList | 风险值 | _object_ | `{"critical": 1,"high": 1,"low": 1,"mid": 1,"unknown": 1}` |
| riskData | 风险数据 | _arobject_ | `{1: {critical: '严重', high: '高危', mid: '中危',low: '低危',unknown: '未评级',noRisk: '无风险',},2: { critical: '严重',high: '高风险',   mid: '中风险',low: '低风险',unknown: '未知',noRisk: '无风险',}},` |

### slots

| name | 说明 | 参数 |
|------|------|-----|
| detailTarget | 详情跳转 | - |