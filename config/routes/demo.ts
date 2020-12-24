export default {
  name: '案例',
  icon: 'InfoOutlined',
  path: '/demo',
  auth: true,
  routes: [
    {
      name: '列表',
      path: '/demo/list',
      component: './Demo/List',
      exact: true,
      auth: true 
    },
    {
      name: '搜索条件',
      path: '/demo/options',
      component: './Demo/SearchOptions',
      exact: true,
      auth: true 
    },
    { component: '@/pages/404', auth: true },
  ],
};
