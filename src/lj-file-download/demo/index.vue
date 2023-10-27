<template>
  <div>
    <div>直接看代码示例</div>

    <el-button type="primary" @click="exportFile">导出文件</el-button>
  </div>
</template>

<script>
import LjFileDownload from '../index';

export default {
  name: 'download-demo',
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    // 下载文件
    async downloadFile() {
      // 请求参数
      const params = {};

      const options = {
        requestOptions: '/testurl',
        data: params,
      };

      const instance = new LjFileDownload(options);

      try {
        await instance.downLoadFile();
      } catch (err) {
        console.error(err);
      }
    },

    // 导出文件
    async exportFile() {
      // 请求参数
      const params = {
        viewId: 285,
        packages: ['org.junit.platform:junit-platform-console#gradle#1.0.1'],
      };

      const options = {
        requestOptions: {
          method: 'post',
          url: 'https://sec.dev.spdx.cn/api/v1/report/exportData',
          data: params,
          headers: {
            Authorization:
              'cDNXdy8wT2pNS2k3UCttOFMrL054elNEMUo0Qnc2QkRYV3RSWW82U0lpbXV3SXVLbCsyZ25iZDAvU2dMN0hOWmhYc2dKajg4OUVGTmNnSG92a3VWL2NQc1JqamZoelNFQ0xnTTNBQ1VSVFJDNG1pSlIwMXNobmE2b0NjMG9Rd2h5aVFka0RETUROMGZhbDNRRjBXa0NaVC9BS1gxUnNFUHdwL1AybWQrNE5ZPTpPQnlKZDV4WnoyN3AxVDNTT3dlRGczVzcwM0ljK09LTjIyRXd6bG81blEzSGFtbVJGam5YUUxoVHFEYmpXMU44OXIrQnorYUduVGgyR080ZlJQbXRSVFFycjdDVVFSeUdRM2VlVG1paHRJdnZFU0RoZ1AwODV6NFplcERtaDNSc1hvbmtvSFF4bnA4YmZiS0dXMWdrZTdXZVdTb09VUlZmMm5uYjFaRmV2eWc9OkFzY1puVndtODQxM1RQSTY2Uk1rVjFSOWxOUWJESjdwM2xNSHZycXFtOHNqMUU0YWJSTjV3cDNqMTB5dWhrU2kyOHAvcHdaUmp5VXZiWC9pa0cwaEhYU3pZVnVVeGtBdUp0cVBIQVZuNkZVVjRXdWc5eFJxaXY0b0pzcHZyV2dObXNTZVkrRUtQVWt0N2FKZk51Skx2SmlFM1FQaGZTbThIbHlOZWRpTTEwND06SzhaUTltdi93b0VmRzJvdHViUmt5M01abHBSd1MvY2NXQll4MWdCVmRxZWQwM1U1bmhieFV6N0E4bnNsVUNlSDA5eWtQdm52ZExvdjJCN3VoV3pjT3cvNWY1YkJEblEzZC9qaTE0b2RFVmsxZ1lIZFJPb0J0enk1VURkSUlxYmtKZjk0UE0xSk52TnJVdC9yeTc2ZDVQZFhpMTBOQUZ5WUlHMmdSQkIrcjEwPTpQSXhtYkl1REpHR294ZWsxd0hHN1JsM2pCRGVobVcwVFdab3B6aGFNcTVQTFFid3hjbVkrZzBTME1MM2tzcDRQb3g4L01SV0l2T1N3RzVhbmlRQUZabG5HNEVIMndqYVMvRXJlam5wWUpycmwvTWhIam9zcE1WQ1NBQnhBSk9pWmxnbjAxckk2cmNPZmYzM0ZxbjUyWDFOVFhSeDlqMWxUZmpmZkpyeUE4OWs9OlBaTnlOZnI4WSt4Y1RuYUxnU3l1aWVGM2Y3M2pKT1hvdzlFczFwcFdNUlgvYjQ1cnNHZDl6N2VUS1BaeEVmT1BVYjlZUk00dEFrTk8xQmNITEJVcXE0REtVaEFKa3JzOHV2WDJMckU5RUFJcklNNFRudk5ROWIwODRYaUgxbXdkdWIweWVQcWFhZ0hXRnlHcDM1Wi92S2NuUW1iZ1BNUHltTHY2em5rWndwYz0=',
          },
        },
      };

      const instance = new LjFileDownload(options);

      try {
        await instance.downLoadFile();
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>