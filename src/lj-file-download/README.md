# LjFileDownload 文件下载/导出api

### 介绍
LjFileDownload 用于文件下载/导出
### 引入

```js
  import Vue from 'vue';
  import { LjFileDownload } from 'lj-design';
  
  // 返回一个promise对象
  LjFileDownload(options)
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

### API

#### options配置

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| requestInstance | 自定义请求实例 | -- | `undefined` |
| requestOptions | 自定义请求配置 遵循axios配置 例：{ url: '/test/url' } | _object_ | `{}` |
| loadingOptions | loading提示信息配置 | _object_ | `{}` |
| successCode | 请求成功code码 | _number_ | `200` |
| getFileName | 自定义获取文件名称的方法, 接收请求响应作为参数 | _function_ | `undefined` |
| getFileLink | 自定义获取下载链接的方法, 接收请求响应作为参数 | _function_ | `undefined` |
| fileType | 下载文件类型 可选 default zip | _string_ | `default` |
| expandFileMap | 拓展文件类型 有特殊类型时传入 格式 类型key: 类型 | _object_ | `null` |

> 注：默认请求方式 post 需要变动时传入 `requestOptions: { method: 'get' }`

> expandFileMap 示例： `expandFileMap: { newType: 'application/pdf;charset-UTF-8 /** 自定义类型 */' }`

#### loading提示信息配置 loadingOptions

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| message | 展示信息 | _string_ | `下载中，请耐心等待～` |
| show | 是否展示 | _boolean_ | `false` |