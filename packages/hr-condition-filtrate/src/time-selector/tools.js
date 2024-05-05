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

export const hrDayJs = (date) => {
  return new HrDayJs(date)
}

export class HrDayJs {
  constructor(date) {
    this.date = formatToDate(date || new Date())
    this.init()
  }

  init () {
    const { date } = this
    this.$y = date.getFullYear()
    this.$M = date.getMonth()
    this.$D = date.getDate()
    this.$W = date.getDay()
    this.$H = date.getHours()
    this.$m = date.getMinutes()
    this.$s = date.getSeconds()
    this.$ms = date.getMilliseconds()
  }

  toString () {
    return formatToString(this.date)
  }

  toDate () {
    return formatToDate(this.date)
  }

  subtract (number, string) {
    return this.add(number * -1, string)
  }

  add (number, string) {
    switch (string) {
      case 'year': this.$y = this.$y + number; break;
      case 'month': this.$M = this.$M + number; break;
      case 'day': this.$W = this.$W + number; break;
      case 'date': this.$D = this.$D + number; break;
    }
    console.log(this, hrDayJs(this.date + Math.round(1 * number)), 'hrDayJs')
    return this
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
}