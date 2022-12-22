# LjCharts 图表

### 介绍

lj-charts 使用配置的方式初始化图表 用简单的方式去开发业务（基于echarts）

### 引入

```js
  import Vue from 'vue';
  import { LjCharts } from 'lj-design';
  
  Vue.use(LjCharts);
```

### 目录
| 图表名 | 其他 |
|--------|-----|
| <a href="#yu-yan-fen-bu">语言分布</a> |
| <a href="#feng-xian-tong-ji">风险统计</a> |
| <a href="#feng-xian-fen-bu">风险分布</a> |
| <a href="#feng-xian-qu-shi">风险趋势</a> |
|| <a href="#tu-biao-lei-xing">图表类型</a> |
|| <a href="#tong-yi-props">统一props</a> |

## 代码演示

### 语言分布

<demo-code>./demo/index.vue</demo-code>

#### props

| 参数 | 说明 | 类型 |  默认值  |
|------|------|-----|----------|
| colors | 自定义颜色列表 | _array_ | `undefined` |
| order | 排序方式 `desc 降序 asc 升序 传空不排序` | _string_ | `desc` |
| valueKey | 自定义value的key值 | _string_ | `count` |
| nameKey | 自定义name的key值 | _string_ | `name` |
| customColumns | 自定义表格展示配置 | _array_ | -- |
|  |  |  |  |
### 风险统计

<demo-code>./demo/licenseRisk.vue</demo-code>

#### props

| 参数 | 说明 | 类型 |  默认值  |
|------|------|-----|----------|
| chartType | 图表类型 `1 许可证 2 漏洞` | _number_`|`_string_ | `1` |
|  |  |  |  |
> chartType：传入1时，`data`为`object`；传入2时，`data`为`array`;

### 风险统计-新

<demo-code>./demo/risk.vue</demo-code>

#### props

| 参数 | 说明 | 类型 |  默认值  |
|------|------|-----|----------|
| chartType | 图表类型 `1 许可证 2 漏洞` | _number_`|`_string_ | `1` |
| config | 右侧展示的信息下标`仅chartType为2时生效` | _array_ | `[0, 1, 2]` |
| source | 是否开启溯源`仅chartType为2时生效` | _boolean_ | `false` |
|  |  |  |  |

#### 事件

| 事件名称 | 说明 |  参数  |
|----------|------|--------|
| detail | 点击查看详情 | `chartType`当前图表类型 |
| item-click | 点击右侧统计信息 | `type`具体参考下方说明 |

> chartType为1时:  item-click 返回type 1: 兼容 2 篡改


> chartType为2时:  item-click 返回type 1: 组件 2 文件 3 溯源



### 风险分布

<demo-code>./demo/licenseDistribution.vue</demo-code>

#### props

| 参数 | 说明 | 类型 |  默认值  |
|------|------|-----|----------|
| chartType | 图表类型 `1 许可证 2 漏洞` | _number_`|`_string_ | `1` |
| config | y轴展示数据下标配置，倒序 `['溯源', '组件', '文件']` | _array_ | `[0, 1, 2]`全部展示 |
| source | 是否开启了溯源 | _boolean_ | `true` |
|  |  |  |  |

### 风险趋势

<demo-code>./demo/riskTrend.vue</demo-code>
### 图表类型

| type | 类型 |
|------|------|
| 101 | 语言分布 |
| 102 | 柱状图 |
| 103 | 饼状统计图 |
| 104 | 风险分布图 |
| 105 | 风险趋势图 |
|  |  |
### 统一props

| 参数 | 说明 | 类型 |  默认值  |
|------|------|-----|----------|
| type | 图表类型 | _number_`|`_string_ | `undefined` |
| title | 自定义标题 | _string_ | `undefined` |
| data | 数据集 | _array_`|`_object_ | `undefined` |
| height | 图表高度, 默认展示180px | _number_`|`_string_ | `undefined` |
|  |  |  |  |

