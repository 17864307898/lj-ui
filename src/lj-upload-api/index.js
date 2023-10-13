import SparkMD5 from 'spark-md5'
import axios from 'axios'
import { INIT_OPTIONS } from './utils/config'

const { CancelToken } = axios

export default class Upload {
  constructor(file, options) {
    // 基础信息
    this.file = file
    this.name = file.name
    this.size = file.size
    this.md5Str = ''

    // 合并处理参数
    const finalOption = Object.assign({}, INIT_OPTIONS, options)
    const { uploadMode, requestInstance, onUploadProgress, requestOptions } = finalOption

    // 初始化请求实例 支持自定义传入
    this.requestInstance = requestInstance || axios
    // 进度回调
    this.onUploadProgress = onUploadProgress
    // 请求参数
    this.requestOptions = requestOptions

    // 根据上传模式处理参数
    switch (uploadMode) {
      case 'singel':
        break
      case 'multi':
        this._initShardingOptions(finalOption)
        break
    }
  }

  // 分片上传参数初始化
  _initShardingOptions({ shardingOptions = {}, concurrenceCount }) {
    this.shardingOptions = shardingOptions
    const { shardingSize } = shardingOptions

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
    // 任务队列
    this.taskQueue = new Map()
    // 完成任务队列
    this.doneQueue = []
    // 整体需要返回promise
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })

    console.log(this.promise)
  }

  // 单文件上传配置
  initSingleOptions() { }

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
          this.loadNext()
        } else {
          // 分片完成
          this.md5Str = spark.end()
          this.currentSharding = 0
          resolve()
        }
      }

      this.loadNext()
    })
  }

  // 分割加载下一片
  loadNext() {
    const { fileReader, blobSlice } = this

    const start = this.currentSharding * this.shardingSize
    const end =
      start + this.shardingSize >= this.size ? this.size : start + this.shardingSize

    console.log('read:', start, end)
    fileReader.readAsBinaryString(blobSlice.call(this.file.raw || this.file, start, end))
  }

  // 断点续传 检测是否有已经上传的文件
  async breakpointResume() {
    // 配置
    const { uploadedListKey, uploadedFileKey } = this.shardingOptions

    // 请求
    const params = {
      md5: this.md5Str,
      fileName: this.name,
    }
    const getUploadCheck = () => { }
    const res = await getUploadCheck(params)

    if (res?.code === 200) {
      if (res?.data[uploadedFileKey] != null && res?.data[uploadedFileKey].size > 0) {
        return res.data
      }

      this.sliceFileNames = res.data[uploadedListKey] || []
      // 总片数减去 已经上传的
      this.shardingCount = this.shardingCount - this.sliceFileNames.length
      return res
    } else {
      return res
    }
  }

  async merge() {
    const params = {
      md5: this.md5Str,
      newFileName: this.name,
      size: this.size,
    }
    const postUploadMerge = () => { }
    const { data } = await postUploadMerge(params)
    return data
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
    var start = _self.currentTask * _self.shardingSize
    var end = start + _self.shardingSize
    // 将文件进行切片
    const file = _self.file?.raw || _self.file
    var packet = file.slice(start, end)

    /*  构建form表单进行提交  */
    var form = new FormData()
    form.append('md5', _self.md5Str) // 前端生成md5
    form.append('file', packet)
    form.append('fileName', _self.name)
    form.append('totalSize', _self.size)
    form.append('total', _self.shardingCount) // 总片数
    form.append('index', _self.currentTask + 1) // 当前是第几片

    _self.requestTask(packet, form)

    return _self.promise
  }

  // 请求任务
  requestTask(packet, form) {
    const _self = this

    new Promise(() => {
      // 取消方法
      let cancel

      // 发出请求
      const res = _self.requestInstance({
        ..._self.requestOptions,
        url: '/upload_database/sliceFile',
        method: 'post',
        onUploadProgress: ({ lengthComputable, loaded, total }) => {
          // 原生获取上传进度的事件
          if (lengthComputable) {
            // 已经上传的百分比
            const percent = (100 * loaded / total).toFixed(2) 

            _self.taskQueue.set(packet, { percent: percent })

            // 当前总分片的进度
            const shardingPercent = _self.doneQueue.length / _self.shardingCount
            // 平均进度
            const perPercent = 100 / _self.shardingCount

            // 计算进行中的任务总进度
            const percentList = [..._self.taskQueue.values()]
            const result = percentList.reduce((total, x) => {
              return total += x * perPercent / 100
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

      _self.currentTask++

      // 未超过最大并发 或者 所有分片任务分配完毕
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
      if (_self.taskQueue.size === 0 && _self.currentTask >= _self.shardingCount ) {
        _self.resolve()
      }
    }
  }

  // 取消上传
  cancelRequest() {
    debugger
    this.taskQueue.values().forEach(({cancel}) => {
      cancel
    })

    this.taskQueue.clear()
  }
}
