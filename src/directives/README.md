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
#### 示例

```html
<div v-title="'test文字'"></div>
```
> 输入框类型的展示需加上input修饰符  eg: v-title.input

### v-press 防止短时间内多次点击

#### 引入

```js
import { press } from 'lj-design/es/directives'
Vue.use(press)
```

#### 使用

v-press:[duration`间隔时长`]="function`处理事件`"

#### 示例

```html
  <div v-press:2000="handleClick">测试点击</div>
```

### v-trim 输入框失去焦点时自动trim操作

#### 示例

```html
  <el-input v-trim></el-input>
```
> 仅适用于elementui的input组件(包含单行及多行输入)
