# LjSingleUpload 单文件上传api

### 介绍
LjSingleUpload 用于单文件上传
### 引入

```js
  import Vue from 'vue';
  import { LjSingleUpload } from 'lj-design';
  
  // 返回一个promise对象
  const instance = new LjSingleUpload(file, options)
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
| needMD5 | 是否需要md5加密 | _boolean_ | `false` |
| needOSS | 是否需要oss上传 | _boolean_ | `false` |
| ossConfig | oss配置项 | _object_ | `undefined` |
| onUploadProgress | 进度回调, 接受当前进度作为参数 | _function_ | `undefined` |

> 注：默认请求方式 post 需要变动时传入 `requestOptions: { method: 'get' }`


### methods
#### 静态方法 init 

##### 示例

```js
  LjSingleUpload.init({ requestInstance: customInstance })
```

> 目前只支持自定义请求实例

#### 开始上传 startUpload

> 返回一个promise对象

##### 示例

```js
  await instance.startUpload()
```

#### 取消上传 cancelUpload

##### 示例

```js
  instance.cancelUpload()
```