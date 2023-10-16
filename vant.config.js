var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
// @ts-ignore
const package_json_1 = __importDefault(require('./package.json'));
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
    versions: package_json_1.default.version,
    links: [
      {
        logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/weapp.svg',
        url: 'https://nexus.spdx.cn/repository/npm-group/',
      },
    ],
    htmlMeta: {
      'docsearch:version': 'v4',
    },
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '快速上手',
          },
          {
            path: 'log',
            title: '更新日志',
          },
          {
            path: 'theme',
            title: '定制主题scss',
          },
          {
            path: 'style',
            title: '通用样式',
          },
          {
            path: 'locale',
            title: '国际化',
          }
        ],
      },
      {
        title: 'API',
        items: [
          {
            path: 'api',
            title: '公用方法',
          },
          {
            path: 'utils',
            title: '存储方法',
          },
          {
            path: 'directives',
            title: '自定义指令',
          },
          {
            path: 'lj-multi-upload',
            title: '分片上传api',
          }
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'lj-table',
            title: 'LjTable 表格',
          },
          {
            path: 'lj-input',
            title: 'LjInput 适配输入框',
          },
          {
            path: 'lj-upload',
            title: 'LjUpload 上传文件',
          },
          {
            path: 'lj-upload-folder',
            title: 'LjUploadFolder 上传文件夹',
          },
          {
            path: 'lj-collapse-filter',
            title: 'LjCollapseFilter 筛选',
          },
          {
            path: 'lj-echarts',
            title: 'LjEcharts 容器',
          },
        ],
      },
      {
        title: '业务组件',
        items: [
          {
            path: 'lj-filter',
            title: 'LjFilter 筛选',
          },
          {
            path: 'lj-saftey-risk',
            title: 'LjSafteyRisk 风险等级',
          },
          {
            path: 'lj-saftey-risk-check',
            title: 'LjSafteyRiskCheck 多风险筛选',
          },
          {
            path: 'lj-charts',
            title: 'LjCharts 图表',
          },
          {
            path: 'lj-check',
            title: 'LjCheck 内容检测',
          },
        ],
      },
    ],
  },
};
