/* eslint-disable no-unsafe-finally */
/* eslint-disable radix */
/**
 * session 单次缓存
 * @param {*} key session key值
 * @param {*} val session val值
 * @returns 仅在不传入val值时返回当前key值对应的session值
 */
export function onceSession(key, val) {
  if (arguments.length === 0) return;

  if (val || val === 0) {
    sessionStorage.setItem(key, val);
  } else {
    const val = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);

    return val;
  }
}

/**
 * 深拷贝
 * @param {Object} target 源数据
 * @returns {Array, Object} 深拷贝后的数据
 * */
export const deepClone = (target) => {
  function _deepClone(_target) {
    if (_target instanceof Date) return new Date(_target);
    if (_target instanceof RegExp) return new RegExp(_target);
    if (typeof _target !== 'object' || !_target) return _target;

    let obj = {};

    if (_target instanceof Array) obj = [];

    Object.keys(_target).forEach((key) => {
      obj[key] = _deepClone(_target[key]);
    });

    return obj;
  }

  return _deepClone(target);
};

/**
 * 移除对象中为空的属性
 * @param {*} object
 * @returns
 */
export function cleanObjectEmpty(object) {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') {
      if (Object.prototype.toString.call(v) === '[object Array]') {
        if (!v.length) {
          delete object[k];
        }
      }
      cleanObjectEmpty(v);
    }
    if (!v && v !== 0) {
      delete object[k];
    }
  });
  return object;
}

/**
 * @description 字节单位转换
 * @param number
 * @returns {*}
 */
export function byteConvert(bytes) {
  if (isNaN(bytes)) return '';

  const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let exp = Math.floor(Math.log(bytes) / Math.log(2));

  if (exp < 1) {
    exp = 0;
  }
  const i = Math.floor(exp / 10);
  bytes /= 2 ** (10 * i);

  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    bytes = bytes.toFixed(2);
  }

  return bytes + ' ' + symbols[i];
}

/**
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {{}|any}
 */
export function paramObj(url) {
  if (!url) return {};

  const search = url.split('?')[1];
  if (!search) return {};

  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  );
}

/**
 * @description m到n的随机数
 * @param m
 * @param n
 * @returns {number}
 */
export function randomNumber(m, n) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

/**
 * @description 格式化时间
 */
export function formatDate(dateStr, format = 'YYYY-MM-DD hh:mm:ss') {
  function addZero(val) {
    // 补0
    return val < 10 ? '0' + val : val;
  }

  const date = new Date(dateStr);
  const year = date.getFullYear() + '';
  const month = addZero(date.getMonth() + 1) + '';
  const day = addZero(date.getDate()) + '';
  const hour = addZero(date.getHours()) + '';
  const minute = addZero(date.getMinutes()) + '';
  const second = addZero(date.getSeconds()) + '';

  const resY = format
    .replace(/YYYY/g, year)
    .replace(/YYY/g, year.slice(1))
    .replace(/YY/g, year.slice(2));
  const resM = resY.replace(/MM/g, month).replace(/M/g, date.getMonth() + 1);
  const resD = resM.replace(/DD/g, day).replace(/D/g, date.getDate());
  const resH = resD.replace(/hh/g, hour).replace(/hh/g, date.getHours());
  const resMin = resH.replace(/mm/g, minute).replace(/m/g, date.getMinutes());
  const resS = resMin.replace(/ss/g, second).replace(/s/g, date.getSeconds());

  return resS;
}

/**
 * 毫秒转天时分秒
 * @param {*} mss
 * @returns
 */
export function formatMS(mss) {
  const daySeconds = 1000 * 60 * 60 * 24;
  const days = mss >= daySeconds ? parseInt(mss / daySeconds, 10) : 0;
  const hours = parseInt((mss % daySeconds) / (1000 * 60 * 60), 10);
  const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60), 10);
  const seconds = parseInt((mss % (1000 * 60)) / 1000, 10);

  let timeData = '';
  if (seconds >= 0) timeData += `${seconds} 秒`;
  if (minutes) {
    timeData = `${minutes} 分 ` + timeData;
  }
  if (hours) {
    timeData = `${hours} 时 ` + timeData;
  }
  if (days) {
    timeData = `${days} 天 ` + timeData;
  }

  return timeData;
}

/**
 * 毫秒转历史时间（eg: 刚刚）
 * @param {*} time
 * @param {*} format 格式
 * @returns
 */
