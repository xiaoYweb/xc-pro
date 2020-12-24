import React from 'react';
import { Menu, Dropdown, Spin } from 'antd';

const DropDownOption = (props: any) => {
  const { children, userInfo, dispatch } = props;

  const handleMunuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // console.log('logout')
      dispatch({ type: 'global/requestLogot' });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleMunuClick}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return userInfo.loginName ? (
    <Dropdown overlay={menu} placement="bottomCenter">
      {children}
    </Dropdown>
  ) : (
    <Spin size="small" className="flex fxc" />
  );
};

export default DropDownOption;
