# 公共存储方法

### 介绍

lj-design 现有的浏览器存储方法介绍及使用方式

### 引入

```javascript
// 全局挂载
import * as storage from 'lj-design/es/utils/storage'
Vue.prototype.$storage = storage

// 单独引入
import { setLocalstorage } from 'lj-design/es/utils/storage'
```

### cookies存储

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|-----|-------|
| setCookie | 设置cookie值 | `key, value, expires, domain` | -- |
| getCookie | 获取cookie值 | `key` | key对应的cookie值 |
| removeCookie | 移除cookie值 | `key` | -- |

### sessionStorage存储

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|-----|-------|
| setSessionstorage | 设置sessionStorage值 | `key, value, expiretime` | -- |
| getSessionstorage | 获取sessionStorage值 | `key` | key对应的sessionStorage值 |
| clearSessionStorage | 清除所有sessionStorage | -- | -- |

### localStorage存储

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|-----|-------|
| setLocalstorage | 设置localstorage | `key` | -- |
| getLocalstorage | 获取localStorage | `key` | key对应的localStorage值 |
| removeLocalStorage | 清除指定localStorage | `key` | -- |
| clearLocalStorage | 清除所有localStorage | -- | -- |
