# LjUpload 上传

### 介绍
LjUploadFolder是一个基于el-upload上传文件的组件
### 引入

```js
  import Vue from 'vue';
  import { LjUpload } from 'lj-design';
  
  Vue.use(LjUpload);
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### props

| 参数 | 说明 | 类型 |  默认值 | 可选值
|------|------|-----|---------|---------|
| accept | 接受上传的文件类型（thumbnail-mode 模式下此参数无效） | _string_ | — |
| action | 文件路径 | _string_| — |
| name | 文件名称 | _string_ | file |
| data | 上传时附带的额外参数 | _object_ | — |
| show-file-list | 是否显示已上传文件列表	 | _boolean_ | true |
| drag | 是否启用拖拽上传（accept带参数时无效）| _boolean_ | false |
| limit | 最大允许上传个数 | _number_ | — |
| max-size | 文件最大值 | _number_ | 4294967296(4G) |
| content | 上传需要的一些文案 |`maxSize`:限制大小; `Exceed`: 限制数量，默认值：当前限制选择 ${limit} 个文件; `errorMsg`: 失败，默认值：上传失败！` | — |
| list-type	 | 文件列表的类型	 | _string_ | text | text/picture/picture-card |
| uploadFileList | 回显上传文件 | _object_ | `url`, `name` |
| md5Show | 是否支持md5 | _boolean_ | |
| ossShow | 是否支持oss上传 | _boolean_ | — |
| ossUploadPath | oss回调传参 | _object_ | `fileUrl`, `dir`, `token` | — |
| 其余参数遵循 [elementui](https://element.eleme.cn/#/zh-CN/component/installation) 配置 | 可通过配置展示不同需求 | — | — |

### slot

| name | 说明 | 参数 | 默认值
|------|------|-----|-----|
| uploadIcon | 上传文件icon | — | el-icon-upload |
| uploadText | 上传文件文案 | — | 将文件拖到此处，或点击上传 |
| uploadTip | 上传文件提示 | — | — |
### 方法

| name | 说明 | 类型 | 返回值 |
|------|------|-----|-----|
| uploadSuccess | 成功获取上传文件 | _object_ | `res`, `file`, `fileList` |
| uploadRemove |  删除文件，值为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。 | _object_ | `file`, `fileList` |
| uploadChange |  文件状态改变，添加文件、上传成功和上传失败时都会被调用，props里的md5Show为true则返回md5值 | _object_ | `file`, `fileList`，`md5` |
| ossUploadData | 读取oss值并传入props里的data | _object_ | `OSSAccessKeyId`,`callback`,`host`,`key`,`policy`,`signature`,`success_action_status`, |
| clearFiles | 清空上传 | — | — | 