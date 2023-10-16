// 请求参数
export const REQUEST_OPTIONS = {
  method: 'POST',
  url: '',
}

// 合并文件默认配置项
export const MERGE_OPTIONS = {
  // 请求方法
  api: () => { },
  // 额外参数
  extra: {},
}

// 分片默认配置
export const SHARDING_OPTIONS = {
  // 分片大小 MB
  shardingSize: 50 * 1024 * 1024,
  // 已上传分片列表取值key
  uploadedListKey: 'sliceFileNames',
  // 已上传文件取值key
  uploadedFileKey: 'filePath'
}

// 初始化上传实例参数
export const INIT_OPTIONS = Object.freeze({
  // 自定义请求实例
  requestInstance: undefined,
  // 上传配置 遵循axios配置，传入后会自动合并入axios请求配置 例：{ url: '/test/url' }
  requestOptions: {},
  // 分片配置项
  shardingOptions: {},
  // 进度回调
  onUploadProgress: () => { },
  // 自动进行分片
  autoSharding: true,
  // 上传并发数量
  concurrenceCount: 10,
  // 合并文件配置项
  mergeOptions: {},
})