import SparkMD5 from 'spark-md5'
import axios from 'axios'
import { INIT_OPTIONS } from './utils/config'

import { getUploadCheck, postUploadMerge } from '@/api/upload'

// import * as config from '@/config'
// 执行分片上传
const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.APP_PROXY_HOST
    : window.location.origin

export default class Upload {
  constructor(file, options) {
    // 基础信息
    this.file = file
    this.name = file.name
    this.size = file.size
    this.md5Str = ''

    // 合并处理参数
    const finalOption = Object.assign({}, INIT_OPTIONS, options)
    const { requestMode, requestInstance } = finalOption

    // 初始化请求实例 支持自定义传入
    this.requestInstance = requestInstance || axios

    // 根据上传模式处理参数
    switch (requestMode) {
      case 'singel':
        break
      case 'multi':
        this.initShardingOptions(finalOption.shardingOptions)
        break
    }
  }

  // 分片上传参数初始化
  initShardingOptions(options) {
    const { shardingSize,  } = options

    // 每个分片的大小
    this.shardingSize = shardingSize
    // 总片数
    this.shardingCount = Math.ceil(this.size / shardingSize)
    // 当前分片页数
    this.currentSharding = 0
    // 已经上传的分片列表
    this.sliceFileNames = []
    // 当前上传进度
    this.percent = -1
  }

  // 单文件上传配置
  initSingleOptions() {}

  // 初始化 分片 MD5
  init(file) {
    return new Promise((resolve) => {
      var fileReader = new FileReader()
      var blobSlice =
        File.prototype.mozSlice ||
        File.prototype.webkitSlice ||
        File.prototype.slice
      var spark = new SparkMD5()
      fileReader.onload = (e) => {
        // append binary string
        spark.appendBinary(e.target.result)
        this.currentSharding++
        if (this.currentSharding < this.shardingCount) {
          this.loadNext(file, fileReader, blobSlice)
        } else {
          this.md5Str = spark.end()
          resolve()
        }
      }
      this.loadNext(file, fileReader, blobSlice)
    })
  }

  loadNext(file, fileReader, blobSlice) {
    var start = this.currentSharding * this.shardingSize
    var end =
      start + this.shardingSize >= this.size ? this.size : start + this.shardingSize
    console.log('read:', start, end)
    fileReader.readAsBinaryString(blobSlice.call(file.raw, start, end))
  }

  async check() {
    const params = {
      md5: this.md5Str,
      fileName: this.name,
    }
    const res = await getUploadCheck(params)
    if (res.code === 200) {
      if (res.data.filePath != null && res.data.filePath.size > 0) {
        return res.data
      }
      this.sliceFileNames = res.data.sliceFileNames || []
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
    const { data } = await postUploadMerge(params)
    return data
  }

  PostFile(callback) {
    const _self = this
    return new Promise((resolve, reject) => {
      if (_self.currentSharding >= _self.shardingCount) {
        _self.currentSharding++
        resolve()
        return
      }
      if (_self.sliceFileNames.includes(_self.currentSharding + 1 + '')) {
        _self.currentSharding++
        resolve()
        return
      }
      // 文件总大小，第一次，分片大小
      var start = _self.currentSharding * _self.shardingSize
      var end = start + _self.shardingSize
      var packet = _self.file.raw.slice(start, end) // 将文件进行切片
      /*  构建form表单进行提交  */
      var form = new FormData()
      form.append('md5', _self.md5Str) // 前端生成md5
      form.append('file', packet) // slice方法用于切出文件的一部分
      form.append('fileName', _self.name)
      form.append('totalSize', _self.size)
      form.append('total', _self.shardingCount) // 总片数
      form.append('index', _self.currentSharding + 1) // 当前是第几片

      // 发出请求
      this.requestInstance({
        url: baseURL + '/upload_database/sliceFile',
        method: 'post',
        // headers: {
        //     Authorization: '',
        //     'Content-Type': 'multipart/form-data'
        // },
        onUploadProgress: (progressEvent) => {
          // 原生获取上传进度的事件
          if (progressEvent.lengthComputable) {
            // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
            // 如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
            var loaded = progressEvent.loaded // 已经上传大小情况
            var total = progressEvent.total // 附件总大小
            var percent = Math.floor((100 * loaded) / total) // 已经上传的百分比
            _self.percent += percent / _self.shardingCount
            callback(percent)
          }
        },
        data: form,
      })
        .then(() => {
          _self.currentSharding++
          resolve()
        })
        .then((error) => {
          reject(error)
        })
    })
  }
}
