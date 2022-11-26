<template>
  <div>
    <lj-upload
      ref="ljuploads"
      :accept="uploadParams.accept"
      :action="uploadParams.action"
      :content="uploadParams.content"
      :data="uploadParams.data"
      :drag="uploadParams.drag"
      :limit="uploadParams.limit"
      :max-size="uploadParams.maxSize"
      :oss-show="uploadParams.ossShow"
      :oss-upload-path="uploadParams.ossUploadPath"
      :show-file-list="uploadParams.showFileList"
      @ossUploadData="fnOssUploadData"
      @uploadInfo="fnUploadInfo"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadParams: {
          accept: '',
          action: '',
          ossShow: false,
          ossUploadPath: {
            fileUrl: 'https://tangram-manage.test.spdx.cn/api/v1/oss/sign',
            dir: 'category-icon/',
            token: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJleHAiOjE2Njk0MzM4MzB9.57vdpiFS5QXffEXpOu5FIhBlhfdxDkQYdsNLLIsWHtQ`,
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
      this.uploadParams.action = res.host
      this.uploadParams.data = res
    },
    fnUploadInfo(file) {
      this.uploadData = file
    },
  },
};
</script>
