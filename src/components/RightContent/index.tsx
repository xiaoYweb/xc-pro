import React from 'react';
import { connect } from 'umi';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import DropDownOption from './DropDownOption';

const RightContent = (props: any) => {
  const { dispatch } = props;
  //@ts-ignore
  const userInfo = window['_userInfo'] || {}; // 传参 为 null 或者 undefined 会报错 
  
  return (
    <DropDownOption userInfo={userInfo} dispatch={dispatch}>
      <div className={styles['avatar-area']}>
        <Avatar size="small" icon={<UserOutlined />} className="mr-10" />
        <span className="etc">{userInfo?.loginName}</span>
      </div>
    </DropDownOption>
  );
};

export default connect(null)(RightContent);