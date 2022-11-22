<template>
  <div>
    <div>
      <lj-upload :upload-path="'/api/file/upload'" @uploadInfo="fnUploadInfo" />
      <!-- <folder /> -->
    </div>
  </div>
</template>

<script>
import folder from './folder.vue'

export default {
  components: {folder},
  data() {
    return {
      uploadData: {
        name: '',
        md5: '',
        size: '',
      },
    };
  },
  created() {},
  methods: {
    fnUploadInfo(file) {
      this.uploadData = file;
      console.log(file);
    },
  },
};
</script>