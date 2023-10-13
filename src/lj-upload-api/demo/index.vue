<template>
  <div>
    <input type="file" @change="handleUpload" />
  </div>
</template>

<script>
import Upload from '../index';

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
      const instance = new Upload(file);

      try {
        // 分片  获取MD5
        await instance.startSharding();
        instance.uploadShardingFile();
        console.log({ instance });
        instance.cancelRequest()
      } catch (e) {
        console.log({ instance });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>