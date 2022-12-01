<template>
  <div class="uploadWrap">
    <el-upload
      ref="upload"
      :accept="accept"
      :headers="headers"
      :data="data"
      :name="name"
      :action="action"
      :with-credentials="withCredentials"
      :show-file-list="showFileList"
      :before-upload="onBeforeUpload"
      :class="drag ? 'upload-demo' : 'el-upload-dragger'"
      :file-list="fileList"
      :list-type="listType"
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
import { Upload, Message } from 'element-ui';

Vue.use(Upload);
Vue.use(Message);

export default {
  name: 'lj-upload',
  props: {
    uploadFileList: { // 回显上传文件
      type: Object,
      default: () => ({})
    },
    name: { // 文件名称
      type: String,
      default: '',
    },
    accept: { //接受上传的文件类型
      type: String,
      default: '',
    },
    action: { //必选参数，上传的地址
      type: String,
      default: '',
    },
    multiple: { //是否支持多选文件	
      type: Boolean,
      default: false,
    },
    listType: { // 文件列表的类型 默认text  text/picture/picture-card
      type: String,
      default: '',
    },
    drag: { // 是否启用拖拽上传
      type: Boolean,
      default: false,
    },
    showFileList: { //是否显示已上传文件列表 默认 false
      type: Boolean,
      default: false,
    },
    withCredentials: { //支持发送 cookie 凭证信息
      type: Boolean,
      default: false,
    },
    limit: { //最大允许上传个数	
      type: Number,
      default: 0,
    },
    disabled: { //是否禁用
      type: Boolean,
      default: false,
    },
    headers: { //设置上传的请求头部	
      type: Object,
      default: () => {
        return {};
      },
    },
    data: { //上传时附带的额外参数	
      type: Object,
      default: () => {
        return {};
      },
    },
    content: { //上传文件文案
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    uploadFileList: {
      handler(newVal) {
        if (newVal && newVal.id) {
          const params = {
            name: newVal.fileName,
            url: newVal.filePath
          }
          this.fileList.push(params)
        }
      },
      deep: true, // 深度监听
      immediate: true
    }
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
