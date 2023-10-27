# LjFileDownload 文件下载/导出api

### 介绍
LjFileDownload 用于文件下载/导出
### 引入

```js
  import Vue from 'vue';
  import { LjFileDownload } from 'lj-design';
  
  const instance = new LjFileDownload(options)
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### 初始化

#### 示例

```js
  const instance = new LjMultiUpload(file, options)
```

#### options配置

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| requestInstance | 自定义请求实例 | -- | `undefined` |
| requestOptions | 自定义请求配置 遵循axios配置 例：{ url: '/test/url' } | _object_ | `{}` |
| loadingOptions | loading提示信息配置 | _object_ | `{}` |
| successCode | 请求成功code码 | _number_ | `200` |
| getFileName | 自定义获取文件名称的方法, 接收请求响应作为参数 | _function_ | `undefined` |
| getFileLink | 自定义获取下载链接的方法, 接收请求响应作为参数 | _function_ | `undefined` |

#### loading提示信息配置 loadingOptions

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| message | 展示信息 | _string_ | `下载中，请耐心等待～` |
| show | 是否展示 | _boolean_ | `false` |

### 下载文件 downLoadFile

#### 示例

```js
  instance.downLoadFile()
```

> 返回一个promise对象

### 导出文件 exportFile

#### 示例

```js
  instance.exportFile()
```

> 返回一个promise对象