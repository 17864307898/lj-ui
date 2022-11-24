<template>
  <div>
    <lj-upload
      ref="ljuploads"
      :accept="uploadParmes.accept"
      :action="uploadParmes.accept"
      :maxSize="uploadParmes.maxSize"
      :drag="uploadParmes.drag"
      :content="uploadParmes.content"
      :limit="uploadParmes.limit"
      @uploadInfo="fnUploadInfo"
    />
    <ossUpload />
  </div>
</template>

<script>
import ossUpload from './ossUpload.vue';
export default {
  components: { ossUpload },
  data() {
    return {
      uploadParmes: {
        accept: '',
        uploadPath: '/api/file/upload',
        maxSize: '4294967296',
        drag: true,
        content: {
          maxSize: '请上传小于4G的文件',
        },
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
