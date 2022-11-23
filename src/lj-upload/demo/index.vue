<template>
  <lj-upload :upload-parmes="uploadParmes" @uploadInfo="fnUploadInfo" />
</template>

<script>

export default {
  data() {
    return {
      uploadParmes: {
        accept: '*',
        uploadPath: '/api/file/upload',
        maxSize: '4294967296',
        content: {
          maxSize: '请上传小于4G的文件',
          againUp: `将文件拖到此处，或<em>重新上传</em>`,
          clickUp: `将文件拖到此处，或<em>点击上传</em>`,
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
