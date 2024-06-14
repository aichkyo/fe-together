# 搜索组合组件

## 预览

![本地路径](../assets/images/hr-search-input.png)

## 代码演示

### 基础用法

```vue
  <HrSearchInput @search="search" />
```

```javascript
export default {
    methods: {
      search(text) {
        console.log(text)
      }
    }
  }
```