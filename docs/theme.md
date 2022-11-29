# 定制主题

### 介绍

lj-design 提供了一套默认主题，CSS 命名采用 BEM 的风格，方便使用者覆盖样式。如果你想完全替换主题色或者其他样式，可以按照本文档进行主题定制。

### 样式变量

lj-design 使用了 `Scss` 对样式进行预处理，并内置了一些样式变量，通过替换样式变量即可定制你自己需要的主题。

下面是所有的基础样式变量，组件的颜色变量请参考各个组件的文档：

```js
// Color 调色
$red: #FC5A5A !default;
$black: #000 !default;
$white: #fff !default;
$gray-1: #D3D3D3 !default;
$gray-2: #C4C4C4 !default;
$gray-3: #D7D7D7 !default;
$gray-4: #F9F9F9 !default;
$gray-5: #F2F2F2 !default;
$gray-6: #F6F6F6 !default;
$gray-7: #f4f4f6 !default;
$gray-8: #E3E3E3 !default;
$gray-9: #CCCCCC !default;

//Colors 主色
$color-primary: #3F91F5 !default;

//Colors 辅助色
$color-danger: #ff4d4f !default;
$color-success: #13ce66 !default;
$color-hover: #f9f9f9 !default;
$color-warning: #ffba00 !default;

//Colors 中性色
$color-text-primary: #333 !default;
$color-text-regular: #666 !default;
$color-text-secondary: #999 !default;
$color-text-placeholder: $gray-1 !default;

// 渐变
$gradient-blue: linear-gradient(227deg, #6468FF 0%, #3470FF 100%) !default;

// Font 字体大小
$font-size-xs: 12px;
$font-size-xs-big: 13px;
$font-size-sm: 14px;
$font-size-md: 16px;
$font-size-lg: 18px;
$font-size-xl: 22px;
$font-size-xl-big: 24px;

// Padding
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

// Border
$border-color: $gray-3 !default;
$border-width-base: 1px !default;
$border-radius-sm: 2px !default;
$border-radius-md: 4px !default;
$border-radius-lg: 8px !default;
$border-radius-xl: 24px !default;
$border-radius-max: 999px !default;

//风险等级颜色
$superDanger: #92302B; //严重
$superDangerLight:rgba(146, 48, 43, 0.1);
$high: #D05C43; //高危
$highLight: rgba(208, 92, 67, 0.1); //高危
$mid: #EE8F4F; //中危
$midLight: rgba(238, 143, 79, 0.1); //中危
$low: #F7DB77; //低危
$lowLight: rgba(247, 219, 119, 0.2); //低危
$unknown: #737189; // 未评级
$unknownLight: rgba(115, 113, 137, 0.1); // 未评级
$safety: #8CB14A; //安全
$safetyLight: rgba(140, 177, 74, 0.1); //安全

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