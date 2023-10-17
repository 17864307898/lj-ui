import SparkMD5 from 'spark-md5'
import axios from 'axios'
import {
  INIT_OPTIONS,
  REQUEST_OPTIONS,
  MERGE_OPTIONS,
  SHARDING_OPTIONS,
  PENDING,
  GONING,
  ENDING,
  CANCEL,
} from './utils/config'

const { CancelToken, isCancel } = axios
// 创建私有变量
const taskQueue = Symbol()
const doneQueue = Symbol()
const taskStatus = Symbol()

// 分片上传
export default class MultipartUpload {
  constructor(file, options) {
    // 基础信息
    this.file = file
    this.name = file.name
    this.size = file.size
    this.md5Str = ''
    // 合并信息
    this.mergeData = null
    // 任务状态 
    this[taskStatus] = PENDING

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
    this._initPartOptions(finalOption)
  }

  // 分片上传参数初始化
  _initPartOptions({ partOptions = {}, concurrenceCount, mergeOptions, cancelFn }) {
    this.partOptions = Object.assign({}, SHARDING_OPTIONS, partOptions)
    const { partSize } = this.partOptions

    // 每个分片的大小
    this.partSize = partSize
    // 总片数
    this.partCount = Math.ceil(this.size / partSize)
    // 当前分片页数
    this.currentPart = 0
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
    // 取消回调
    this.cancelFn = cancelFn
    // 任务队列
    this[taskQueue] = new Map()
    // 完成任务队列
    this[doneQueue] = []
    // 整体需要返回promise
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  // 初始化 分片 MD5
  _shardingFile() {
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
        this.currentPart++

        // 分片未完成
        if (this.currentPart < this.partCount) {
          this._loadNext()
        } else {
          // 分片完成
          this.md5Str = spark.end()
          this.currentPart = 0
          resolve()
        }
      }

      this._loadNext()
    })
  }

  // 分割加载下一片
  _loadNext() {
    const { fileReader, blobSlice } = this

    const start = this.currentPart * this.partSize
    const end =
      start + this.partSize >= this.size ? this.size : start + this.partSize

    fileReader.readAsBinaryString(blobSlice.call(this.file.raw || this.file, start, end))
  }

  // 断点续传 检测是否有已经上传的文件
  async resumeUpload(api, extraParams = {}/**额外参数 */) {
    if (!api || typeof api !== 'function') {
      console.error('The request method must be passed in and must be a function')
      return
    }

    // 先进行文件分割
    await this._shardingFile()

    // 配置
    const { uploadedListKey, uploadedFileKey } = this.partOptions

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
          return res.data
        }

        this.sliceFileNames = res.data[uploadedListKey] || []
        // 塞入已完成任务
        this[doneQueue] = this.sliceFileNames?.map((x, i) => i)
        // 总片数减去 已经上传的
        this.partCount = this.partCount - this.sliceFileNames.length
      }

      return res
    } catch (err) {
      throw new Error(err)
    }
  }

  // 合并文件
  async appendFile() {
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

      this.mergeData = { ...data }
      this.resolve()
      this[taskStatus] = ENDING
      return
    } catch (err) {
      this.mergeData = null
      this.reject(err)
      this[taskStatus] = ENDING
    }
  }

  // 开始上传
  async multipartUpload() {
    // 未分片 开始分片
    if (!this.md5Str) {
      await this._shardingFile()
    }

    // 检查是否传入了上传地址
    if (!this.requestOptions.url) {
      console.error('The url under the requestOptions option must be passed in')
      return
    }

    this[taskStatus] = GONING

    // 分片上传
    this._uploadPart()

    return this.promise
  }

  // 分片上传
  _uploadPart() {
    const _self = this

    // 断点续传
    if (_self.sliceFileNames.includes(_self.currentTask + 1 + '')) {
      _self.currentTask++
      return this._uploadPart()
    }

    // 文件总大小，第一次，分片大小
    const start = _self.currentTask * _self.partSize
    const end = start + _self.partSize
    // 将文件进行切片
    const file = _self.file?.raw || _self.file
    const packet = file.slice(start, end)

    /*  构建form表单进行提交  */
    let form = new FormData()
    form.append('md5', _self.md5Str) // 前端生成md5
    form.append('file', packet)
    form.append('fileName', _self.name)
    form.append('totalSize', _self.size)
    form.append('total', _self.partCount) // 总片数
    form.append('index', _self.currentTask + 1) // 当前是第几片

    _self._partTask(packet, form)
  }

  // 分片上传请求任务
  _partTask(packet, form) {
    const _self = this

    // 取消方法
    let cancel

    // 发出请求
    const res = _self.requestInstance({
      ..._self.requestOptions,
      onUploadProgress: (progressEvent) => {
        return _self._onPorgress.call(_self, progressEvent, packet)
      },
      data: form,
      cancelToken: new CancelToken((c) => {
        cancel = c
      })
    })

    // 添加到任务队列
    _self[taskQueue].set(packet, {
      percent: 0,
      cancel,
    })

    // 任务数递增
    _self.currentTask++

    // 未超过最大并发 并且 存在分片任务待分配
    if (_self[taskQueue].size < _self.concurrenceCount && _self.currentTask < _self.partCount) {
      _self._uploadPart()
    }

    res.then(() => {
      // 已完成队列
      _self[doneQueue].push(_self.currentTask)
      next()
    })
      .catch((err) => {
        // 取消的请求取消自动上传
        if (isCancel(err)) {
          console.error('The request has been cancelled')

          
          _self[taskQueue].delete(packet)

          // 将promise状态置为resolve
          if (_self[taskQueue].size === 0) _self.resolve()
        } else {
          next()
        }
      })

    // 下一条任务
    function next() {
      // 任务队列剔除
      _self[taskQueue].delete(packet)

      // 未超过最大并发
      if (_self[taskQueue].size < _self.concurrenceCount && _self.currentTask < _self.partCount) {
        _self._uploadPart()
      }

      // 待执行任务为空
      if (_self[taskQueue].size === 0 && _self.currentTask >= _self.partCount) {
        // 自动合并文件
        _self.appendFile()
      }
    }
  }

  // 进度监听
  _onPorgress(progressEvent, packet) {
    const _self = this
    const { lengthComputable, loaded, total } = progressEvent?.event || progressEvent || {}

    // 原生获取上传进度的事件
    if (lengthComputable) {
      // 已经上传的百分比
      const percent = (loaded / total).toFixed(2)

      const curr = _self[taskQueue].get(packet)

      // 修改百分比
      let obj = {}
      if (curr) {
        obj = Object.assign({}, curr, { percent })
      } else {
        obj = { percent }
      }

      _self[taskQueue].set(packet, obj)

      // 当前总分片的进度
      const partPercent = _self[doneQueue].length / _self.partCount
      // 平均进度
      const perPercent = 100 / _self.partCount / 100

      // 计算进行中的任务总进度
      const percentList = [..._self[taskQueue].values()]
      const result = percentList.reduce((total, x) => {
        return total += Number(x.percent) * perPercent
      }, 0)

      // 总进度
      const finalPercent = ((partPercent + result) * 100).toFixed(2)
      _self.percent = finalPercent

      // 返回最终进度
      if (_self.onUploadProgress && typeof _self.onUploadProgress === 'function') {
        _self.onUploadProgress(finalPercent)
      }
    }
  }

  // 分片取消上传
  abortMultipartUpload() {
    this[taskQueue].forEach(({ cancel }) => {
      cancel('Active cancellation request')
    })

    this[taskQueue].clear()
    this[taskStatus] = CANCEL
    this.cancelFn && typeof this.cancelFn === 'function' && this.cancelFn()
  }
}
