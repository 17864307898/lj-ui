# API

### 介绍

lj-design 中现有的公共方法介绍以及使用方式

### 目录
| 方法名 | 说明 |
|--------|--------|
| <a href="/#/api#deepclone">deepClone</a> | 深拷贝 | 
| <a href="/#/api#oncesession">onceSession</a> | 单次缓存,仅在不传入val值时返回当前key值对应的session值,同时清空当前session | 
| <a href="/#/api#cleanobjectempty">cleanObjectEmpty</a> | 移除对象中为空的属性 |
| <a href="/#/api#byteconvert">byteConvert</a> | 字节单位转换 |
| <a href="/#/api#paramobj">paramObj</a> | 将url请求参数转为json格式 |
| <a href="/#/api#randomnumber">randomNumber</a> | m到n的随机数 |
| <a href="/#/api#countdown">countDown</a> | 验证码的倒计时 |
| <a href="/#/api#ellipsisText">ellipsisText</a> | 超出隐藏文字展示 |
| <a href="/#/api#shi-jian-chu-li">时间处理</a> | 格式化时间、时间戳转换等 |
| <a href="/#/api#zi-dian-lei-xing-xiao-yan">字典+类型校验</a> |  手机号、名称、邮箱等校验 |
| <a href="/#/api#lun-xun-chu-li">轮询处理</a> | 轮询的开始、结束、无限轮询 |

### 引入
  
```javascript
// 全局挂载
import * as tools from 'lj-design/es/utils'
Vue.prototype.$tools = tools
  
// 按需引入
import { deepClone } from 'lj-design/es/utils'
```

### deepClone

| 说明 | 参数 | 返回值 | 
|--------|------|-----|-------|-------|-------|
| 深拷贝 | `target`_object_ | _object_ |
#### 示例
```javascript
const a = { a: 1 }
deepClone(a) // { a: 1 }
```

### onceSession

| 说明 | 参数 | 返回值 | 
|--------|------|-----|-------|-------|-------|
| 单次缓存,仅在不传入val值时返回当前key值对应的session值,同时清空当前session | `key`_string_`val`_any_ | _any_ |

> 仅在只传入`key`值时返回对应session值，并清空当前`key`对应的session
#### 示例
```javascript
// 存值
const a = JSON.stringify({ a: 1 })
onceSession('test', a)

// 取值
const val = onceSession('test') // { a: 1 } 同时清空test对应的session
```
### cleanObjectEmpty

| 说明 | 参数 | 返回值 | 
|--------|------|-----|-------|-------|-------|
| 移除对象中为空的属性 | `target`_object_ | _object_ |
#### 示例
```javascript
// 存值
const a = {
    ball: null,
    Football: '足球',
    Basketball: '',
    Volleyball: undefined,
}
// 取值
const val = cleanObjectEmpty(a) // { Football: '足球' } 移除没有值的字段
```
### byteConvert

| 说明 | 参数 | 返回值 | 
|--------|------|-----|-------|-------|-------|
| 容量字节单位转换 `B, KB, MB, GB, TB, PB, EB, ZB, YB` | `bytes` _number_  _string_ `down` _string_  | _string_ |
> 1KB=1024B 1MB=1024KB 1G＝1024MB 1T=1024G
#### 示例
```javascript
const a = 666666, b = 88888888, c = 1234567890
const val_a = cleanObjectEmpty(a) // 651.04 KB 取小数点后两位
const val_b = cleanObjectEmpty(b) // 84.77 MB
const val_c = cleanObjectEmpty(b) // 1.15 GB
const val_c = cleanObjectEmpty(b, 'down') // 1GB
```
### paramObj

| 说明 | 参数 | 返回值 |
|--------|------|-----|-------|-------|-------|
| 将url请求参数转为json格式 | `url` _string_ | _object_ |
#### 示例
```javascript
 const _url = "https://allinone.cn/sourceCode/projectDetail?projectId=3963&projectName=maven&projectSource=7"
 const val = paramObj(_url) // {projectId: '3963', projectName: 'maven', projectSource: '7'}
```
### randomNumber

| 说明 | 参数 | 返回值 | 
|--------|------|-----|-------|-------|-------|
| m到n之间的随机数 | `m`_number_ `n`_number_ | _number_	|
#### 示例
```javascript
 const a = 2, b = 9
 const val = randomNumber(a, b) // 3 //2-9之前随机数
```
### countDown

