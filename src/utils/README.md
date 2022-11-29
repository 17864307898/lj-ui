# 公共存储方法

### 介绍

lj-design 现有的浏览器存储方法介绍及使用方式

### 目录

| 方法名 | 说明  |
| ------- | ------ |
| <a href="/#/utils#cookies-cun-chu">cookies 存储</a> |  客户端存储机制。用于存储少量的文本数据，数据持久性,存储在客户端并发送给服务器读取，每一次HTTP请求都会把这些数据传输到服务器端。|
| <a href="/#/utils#sessionstoragecun-chu">sessionStorage 存储</a> | 本地存储。seesionStorage 的数据不会跟随 HTTP 请求一起发送到服务器，只会在本地生效，并在关闭标签页后清除数据。 |
| <a href="/#/utils#localstoragecun-chu">localStorage 存储</a> | 持久化的本地存储。localStorage 数据的不需要网络、大小 5M 、域内安全、永久存储、只要不删除，就一直存在。 |

### 引入

```javascript
// 全局挂载
import * as storage from 'lj-design/es/utils/storage';
Vue.prototype.$storage = storage;

// 单独引入
import { setLocalstorage } from 'lj-design/es/utils/storage';
```

### cookies 存储

| 方法名       | 说明           | 参数                             | 返回值               |
| ------------ | -------------- | -------------------------------- | -------------------- |
| setCookie    | 设置 cookie 值 | `key, value, expiretime, domain` | --                   |
| getCookie    | 获取 cookie 值 | `key`                            | key 对应的 cookie 值 |
| removeCookie | 移除 cookie 值 | `key`                            | --                   |

> cookie在性质上是绑定在特定的域名下的，每个域的cookie总数是有限的，最好是保持在30条以内。超过限制后浏览器会删除一些cookie，以便腾出空间容纳新的cookie，除了条数，cookie大小也是有限制的，大多数浏览器都有大约4kb的长度限制，超过大小后将无法再设置新的cookie。这里的大小指的是一个域下的所有cookie，而不是一条cookie的大小

#### 示例

```javascript
// 设置
setCookie('language','en', 30000, 'https://tangram-manage.test.spdx.cn)
// 取值
getCookie('language') // en
// 删除
removeCookie('language') // undefined

```

### sessionStorage 存储

| 方法名              | 说明                    | 参数                     | 返回值                       |
| ------------------- | ----------------------- | ------------------------ | ---------------------------- |
| setSessionstorage   | 设置 sessionStorage 值  | `key, value, expiretime` | --                           |
| getSessionstorage   | 获取 sessionStorage 值  | `key`                    | key 对应的 sessionStorage 值 |
| clearSessionStorage | 清除所有 sessionStorage | --                       | --                           |

#### 示例

```javascript
// 设置
setSessionstorage('Id', '1', 30000);
// 取值
getSessionstorage('Id'); // 1
// 清除
clearSessionStorage(); // id则不存在
```

### localStorage 存储

| 方法名             | 说明                  | 参数          | 返回值                     |
| ------------------ | --------------------- | ------------- | -------------------------- |
| setLocalstorage    | 设置 localstorage     | `key` `value` | --                         |
| getLocalstorage    | 获取 localStorage     | `key`         | key 对应的 localStorage 值 |
| removeLocalStorage | 清除指定 localStorage | `key`         | --                         |
| clearLocalStorage  | 清除所有 localStorage | --            | --                         |

#### 示例

```javascript
const dataJson1 = { id: 1, name: '鱼' },
  dataJson2 = { id: 2, name: '兔' };
// 设置
setLocalstorage('data1', JSON.stringify(dataJson1), 30000);
setLocalstorage('data2', JSON.stringify(dataJson2), 30000);
// 取值
getLocalstorage('data1'); // "{name: '小明', age: 18}"
// 删除
removeLocalStorage('data1'); // data1则不存在，只剩data2
// 清除
clearSessionStorage(); // data1和data2则都不存在
```
