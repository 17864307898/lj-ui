<template>
  <div class="lj-upload-wrap">
    <div id="clonePieLoading" class="el-upload-dragger">
      <div class="labelUplaod">
        <slot name="uploadIcon"><i class="el-icon-upload fileUpload"></i></slot>
        <div class="el-upload__text">
          <slot name="uploadText">
            <span v-if="file.size" class="waring">{{
              translate('重新上传')
            }}</span>
            <span v-else>{{ translate('点击上传文件夹') }}</span>
          </slot>
          <p class="uploadName">{{ uploadName }}</p>
        </div>
        <div slot="tip" class="el-upload__tip">
          <p>
            <slot name="uploadTip"></slot>
          </p>
        </div>
        <input
          v-if="uplodFlag"
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
import { byteConvert } from '../utils/index';
import { Loading, Message } from 'element-ui';
import { translate } from '../utils/translate';
const t = translate('ljUpload');

Vue.use(Loading);

export default {
  name: 'lj-upload-folder',
  props: {
    maxSize: {
      //最大限制大小
      type: Number,
      default: 0,
    },
    content: {
      //上传文件夹文案
      type: Object,
      default: () => {
        return {};
      },
    },
    validateFn: {
      // 自主校验
      type: Function,
      default: () => true,
    },
  },
  data() {
    return {
      file: '',
      uploadName: '',
      uplodFlag: true, // 重置上传input事件
    };
  },
  methods: {
    byteConvert,
    // 翻译
    translate(path) {
      return t(path);
    },
    async beforeUpload(file) {
      // 限制文件大小
      let filesSize = 0;
      for (let el in file.target.files) {
        if (file.target.files[el].size) {
          filesSize += file.target.files[el].size;
        }
      }
      const isLtSize = filesSize < this.maxSize;
      if (!file.target.files || file.target.files.length === 0) {
        Message.error(
          this.content.emptyInfo ? this.content.emptyInfo : t('文件夹不能为空')
        );
        return;
      } else if (!isLtSize) {
        Message.error(
          this.content.sizeInfo
            ? this.content.sizeInfo
            : `请上传小于${byteConvert(this.maxSize)}的文件夹!`
        );
        return;
      }
      try {
        // 自主校验抛出
        const validate = await this.validateFn(file);
        if (!validate) {
          this.ReUpload(file);
          return false;
        }
        this.file = '';
        this.uploadName = '';
        this.resetUploadStatus();
        this.$emit('uploadFolderInfo', {});
        const zip = new JSZip();
        const { files } = file.target;
        this.readDir(zip, files);
      } catch (err) {
        Message.error(err?.message || err);
      }
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

      // 原因：上传相同文件夹生成的MD5值不一样，因为date字段的是获取当前时间
      // 解决方案：把文件上传的时间改成一个固定的时间
      Object.keys(zip.files).forEach((file) => {
        zip.files[file].date = new Date(1690943274502);
      });

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
        });
    },
    // 重置上传文件、按钮状态
    resetUploadStatus() {
      this.file = '';
      this.uploadName = '';
    },
    // 重置上传input开关 解决二次上传同文件 无法触发input change事件问题
    resetUploadFlag() {
      this.uplodFlag = false;

      // 延时100毫秒 防止无法触发input事件问题
      setTimeout(() => {
        this.uplodFlag = true;
      }, 100);
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
  color: $font-color-primary;
}
</style>
