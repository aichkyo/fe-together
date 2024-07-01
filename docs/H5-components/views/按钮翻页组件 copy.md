# 按钮翻页组件

## 预览

![本地路径](./hr-pager.png)

## 使用指南

```javascript
import HrPager from 'packages/hr-pager/index';

export default {
  components: [HrPager],
};
```

## 代码演示

### 基础用法

```vue
<HrPager :currentId="id" :ids="ids" @turnPage="turnPage" />
```

## API

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
      <th>版本</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>currentId</td>
      <td>当前分页id</td>
      <td><code>String</code></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>ids</td>
      <td>分页id集合</td>
      <td><code>Array</code></td>
      <td><code>[]</code></td>
      <td>-</td>
    </tr>
  </tbody>
</table>

## Event

<table>
  <thead>
    <tr>
      <th>事件名称</th>
      <th>说明</th>
      <th>回调参数</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>turnPage</td>
      <td>翻页触发的事件</td>
      <td><code>{ id: String }</code></td>
    </tr>
  </tbody>
</table>
