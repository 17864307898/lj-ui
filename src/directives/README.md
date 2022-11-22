# 自定义指令

### 介绍

lj-design 目前提供了部分自定义指令满足不同业务场景的需求

### 引入

```javascript
// 全局引入
import directives from 'lj-design/es/directives'
Vue.use(directives)

// 按需引入
import { title } from 'lj-design/es/directives'
Vue.use(title)
```

## 使用

### v-title 文本溢出显示

#### 引入

```js
import { title } from 'lj-design/es/directives'
Vue.use(title)
```

#### 修饰符

> 输入框类型的展示需加上input修饰符  eg: v-title.input

#### 示例

```html
<div v-title="'test文字'"></div>
```