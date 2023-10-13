// 初始化上传实例参数
export const INIT_OPTIONS = Object.freeze({
  // 自定义请求实例
  requestInstance: undefined,
  // 上传模式 single 单文件 multi 分片
  uploadMode: 'multi',
  // 上传配置 遵循axios配置，传入后会自动合并入axios请求配置 例：{ url: '/test/url' }
  requestOptions: {},
  // 分片配置项
  shardingOptions: {
    // 分片大小 MB
    shardingSize: 50 * 1024 * 1024,
    // 已上传分片列表取值key
    uploadedListKey: 'sliceFileNames',
    // 已上传文件取值key
    uploadedFileKey: 'filePath'
  },
  // 进度回调
  onUploadProgress: (progress) => {},
  // 自动进行分片
  autoSharding: true,
  // 上传并发数量
  concurrenceCount: 10
})