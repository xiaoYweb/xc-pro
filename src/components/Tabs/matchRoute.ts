function matchRoute(routes: any[], pathname: string) {
  if (!Array.isArray(routes)) return null; // 递归调用 routes不为数组 则返回 未匹配
  let matchedRoute: any = null;
  routes.find((route: any) => {
    const { path } = route;
    if (path === undefined) return false; // 若path 不存在 则返回 false
    if (handleMatch(path, pathname)) {
      // console.log('match', route.path, pathname)
      matchedRoute = route;
      return true;
    }
    if (route.routes) {
      matchedRoute = matchRoute(route.routes, pathname);
    }
    return matchedRoute;
  });
  return matchedRoute;
}

/**
 *
 * @param routePath /basisset/warehousemanage/look/:id
 * @param pathname /basisset/warehousemanage/look/1266300667624431680
 */
export function handleMatch(routePath: string, pathname: string) {
  // 匹配route.path 与 权限列表的 path 是否匹配
  if (!routePath || !pathname) return false;
  if (!routePath.includes(':')) return routePath === pathname; // 若是 不是动态路由 则 直接 全等比较
  const routeArr = routePath.split('/');
  const pathnameArr = pathname.split('/');
  const filterArr = routeArr.filter((str: string) => !str.includes(':'));
  if (filterArr.length === 0) return false; //

  // 切割动态路由 以及 pathname 相同位置  比对2个数组 每一项 及长度
  const disLen = routeArr.length - filterArr.length;
  const slicePathnameArr = pathnameArr.slice(0, -disLen);

  if (filterArr.length !== slicePathnameArr.length) return false; //
  return filterArr.every((str: string, i: number) => {
    return str === slicePathnameArr[i];
  });
}

export default matchRoute;
