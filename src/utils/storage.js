import Cookies from 'js-cookie'


/**
 * 清除cookie
 */
 function removeCookie(key) {
  const domain = location.hostname.substring(location.hostname.indexOf('.'))
  try {
    Cookies.remove(key, { domain })
    Cookies.remove(key)
  } catch (e) {
    window.console.log('清除Cookie失败###')
  }
}

/**
 * 设置cookie
 */
function setCookie(key, value, expires, domain) {
  removeCookie(key)
  const _domain = location.hostname.substring(location.hostname.indexOf('.'))
  try {
    Cookies.set(key, value, {
      expires: expires || 30,
      domain: domain || _domain,
    })
  } catch (e) {
    window.console.log('存储Cookie失败###')
  }
}

/**
 * 获取cookie
 */
function getCookie(key) {
  try {
    if (Cookies.get(key) === 'undefined') return ''
    
    return Cookies.get(key)
  } catch (e) {
    window.console.log('获取Cookie失败###')
  }
}



/**
 * 设置sessionstorage
 */
function setSessionstorage(key, value, expiretime) {
  let storagevalue = {}
  if (expiretime) {
    storagevalue._Value = value
    storagevalue._Time = expiretime
  } else {
    storagevalue = value
  }
  try {
    if (typeof storagevalue === 'object') {
      storagevalue = '__OBJECT__' + JSON.stringify(storagevalue)
    }
    sessionStorage.setItem(key, storagevalue)
  } catch (e) {
    window.console.log('存储sessionstorage失败###')
  }
}

/**
 * 获取sessionstorage
 */
function getSessionstorage(key) {
  let returnvalue = null
  const timenow = new Date().getTime() // 当前时间
  try {
    returnvalue = sessionStorage.getItem(key)
    if (returnvalue.indexOf('__OBJECT__') !== -1) {
      returnvalue = returnvalue.replace('__OBJECT__', '')
      returnvalue = JSON.parse(returnvalue)
      if (returnvalue._Time && timenow < returnvalue._Time) {
        returnvalue = returnvalue._Value
      }
      if (returnvalue._Time && timenow >= returnvalue._Time) {
        sessionStorage.removeItem(key)
        returnvalue = null
      }
    }
  } catch (e) {
    window.console.log('获取sessionstorage失败###')
  }
  return returnvalue
}


/**
 * 设置localstorage
 */
function setLocalstorage(key, value) {
  let storagevalue = value
  try {
    if (typeof storagevalue === 'object') {
      storagevalue = '__OBJECT__' + JSON.stringify(storagevalue)
    }
    localStorage.setItem(key, storagevalue)
  } catch (e) {
    window.console.log('存储localstorage失败###')
  }
}

/**
 * 获取localStorage
 */
function getLocalstorage(key) {
  let returnvalue = null
  try {
    returnvalue = localStorage.getItem(key)
    if (returnvalue.indexOf('__OBJECT__') !== -1) {
      returnvalue = returnvalue.replace('__OBJECT__', '')
      returnvalue = JSON.parse(returnvalue)
    }
  } catch (e) {
    window.console.log('获取localStorage失败###')
  }

  return returnvalue
}

/**
 * 清除指定localStorage
 */
function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    window.console.log('清除指定localStorage失败###')
  }
}

/**
 * 清除所有localStorage
 */
function clearLocalStorage() {
  try {
    localStorage.clear()
  } catch (e) {
    window.console.log('清除localStorage失败###')
  }
}

/**
 * 清除所有sessionStorage
 */
function clearSessionStorage() {
  try {
    sessionStorage.clear()
  } catch (e) {
    window.console.log('清除localStorage失败###')
  }
}

export {
  setLocalstorage,
  getLocalstorage,
  setSessionstorage,
  getSessionstorage,
  setCookie,
  getCookie,
  removeCookie,
  removeLocalStorage,
  clearLocalStorage,
  clearSessionStorage,
}