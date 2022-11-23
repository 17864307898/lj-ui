<template>
  <lj-upload-folder :upload-parmes="uploadParmes" @uploadFolderInfo="fnUploadInfo" />
</template>

<script>
export default {
  data() {
    return {
      uploadParmes: {
        maxSize: '4294967296',
        content: {
          maxSize: '请选择非空文件夹',
          againUp: `重新上传`,
          clickUp: `<em>点击上传</em>文件夹`,
        }
      },
      uploadData: {},
    };
  },
  methods: {
    fnUploadInfo(file) {
      this.uploadData = file;
    },
  },
};
</script>
