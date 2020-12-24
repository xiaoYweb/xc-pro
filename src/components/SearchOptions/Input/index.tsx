import React, { FC } from 'react';
import { Input } from 'antd';


interface SelfInputProps {
  Wrap: any;
  wrapProps: object; // wrapProps = { label: '商品编码', name: '', ...}
  [propname: string]: any;
  maxLength?: string;
}


const SelfInput: FC<SelfInputProps> = props => {
  const { Wrap, wrapProps, max_length = '50', ...rest } = props;
  return <Wrap {...wrapProps} >
    <Input placeholder="请输入" maxLength={max_length} {...rest} />
  </Wrap>
}

export default SelfInput;
