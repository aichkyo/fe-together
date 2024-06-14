# tab导航

## 预览

![本地路径](../assets/images/hr-tab-nav.png)

## 代码演示

### 基础用法

```vue
  <HrTabnav :tabList="tabList" />
```

```javascript
export default {
  data() {
    return {
      tabList: [
        {
          text: '待调度',
          count: 20,
          type: 10
        },
        {
          text: '已调度',
          count: 20,
          type: 20
        },
        {
          text: '调度中',
          count: 20,
          type: 30
        }
      ],
      }
    }
  }
```