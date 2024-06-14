# 情感图组件

## 预览

![本地路径](../assets/images/hr-emotional-picture.png)

## 代码演示

### 基础用法

```vue
  <HrEmotionalPicture :type="evaluate" :text="text" />
```

```javascript
export default {
  data() {
    return {
        type: 'evaluate',
        text: '稍后再来'
      }
    }
  }
```