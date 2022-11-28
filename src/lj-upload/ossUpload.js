// import request from './request'
import axios from 'axios'

let accessid = ''
let policyBase64 = ''
let signature = ''
let callbackbody = ''
let key = ''
let expire = 0
let host = ''
let g_object_name = ''
let now = Date.parse(new Date()) / 1000

// 生成随机字符串
function random_string(len) {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
// 获取用户上传原始文件名
function get_file_name(filename) {
  let pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix
}
//  把随机生成的字符串拼接在原始上传文件名后面生成新的唯一文件名
function set_file_name(filename) {
  let suffix = get_file_name(filename)
  g_object_name = key + random_string(10) + suffix
  return ''
}

function ossRes() {
  return {
    host: host,
    key: g_object_name,
    policy: policyBase64,
    OSSAccessKeyId: accessid,
    success_action_status: '200', //让服务端返回200,不然，默认会返回204
    callback: callbackbody,
    signature: signature,
  }
}

// 获取后端返回的签名信息，生成oss参数
export default function oss(
  filename = null,
  url = null,
  dir = null,
  token = null
) {
  now = Date.parse(new Date()) / 1000
  if (dir != null) {
    url = url + '?dir=' + dir
  }
  if (expire < now + 3) {
    return axios({
      url: url,
      method: 'get',
      headers: {
        Authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }).then((res) => {
      policyBase64 = res.data.data['policy']
      accessid = res.data.data['accessid']
      signature = res.data.data['signature']
      expire = parseInt(res.data.data['expire'])
      callbackbody = res.data.data['callback']
      host = res.data.data['host']
      key = res.data.data['dir']

      if (filename != null) {
        set_file_name(filename)
      }
      return ossRes()
    })
  } else {
    if (filename != null) {
      set_file_name(filename)
    }

    return Promise.resolve(ossRes())
  }
}
