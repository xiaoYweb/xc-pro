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
    {
      onSearch
        // 输入 模糊搜索 选择 
        ? <Select placeholder="请搜索选择"
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
        // 存在 list 或者 map 列表
        : <Select placeholder="请选择" onSelect={onSelect} allowClear={allowClear || false} {...rest}>
          {!withoutAll && <Option value="">全部</Option>}
          {
            map ? Object.entries(map).map(([key, val]) => (
              <Option value={key} key={key}>{val}</Option>
            )) : null
          }
          {
            list ? list?.map(({ label, value }) => (
              <Option value={value} key={value}>{label}</Option>
            )) : null
          }
        </Select>
    }
  </Wrap>

}

export default SelfSelect;
