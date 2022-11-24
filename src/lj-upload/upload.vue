<template>
  <div class="uploadWrap">
    <el-upload
      ref="upload"
      :accept="accept"
      :headers="headers"
      :data="data"
      :action="action"
      :with-credentials="withCredentials"
      :show-file-list="showFileList"
      :before-upload="onBeforeUpload"
      :class="drag ? 'upload-demo' : 'el-upload-dragger'"
      :file-list="fileList"
      :limit="limit"
      :disabled="disabled"
      :multiple="multiple"
      :on-change="handleChange"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
    >
      <slot name="uploadIcon"><i class="el-icon-upload"></i></slot>
      <div class="el-upload__text">
        <slot name="uploadText">
          <span>将文件拖到此处，或<em>点击上传</em></span>
        </slot>
      </div>
      <div slot="tip" class="el-upload__tip">
        <p>
          <slot name="uploadTip">请上传小于4G的文件</slot>
        </p>
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
    accept: {
      type: String,
      default: '',
    },
    action: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    showFileList: {
      type: Boolean,
      default: false,
    },
    withCredentials: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Object,
      default: () => {
        return {};
      },
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    credentials: {
      type: Object,
      default: () => {
        return {};
      },
    },
    content: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      file: '',
      fileList: [],
      againUpload: false,
    };
  },
  methods: {
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    handleChange(file, fileList) {
      this.$emit('uploadChange', {file: file, fileList: fileList})
    },
    handleSuccess(res, file, fileList) {
      if (!this.limit || this.limit < 2) {
        this.fileList = [file];
        this.$emit('uploadSuccess', {res: res, file: file, fileList: fileList})
      } else {
        this.fileList = fileList;
        this.$emit('uploadSuccess', {res: res, file: file, fileList: fileList})
      }
      this.file = 'file';
    },
    handleError() {
      this.$message({
        message: this.content.errorMsg ? this.content.errorMsg : '上传失败！',
        type: 'error',
        center: true,
        duration: 1500,
      });
    },
    handleRemove(file, fileList) {
      this.$emit('uploadRemove', {file: file, fileList: fileList})
      this.file = file;
      this.fileList = fileList;
    },
    handleExceed() {
      this.$message.warning(this.content.Exceed? this.content.Exceed : `当前限制选择 ${this.limit} 个文件`);
    },
    onBeforeUpload(file) {
      let maxSize = this.maxSize ? this.maxSize : 4294967296
      const isLtSize = file.size < maxSize;
      if (!isLtSize) {
        this.$message.error(this.content.maxSize + '！');
        return false;
      }
    },
  },
};
</script>
