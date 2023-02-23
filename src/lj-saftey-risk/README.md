# ljSafteyRisk 漏洞和许可证风险等级

### 介绍
LjSafteyRisk是一个展示漏洞或许可证风险等级的组件（使用了ElementUI下的el-tooltip）
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
| type | 类型 | _number_ | `1：漏洞 2：许可证` |
| riskList | 传值 | _object_ | `{"critical": 1,"high": 1,"low": 1,"mid": 1,"unknown": 1}` |
| targetShow | 跳转显示 | _Boolean_ | false |


### 方法
| name | 说明 | 参数 |
|------|------|-----|
| handleRisk | 每个风险等级的click事件 | 对应等级的英文字段 eg: mid|
| handleTarget | 跳转click事件 | |