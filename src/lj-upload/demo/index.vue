<template>
  <lj-upload
    ref="ljuploads"
    :class="'upload-demo'"
    :drag="true"
    :accept="uploadParams.accept"
    :action="uploadParams.action"
    :retransmission="true"
    :headers="uploadParams.headers"
    :max-size="uploadParams.maxSize"
    :show-file-list="uploadParams.showFileList"
    @ossUploadData="fnOssUploadData"
    @uploadSuccess="fnUploadInfo"
  >
  </lj-upload>
</template>

<script>
export default {
  data() {
    return {
      uploadParams: {
        accept: '.zip, .tar',
        action: 'https://sec.dev.spdx.cn/file/pair/upload/',
        ossShow: false,
        ossUploadPath: {
          fileUrl: 'https://tangram-manage.test.spdx.cn/api/v1/oss/sign',
          dir: 'category-icon/',
          token: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJleHAiOjE2Nzc3NDE1NjV9.bzyWftyF3zl__nO9XnNKh1Q4FTDHPyhvBzlvPWtdH38`,
        },
        headers: {
          Authorization:
            'WmdxVXJ3eXozb2xuUWY1UTJDUWxjb0REQ2c5YTNYemhZbzNRS3lMUkNBcVhseUc1eUtvUURMR3U4aVFCVjRRWVpZMTVRZHF1V1EyQXNKNWlpRjVXZDVHejV5cEswTk9rK1h0bThlQ1ZsQytrZVd5UFlnSWdSZGNkeVkzckRZNEgrYzJzZHB5RnlHM0JHc2dFZmdUWGZQYlhvQTR6ZTUzWi9uSXFXc2MydGlrPTpGTjVwTG15VmMySmtQek90RUFNMWR0RjlzZXdCaUlYMUVFcWdrMVY2TXBES2p6S0Y2V29PbG56NzllWEpFL2h2d28vbHF2NUdtcUZnUFQ1MEpZVk5DNmdTbUc3OWtnVHByVlZjRkRiNm1KSENFQUdHMVoxcWlyVXNqTnYrSnhiZkJQUlk1eDAvcjEwTWFKMmJ5dzgxdnBnL2p4T01uc3RjdWJlMTdZZERUcWs9OlpaTk4vcHk1aG0xZlJCQ29rOWo0TFdLdVMxOWRsbTd4OEEvMGI5citTSWFyeUV3RGlUOGNEdHJtRWUzQjVJYWk2WWU0RmJhSjliYk5hWUY0cGZZWHhrZTY5WUlMcnhlajdUa0dnWm5KbGZ0Y2dScXhxTkYzUmwwUWRCbkw1ZE8vbEhjL3BqQXc5Yk8yMHZKNjFIMjN6MVlxVGM5cWwzeWRZKzZQczE5ZExKZz06VmNyRHg3d0MyeXlDcnFwTkRMN2NtbXF0RGZRUTdEVFBEYngzQlpIdkc5cFlJUUR1NG1RMDFNUlp4ckQ4UHMvNW1VU0JNOGRJNmZNaERTM3BJUjlpYldSQXI0SGNhSUpxZDlsZGU2ZVBWYnF2Y05HWGpKQkYxSUloL2dYaGNMSzlWanhndkNTQUhMNURKc0ZUVUxzci8xOUdHVGs3NmZ2QTNzNzR2SlU2d1RjPTpGcHcycDBrTE1jV0FMNndJMDUvSGp1Z3BhdXlaOWsvRjR0NDRGcEVhMXFLZXp3KzJiS0NpalJRMHNRMDczV2FYeW9iV2Fjeno2bE12MW5UYktZWnNxOUJyTS9MZEFOVy9nMjlLclpLMjBIdkNhRjhZYVhyTGlPdDdYZTNmMTV0TkNmS3o3eGNRK21JcTRxa0JDNWY0TWd1UTZjbHdnVitXd3VXNEdKbmFFT3c9',
        },
        maxSize: 4294967296,
        showFileList: true,
      },
      uploadData: {},
    };
  },
  methods: {
    // Oss返回数据
    fnOssUploadData(res) {
      console.log('fnOssUploadData', res);
    },
    // 成功返回值
    fnUploadInfo(file) {
      console.log('fnUploadInfo', file);
    },
  },
};
</script>
