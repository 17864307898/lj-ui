# LjUpload 上传

### 介绍
LjUploadFolder组件可用于上传文件，支持oss、md5（基于ElementUI下的el-upload）
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
| max-size | 文件最大值 | _number_ | 4294967296（4G） |
| content | 上传可选的一些文案 |`exceed`: 限制数量; `errorMsg`: 失败 | {exceed: 当前限制选择 ${limit} 个文件,errorMsg: 上传失败！} |
| uploadFileList | 回显上传文件 | _object_ | `url`, `name` |
| md5Show | 是否支持md5 | _boolean_ | |
| ossShow | 是否支持oss上传 | _boolean_ | — |
| ossUploadPath | oss回调传参 | _object_ | `fileUrl`, `dir`, `token` | — |
| 其余参数遵循 [elementui](https://element.eleme.cn/#/zh-CN/component/upload) 配置 | 可通过配置展示不同需求 | — | — |

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
| uploadRemove |  删除文件。 | _object_ | `file`, `fileList` |
| uploadChange |  文件状态改变，上传成功和上传失败时都会被调用 | _object_ | `file`, `fileList`，`md5` |
| ossUploadData | 读取oss值并传入props里的data | _object_ | `OSSAccessKeyId`,`callback`,`host`,`key`,`policy`,`signature`,`success_action_status`, |
| clearFiles | 清空上传 | — | — | 