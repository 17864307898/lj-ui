<template>
  <div class="uploadWrap">
    <div id="clonePieLoading" class="el-upload-dragger">
      <div class="labelUplaod">
        <i class="el-icon-upload fileUpload"></i>
        <div class="el-upload__text">
          <em v-if="file" class="waring"> 重新上传 </em>
          <em v-else>点击上传文件夹</em>
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
    <p class="uploadName">{{ uploadName }}</p>
  </div>
</template>

<script>
// import JSZip from 'jszip'

export default {
  name: 'lj-design-folder',

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
        this.$message.warning('请选择非空文件夹');
        return;
      }
      this.file = '';
      this.uploadName = '';
      this.buttonType = 'gray';
      // const zip = new JSZip()
      // const {files} = file.target
      // this.readDir(zip, files)
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
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/var.scss';
.upload {
  position: absolute;
  left: 0;
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
