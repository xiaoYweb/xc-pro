import { getAuthList, getUserInfo } from '@/services/user';
import routesAuthorization from '@/utils/routesAuthorization';
import { navToNotAuthPage } from '@/utils';
import { needAuth, isDev } from '../config';

let authList: any = [];



// 运行时配置
/**
 * 可用用于校验是否登录  (仅执行一次 优先级 1)
 * @param oldRender
 */
export async function render(oldRender: Function) {
  const { entry } = await getUserInfo().catch(() => ({}))
  if (entry) {
    const loginName = entry?.name;
    const userId = entry?.userInfo?.userId;
    // @ts-ignore
    window._userInfo = { loginName, userId, userName: loginName }
  }


  if (!needAuth) return oldRender();
  getAuthList({ appCode: 'APOLLO' }).then(({ entry }: any) => {
    isDev && console.log('getRoutes -- ', entry?.children);
    authList = entry?.children || [];
    oldRender();
  }).catch(() => {
    oldRender();
  });
}
/**
 * 动态修改 routes (仅执行一次 优先级 2)
 * 请求的权限列表 赋值到 路由列表 auth authList
 * @param param {routes: []}
 */
export function patchRoutes({ routes }: any) {
  (!needAuth || authList.length > 0) && routesAuthorization(routes, authList);
  isDev && console.log("patchRoutes -> routes", routes)
}

/**
 * 路由变化 触发 用于 埋点 / 修改 title (初始化)
 * 疑问 刷新时为何执行2次
 * @param params { location, routes: [所有路由], action: 'string/POP', matchedRoutes: [] }
 */
export function onRouteChange(params: any) {
  const {
    location: { pathname },
    routes,
    action,
    matchedRoutes,
  } = params;
  // console.log('onRouteChange', params);

  if (matchedRoutes.length === 0) return;
  const currentRoute = matchedRoutes[matchedRoutes.length - 1].route;
  const { title, name } = currentRoute || {}
  document.title = title || name || '财务中心';
  // console.log('onRouteChange pathname, matchedRoute', pathname, currentRoute);
  // 匹配到对应 route 但是没有权限 跳转 403页面
  if (needAuth && !currentRoute?.auth) {
    console.log('403 page');
    navToNotAuthPage();
  }
}

/**
 * 修改交给 react-dom 渲染时的根组件  比如用于在外面包一个 Provider
 * @param container
 */
// export function rootContainer(container) {
//   return React.createElement(ThemeProvider, null, container);
// }

/**
 * dva 运行时配置
 */
export const dva = {
  config: {
    onError(err: any) {
      // 监听 错误 (场景: 可以监听 yeild 后面 返回 reject promise 抛出的错误)
      err.preventDefault(); //
      // eslint-disable-next-line no-console
      console.error(err.message);
    },
  },
};