// 默认配置参数
export const DEFAULT_OPTIONS = {
  // 需要MD5加密
  needMD5: false,
  // 需要oss上传
  needOSS: false,
  // oss配置项
  ossConfig: undefined,
  // 请求参数
  requestOptions: {},
  // 进度回调 type: Function
  onUploadProgress: undefined,
}

// 初始化方法参数
export const INIT_OPTIONS = {
  // 自定义请求实例
  requestInstance: undefined,
}

// 默认请求配置
export const DEFAULT_REQUEST_CONFIG = {
  method: 'POST',
  url: '',
  timeout: 30 * 60 * 1000,
}