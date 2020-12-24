import React, { useEffect, FC, useState } from 'react';
import { Tabs, Button } from 'antd';
import matchRoute from './matchRoute';
import styles from './index.less';

interface propType {
  pathname: string; // 当前 pathname 含动态路由传参 部分
  query: {}; // 当前 query 传参 
  route: any; // 路由 配合 pathname  找出 当前组件的 pathname
  navTo: any; // 外部传入的 路由跳转 回调方法
  allowBackHome?: boolean; // 没有当前页记录 404 403 是否允许 直接跳转主页(关闭所有标签)
}
const { TabPane } = Tabs;

const Navigation: FC<propType> = props => {
  const {
    pathname,
    query,
    route,
    navTo,
    allowBackHome = true,
  } = props;
  const [navList, setNavList] = useState<any>([])
  const [recordPath, setRecordPath] = useState('')
  const [myHistory, setMyHistory] = useState<any>([]);


  // 导航 列表变化 -- 没有访问权限 (403相关页面) 404相关页面 不允许添加
  useEffect(() => {
    const matchedRoute = matchRoute(route.routes, pathname);
    // 404 | 403  page  失去焦点
    if (!matchedRoute || matchedRoute.path === '/403') {
      setRecordPath('')
      return;
    }
    const { path: routePath, name: tagName, auth } = matchedRoute;
    if (!routePath || !tagName || !auth) return

    setRecordPath(pathname)
    setMyHistory([...myHistory, pathname])

    const clickTagInfo = { path: pathname, tagName, routePath, query }
    const i = navList.findIndex((item: any) => item.routePath === routePath);

    // 不存在此 tag 末尾添加 tag
    if (i === -1) {
      const newList = [...navList, clickTagInfo];
      setNavList(newList)
      return
    }

    // 已存在 此tag
    // 考虑 query 变化

    // 配到到 动态路由 || query 传参存在值  ---  更新 tag 信息
    // 1. 动态路由 id 变化 但其实为用一个路由 这种情况下 需要覆盖 (此处偷个懒 不进行对比变化 只要params 传参带值 每次都覆盖)
    // 2. query 传参变化 但其实为用一个路由 这种情况下 需要覆盖 (此处偷个懒 不进行对比变化 只要query 传参带值 每次都覆盖)
    if (routePath.includes(':') || Object.keys(query).length > 0) {
      const spliceArr = [...navList];
      spliceArr.splice(i, 1, clickTagInfo); // 覆盖原有的 navList 项
      setNavList(spliceArr)
      return
    }
  }, [pathname]);

  // 跳转路由 需要 具体路径 (动态路由传参 query传参)
  const onChange = (path: string) => {
    // 当前tag 重复点击 
    if (recordPath === path) return
    const res = navList.find((item: any) => item.path === path)
    if (!res) return
    handleTagClick(path, res.query)
  }

  // 跳转路由 需要 具体路径 (动态路由传参 query传参)
  const handleTagClick = (path: string, query: any) => {
    if (pathname === path) return;
    navTo(path, query || {})
    //@ts-ignore
    // history.push({
    //   pathname: path,
    //   query
    // });
  };

  // 关闭标签
  const onEdit = (path: any, action: string) => {
    if (action !== 'remove') return

    const newList = navList.filter(
      (item: any) => item.path !== path,
    );

    // 存在 404 页面后 recordPath 没有值情况
    const currentPath = recordPath || myHistory[myHistory.length - 1]

    // 没有匹配到关闭的 相关tag (若出现此情况 则为 逻辑 bug)
    if (newList.length === navList.length) return

    // 关闭的是 其他标签 
    if (currentPath !== path) {
      setNavList(newList)
      return
    }

    // 关闭自身标签
    const pathMap: any = {}

    newList.forEach((item: any) => {
      pathMap[item.path] = true;
    });

    const newHistory = unique(
      myHistory.filter((path: string) => pathMap[path]),
    );

    const backpath = newHistory[newHistory.length - 1];

    const tagInfo = newList.find(
      (item: any) => item.path === backpath,
    );
    navTo(backpath, tagInfo.query || {})
    setNavList(newList)
    setMyHistory(newHistory)
  };

  // 关闭所有标签
  const handleCloseAllTags = () => {
    // 存在 404 / 403 页面后 recordPath 没有值情况
    if (allowBackHome && !recordPath) { // 默认跳回主页 
      navTo('/', {})
      setNavList([])
      return
    }

    // 需要考虑 / 主页也没有权限的情况 
    // recordPath 存在值
    const currentPath = recordPath || myHistory[myHistory.length - 1]

    const tagInfo = navList.find(
      (item: any) => item.path === currentPath,
    );

    setNavList([tagInfo])
    setRecordPath(currentPath)
    setMyHistory([tagInfo.path])
  };

  const btnNode = <Button
    type="primary" onClick={handleCloseAllTags}
    style={{ marginBottom: '-2px' }}
  >关闭所有标签</Button>
  
  return (
    <Tabs
      type="editable-card"
      hideAdd={true}
      onChange={onChange}
      activeKey={recordPath}
      onEdit={onEdit}
      size="small"
      className={styles['tabs-wrap']}
      tabBarExtraContent={btnNode}
    >
      {
        navList.map(({ tagName, path }: any) => (
          <TabPane tab={tagName} key={path} closable={navList.length !== 1}>
            {/* {pane.content} */}
          </TabPane>
        ))
      }
    </Tabs >
  );
};

export default Navigation;

function unique(arr: any[]) {
  // 此处去重操作 额外处理了 后面添加的记录 因为去重 而删除了 说以 重后往前去重才是 正确的交互
  const newArr = [...arr];
  newArr.reverse();
  return [...new Set(newArr)].reverse();
}
