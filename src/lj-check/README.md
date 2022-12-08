# LjCheck 检测内容

### 介绍

LjCheck是一款业务组件 展示检测内容

### 引入

```javascript
import Vue from 'vue'
import { LjCheck } from 'lj-design'

Vue.use(LjCheck)
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### props

| 参数 | 说明 | 类型 |  默认值  |
|------|------|-----|----------|
| data | 数据集 | _array_ | `undefined` |
| customConfig | 自定义配置`配置信息参考下方config配置项[config]` | _array_ | `undefined` |
| format | 传入的data，自定义格式化`需返回complete uncomplete` | _function_ | -- |
| showTrace | 是否开启溯源 | _boolean_ | `true` |

### config配置项

| 配置项 | 说明 | 类型 |  默认值  |
|------|------|-----|----------|
| label | 左侧文案 | _string_ | -- |
| key | 取值的key键 | _string_ | -- |
| isSize | 是否为文件容量（文件默认会转换字节） | _boolean_ | `false` |
| completeColor | 自定义已完成的进度条颜色 | _string_ | -- |
| unCompleteColor | 自定义未完成的进度条颜色 | _string_ | -- |
| needTip | 是否需要tooltip | _boolean_ | `true` |
