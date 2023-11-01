import SparkMD5 from 'spark-md5';
import { DEFAULT_OPTIONS } from './config'

// 单文件上传
class LjSingleUpload {
  constructor(file, options) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options)
    this.file = file

    this._initOptions(finalOptions)
  }

  // 初始化参数
  _initOptions(options) {

  }

  // oss处理


  // md5处理
  _initMd5() {
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
}

export default LjSingleUpload