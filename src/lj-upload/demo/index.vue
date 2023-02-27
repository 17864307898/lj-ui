<template>
  <div>
    <lj-upload
      ref="ljuploads"
      :accept="uploadParams.accept"
      :action="uploadParams.action"
      :content="uploadParams.content"
      :headers="uploadParams.headers"
      :data="uploadParams.data"
      :drag="uploadParams.drag"
      :limit="uploadParams.limit"
      :md5-show="uploadParams.md5Show"
      :max-size="uploadParams.maxSize"
      :oss-show="uploadParams.ossShow"
      :oss-upload-path="uploadParams.ossUploadPath"
      :show-file-list="uploadParams.showFileList"
      @ossUploadData="fnOssUploadData"
      @uploadChange="fnUploadInfo"
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
          md5Show: false,
          ossShow: true,
          ossUploadPath: {
            fileUrl: 'https://tangram-spdx.oss-cn-beijing.aliyuncs.com/',
            dir: 'category-icon/',
            token: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJleHAiOjE2Njk3MDkyODV9.aVevvvPYb3bB6ZSdLoX95WoUh_dXwyWBa9JX8D8CyFI`,
          },
          headers: {
            // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJleHAiOjE2Njk3MDkyODV9.aVevvvPYb3bB6ZSdLoX95WoUh_dXwyWBa9JX8D8CyFI',
          },
          data: {},
          maxSize: 4294967296,
          showFileList: true,
          drag: true,//accept带参数时无效
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
      console.log('fnOssUploadData', res)
      this.uploadParams.action = res.host
      this.uploadParams.data = res
    },
    fnUploadInfo(file) {
      console.log('fnUploadInfo', file)
      this.uploadData = file
    },
  },
};
</script>
