# 复制

> 仅示例


/**
 * @description: 复制功能
 * @param {String} 需要复制的文本
 */

 ```javascript
export const copyCode = (value) => {
  window.ks.callFunc({ method: "paste", params: { str: value } })
  if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('kuasheng_work')) {
    vant.Toast('已复制到剪贴板')
  }
}
```