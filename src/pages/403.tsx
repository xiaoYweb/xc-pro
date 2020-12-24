import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const Page403: React.FC = () => {
  return (
    <Result
      status={403}
      title="403"
      subTitle="对不起，您没有权限访问该页面"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  );
};

export default Page403;
