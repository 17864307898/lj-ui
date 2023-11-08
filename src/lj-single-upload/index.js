import SparkMD5 from 'spark-md5'
import axios from 'axios'
import { DEFAULT_OPTIONS, DEFAULT_REQUEST_CONFIG } from './config'
import OSS from '../lj-upload/ossUpload'
const { CancelToken, isCancel } = axios

// 请求实例
let customRequest = axios

// 单文件上传
class LjSingleUpload {
  constructor(file, options = {}) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options)
    this.file = file

    this.options = finalOptions
    this._initOptions()
  }

  // 初始化方法
  static init(options) {
    const { requestInstance } = options

    customRequest = requestInstance || axios
  }

  // 初始化参数
  async _initOptions() {
    const {
      needMD5,
      needOSS,
      onUploadProgress,
      requestOptions,
      ossConfig,
    } = this.options

    // 自定义请求实例
    this.requestInstance = customRequest
    // 请求配置项
    this.requestOptions = requestOptions
    // 需要MD5加密
    this.needMD5 = needMD5
    // 需要oss上传
    this.needOSS = needOSS
    // 进度回调
    this.onUploadProgress = onUploadProgress
    // oss配置项
    this.ossConfig = ossConfig

    if (!this.needOSS && !this.requestOptions?.url) {
      throw new Error('The url in the requestOptions option must be provided')
    }
  }

  // oss处理
  _initOSS() {
    if (!this.needOSS) {
      this.ossData = null
      this.ossUrl = undefined
      return
    }

    const { url = '', dir = '', token = '' } = this.ossConfig

    return new Promise(async (resolve, reject) => {
      try {
        const res = await OSS(
          this.file,
          url,
          dir,
          token,
        )
        this.ossData = res
        this.ossUrl = res.host

        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  // md5处理
  _initMd5() {
    if (!this.needMD5) return this.md5 = ''

    const self = this

    return new Promise((resolve, reject) => {
      try {
        const fileReader = new FileReader()
        const Spark = new SparkMD5.ArrayBuffer()

        fileReader.readAsArrayBuffer(self.file)
        fileReader.onload = function (e) {
          Spark.append(e.target.result)
          self.md5 = Spark.end()
          resolve()
        }
      } catch (err) {
        reject(err?.message || err)
      }
    })

  }

  // 处理请求参数
  _initRequestOptions() {
    const { requestOptions } = this.options
    const config = Object.assign({}, DEFAULT_REQUEST_CONFIG, requestOptions)

    // 合并oss参数
    if (this.ossUrl) {
      config.url = this.ossUrl
      config.data = { ...config.data, ...(this.ossData || {}) }
    }

    this.requestOptions = config
  }

   // 进度监听
   _onPorgress(progressEvent) {
    const _self = this
    const { lengthComputable, loaded, total } = progressEvent?.event || progressEvent || {}

    // 原生获取上传进度的事件
    if (lengthComputable) {
      // 已经上传的百分比
      const percent = (loaded / total * 100).toFixed(2)

      // 返回最终进度
      if (_self.onUploadProgress && typeof _self.onUploadProgress === 'function') {
        _self.onUploadProgress(percent)
      }
    }
  }

  // 开始上传
  startUpload() {
    const _self = this

    return new Promise(async (resolve, reject) => {
      try {
        // md5信息初始化
        await _self._initMd5()
        // oss上传配置
        await _self._initOSS()
        // 初始化请求参数
        _self._initRequestOptions()

        // 发起请求
        await _self.requestInstance({
          ..._self.requestOptions,
          onUploadProgress: (progressEvent) => {
            return _self._onPorgress.call(_self, progressEvent)
          },
          cancelToken: new CancelToken((c) => {
            _self.cancel = c
          })
        })

        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  // 取消上传
  cancelUpload() {
    if (this.cancel && typeof this.cancel === 'function') {
      this.cancel()
    }
  }
}

export default LjSingleUpload