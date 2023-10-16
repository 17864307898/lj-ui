import SparkMD5 from 'spark-md5'
import axios from 'axios'
import { INIT_OPTIONS, REQUEST_OPTIONS, MERGE_OPTIONS, SHARDING_OPTIONS } from './utils/config'

const { CancelToken } = axios

// 分片上传
export default class MultiUpload {
  constructor(file, options) {
    // 基础信息
    this.file = file
    this.name = file.name
    this.size = file.size
    this.md5Str = ''
    // 合并信息
    this.mergeData = null

    // 合并处理参数
    const finalOption = Object.assign({}, INIT_OPTIONS, options)
    const { requestInstance, onUploadProgress, requestOptions } = finalOption

    // 初始化请求实例 支持自定义传入
    this.requestInstance = requestInstance || axios
    // 进度回调
    this.onUploadProgress = onUploadProgress
    // 请求参数合并
    this.requestOptions = Object.assign({}, REQUEST_OPTIONS, requestOptions)

    // 处理参数
    this._initShardingOptions(finalOption)
  }

  // 分片上传参数初始化
  _initShardingOptions({ shardingOptions = {}, concurrenceCount, mergeOptions }) {
    this.shardingOptions = Object.assign({}, SHARDING_OPTIONS, shardingOptions)
    const { shardingSize } = this.shardingOptions

    // 每个分片的大小
    this.shardingSize = shardingSize
    // 总片数
    this.shardingCount = Math.ceil(this.size / shardingSize)
    // 当前分片页数
    this.currentSharding = 0
    // 当前请求任务数
    this.currentTask = 0
    // 已经上传的分片列表
    this.sliceFileNames = []
    // 当前上传进度
    this.percent = -1
    // 并发数量
    this.concurrenceCount = concurrenceCount
    // 合并文件配置项
    this.mergeOptions = Object.assign({}, MERGE_OPTIONS, mergeOptions)
    // 任务队列
    this.taskQueue = new Map()
    // 完成任务队列
    this.doneQueue = []
    // 整体需要返回promise
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  // 初始化 分片 MD5
  startSharding() {
    return new Promise((resolve) => {
      this.fileReader = new FileReader()
      // 切割方法
      this.blobSlice =
        File.prototype.mozSlice ||
        File.prototype.webkitSlice ||
        File.prototype.slice
      const spark = new SparkMD5()

      this.fileReader.onload = (e) => {
        // append binary string
        spark.appendBinary(e.target.result)
        this.currentSharding++

        // 分片未完成
        if (this.currentSharding < this.shardingCount) {
          this._loadNext()
        } else {
          // 分片完成
          this.md5Str = spark.end()
          this.currentSharding = 0
          resolve()
        }
      }

      this._loadNext()
    })
  }

  // 分割加载下一片
  _loadNext() {
    const { fileReader, blobSlice } = this

    const start = this.currentSharding * this.shardingSize
    const end =
      start + this.shardingSize >= this.size ? this.size : start + this.shardingSize

    fileReader.readAsBinaryString(blobSlice.call(this.file.raw || this.file, start, end))
  }

  // 断点续传 检测是否有已经上传的文件
  async breakpointResume(api, extraParams = {}/**额外参数 */) {
    if (!api || typeof api !== 'function') {
      console.error('The request method must be passed in and must be a function')
      return
    }

    // 先进行文件分割
    await this.startSharding()

    // 配置
    const { uploadedListKey, uploadedFileKey } = this.shardingOptions

    // 请求
    const params = {
      md5: this.md5Str,
      fileName: this.name,
      ...extraParams,
    }

    try {
      const res = await api(params)

      if (res?.code === 200) {
        if (res?.data[uploadedFileKey] != null && res?.data[uploadedFileKey].size > 0) {
          fn && typeof fn === 'function' && fn(res.data)

          return res.data
        }

        this.sliceFileNames = res.data[uploadedListKey] || []
        // 总片数减去 已经上传的
        this.shardingCount = this.shardingCount - this.sliceFileNames.length
      }

      return res
    } catch (err) {
      throw new Error(err)
    }
  }

  // 合并文件
  async mergeFile() {
    const { api, extra } = this.mergeOptions

    if (!api) {
      console.error('The mergeOptions option must be passed in and must carry the api')
      return
    }

    if (typeof api !== 'function') {
      console.error('api methods must be functions')
      return
    }

    try {
      const params = {
        md5: this.md5Str,
        newFileName: this.name,
        size: this.size,
        ...extra,
      }

      const { data } = await api(params)

      this.mergeData = {...data}
      this.resolve()
      return
    } catch (err) {
      this.mergeData = null
      this.reject(err)
      throw new Error(err)
    }
  }

  // 开始上传
  async startUpload() {
    // 未分片 开始分片
    if (!this.md5Str) {
      await this.startSharding()
    }

    // 分片上传
    this.uploadShardingFile()

    return this.promise
  }

  // 开始分片上传
  uploadShardingFile() {
    const _self = this

    // 断点续传
    if (_self.sliceFileNames.includes(_self.currentTask + 1 + '')) {
      _self.currentTask++
      return this.uploadShardingFile()
    }

    // 文件总大小，第一次，分片大小
    const start = _self.currentTask * _self.shardingSize
    const end = start + _self.shardingSize
    // 将文件进行切片
    const file = _self.file?.raw || _self.file
    const packet = file.slice(start, end)

    /*  构建form表单进行提交  */
    let form = new FormData()
    form.append('md5', _self.md5Str) // 前端生成md5
    form.append('file', packet)
    form.append('fileName', _self.name)
    form.append('totalSize', _self.size)
    form.append('total', _self.shardingCount) // 总片数
    form.append('index', _self.currentTask + 1) // 当前是第几片

    _self.requestShardingTask(packet, form)
  }

  // 分片上传请求任务
  requestShardingTask(packet, form) {
    const _self = this

      // 取消方法
      let cancel

      // 发出请求
      const res = _self.requestInstance({
        ..._self.requestOptions,
        onUploadProgress: (progressEvent) => {
          const { lengthComputable, loaded, total } = progressEvent?.event || progressEvent || {}

          // 原生获取上传进度的事件
          if (lengthComputable) {
            // 已经上传的百分比
            const percent = (loaded / total).toFixed(2)

            const curr = _self.taskQueue.get(packet)

            // 修改百分比
            let obj = {}
            if (curr) {
              obj = Object.assign({}, curr, { percent })
            } else {
              obj = { percent }
            }

            _self.taskQueue.set(packet, obj)

            // 当前总分片的进度
            const shardingPercent = _self.doneQueue.length / _self.shardingCount
            // 平均进度
            const perPercent = 100 / _self.shardingCount / 100

            // 计算进行中的任务总进度
            const percentList = [..._self.taskQueue.values()]
            const result = percentList.reduce((total, x) => {
              return total += Number(x.percent) * perPercent
            }, 0)

            // 总进度
            const finalPercent = ((shardingPercent + result) * 100).toFixed(2)
            _self.percent = finalPercent

            // 返回最终进度
            if (typeof _self.onUploadProgress === 'function') {
              _self.onUploadProgress(finalPercent)
            }
          }
        },
        data: form,
        cancelToken: new CancelToken((c) => {
          cancel = c
        })
      })

      // 添加到任务队列
      _self.taskQueue.set(packet, {
        percent: 0,
        cancel,
      })

      // 任务数递增
      _self.currentTask++

      // 未超过最大并发 并且 存在分片任务待分配
      if (_self.taskQueue.size < _self.concurrenceCount && _self.currentTask < _self.shardingCount) {
        _self.uploadShardingFile()
      }

      res.then(() => {
        // 已完成队列
        _self.doneQueue.push(_self.currentTask)
        next()
      })
        .catch(() => {
          next()
        })

    // 下一条任务
    function next() {
      // 任务队列剔除
      _self.taskQueue.delete(packet)

      // 未超过最大并发
      if (_self.taskQueue.size < _self.concurrenceCount && _self.currentTask < _self.shardingCount) {
        _self.uploadShardingFile()
      }

      // 待执行任务为空
      if (_self.taskQueue.size === 0 && _self.currentTask >= _self.shardingCount) {
        // 自动合并文件
        _self.mergeFile()
      }
    }
  }

  // 分片取消上传
  cancelShardingRequest() {
    this.taskQueue.forEach(({ cancel }) => {
      cancel()
    })

    this.taskQueue.clear()
  }
}
