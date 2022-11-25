<template>
  <div>
    <lj-upload
      ref="ljuploads"
      :accept="uploadParmes.accept"
      :action="uploadParmes.action"
      :content="uploadParmes.content"
      :data="uploadParmes.data"
      :drag="uploadParmes.drag"
      :limit="uploadParmes.limit"
      :list-type="uploadParmes.listType"
      :max-size="uploadParmes.maxSize"
      :oss-upload-path="uploadParmes.ossUploadPath"
      :show-file-list="uploadParmes.showFileList"
      @ossUploadData="fnOssUploadData"
      @uploadInfo="fnUploadInfo"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadParmes: {
          listType: 'picture-card',
          accept: '',
          action: '',
          ossShow: false,
          ossUploadPath: {
            fileUrl: 'https://tangram-manage.test.spdx.cn/api/v1/oss/sign',
            dir: 'category-icon/',
            token: `Bearer ${this.$store.getters['user/token']}`,
          },
          data: {},
          maxSize: '4294967296',
          showFileList: true,
          drag: true,
          limit: 2,
          content: {
            maxSize: '请上传小于4G的文件',
          },
      },
      uploadData: {},
    };
  },
  methods: {
    fnOssUploadData(res) {
      this.uploadParmes.action = res.host
      this.uploadParmes.data = res
    },
    fnUploadInfo(file) {
      this.uploadData = file
    },
  },
};
</script>
