# 定制主题

### 介绍

lj-design 提供了一套默认主题，CSS 命名采用 BEM 的风格，方便使用者覆盖样式。如果你想完全替换主题色或者其他样式，可以按照本文档进行主题定制。

### 样式变量

lj-design 使用了 `Scss` 对样式进行预处理，并内置了一些样式变量，通过替换样式变量即可定制你自己需要的主题。

下面是所有的基础样式变量，组件的颜色变量请参考各个组件的文档：

```js
//Colors 通用 辅助字体颜色、背景颜色、border颜色
$black: #000 !default;
$white: #fff !default;
$disabled: #ececec !default;

//字体颜色
$font-color-grade-1: #333 !default;
$font-color-grade-2: #666 !default;
$font-color-grade-3: #999 !default;
$font-color-gray: #D7D7D7 !default;
$font-color-primary: #3F91F5 !default;
$font-color-danger: #ff4d4f !default;
$font-color-success: #13ce66 !default;
$font-color-hover: #f9f9f9 !default;
$font-color-warning: #ffba00 !default;
$font-color-placeholder: $font-color-gray !default;

//背景颜色
$bg-color-gray: #D3D3D3 !default;
$bg-color-primary: #3F91F5 !default;
$bg-color-danger: #ff4d4f !default;
$bg-color-success: #13ce66 !default;
$bg-color-hover: #f9f9f9 !default;
$bg-color-warning: #ffba00 !default;

//border颜色
$border-color-gray: #D3D3D3 !default;
$border-color-primary: #3F91F5 !default;
$border-color-danger: #ff4d4f !default;
$border-color-success: #13ce66 !default;
$border-color-hover: #f9f9f9 !default;
$border-color-warning: #ffba00 !default;

// 渐变
$gradient-gray: linear-gradient(227deg, #D3D3D3 0%, #D3D3D3 100%) !default;
$gradient-primary: linear-gradient(227deg, #4e9af8 0%, #3F91F5 100%) !default;
$gradient-danger: linear-gradient(227deg, #fa6f72 0%, #ff4d4f 100%) !default;
$gradient-success: linear-gradient(227deg, #4fd38b 0%, #13ce66 100%) !default;
$bd-color-hover: linear-gradient(227deg, #c3bebe 0%, #f9f9f9 100%) !default;
$gradient-warning: linear-gradient(227deg, #fad879 0%, #ffba00 100%) !default;

// Font 字体大小
$font-size-xs: 12px;
$font-size-xb: 13px;
$font-size-sm: 14px;
$font-size-md: 16px;
$font-size-lg: 18px;
$font-size-xl: 22px;
$font-size-lb: 24px;

// Padding大小
$padding-base: 4px !default;
$padding-xs: $padding-base * 2 !default;
$padding-sm: $padding-base * 3 !default;
$padding-md: $padding-base * 4 !default;
$padding-lg: $padding-base * 6 !default;
$padding-xl: $padding-base * 8 !default;

// Animation
$animation-duration-base: 0.3s !default;
$animation-duration-fast: 0.2s !default;
$animation-timing-function-enter: ease-out !default;
$animation-timing-function-leave: ease-in !default;

// Border宽以及边角
$border-width-base: 1px !default;
$border-radius-sm: 2px !default;
$border-radius-md: 4px !default;
$border-radius-lg: 8px !default;
$border-radius-xl: 24px !default;
$border-radius-max: 999px !default;

//风险等级颜色
$super-danger: #92302B; //严重
$super-danger-light:rgba(146, 48, 43, 0.1);
$high: #D05C43; //高危
$high-light: rgba(208, 92, 67, 0.1); //高危
$mid: #EE8F4F; //中危
$mid-light: rgba(238, 143, 79, 0.1); //中危
$low: #F7DB77; //低危
$low-light: rgba(247, 219, 119, 0.2); //低危
$unknown: #737189; // 未评级
$unknown-light: rgba(115, 113, 137, 0.1); // 未评级
$safety: #8CB14A; //安全
$safety-light: rgba(140, 177, 74, 0.1); //安全

```

### 定制方法

#### 步骤一 引入样式源文件

定制主题时，需要引入组件对应的 Scss 样式文件，支持按需引入和手动引入两种方式。

#### 按需引入样式（推荐）

在 babel.config.js 中配置按需引入样式源文件，注意 babel6 不支持按需引入样式，请手动引入样式。

```js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'lj-design',
        libraryDirectory: 'es',
        // 指定样式路径
        style: (name) => `${name}/style/scss`,
      },
      'lj-design',
    ],
  ],
};
```

#### 手动引入样式

```js
// 引入全部样式
import 'lj-design/lib/index.scss';

// 引入单个组件样式
import 'lj-design/lib/lj-table/style/scss';
```

### 步骤二 修改样式变量

根据已有变量直接覆盖修改

#### 全局覆盖

```js
// 新建scss文件覆盖
// variables.scss
$color-primary: red;
@import "~lj-design/lib/index.scss";
```

```js
// main.js
import LjDesign from 'lj-design'
import './variables.scss'
```