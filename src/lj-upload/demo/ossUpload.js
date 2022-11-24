const alioss = require('ali-oss');

export function OSS(data) {
  return new alioss(data);
}
/**
 *  [accessKeyId] {String}：通过阿里云控制台创建的AccessKey。
 *  [accessKeySecret] {String}：通过阿里云控制台创建的AccessSecret。
 *  [bucket] {String}：通过控制台或PutBucket创建的bucket。
 *  [region] {String}：bucket所在的区域， 默认oss-cn-hangzhou。
 */
export function OSSbuffer(data) {
  // 后端提供数据
  return new alioss.Buffer(data);
}
export function client(data) {
  // 后端提供数据
  return new alioss({
    region: data.endpoint,
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    bucket: data.bucketName,
    endpoint: data.endpoint,
    secure: true,
  });
}

/**
 * 生成随机文件名称
 * 规则八位随机字符，加下划线连接时间戳
 */
export const getFileNameUUID = () => {
  function rx() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${+new Date()}_${rx()}${rx()}`;
};
