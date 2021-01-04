import React, { FC } from 'react';
import { Select, Spin } from 'antd';
import { debounce } from '@/lib';

const { Option } = Select;

interface mapProps {
  [propname: string]: string | number;
}

interface SelfSelectProps {
  Wrap: any;
  wrapProps: object; // wrapProps = { label: '商品编码', name: '', ...}
  list?: any[];
  map?: mapProps;
  mode?: any;
  onChange?: any;
  onSearch?: any;
  onSelect?: any;
  value?: string;
  loading?: boolean;
  allowClear?: boolean;
  searchDelay?: number;
  withoutAll?: boolean;
  [propname: string]: any;
  initialValue?: string;
}


const SelfSelect: FC<SelfSelectProps> = props => {
  const {
    Wrap, wrapProps,
    map, list, withoutAll,
    onSearch, onChange, onSelect, value, loading, allowClear, searchDelay = 500,
    ...rest
  } = props;

  return <Wrap {...wrapProps}>
    <Select placeholder="请搜索选择"
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      onSearch={debounce(onSearch, searchDelay)}
      allowClear={allowClear || true}
      // defaultActiveFirstOption={false}
      showSearch
      filterOption={false}
      notFoundContent={loading ? <Spin size="small" /> : null}
      {...rest}
    >
      {
        list && list.map((item: any) => {
          return <Option key={item.value || item.id} value={item.value}>{item.label}</Option>
        })
      }
    </Select>
  </Wrap>

}

export default SelfSelect;
