<template>
  <div class="uploadWrap">
    <div id="clonePieLoading" class="el-upload-dragger">
      <div class="labelUplaod">
        <i class="el-icon-upload fileUpload"></i>
        <div class="el-upload__text">
          <span
            v-if="file.size"
            class="waring"
            v-html="uploadParmes.content?.againUp"
          ></span>
          <span v-else v-html="uploadParmes.content?.clickUp"></span>
          <p class="uploadName">{{ uploadName }}</p>
        </div>
        <input
          ref="upload"
          class="upload"
          type="file"
          webkitdirectory
          @change="beforeUpload"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import JSZip from 'jszip';
import { Loading, Message } from 'element-ui';

Vue.use(Loading, Message);

export default {
  name: 'lj-upload-folder',
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
      uploadName: '',
    };
  },

  mounted() {},

  methods: {
    beforeUpload(file) {
      if (!file.target.files || file.target.files.length === 0) {
        this.$message.warning(this.uploadParmes.content.maxSize);
        return;
      }
      this.file = '';
      this.uploadName = '';
      this.$emit('uploadFolderInfo', {});
      const zip = new JSZip();
      const { files } = file.target;
      this.readDir(zip, files);
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
          this.$emit('uploadFolderInfo', this.file);
          // saveAs(content, `${FileName}.zip`)
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../style/var.scss';
.el-upload-dragger {
  height: auto;
  padding-bottom: 20px;
}
.upload {
  position: absolute;
  left: 0px;
  top: 2px;
  width: 49px;
  cursor: pointer;
  opacity: 0;
  padding: 85px 190px;
}
.waring {
  color: #ffc107;
}
.fileUpload {
  cursor: pointer;
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
}
.upload:hover {
  cursor: pointer;
}
.labelUplaod {
  line-height: 20px;
}
.uploadName {
  line-height: 20px;
  margin: 10px;
  color: $color-primary;
}
</style>