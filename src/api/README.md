# API

### 介绍

lj-design 中现有的公共方法介绍以及使用方式

### 引入
  
```javascript
  import * as tools from 'lj-design/es/utils';
  Vue.prototype.$tools = tools;
  
  import { deepClone } from 'lj-design/es/utils';
```

### deepClone

#### 介绍

深拷贝

#### 参数

`target` 待拷贝值 {_object_}

#### 返回值

拷贝值

#### 示例
```js
const targetObj = {name: '张三', skills: ['sing', 'dance'] }
deepClone(targetObj) // {name: '张三', skills: ['sing', 'dance'] }
```