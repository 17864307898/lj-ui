module.exports = {
  name: 'lj-design',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/lj-design/',
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
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'demo-button',
            title: 'DemoButton 按钮',
          },
          {
            path: 'lj-table',
            title: 'LjTable 表格',
          },
        ],
      },
    ],
  },
};
