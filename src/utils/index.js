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

  const symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
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
  return Math.floor(Math.random() * (m - n) + n);
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
        start () {},
        stop () {},
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
      e[`${timeParam}`] = duration--
      e.countDown_interval = setInterval(() => {
          e[`${timeParam}`] = duration--
          if (duration=== 0) {
              setTimeout(() => {
                  clearInterval(e.countDown_interval)
                  e.countDown_interval = null
                  e[`${timeParam}`] = null
              }, 1000);
          }
      }, 1000)
  } else {
      // eslint-disable-next-line no-useless-return
      return;
  }
}
