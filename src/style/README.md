# 通用样式

### 介绍

lj-design中现有的通用样式

### 引入

```javascript
import "lj-design/es/style/common.css"
```

## 使用

### 普通样式

```CSS
.v-flex /* flex纵向布局 */
.v-flex-row /* flex横向布局 */
.flex-1
.text-clamp-1 /* 单行省略 */
```

### 间距

`{property} {direction} - {size}` 格式使用。
> size 只在已存在的枚举值生效 `[0, 4, 6, 8, 10, 12, 15, 16, 18, 20, 24, 30, 40, 50, 60]`


#### property 应用间距类型

m - 应用 margin\
p - 应用 padding
*******************

#### direction 指定了该属性所应用的侧边

**t** - 应用 margin-top 和 padding-top 的间距\
**b** - 应用 margin-bottom 和 padding-bottom 的间距\
**l** - 应用 margin-left 和 padding-left 的间距\
**r** - 应用 margin-right 和 padding-right 的间距\
**x** - 应用 *-left 和 *-right 的间距\
**y** - 应用 *-top 和 *-bottom 的间距\
**a** - 在所有方向应用该间距\

#### 示例

```CSS
/* padding: 20px; */
.pa-20
/* margin-top: 20px; */
.mt-20
/* padding-left: 20px; padding-right: 20px; */
.px-20
/* margin-top: 220px; margin-bottom: 20px; */
.my-20
```

