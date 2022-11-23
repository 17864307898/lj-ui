# LjUpload 上传

### 介绍

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
| uploadParmes | 上传信息 | _object_ | `maxSize:文件最大值;content:{maxSize:限制文案,againUp:重新上传文案,可加标签;clickUp:点击上传文案,可加标签}` |

### 方法

| name | 说明 | 参数 |
|------|------|-----|
| uploadInfo | 获取上传文件值 | - |