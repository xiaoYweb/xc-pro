/**
 * 使用注意事项
 * 1. path 作为比对参数 保证唯一性
 * 2. path 中 动态路由的情况
 *    例子(/basisset/warehousemanage/look/:id) -- /basisset/warehousemanage/look/
 * 3. 注意 后台 数据结构 实际为 多层地柜嵌套 每层有一个type 值 (MENU PAGE BUTTON) 可能会出现 BUTTON 嵌套 MENU/PAGE/BUTTON 情况
 */

import { needAuth, isDev } from '../../config';
// 比对 路由 与 权限列表 添加对应的权限
function routesAuthorization(routes: any[], authList: any[]) {
  const list = flatAuthList(authList).filter(item => item.type !== 'BUTTON');
  handleBtnAuth(list);
  isDev && console.log('flatList', list);
  handleRoutesAuth(routes, list);
}

/**
 * 展开权限列表
 * @param authList
 */
function flatAuthList(authList: any[]): any[] {
  return authList.reduce((prev: any[], next: any) => {
    return Array.isArray(next.children)
      ? prev.concat(next).concat(flatAuthList(next.children))
      : prev.concat(next);
  }, []);
}

function handleBtnAuth(authList: any[]) {
  authList.forEach((item: any) => {
    const { children } = item;
    if (
      Array.isArray(children) &&
      children.length > 0 &&
      children[0].type === 'BUTTON'
    ) {
      item.btnAuthMap = {}
      children.forEach(btnItem => {
        item.btnAuthMap[btnItem.code] = true;
      });
    }
  });
}

function handleRoutesAuth(routes: any[], authList: any[]) {
  return routes.forEach((route: any) => {
    const { path, routes: subRoutes } = route;
    const res = authList.find(item => handleMatch(path, item.code));
    if (!needAuth || res) {
      Object.assign(route, {
        auth: true,
        btnAuthMap: res?.btnAuthMap || {},
      });
    } else {
      // 若此处不写 则 menulist 那边的回传参数默认会添加 auth = true 此处 ？？？？ 问题 不明原因 
      if (route.auth !== true) {
        route.auth = false
      }
    }
    // (!needAuth || res) &&
    //   Object.assign(route, {
    //     auth: true,
    //     btnAuthMap: res?.btnAuthMap || {},
    //   });
    Array.isArray(subRoutes) && handleRoutesAuth(subRoutes, authList);
  });
}

/**
 * routePath authPath 是否对等
 * @param routePath
 * @param authPath
 */
export function handleMatch(routePath: string, authPath: string) {
  if (!routePath || !authPath) return false
  if (authPath.includes(':')) return routePath === authPath;
  const re = /\/:[\w|\W]*/;
  const str = routePath ? routePath.replace(re, '') : undefined;
  return authPath === str;
}

export default routesAuthorization;
