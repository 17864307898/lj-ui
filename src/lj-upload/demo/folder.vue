<template>
  <div class="uploadWrap">
    <el-upload
      ref="upload"
      :accept="uploadParmes.accept"
      :action="uploadParmes.uploadPath"
      class="el-upload-dragger"
      :file-list="fileList"
      :on-change="handleSuccess"
      :on-remove="handleRemove"
    >
      <i class="el-icon-upload"></i>
      <div
        class="el-upload__text"
        v-html="
          file.size
            ? uploadParmes.content?.againUp
            : uploadParmes.content?.clickUp
        "
      ></div>
      <div slot="tip" class="el-upload__tip">
        <p>{{ uploadParmes.content?.maxSize }}</p>
      </div>
    </el-upload>
  </div>
</template>

<script>
import Vue from 'vue';
import { Upload, Loading, Message } from 'element-ui';
import JSZip from 'jszip';

Vue.use(Loading, Message);
Vue.use(Upload);

export default {
  name: 'folder2',
  props: {
    uploadParmes: {
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
    };
  },
  created() {
    this.$nextTick(() => {
      if (this.uploadParmes.type === 2) {
        this.$refs.upload.$children[0].$refs.input.webkitdirectory = true;
      }
    });
  },
  methods: {
    handleSuccess(file, fileList) {
      console.log(file)
      // 上传前判断大小
      this.onBeforeUpload(file, fileList);
      // 如果接口返回成功，给父级传参
      if (file.response) {
        this.$emit('uploadInfo', file);
      }
      this.file = file;
      // 重传判断
      if (fileList && fileList.length > 1) {
        const { uploadFiles } = this.$refs.upload;
        const index = uploadFiles.indexOf(fileList[0]);
        uploadFiles.splice(index, 1);
      }
      if (this.uploadParmes.type === 2) {
        const zip = new JSZip();
        const { files } = file.target;
        this.readDir(zip, files);

      }
    },
    handleRemove(file) {
      this.$emit('uploadInfo', {});
      this.file = file;
    },
    readDir(zip, files) {
      const loading = this.$loading({
        target: document.getElementById('clonePieLoading'),
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
      });
      const FileName = files[0]?.webkitRelativePath?.split('/')[0];
      for (let i = 0; i < files.length; i++) {
        // 添加目录中包含的文件
        zip.file(files[i].webkitRelativePath, files[i]);
      }

      zip
        .generateAsync({
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 9 },
        })
        .then((content) => {
          loading.close();
          this.uploadName = `${FileName}.zip`;
          this.file = new File([content], this.uploadName, {
            type: content.type,
            lastModified: Date.now(),
          });
          this.buttonType = 'primary';
          // saveAs(content, `${FileName}.zip`)
        });
    },
    onBeforeUpload(file, fileList) {
      const isLtSize = file.size < this.uploadParmes.maxSize;
      if (!isLtSize) {
        this.$message.error(this.uploadParmes.content?.maxSize+'！');
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
