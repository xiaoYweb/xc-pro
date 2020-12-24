import demo from './demo';

const routes = [
  {
    name: 'Base',
    path: '/',
    component: '@/layouts/base',
    routes: [
      {
        name: '主页',
        path: '/',
        component: '@/pages/Home',
        icon: 'home',
        exact: true,
        auth: true,
      },
      demo,
      {
        path: '/403',
        // name: '没有权限',
        component: './403',
        hideInMenu: true,
        auth: true,
      },
      { component: '@/pages/404', auth: true, hideInMenu: true },
    ]
  },
]

export default routes;