#  LjEcharts echarts简单二次封装

### 介绍

LjEcharts基于echarts进行的简单的二次封装，使用起来更简洁，无需顾虑实例未销毁而造成的内存泄漏问题

### 引入

```Javascript
import Vue from 'vue';
import { LjEcharts } from 'lj-design';

Vue.use(LjEcharts);
```

### 示例

<demo-code>./demo/index.vue</demo-code>

### props

| 参数 | 说明 | 类型 |  默认值 | 是否必填 |
|------|------|-----|---------|---------|
| data | 数据 | _object_ `|` _array_ | `undefined` | 是 |
| handle-option | 处理data返回渲染echarts所需的option | _function_ | `(data) => ({})` | 是 |
| loading | echarts加载状态 | _boolean_ | `false` | 否 |
| loadingOption | echarts加载配置项,具体参考 [配置项](https://echarts.apache.org/zh/api.html#echartsInstance.showLoading) | _object_ | `{text: '加载中', effect: 'whirling', maskColor: 'rgba(0, 0, 0, 0)', textColor:'#fff'}` | 否 |
|  |  |  |  |  |

### events

| name | 说明 |  返回  |
|------|------|--------|
| on-listen | echarts实例初始化完成，仅一次 | `echartsInstance`(echarts实例) |
| off-listen | echarts销毁时触发，仅一次 | `echartsInstance`(echarts实例) |
|  |  |  |