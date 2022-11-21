<template>
  <div class="uploadWrap">
    <el-upload
      ref="upload"
      accept="*"
      :action="uploadPath"
      class="el-upload-dragger"
      :file-list="fileList"
      :on-change="handleSuccess"
      :on-remove="handleRemove"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>{{ file.size ? '重新上传' : '点击上传' }}</em>
      </div>
      <div slot="tip" class="el-upload__tip">
        <p>请上传小于4G的文件</p>
      </div>
    </el-upload>
  </div>
</template>

<script>
import Vue from 'vue';
import { Upload } from 'element-ui';

Vue.use(Upload);

export default {
  name: 'lj-upload',
  props: {
    uploadPath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      file: '',
      fileList: [],
      uploadData: {
        name: '',
        md5: '',
        size: '',
      },
    };
  },
  // created() {
  //   this.$nextTick(() => {
  //     this.$refs.upload.$children[0].$refs.input.webkitdirectory = true;
  //   });
  // },
  methods: {
    handleSuccess(file, fileList) {
      // 上传前判断大小
      this.onBeforeUpload(file, fileList);
      // 如果接口返回成功，给父级传参
      if (file.response) {
        this.$emit('uploadInfo', {
          binaryName: file.name,
          name: file.response.data,
          md5: file.response.message,
          size: file.size,
        });
      }
      this.file = file;
      // 重传判断
      if (fileList && fileList.length > 1) {
        const { uploadFiles } = this.$refs.upload;
        const index = uploadFiles.indexOf(fileList[0]);
        uploadFiles.splice(index, 1);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleError() {
      this.$message({
        message: '上传失败！',
        type: 'error',
        center: true,
        duration: 1500,
      });
    },
    handleRemove(file) {
      this.$emit('uploadInfo', {});
      this.file = file;
      this.uploadData = {
        name: '',
        md5: '',
        size: '',
      };
    },
    onBeforeUpload(file, fileList) {
      const isLtSize = file.size / 1024 / 1024 < 5000;
      if (!isLtSize) {
        this.$message.error('请上传不大于4G的文件!');
        const { uploadFiles } = this.$refs.upload;
        const index = uploadFiles.indexOf(fileList[0]);
        uploadFiles.splice(index, 1);
        this.handleRemove(file);
        return false;
      }
    },
  },
};
</script>
