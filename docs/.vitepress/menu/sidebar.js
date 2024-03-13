/*
 * @Author       : HR-OA-KTS 黄强 670604@ky-tech.com.cn
 * @Date         : 2024-03-13 17:27:29
 * @Description  : 侧边栏
 */
const FileName = {
  H5Views: '/H5-components/views/',
  H5Custom: '/H5-components/custom/',
  H5Utils: '/H5-utils/',
  ERPViews: '/ERP-components/views/',
}
// 轻应用视图组件
export const H5Views = [
  { text: 'hr-module-card 模块卡片', link: FileName.H5Views + '模块卡片组件.md' }
  // ...
]

// 轻应用业务组件
export const H5Custom = [
  { text: 'hr-chat-icon 打开跨声聊天', link: FileName.H5Custom + '打开跨声聊天.md' },
]

// 轻应用工具方法
export const H5Utils = [
  { text: 'copyText 复制', link: FileName.H5Utils + 'copyText 复制.md' },
]

// 铸剑视图组件
export const ERPViews = [
  { text: '铸剑视图组件文档', link: FileName.ERPViews + '/index' }
]

// 铸剑工具方法
export const ERPUtils = [
  { text: '铸剑工具方法文档', link: '/ERP-utils/' }
]