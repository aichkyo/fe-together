---
  sidebar: 'auto'
---

# 轻应用相关的工具方法


## 复制文本 copyText

|   属性   |   类型   |       描述       | 默认值 |
| :------: | :------: | :--------------: | :----: |
| copyText | function | 复制文本到剪贴板 |   -    |


 ```javascript
export const copyText = (value) => {
  window.ks.callFunc({ method: "paste", params: { str: value } })
  if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('kuasheng_work')) {
    vant.Toast('已复制到剪贴板')
  }
}
```


## 生成uuid


/**
 * @description: 生成uuid
 * @return {String} uuid
 */

 ```javascript

export function createUuid () {
  const ustr = () => Math.random().toString(36).substr(3)
  return ustr() + ustr()
}

```