import React, { FC } from 'react';
import { Input } from 'antd';


interface SelfInputProps {
  Wrap: any;
  wrapProps: object; // wrapProps = { label: '商品编码', name: '', ...}
  [propname: string]: any;
}

// 手机号输入
const SelfInput: FC<SelfInputProps> = props => {
  const { Wrap, wrapProps, ...rest } = props;

  const phoneValidator = (_: any, val: string) => {
    if (!val) return Promise.resolve()
    const re = /^1[3456789]\d{9}$/;
    if (!re.test(val)) return Promise.reject('请输入有效的手机号')
    return Promise.resolve()
  }
  
  return <Wrap {...wrapProps} rules={[{ validator: phoneValidator }]} >
    <Input placeholder="请输入" maxLength={11} {...rest} />
  </Wrap>
}

export default SelfInput;
