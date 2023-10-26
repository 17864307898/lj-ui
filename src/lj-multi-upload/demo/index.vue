<template>
  <div>
    <div style="margin-bottom: 20px">完整请求示例</div>
    <input type="file" @change="handleUpload" />
  </div>
</template>

<script>
import LjMultiUpload from '../index';

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    // 完整使用示例
    async handleUpload(e) {
      const file = e.target.files[0];

      // 分片上传配置项
      const options = {
        // 请求配置
        requestOptions: {
          url: 'https://sec.dev.spdx.cn/file/sliceFile',
        },
        // 分片配置
        partOptions: {},
        // 分片并发数量
        concurrenceCount: 5,
        // 进度回调
        onUploadProgress: (progress) => {
          console.log(progress);
        },
        // 合并文件选项
        mergeOptions: {
          api: () => {},
        },
        // 取消回调
        cancelFn: () => {},
      };
      // 初始化请求实例
      const instance = new LjMultiUpload(file, options);
      // 可以在上传的时候通过调用实例上的方法取消请求,会触发取消回调
      // instance.abortMultipartUpload()

      try {
        // 需要断点续传时使用
        // await instance.resumeUpload(/**请求方法 */ /**请求参数 */)
        
        // 开始上传
        await instance.multipartUpload();
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>