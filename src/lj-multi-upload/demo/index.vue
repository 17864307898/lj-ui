<template>
  <div>
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
    async handleUpload(e) {
      const file = e.target.files[0];
      const instance = new LjMultiUpload(file);

      try {
        // 需要断点续传时使用
        // await instance.resumeUpload(/**请求方法 */ /**请求参数 */)

        await instance.multipartUpload();
      } catch (e) {
        console.log({ instance });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>