import { defineConfig } from 'vitepress'

// 导入文档侧边栏
import {
  H5Views,
  H5Custom
} from './menu/index'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HR FE Together Build",
  description: "HR-OA-KTS部门前端共建文档库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '轻应用', link: '/H5-components/', activeMatch: '/H5-components/' },
      { text: '铸剑', link: '/ERP-components/', activeMatch: '/ERP-components/' },
      { text: '工具方法', link: '/utils/' },
      { text: '官方示例', link: '/markdown-examples.md' },
    ],

    sidebar: {
      'H5-components': [
        {
          text: '轻应用视图组件',
          collapsed: false,
          items: [...H5Views]
        },
        {
          text: '轻应用业务组件',
          collapsed: false,
          items: [...H5Custom]
        }
      ],
      'ERP-components': [
        // {
        //   text: '铸剑视图组件',
        //   collapsed: false,
        //   items: [ ]
        // },
        // {
        //   text: '铸剑业务组件',
        //   collapsed: false,
        //   items: [ ]
        // }
      ],
      'utils': [
        { text: 'H5 工具方法', link: '/utils/H5/index.md' },
        { text: 'ERP 工具方法', link: '/utils/ERP/index.md' }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'http://gitlab.ky-tech.com.cn/HR-FEGroup/hr-fe-together-build' }
    ]
  }
})
