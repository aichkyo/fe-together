/**
 * @description 使用原生APP提供的localStorage
 * @returns {Promise} 与浏览器localStorage的区别，这里返回的是promise
 */
export const ksStorage = {
  setItem: (key, value) => {
    if (window.$__ENV_WEB__) {
      return sessionStorage.setItem(key, value)
    }
    return (
      window.ks.callFunc &&
      window.ks.callFunc({
        method: 'storageSetItem',
        params: {
          key,
          value
        }
      })
    )
  },
  getItem: key => {
    if (window.$__ENV_WEB__) {
      return sessionStorage.getItem(key)
    }
    return (
      window.ks.callFunc &&
      window.ks.callFunc({
        method: 'storageGetItem',
        params: {
          key
        }
      })
    )
  },
  removeItem: key => {
    return (
      window.ks.callFunc &&
      window.ks.callFunc({
        method: 'storageSetItem',
        params: {
          key,
          value: ''
        }
      })
    )
  }
}

/**
* @desc 函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
* @param fu 需要执行的函数
* @param wait 延迟执行时间（毫秒）
* @param immediate---true 表立即执行，false 表非立即执行
**/
export const debounce = (fn, wait, immediate) => {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }

    if (immediate) {
      var callNow = !timer
      timer = setTimeout(() => { timer = null }, wait)
      if (callNow) fn.apply(context, args)
    } else {
      timer = setTimeout(() => fn.apply(context, args), wait)
    }
  }
}