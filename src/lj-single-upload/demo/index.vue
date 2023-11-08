<template>
  <div>
    <input type="file" @change="handleUpload" />
  </div>
</template>

<script>
import axios from 'axios';
import LjSingleUpload from '../index';

LjSingleUpload.init({
  requestInstance: axios,
});

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    // 上传文件测试
    async handleUpload(e) {
      const file = e.target.files[0];

      const data = new FormData();
      data.append('projectId', 222);
      data.append('file', file);
      data.append('projectSource', 7);

      try {
        const instance = new LjSingleUpload(file, {
          needMD5: true,
          requestOptions: {
            url: 'https://allinone.test.spdx.cn//file/binary/upload',
            data,
          },
        });
        await instance.startUpload();
        console.log({ instance });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>