export function formatHistoryTime(time, format) {
  if (('' + time).length === 10) {
    time = parseInt(time, 10) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;
  let str = '';

  if (diff < 30) {
    str = '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    str = Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    str = Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    str = '1天前';
  } else if (format) {
    str = formatDate(time, format);
  } else {
    const month = d.getMonth();
    const date = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();

    str = `${month}月${date}日${hour}时${minute}分`;
  }

  return str;
}

/**
 * 10位时间戳转换
 * @param {*} time
 * @returns
 */
export function tenBitTimestamp(time) {
  const date = new Date(time * 1000);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '' + m : m;
  let d = date.getDate();
  d = d < 10 ? '' + d : d;
  let h = date.getHours();
  h = h < 10 ? '0' + h : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second; //组合
}

/**
 * 13位时间戳转换
 * @param {*} time
 * @returns
 */
export function thirteenBitTimestamp(time) {
  const date = new Date(time / 1);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '' + m : m;
  let d = date.getDate();
  d = d < 10 ? '' + d : d;
  let h = date.getHours();
  h = h < 10 ? '0' + h : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second; //组合
}

/** ****************** 字典校验 ****************** */

/* 中文+大小写字母+数字 */
export function isName(value) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
  return reg.test(value);
}

/* 只能是中文 */
export function isUserName(value) {
  const reg = /[\u4E00-\u9FA5]/g;
  return reg.test(value);
}

/* 判断名称前后空格 */
export function isTrimName(value) {
  const reg = /(^\s)|(\s$)/;
  return reg.test(value);
}

/* 判断特殊字符名称 */
export const isSpecialSymbolName = (value) => {
  const result_reg =
    // eslint-disable-next-line no-useless-escape
    /[`~!@#$^\\&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
  return result_reg.test(value);
};

/**
 * 校验手机号
 * @param {*} value
 * @returns
 */
export function isPhone(value) {
  const reg = /^1\d{10}$/;
  return reg.test(value);
}

/**
 * 校验邮箱
 * @param {*} value
 * @returns
 */
export function isEmail(value) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(value);
}

/**
 * @description 判断是否是身份证号(第二代)
 * @param value
 * @returns {boolean}
 */
export function isIdCard(value) {
  const reg =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return reg.test(value);
}

/**
 * @description 判断是否是字符串
 * @param value
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

/**
 * @description 判断是否是数组
 * @param arg
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * @description 判断是否为json
 * @param value
 * @returns {boolean}
 */
export function isJson(value) {
  if (typeof value === 'string') {
    const obj = JSON.parse(value);
    return !!(typeof obj === 'object' && obj);
  }
  return false;
}

// ---------------------------------------------------轮询方法开始

/**
 * 轮询类封装
 * @param config 配置对象
 * @constructor
 */
export function Thread(config) {
  this.params = this.init(config);
}
/**
 * 初始化对象参数
 * @param config 配置对象
 */
Thread.prototype.init = function (config) {
  const params = config || {
    start() {},
    stop() {},
    number: 0,
    time: 300,
  };
  params.start = params.start ? params.start : function () {};
  params.stop = params.stop ? params.stop : function () {};
  params.number = params.number ? Math.abs(parseInt(params.number)) : 0;
  params.time = params.time ? Math.abs(parseInt(params.time)) : 300;
  this.time = params.time;
  return params;
};
/**
 * 轮询实现
 * @param start
 * @param stop
 * @param number
 * @param time
 */
Thread.prototype.run = function () {
  this.timer = setTimeout(this.runTime.bind(this), this.time);
};

/**
 * 执行过程函数
 */
Thread.prototype.runTime = function () {
  try {
    this.params.start();
  } finally {
    if (!this.params.number === 0) {
      if (this.total >= this.params.number) {
        this.params.stop();
        clearTimeout(this.timer);
        return;
      }
      if (!this.total) {
        this.total = 1;
      }
      this.total++;
    }
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(this.runTime.bind(this), this.time);
};

/**
 * 停止轮询
 */
Thread.prototype.stop = function () {
  clearTimeout(this.timer);
  this.params.stop();
};

// ---------------------------------------------------轮询方法结束

/**
 * 倒计时方法，可用作手机验证码的倒计时
 * @param {*} _e 传this
 * @param {Number} _duration 倒计时的时长(秒数)
 * @param {String} _timeParam 需要倒计时的参数名字
 */
export function countDown(e, duration, timeParam) {
  if (!e.countDown_interval) {
    e[`${timeParam}`] = duration--;
    e.countDown_interval = setInterval(() => {
      e[`${timeParam}`] = duration--;
      if (duration === 0) {
        setTimeout(() => {
          clearInterval(e.countDown_interval);
          e.countDown_interval = null;
          e[`${timeParam}`] = null;
        }, 1000);
      }
    }, 1000);
  } else {
    // eslint-disable-next-line no-useless-return
    return;
  }
}
