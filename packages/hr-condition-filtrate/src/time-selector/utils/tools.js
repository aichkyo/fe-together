import * as C from './constant'

// const IS_DAYJS = '$isDayjsObject'
// const isDayjs = d => d instanceof HrDayJs || !!(d && d[IS_DAYJS])

// 时间对象格式为文本格式
export const formatToString = (date, type) => {
  if (!date) { return null }

  let _date = new Date(date)
  let y = _date.getFullYear()
  let m = _date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = _date.getDate()
  d = d < 10 ? '0' + d : d
  return type === 'month' ? `${y}/${m}` : `${y}/${m}/${d}`
}

// 字符串转换为时间
export const formatToDate = (date) => {
  if (!date) { return null }
  return new Date(typeof date === 'string' ? date.replace(/-/g, "/") : date)
}

// 暴露出去的主函数
export const hrDayJs = (date) => {
  return new HrDayJs(date)
}

// 克隆
const wrapper = (date) => {
  return hrDayJs(date)
}

export class HrDayJs {
  constructor(date) {
    this.$d = formatToDate(date || new Date())
    this.init()
  }

  init () {
    const { $d } = this
    this.$y = $d.getFullYear()
    this.$M = $d.getMonth()
    this.$D = $d.getDate()
    this.$W = $d.getDay()
    this.$H = $d.getHours()
    this.$m = $d.getMinutes()
    this.$s = $d.getSeconds()
    this.$ms = $d.getMilliseconds()
  }

  toString () {
    return formatToString(this.$d)
  }

  subtract (number, string) {
    return this.add(number * -1, string)
  }

  add (number, unit) {
    number = Number(number) // eslint-disable-line no-param-reassign
    const instanceFactorySet = (n) => {
      const d = hrDayJs(this)
      return wrapper(d.date(d.date() + Math.round(n * number)), this)
    }
    if (unit === C.M) {
      return this.set(C.M, this.$M + number)
    }
    if (unit === C.Y) {
      return this.set(C.Y, this.$y + number)
    }
    if (unit === C.D) {
      return instanceFactorySet(1)
    }
    if (unit === C.W) {
      return instanceFactorySet(7)
    }
    const step = {
      [C.MIN]: C.MILLISECONDS_A_MINUTE,
      [C.H]: C.MILLISECONDS_A_HOUR,
      [C.S]: C.MILLISECONDS_A_SECOND
    }[unit] || 1 // ms

    const nextTimeStamp = this.$d.getTime() + (number * step)
    return wrapper(nextTimeStamp)
  }

  format (formatStr) {
    let str = '-'
    switch (formatStr) {
      case 'YYYY/MM/DD': str = '/'; break;
    }
    return `${this.$y}${str}${this.formatNumber(this.$M + 1)}${str}${this.formatNumber(this.$D)}`
  }

  formatNumber (number) {
    return number < 10 ? '0' + number : number
  }

  valueOf () {
    return this.$d.getTime()
  }

  clone () {
    return wrapper(this.$d)
  }

  set (string, int) {
    return this.clone().$set(string, int)
  }

  $set (unit, int) { // private set
    const utcPad = `set${this.$u ? 'UTC' : ''}`
    const name = {
      [C.D]: `${utcPad}Date`,
      [C.DATE]: `${utcPad}Date`,
      [C.M]: `${utcPad}Month`,
      [C.Y]: `${utcPad}FullYear`,
      [C.H]: `${utcPad}Hours`,
      [C.MIN]: `${utcPad}Minutes`,
      [C.S]: `${utcPad}Seconds`,
      [C.MS]: `${utcPad}Milliseconds`
    }[unit]
    const arg = unit === C.D ? this.$D + (int - this.$W) : int
    if (unit === C.M || unit === C.Y) {
      const date = this.clone().set(C.DATE, 1)
      date.$d[name](arg)
      date.init()
      this.$d = date.set(C.DATE, Math.min(this.$D, date.daysInMonth())).$d
    } else if (name) this.$d[name](arg)

    this.init()
    return this
  }

  startOf (unit, startOf) { // startOf -> endOf
    const isStartOf = !(startOf === undefined) ? startOf : true
    const instanceFactory = (d, m) => {
      const ins = wrapper(this.$u ?
        Date.UTC(this.$y, m, d) : new Date(this.$y, m, d), this)
      return isStartOf ? ins : ins.endOf(C.D)
    }
    const instanceFactorySet = (method, slice) => {
      const argumentStart = [0, 0, 0, 0]
      const argumentEnd = [23, 59, 59, 999]
      return wrapper(this.toDate()[method].apply( // eslint-disable-line prefer-spread
        this.toDate('s'),
        (isStartOf ? argumentStart : argumentEnd).slice(slice)
      ), this)
    }
    const { $W, $M, $D } = this
    const utcPad = `set${this.$u ? 'UTC' : ''}`
    switch (unit) {
      case C.Y:
        return isStartOf ? instanceFactory(1, 0) :
          instanceFactory(31, 11)
      case C.M:
        return isStartOf ? instanceFactory(1, $M) :
          instanceFactory(0, $M + 1)
      case C.W: {
        const weekStart = this.$locale().weekStart || 0
        const gap = ($W < weekStart ? $W + 7 : $W) - weekStart
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M)
      }
      case C.D:
      case C.DATE:
        return instanceFactorySet(`${utcPad}Hours`, 0)
      case C.H:
        return instanceFactorySet(`${utcPad}Minutes`, 1)
      case C.MIN:
        return instanceFactorySet(`${utcPad}Seconds`, 2)
      case C.S:
        return instanceFactorySet(`${utcPad}Milliseconds`, 3)
      default:
        return this.clone()
    }
  }

  endOf (arg) {
    return this.startOf(arg, false)
  }

  toDate () {
    return new Date(this.valueOf())
  }

  daysInMonth () {
    return this.endOf(C.M).$D
  }

  $g (input, get, set) {
    if (input === undefined) return this[get]
    return this.set(set, input)
  }
}

const proto = HrDayJs.prototype
hrDayJs.prototype = proto;
[
  ['$ms', C.MS],
  ['$s', C.S],
  ['$m', C.MIN],
  ['$H', C.H],
  ['$W', C.D],
  ['$M', C.M],
  ['$y', C.Y],
  ['$D', C.DATE]
].forEach((g) => {
  proto[g[1]] = function (input) {
    return this.$g(input, g[0], g[1])
  }
})