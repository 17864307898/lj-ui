# LjUpload 上传

### 介绍
LjUploadFolder组件可用于上传文件夹。
### 引入

```js
  import Vue from 'vue';
  import { LjUploadFolder } from 'lj-design';
  
  Vue.use(LjUploadFolder);
```

## 代码演示

### 基础用法

<demo-code>./demo/index.vue</demo-code>

## API

### props

| 参数 | 说明 | 类型 |  默认值 |
|------|------|-----|---------|
| max-size | 文件最大值 | _number_ | — |
| content | 上传需要的一些文案 |`maxSize`:限制大小; `Exceed`: 限制数量，默认值：当前限制选择 ${limit} 个文件; `errorMsg`: 失败，默认值：上传失败！` | — |

### slot

| name | 说明 | 参数 | 默认值
|------|------|-----|-----|
| uploadIcon | 上传文件icon | — | el-icon-upload |
| uploadText | 上传文件文案 | — | 将文件拖到此处，或点击上传 |
| uploadTip | 上传文件提示 | — | — |

### 方法

| name | 说明 | 参数 |
|------|------|-----|
| uploadInfo | 获取上传文件值 | - |