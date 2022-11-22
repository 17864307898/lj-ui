# API

### 介绍

lj-design 中现有的公共方法介绍以及使用方式

### 引入
  
```javascript
// 全局挂载
import * as tools from 'lj-design/es/utils'
Vue.prototype.$tools = tools
  
// 按需引入
import { deepClone } from 'lj-design/es/utils'
```

### API

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|-----|-------|
| deepClone | 深拷贝 | `target`_object_ | _object_ |
| onceSession | 单次缓存,仅在不传入val值时返回当前key值对应的session值,同时清空当前session | `key, val` | _any_ |
| cleanObjectEmpty | 移除对象中为空的属性 | `target`_object_ | _object_ |
| byteConvert | 字节单位转换 | `bytes` _number_  _string_ | _string_ |
| paramObj | 将url请求参数转为json格式 | `url` _string_ | _object_ |
| randomNumber | m到n的随机数 | `m`_number_ `n`_number_ | _number_ |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
### 时间处理

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|-----|-------|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |