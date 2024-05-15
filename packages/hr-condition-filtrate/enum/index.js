export const DATE_SHORTCUT_TYPE = {
  THREE_DAY: 10,
  SEVEN_DAY: 20,
  ONE_MONTH: 30
}

export const DATE_SHORTCUT_PARAMS = {
  [DATE_SHORTCUT_TYPE.THREE_DAY]: { count: 3, type: 'day', text: '近三天' },
  [DATE_SHORTCUT_TYPE.SEVEN_DAY]: { count: 7, type: 'day', text: '近七天' },
  [DATE_SHORTCUT_TYPE.ONE_MONTH]: { count: 1, type: 'month', text: '近一个月' },
}