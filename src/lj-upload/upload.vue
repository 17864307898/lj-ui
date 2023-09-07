<template>
  <div :class="!listType ? 'lj-upload-wrap' : ''">
    <el-upload
      :ref="`upload_${uploadKey}`"
      :accept="uploadAccept"
      :action="uploadHost"
      :before-upload="onBeforeUpload"
      :data="{ ...uploadData, ...data }"
      v-bind="{ ...$props, ...$attrs }"
      :on-change="handleChange"
      :on-error="handleError"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
    >
      <!-- icon文案 -->
      <slot name="uploadText">
        <i class="el-icon-upload lj-upload-icon"></i>
        <div class="el-upload__text">
          <div v-if="listType === 'text' || !listType">
            <span v-if="drag">
              {{ translate('将文件拖到此处，或') }}
              <em v-if="retransmission && file.size">{{ translate('重新上传') }}</em>
              <em v-else>{{ translate('点击上传') }}</em>
            </span>
            <span v-else>
              <em v-if="retransmission && file.size">{{ translate('重新上传') }}</em>
              <em v-else>{{ translate('点击上传') }}</em>
            </span>
          </div>
        </div>
      </slot>
      <!-- 上传Slot -->
      <div slot="tip" class="el-upload__tip">
        <slot name="uploadTip">
          <p>
            请上传小于{{ byteConvert(maxSize) }}的{{
              listType === 'picture-card' ? '图片' : '文件'
            }}
          </p>
        </slot>
      </div>
      <template slot="trigger">
        <slot name="uploadTrigger"></slot>
      </template>
    </el-upload>
  </div>
</template>

<script>
import Vue from 'vue';
import { Upload, Message } from 'element-ui';
import OSS from './ossUpload.js';
import SparkMD5 from 'spark-md5';
import { byteConvert } from '../utils/index';
import { translate } from '../utils/translate';

Vue.use(Upload);

