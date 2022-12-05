# # 国际化

### 介绍

lj-design 采用中文作为默认语言，同时支持多语言切换，请按照下方教程进行国际化设置。

## 使用方法

### 多语言切换

lj-design 通过 Locale 组件实现多语言支持，使用 `Locale.use` 方法可以切换当前使用的语言。

```js
import { Locale } from 'lj-design';
// 引入英文语言包
import enUS from 'lj-design/es/locale/lang/en-US';

Locale.use('en-US', enUS);
```

### 覆盖语言包

通过 `Locale.add` 方法可以实现文案的修改和扩展，示例如下：

```js
import { Locale } from 'lj-design';

const messages = {
  'zh-CN': {
    vanPicker: {
      confirm: '关闭', // 将'确认'修改为'关闭'
    },
  },
};

Locale.add(messages);
```

### 语言包

目前支持的语言:

| 语言                 | 文件名       | 版本     |
| -------------------- | ------------ | -------- |
| 英语                 | en-US        | -        |
| 简体中文             | zh-CN        | -        |

## 常见问题

### 业务代码如何实现国际化？

可以使用 [vue-i18n](https://github.com/kazupon/vue-i18n) 来实现。
