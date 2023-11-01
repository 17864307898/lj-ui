import axios from 'axios'
import { Message } from 'element-ui'
import {
  INIT_OPTIONS,
  DEFAULT_REQUEST_OPTIONS,
  DEFAULT_LOADING_OPTIONS,
  FILE_TYPE_MAP,
} from './config'

/**
 * 下载/导出文件操作
 */
class FileDownload {
  constructor(options) {
    // 合并处理参数
    const finalOption = Object.assign({}, INIT_OPTIONS, options)
    this.options = finalOption

    this._initOptions(finalOption)
  }

  // 初始化配置参数
  _initOptions() {
    const {
      requestInstance,
      loadingOptions,
      successCode,
      getFileName,
      getFileLink,
      fileType,
      expandFileMap,
    } = this.options

    /*************** 公共配置 ***************/
    // 自定义请求实例
    this.requestInstance = requestInstance || axios
    // 获取下载文件名称
    this.getFileName = getFileName
    // 获取下载地址
    this.getFileLink = getFileLink
    // 下载loading信息配置
    this.loadingOptions = Object.assign({}, DEFAULT_LOADING_OPTIONS, loadingOptions)
    // 请求成功code码
    this.successCode = successCode
    // 下载文件类型
    this.fileType = fileType

    // 文件类型扩展
    if (expandFileMap) {
      if (Object.prototype.toString.call(expandFileMap) !== '[object Object]') {
        throw new Error('The expandFileMap option must be an object')
      }

      this.expandFileMap = Object.assign({}, FILE_TYPE_MAP, expandFileMap)
    } else {
      this.expandFileMap = Object.assign({}, FILE_TYPE_MAP)
    }
  }

  // 初始化下载参数
  _initDownloadOptions() {
    const {
      requestOptions,
    } = this.options

    // 请求配置
    this.requestOptions = Object.assign({}, DEFAULT_REQUEST_OPTIONS, requestOptions)

    this._verifyParams()
  }

  // 必填参数校验
  _verifyParams() {
    const { requestOptions: { url } } = this

    // 请求地址必填
    if (!url) throw new Error('The url under the requestOptions option must be provided')
  }

  // 获取文件名
  _getFileName(res) {
    const { getFileName } = this

    if (getFileName && typeof getFileName === 'function') {
      return getFileName(res)
    }

    // 默认方式
    let dowmName = decodeURI(res.headers['content-disposition'])
    let index = dowmName.lastIndexOf('=') //获取下载文件名称（在请求头中）
    dowmName = dowmName.substring(index + 1, dowmName.length)

    return dowmName
  }

  // 获取下载路径
  _gitFileLink(res) {
    const { getFileLink, fileType, expandFileMap } = this

    if (getFileLink && typeof getFileLink === 'function') {
      return getFileLink(res)
    }

    // 下载文件类型
    const type = expandFileMap[fileType] || expandFileMap['default']

    return window.URL.createObjectURL(new Blob([res.data], { type }))
  }

  // 下载文件
  downLoadFile() {
    // 初始化下载配置
    this._initDownloadOptions()

    // 请求
    return this._requestMethod()
  }

  // 请求逻辑
  async _requestMethod() {
    const {
      requestInstance,
      requestOptions,
      loadingOptions,
      successCode,
    } = this

    return new Promise(async (resolve, reject) => {
      try {
        // 获取下载
        const res = await requestInstance(requestOptions)

        if (!res) return reject('接口返回数据异常')

        const hasCode = Object.prototype.hasOwnProperty.call(res, 'code')

        // 接口返回数据异常
        if (hasCode && +res.code !== +successCode) {
          // 接口异常回调
          return reject(res.message || res.msg || '接口返回数据异常')
        } else if (!hasCode && +res.status !== +successCode) {
          return reject(res?.data?.message || res?.data?.msg || '接口返回数据异常')
        }

        if (loadingOptions.show) {
          // loading提示信息
          Message(loadingOptions)
        }

        // 下载文件名称
        let dowmName = this._getFileName(res)
        // 下载地址
        const downloadLink = this._gitFileLink(res)

        // 创建a标签
        const link = document.createElement('a')

        link.style.display = 'none'
        link.href = downloadLink
        link.setAttribute('download', dowmName)

        // 添加到页面
        document.body.appendChild(link)
        // 点击下载
        link.click()

        // 下载完成移除元素
        document.body.removeChild(link)
        // 释放掉blob对象
        window.URL.revokeObjectURL(downloadLink)

        // 事件结束
        resolve()
      } catch (err) {
        reject(err.message)
      }
    })
  }
}

// 下载/导出文件
function LjFileDownload(options) {
  const instance = new FileDownload(options)

  return instance.downLoadFile()
}

export default LjFileDownload