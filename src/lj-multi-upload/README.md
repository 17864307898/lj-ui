# LjMultiUpload 分片上传api

### 介绍
LjMultiUpload 用于大文件分片上传
### 引入

```js
  import Vue from 'vue';
  import { LjMultiUpload } from 'lj-design';
  
  const instance = new LjMultiUpload(file, options)
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
| partOptions | 分片配置项 | _object_ | `{}` |
| onUploadProgress | 进度回调, 接受当前进度作为参数 | _function_ | `undefined` |
| concurrenceCount | 分片并发请求数 | _number_ | `5` |
| mergeOptions | 合并文件配置项 | _object_ | `{}` |
| cancelFn | 取消分片上传回调 | _function_ | `undefined` |

#### 分片配置项 partOptions

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| partSize | 分片大小 | _number_ | 50 * 1024 * 1024 |
| uploadedListKey | 已上传分片列表取值key | _string_ | `sliceFileNames` |
| uploadedFileKey | 已上传文件取值key | _string_ | `filePath` |

#### 合并文件配置项 mergeOptions

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| api | 请求方法 | _function_ | `undefined` |
| extra | 额外请求参数 | _object_ | `{}` |

### 断点续传 resumeUpload

> 需要在分片上传方法开始前调用

#### 示例

```js
  instance.resumeUpload(api, extra)
```

#### 参数

| 参数 | 说明 | 类型 |  默认值 | 是否必填 |
|------|------|-----|---------|----------|
| api | 请求方法 | _function_ | `undefined` | 是 |
| extra | 额外请求参数 | _object_ | `{}` | 否 |

### 开始上传 multipartUpload

#### 示例

```js
  instance.multipartUpload()
```

> 调用开始上传会返回一个promise, 会在分片上传完毕并且合并文件后自动结束

### 取消上传 abortMultipartUpload

##### 示例

```js
  instance.abortMultipartUpload()
```

> 调用结束触发取消回调