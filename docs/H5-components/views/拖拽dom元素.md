# dom 拖拽自定义指令

## 预览

![本地路径](./v-dragable.png)

## 使用指南

```javascript
import { draggable } from 'packages/utils/directive.js';

export default {
  directives: {
    // 拖拽元素自定义指令
    draggable,
  },
};
```

### 代码演示

```vue
<!-- 需拖拽的元素必须是fixed 或 absolute定位 -->
<div v-draggable>我是可拖拽元素</div>
```