| 说明 | 参数 | 返回值 | 
|--------|------|-----|-------|-------|-------|
|  验证码的倒计时|  `a` _$event_ `b`_number_ 倒计时的时长 `c` _String_ 需要倒计时的参数名 |  _number_  |
#### 示例
```template
    <div>{{countDownSecond}}</div>
    <button @click="start">开始倒计时</button>
```
```javascript
    data() {
        return {
            countDownSecond: 0
        }
    }
    methods: {
        start() {
            this.countDown(this, 60, 'countDownSecond')
        },
    }
```
### ellipsisText

| 说明 | 参数 | 返回值 | 
|--------|------|-----|-------|-------|-------|
|  超出隐藏文字展示|  `value`_String_ 文字内容 `num`_number_ 设置限定字数 |  _String_  |
#### 示例
```template
    <div>{{ellipsisText(value, 10)}}</div>
```
### 时间处理

| 方法名 | 说明 | 参数 | 返回值 | 可选值 | 默认值 |
|--------|------|-----|-------|-----|-------|
| formatDate | 格式化时间 | `dateStr`_string_  _number_ `format` _string_ | 格式化时间_string_ | `format` |  `format`YYYY-MM-DD hh:mm:ss 
| formatMS | 毫秒转天时分秒 | `mss` _string_ _number_ | _string_ |
| formatHistoryTime | 毫秒转历史时间（eg: 刚刚） | `time` _string_ _number_ `format` _string_ | _string_ | `format` |  `format`YYYY-MM-DD hh:mm:ss 
| tensBitTimestamp | 10/13位时间戳转换 | `time` _string_ _number_ | _string_ |
| FormatDateSlot | 时间段 | `time` _string_ _number_ `unit`_string_ | _string_ | `unit` | `day`, `hour`, `minute`, `second`|
#### 示例
```javascript
    const data1 = 1669191340132,data2=497213,data3=1669191340 format="YYYY-MM-DD hh:mm:ss"

    //格式化时间
    const var_a1 = formatDate(data1) //2022-11-23 16:15:40
    const var_a2 = formatDate(data1, YYYY-MM-DD hh:mm:ss) //2022-11-22 10:51:32
    const var_a3 = formatDate(data1, YYYY-MM-DD hh:mm) //2022-11-22 10:51
    //毫秒转天时分秒
    const var2 = formatMS(data2) // 8 分 17 秒
    //秒转历史时间
    const var3 = formatHistoryTime(data1) // 4分钟前
    //10/13位时间戳转换
    const var4 = tensBitTimestamp(data3) //2022年11月23日 16:15:40
```

### 字典+类型校验

| 方法名 | 校验类型 | 返回值
|--------|------|------
| isName | 中文或大小写字母或数字 | _boolean_ |
| isUserName | 只能是中文 | _boolean_ |
| isTrimName | 名称前后空格 | _boolean_ |
| isSpecialSymbolName | 特殊字符名称 | _boolean_ |
| isPhone | 手机号 | _boolean_ |
| isEmail | 邮箱 | _boolean_ |
| isIdCard | 身份证号(第二代) | _boolean_ |
| isString | 字符串 | _boolean_ |
| isArray | 数组 | _boolean_ |
| isJson | json数据 | _boolean_ |
#### 示例
```javascript
    const data1 = 'ljqc_test'
    if (!isName) {
        callback()
    }
```
### 轮询处理

| 类/方法名 | 说明 | 参数 | 返回值 | 可选值 | 默认值 |
|--------|------|-----|-------|-------|-------|
|  Thread|  轮询类名 | new Thread({ start()=>{},stop()=>{},number: 0, time: 300}) | `start`_function_ 轮询中;`stop`_function_ 轮询手动结束;`number`_number_ 轮询次数配置;`time`_number_ 轮询的时间| `stop` `number` | `number` 0 无限轮询 `time`300 ms |
|  thread.run()|  开始轮询|  |  |
|  thread.stop()|  主动结束轮询 |
#### 示例
```javascript
   // 示例1-手动结束轮询
    const thread = new Thread({
        start: function () {
            console.log("轮询中...")
        },
        stop: function () {
            console.log("轮询结束，结束方式：手动结束")
        },
        number: 0, 
        time: 1000
    })
    // 开始轮询
    thread.run();
    // 主动结束轮询
    // thread.stop()
    setTimeout(() => {
        thread.stop()
    }, 6000)
```
```javascript
    // 示例2- 通过轮询次数结束轮询
    const thread = new Thread({
        start: function () {
            console.log("轮询中...")
        },
        stop: function () {
            console.log("轮询结束,结束方式：配置轮询次数")
        },
        number: 5, 
        time: 1000 
    })
    // 开始轮询
    thread.run();

```
```javascript
   // 示例3- 无限轮询
    const thread = new Thread({
        start: function () {
            console.log("这里是轮询的回调")
        },
        number: 0,
        time: 1000
    })
    // 开始轮询
    thread.run();
```
