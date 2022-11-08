# 快速上手

### 介绍

通过本章节你可以了解到 lj-design 的安装方法和基本使用姿势。

## 安装

### 通过 npm 安装

在现有项目中使用 lj-design 时，可以通过 `npm` 或 `yarn` 进行安装：

```bash
npm i lj-design -S
```

```bash
yarn add lj-design -S
```
## 使用

### 完整引入

在 main.js 中写入以下内容：

```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ljDesign from 'lj-design';
import 'lj-design/lib/index.css';

Vue.use(ljDesign);
Vue.use(ElementUI);

```

以上代码便完成了 ljDesign 的引入。需要注意的是，样式文件需要单独引入。

> Tips: 配置按需引入插件后，将不允许直接导入所有组件。

> Tips：因为部分组件基于Element ui扩展，所以项目中必须依赖Element ui组件。

### 按需引入

可以通过 babel 插件来实现按需引入组件。我们需要安装 [babel-plugin-import](https://github.com/umijs/babel-plugin-import) 插件，它会在编译过程中将 import 语句自动转换为按需引入的方式。

#### 1. 安装插件

```js
npm i babel-plugin-import -D
```

#### 2. 配置插件

在.babelrc 或 babel.config.js 中添加配置：

```js
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "lj-design",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```

#### 3. 引入组件

接着你可以在代码中直接引入 lj-design 组件，插件会自动将代码转化为按需引入的形式。

```js
// 原始代码
import { LjTable } from 'lj-design';

// 编译后代码
import LjTable from 'lj-design/es/lj-table';
import 'lj-design/es/lj-table/style';
```

### 手动按需引入组件

在不使用任何构建插件的情况下，可以手动引入需要使用的组件和样式。

```js
// 引入组件脚本
import LjTable from 'lj-design/es/lj-table/index';

// 引入组件样式
// 若组件没有样式文件，则无须引入
import 'lj-design/es/lj-table/style/index';
```

#### 完整组件列表和引入方式

```js
import Vue from 'vue';

import { 
  LjTable,
} from 'lj-design';

Vue.use(LjTable);
```