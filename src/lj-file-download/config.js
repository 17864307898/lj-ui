// 初始化参数
export const INIT_OPTIONS = Object.freeze({
  /************** 公共配置 **************/
  // 自定义请求实例
  requestInstance: undefined,
  // 上传配置 遵循axios配置，传入后会自动合并入axios请求配置 例：{ url: '/test/url' }
  requestOptions: {},
  // loading提示信息配置
  loadingOptions: {},
  // 请求成功code码
  successCode: 200,
  // 获取文件名称的方法 需自定义处理时传入
  getFileName: undefined,
  // 获取下载链接的方法 需自定义处理时传入
  getFileLink: undefined,
})

// 下载请求默认配置
export const DEFAULT_REQUEST_OPTIONS = {
  method: 'post',
  url: '',
  timeout: 30 * 60 * 1000
}

// loading信息默认配置
export const DEFAULT_LOADING_OPTIONS = {
  message: '下载中，请耐心等待～',
  show: false,
}

// 导出请求默认配置
export const DEFAULT_EXPORT_REQUEST = {
  method: 'get',
  url: '',
  responseType: 'blob',
  timeout: 5 * 60 * 1000,
}