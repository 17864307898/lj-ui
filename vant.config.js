module.exports = {
  name: 'lj-design',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: './', // 本地构建文档路径
    },
  },
  site: {
    title: 'lj-design',
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    hideSimulator: true,
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '快速上手',
          },
          {
            path: 'theme',
            title: '定制主题scss',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          // {
          //   path: 'demo-button',
          //   title: 'DemoButton 按钮',
          // },
          {
            path: 'lj-table',
            title: 'LjTable 表格',
          },
          {
            path: 'lj-input',
            title: 'LjInput 适配输入框',
          },
        ],
      },
      {
        title: 'API',
        items: [
          {
            path: 'api',
            title: 'API',
          },
        ],
      },
      {
        title: '其他',
        items: [
          {
            path: 'style',
            title: '通用样式',
          },
        ],
      },
    ],
  },
};
