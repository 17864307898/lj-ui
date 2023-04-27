# 更新日志

### 介绍

记录发版动态


## 更新内容
### v1.0.10
`2023-04-27`
#### feature
- 1.表单适配输入项增加Checkbox多选框
- 2.byteConvert方法将`B`单位改为`bytes`单位,增加向下取整参数
#### fix
- 3.修复table名称过长show-overflow-tooltip问题
- 4.修复table选择selection勾选问题

### v1.0.9-alpha4
`2023-04-06`
#### fix
- Lj-charts图表文案修复

### v1.0.9-alpha3
`2023-04-06`
#### feature
- Lj-charts图表文案优化
  1. 支持文案传入
  
### v1.0.9-alpha.2
`2023-03-22`
#### feature
- Lj-upload文件上传优化
  1. 支持重传，limit传入则不生效
  2. 将与el-upload重复的prop通过$attrs绑定到组件
  3. 提供一个校验文件的prop，供使用者自主校验
  4. 增加文件类型提示限制
  5. ossUploadData方法移除，提取oss数据在成功返回uploadSuccess和uploadChange方法中取得

### v1.0.9-alpha.1
`2023-03-1`
#### feature
-Lj-check修复bug

### v1.0.9
`2023-02-24`
#### feature
- 业务文案修改-未知修改为Not-standard
- Lj-saftey-risk风险等级优化（将查看详情的按钮通过配置控制展示，事件绑定在组件内部，降低使用成本）
#### refactor
Lj-filter筛选重构
  1. 筛选项可以通过传入的配置写入组件内部，同时仍可以支持插槽传入
  2. 将业务内的逻辑拆离了出去，（批量操作，删除等都已去除） 

