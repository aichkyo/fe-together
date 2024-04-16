
const fs = require('fs');
const path = require('path');
// import { defineConfig } from 'vuepress/config'

// https://vuepress.vuejs.org/zh/guide/directory-structure.html
module.exports = {
  // 打包配置
  dest: './dist/',
  // base: '/',

  // 文档配置
  title: "HR FE Together Build",
  description: "HR-OA-KTS部门前端共建文档库",
  themeConfig: {
    // https://vuepress.vuejs.org/zh/theme/default-theme-config.html
    nav: [
      { text: 'Home', link: '/' },
      { text: '轻应用', link: '/H5-components/', activeMatch: '/H5-components/' },
      { text: '铸剑', link: '/ERP-components/', activeMatch: '/ERP-components/' },
      { text: '工具方法', link: '/utils/' },
      // { text: '官方示例', link: '/markdown-examples.md' },
    ],

    // sidebar: 'auto',
    sidebar: {

      '/H5-components/': [
        {
          title: '业务组件',
          collapsable: false,
          sidebarDepth: 1,
          children: getSideBar('H5-components', 'custom'),
        },
        {
          title: '视图组件',
          collapsable: false,
          sidebarDepth: 1,
          children: getSideBar('H5-components', 'views'),
        },
      ],
      '/ERP-components/': [

      ],
      '/utils/': [
        {

        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'http://gitlab.ky-tech.com.cn/HR-FEGroup/hr-fe-together-build' }
    ]
  },

  plugins: [
    'vuepress-plugin-smooth-scroll'
  ],
}


// 自动获取侧边栏
function getSideBar (catalog, folder) {
  let dir = path.join(__dirname, '../', catalog, folder)
  let file_list = fs.readdirSync(dir);
  let sidebar = [
    // ['', '介绍'],
  ]
  for (let i = 0; i < file_list.length; i++) {
    // 可根据需求定制文件名，但是不能有.md后缀
    const fileName = file_list[i];
    let sidebarName = fileName.slice(0, -3);
    let fileExtension = path.extname(fileName);
    if (fileExtension === '.md') {
      sidebar.push(folder + '/' + sidebarName)
    }
  }
  return sidebar;
}