export default {
  name: 'LjUpload',
  props: {
    // upload-key  多个upload时需传入
    uploadKey: {
      type: String,
      default: () => 'ref',
    },
    uploadFileList: {
      // 回显上传文件
      type: Object,
      default: () => ({}),
    },
    accept: {
      //接受上传的文件类型
      type: String,
      default: '',
    },
    action: {
      //必选参数，上传的地址
      type: String,
      default: '',
    },
    retransmission: {
      //是否支持重传
      type: Boolean,
      default: false,
    },
    md5Show: {
      //是否支持md5
      type: Boolean,
      default: false,
    },
    ossShow: {
      //是否支持oss上传
      type: Boolean,
      default: false,
    },
    ossUploadPath: {
      //设置文件路径
      type: Object,
      default: () => {
        return {};
      },
    },
    listType: {
      // 文件列表的类型 默认text  text/picture/picture-card
      type: String,
      default: '',
    },
    drag: {
      // 是否启用拖拽上传
      type: Boolean,
      default: false,
    },
    limit: {
      //最大允许上传个数
      type: Number,
      default: 0,
    },
    maxSize: {
      //最大限制大小
      type: Number,
      default: 0,
    },
    data: {
      //上传时附带的额外参数
      type: Object,
      default: () => {
        return {};
      },
    },
    content: {
      //上传文件文案
      type: Object,
      default: () => {
        return {};
      },
    },
    validateFn: {
      // 自主校验方法
      type: Function,
      default: () => true,
    },
  },
  data() {
    return {
      file: '',
      fileList: [],
      uploadAccept: '',
      uploadHost: '',
      uploadData: {},
      md5: '',
    };
  },
  watch: {
    uploadFileList: {
      handler(newVal) {
        if (newVal && newVal.id) {
          const params = {
            name: newVal.fileName,
            url: newVal.filePath,
          };
          this.fileList.push(params);
        }
      },
      deep: true, // 深度监听
      immediate: true,
    },
    data: {
      handler() {},
      deep: true, // 深度监听
      immediate: true,
    },
  },
  mounted() {
    // 上传的地址
    this.uploadHost = this.action || '';
    // 接受上传的文件类型
    this.uploadAccept = this.accept || '';
  },
  methods: {
    byteConvert,
    // 获取当前ref实例
    handleGetRefs() {
      return new Promise((resovle) => {
        this.$nextTick(() => {
          const ref = this.$refs[`upload_${this.uploadKey}`];

          resovle(ref);
        });
      });
    },
    // 清空
    clearFiles() {
      this.$refs[`upload_${this.uploadKey}`].clearFiles();
    },
    // 上传状态
    handleChange(file, fileList) {
      console.log('lj-handleChange', file, fileList);
      this.file = file;
      this.fileList = fileList;
      let params = {
        file: file,
        fileList: fileList,
      };
      if (this.md5) {
        params.md5 = this.md5;
      }
      if (this.ossShow) {
        params.ossData = this.uploadData;
      }
      this.$emit('uploadChange', params);
    },
    handleProgress(e) {
      e.percent = Math.min(99, e.percent);
    },
    // 上传成功
    handleSuccess(res, file, fileList) {
      console.log('lj-handleSuccess', res, file, fileList);
      this.file = file;
      this.fileList = fileList;
      let params = {
        res: res,
        file: file,
        fileList: fileList,
      };
      if (this.md5) {
        params.md5 = this.md5;
      }
      if (this.ossShow) {
        params.ossData = this.uploadData;
      }
      this.$emit('uploadSuccess', params);
      // 重传判断
      if (this.retransmission && fileList.length > 1) {
        this.ReUpload(file);
      }
    },
    // 异常错误方法
    handleError() {
      Message({
        message: this.content.errorMsg ? this.content.errorMsg : translate('上传失败'),
        type: 'error',
        center: true,
        duration: 1500,
      });
    },
    // 删除方法
    handleRemove(file, fileList) {
      this.$emit('uploadRemove', { file: file, fileList: fileList });
      this.file = '';
      this.fileList = fileList;
    },
    // 限制文件个数方法
    handleExceed() {
      Message.warning(
        this.content.exceed
          ? this.content.exceed
          : `当前限制选择 ${this.limit}个${
              this.listType === 'picture-card' ? '图片' : '文件'
            }！`
      );
    },
    // 重新上传清空
    ReUpload(file) {
      let uploadFiles = this.$refs[`upload_${this.uploadKey}`].uploadFiles;
      let index = 0;
      if (this.retransmission) {
        index = uploadFiles.indexOf(this.fileList[0]);
      } else {
        index = uploadFiles.indexOf(this.fileList[this.fileList.length - 1]);
      }
      uploadFiles.splice(index, 1);
      this.handleRemove(file);
    },
    // 上传前钩子
    async onBeforeUpload(file) {
      let that = this;
      // 重传判断
      if (this.retransmission && this.fileList.length > 1) {
        this.ReUpload(file);
      }
      this.$emit('uploadBefore', file);
      // 限制文件类型
      let FileExt = file.name.replace(/.+\./, '');
      let acceptTypeData = this.uploadAccept
        ? this.uploadAccept.split(',')
        : [];
      let acceptType = [];
      acceptTypeData.forEach((el) => {
        el = el.replace(/.*\./, '');
        acceptType.push(el);
      });
      if (
        this.uploadAccept &&
        this.uploadAccept != '*' &&
        acceptType.indexOf(FileExt) == -1
      ) {
        Message.error(
          this.content.acceptInfo
            ? this.content.acceptInfo
            : `上传${this.listType === 'picture-card' ? '图片' : '文件'}只能是${
                this.uploadAccept
              }格式!`
        );
      }
      // 限制文件大小
      let maxSize = this.maxSize ? this.maxSize : 4294967296;
      const isLtSize = file.size < maxSize;
      if (!isLtSize) {
        Message.error(
          this.content.sizeInfo
            ? this.content.sizeInfo
            : `请上传小于${byteConvert(maxSize)}的${
                this.listType === 'picture-card' ? '图片' : '文件'
              }！`
        );
      }
      // 如果有文件类型和大小限制，则清空
      if (
        (this.uploadAccept &&
          this.uploadAccept != '*' &&
          acceptType.indexOf(FileExt) == -1) ||
        !isLtSize
      ) {
        this.ReUpload(file);
        return false;
      }
      // 自主校验抛出
      const validate = await this.validateFn(file);
      if (!validate) {
        this.ReUpload(file);
        return false;
      }
      // 如果有oss
      if (this.ossShow) {
        const res = await OSS(
          file.name,
          this.ossUploadPath.fileUrl,
          this.ossUploadPath.dir ? this.ossUploadPath.dir : undefined,
          this.ossUploadPath.token
        );
        this.uploadHost = res.host;
        this.uploadData = res;
      }
      // 如果有md5
      if (this.md5Show) {
        var fileReader = new FileReader();
        var Spark = new SparkMD5.ArrayBuffer();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function (e) {
          Spark.append(e.target.result);
          that.md5 = Spark.end();
        };
      }
    },
  },
};
</script>
