# 更新日志

### 介绍

发版规则请参考 [lj-design组件发版规则](https://lengjingqicai.feishu.cn/docs/doccnbpAF9S5kkG3GU4YeJKx6Kh)


## 更新内容

### v1.0.9
`2023-02-24`
#### feature
- 业务文案修改-未知修改为Not-standard
- Lj-saftey-risk风险等级优化（将查看详情的按钮通过配置控制展示，事件绑定在组件内部，降低使用成本）
#### refactor
Lj-filter筛选重构
  1. 筛选项可以通过传入的配置写入组件内部，同时仍可以支持插槽传入
  2. 将业务内的逻辑拆离了出去，（批量操作，删除等都已去除） 
