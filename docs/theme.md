# 定制主题

### 介绍

lj-design 提供了一套默认主题，CSS 命名采用 BEM 的风格，方便使用者覆盖样式。如果你想完全替换主题色或者其他样式，可以按照本文档进行主题定制。

### 样式变量

lj-design 使用了 `Scss` 对样式进行预处理，并内置了一些样式变量，通过替换样式变量即可定制你自己需要的主题。

下面是所有的基础样式变量，组件的颜色变量请参考各个组件的文档：

```js
// Color Palette
$black: #000;
$white: #fff;
$gray-1: #D3D3D3;
$gray-2: #C4C4C4;
$gray-3: #D7D7D7;
$gray-4: #F9F9F9;
$gray-5: #F2F2F2;
$gray-6: #F6F6F6;
$gray-7: #f4f4f6;
$gray-8: #E3E3E3;
$gray-9: #CCCCCC;
$red: #FC5A5A;

// Gradient Colors
$gradient-blue: linear-gradient(227deg, #6468FF 0%, #3470FF 100%);

// Component Colors
$color-primary: #3470ff;
$color-danger: #f67172;
$color-success: #3daf30;
$color-hover: #f9f9f9;
$color-warning: #e6a23c;

$color-text-primary: #333333;
$color-text-regular: #606266;
$color-text-secondary: #858598;
$color-text-placeholder: $gray-1;

$shadow-color-primary: rgba(52, 112, 255, 0.5);

// Padding
$padding-base: 4px;
$padding-xs: $padding-base * 2;
$padding-sm: $padding-base * 3;
$padding-md: $padding-base * 4;
$padding-lg: $padding-base * 6;
$padding-xl: $padding-base * 8;

// Font
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-md: 16px;
$font-size-lg: 24px;
$font-size-xl: 30px;
$font-weight-bold: 550;
$font-weight-normal: 400;
$line-height-xs: 14px;
$line-height-sm: 18px;
$line-height-md: 20px;
$line-height-lg: 22px;

// Animation
$animation-duration-base: 0.3s;
$animation-duration-fast: 0.2s;
$animation-timing-function-enter: ease-out;
$animation-timing-function-leave: ease-in;

// Border
$border-color: $gray-3;
$border-width-base: 1px;
$border-radius-sm: 2px;
$border-radius-md: 4px;
$border-radius-lg: 8px;
$border-radius-max: 999px;
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