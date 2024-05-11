export function copyCode (value) {
  window.ks.callFunc({
    method: 'paste',
    params: { str: value }
  })
  if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('kuasheng_work')) {
    window.vant.Toast('已复制到剪贴板')
  }
}
