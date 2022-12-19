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

### 默认样式
```CSS
 
html {
  /* 更正所有浏览器中的线条高度 */
  line-height: 1.15; 
  /* 防止在iOS中改变方向后调整字体大小 */
  -webkit-text-size-adjust: 100%;
}

body {
  /* 删除所有浏览器中的边距 */
  margin: 0;
}

main {
  /* 在IE中一致地呈现“main”元素 */
  display: block;
}

/* 更正“section”中“h1”元素的字体大小和边距。Chrome、Firefox和Safari中的“文章”上下文。 */
h1 {
  margin: 0.67em 0; 
  font-size: 2em;
}

/**
   * 1.在Firefox中添加正确的框大小。
   * 2.在Edge和IE中显示溢出。
*/

hr {
  box-sizing: content-box;
  /* 1 */
  height: 0;
  /* 1 */
  overflow: visible;
  /* 2 */
}

pre {
  /* 更正所有浏览器中字体大小的继承和缩放。 */
  font-family: monospace;
  /* 更正所有浏览器中的奇数“em”字体大小。 */
  font-size: 1em; 
}

a {
  /* 删除IE 10中活动链接的灰色背景。 */
  background-color: transparent; 
}

abbr[title] {
  /* 在Chrome、Edge、IE、Opera和Safari中添加正确的文本装饰。 */
  text-decoration: underline dotted;
  /* 删除Chrome 57的底部边框- */
  border-bottom: none; 
}

b,
strong {
  /* 在Chrome、Edge和Safari中添加正确的字体粗细。 */
  font-weight: bolder;
}

code,
kbd,
samp {
  /* 更正所有浏览器中字体大小的继承和缩放。 */
  font-family: monospace;
  /* 更正所有浏览器中的奇数“em”字体大小。 */
  font-size: 1em; // 更正所有浏览器中的奇数“em”字体大小。
}

small {
  /* 在所有浏览器中添加正确的字体大小。*/
  font-size: 80%;
}

/**
   *防止“sub”和“sup”元素影响
   *所有浏览器。
*/

sub,
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* 嵌入式内容 ========================================================================== */

img {
  /* 删除IE 10中链接内图像的边框。 */
  border-style: none;
}

/* 表单标签
     ========================================================================== */

/**
   * 1.更改所有浏览器中的字体样式。
   * 2.删除Firefox和Safari中的边距。
*/
button,
input,
optgroup,
select,
textarea {
  margin: 0;
  /* 2 */
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  /* 1 */
}

/**
   * 显示IE中的溢出。
   * 1.在Edge中显示溢出。
*/

button,
input {
  /* 1 */
  overflow: visible;
}

/**
   * 删除Edge、Firefox和IE中文本转换的继承。
   *1.移除Firefox中文本转换的继承。
*/

button,
select {
  /* 1 */
  text-transform: none;
}

/**
   * 纠正在iOS和Safari中无法设置可点击类型的样式。
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}

/**
   * 移除Firefox中的内边框和填充。
*/

button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

/**
   * 恢复先前规则未设置的焦点样式。
*/

button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
   * 更正Firefox中的填充。
*/

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
   * 1.更正Edge和IE中的文本换行。
   *2.更正IE中“fieldset”元素的颜色继承。
   *3.移除填充物，这样开发人员在归零时不会陷入困境
   *所有浏览器中的“fieldset”元素。
*/

legend {
  box-sizing: border-box;
  /* 1 */
  display: table;
  /* 1 */
  max-width: 100%;
  /* 1 */
  padding: 0;
  /* 3 */
  color: inherit;
  /* 2 */
  white-space: normal;
  /* 1 */
}

/**
   * 在Chrome、Firefox和Opera中添加正确的垂直对齐方式。
*/

progress {
  vertical-align: baseline;
}

/**
   * 删除IE 10+中的默认垂直滚动条。
*/

textarea {
  overflow: auto;
}

/**
   * 1.在IE 10中添加正确的方框大小。
   * 2.移除IE 10中的填充物。
*/

[type='checkbox'],
[type='radio'] {
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
   * 更正Chrome中递增和递减按钮的光标样式。
*/

[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}

/**
   * 1.纠正Chrome和Safari中的奇怪外观。
   * 2.更正Safari中的大纲样式。
*/

[type='search'] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/**
   * 在macOS上移除Chrome和Safari中的内部填充。
*/

[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
   * 1.纠正在iOS和Safari中无法设置可点击类型的样式。
   * 2.在Safari中将字体属性更改为“inherit”。
*/

::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/*
   * 在Edge、IE 10+和Firefox中添加正确的显示。
*/

details {
  display: block;
}

/*
   * 在所有浏览器中添加正确的显示。
*/

summary {
  display: list-item;
}

/**
   * 在IE 10+中添加正确的显示。
*/

template {
  display: none;
}

/**
   * 在IE 10中添加正确的显示。
*/

[hidden] {
  display: none;
}
```
