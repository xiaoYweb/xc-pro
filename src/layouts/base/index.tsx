import React, { useRef, useState } from 'react';
import BasicLayout, {
  // DefaultFooter 
} from '@ant-design/pro-layout';
import { Link, connect } from 'umi';
// import logo from '@/assets/img/logo.svg';
import { Card, ConfigProvider } from 'antd';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { ConfigProviderProps } from 'antd/lib/config-provider/index.d';
import zhCN from 'antd/es/locale/zh_CN';
import defaultSetting from '../../../config/defaultSettings';
import Tabs from '@/components/Tabs';
import styles from './index.less';
import { needTab, needAuth, isDev } from '../../../config/index';
import RightContent from '@/components/RightContent';
import GlobalContext from './GlobalContext';

const antdConfig: ConfigProviderProps = {
  locale: zhCN,
  componentSize: 'middle',
};

const Basic = (props: any) => {
  const [bol, setBol] = useState(false)
  const { children, location, route, history } = props;
  const { query, pathname } = location;

  const tabRef: any = useRef()
  const globalValue: any = { tabRef }
  const onCollapse = (current: boolean, next: boolean) => {
    // setBol(next)
  }
  const handleCollapse = (ev: any) => {
    // ev?.stopPropagation();
    ev?.preventDefault();
    setBol((bol: boolean) => !bol)
  }
  return (
    <GlobalContext.Provider value={globalValue}>
      <ConfigProvider {...antdConfig}>
        <BasicLayout
          collapsed={bol}
          onCollapse={onCollapse}
          collapsedButtonRender={false}
          // logo='https://s.xinc818.com/files/kdskh6n4uhl1zq.png'
          logo={() => {
            return <div className="logo-area">
              <img
                src="https://s.xinc818.com/files/kdskh6n4uhl1zq.png"
                onClick={handleCollapse} style={{ borderRadius: 4 }}
              />
            </div>
          }}
          menuHeaderRender={(logoDom, titleDom) => (
            <Link to="/">
              {logoDom}
              {titleDom}
            </Link>
          )}
          menuDataRender={menuList => {
            const authMenuList = filterAuthMenu(menuList);
            return needAuth ? authMenuList : menuList;
          }}
          menuItemRender={(menuItemProps, defaultDom) => {
            if (
              menuItemProps.isUrl ||
              menuItemProps.children ||
              !menuItemProps.path
            ) {
              return defaultDom;
            }
            return <Link to={menuItemProps.path}>{defaultDom}</Link>;
          }}
          // breadcrumbRender={(routes = []) => routes}
          itemRender={(route, params, routes, paths) => {
            const index = routes.indexOf(route);
            const bol = index !== 0 && index !== routes.length - 1;
            return bol ? (
              <Link to={route.path}>{route.breadcrumbName}</Link>
            ) : (
                <span>{route.breadcrumbName}</span>
              );
          }}
          // rightContentRender={() => <RightContent />}
          headerRender={() => {
            return <section className={styles['header-area']}>
              <div className="tab-area">
                {
                  needTab && <Tabs query={query} pathname={pathname} route={route}
                    navTo={(path: string, query: any) => {
                      history.push({
                        pathname: path,
                        query
                      });
                    }} ref={tabRef} />
                }
              </div>
              <div className='right-area'>
                <RightContent />
              </div>
            </section>
          }}
          // footerRender={() => (
          //   <div>footer</div>
          // )}
          {...defaultSetting}
          {...props}
        >

          {/* 内容区域 overflow-y auto */}
          <main className={styles['main-area']}>
            <Card className={styles['main-style']}>
              {children}
            </Card>
          </main>
        </BasicLayout>
      </ConfigProvider>
    </GlobalContext.Provider>
  );
};

export default connect(({ settings }: any) => ({
  settings,
}))(Basic);

function filterAuthMenu(menuList: any[]) {
  // 菜单权限 过滤
  return menuList.filter((menuItem: any) => {
    if (!menuItem.auth) return false; // 若父节点 没有权限 则直接过滤 子节点不再处理
    if (Array.isArray(menuItem.children)) {
      menuItem.children = filterAuthMenu(menuItem.children);
    }
    return true;
  });
}
