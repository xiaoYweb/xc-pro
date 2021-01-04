import React, { FC, useEffect, useState } from 'react';
import Select from '../Select';
import { connect } from 'umi';

interface SelectProps {
  Wrap: any;
  wrapProps: object; // wrapProps = { label: '商品编码', name: '', ...}
  pathname?: string;
  mode?: any;
  selectValue?: string;
  selectLabel?: string;
  onSearch?: any;
  onSelect?: any;
  allowClear?: boolean
  searchDelay?: number;
  [propname: string]: any;
  dispatch: any;
  searchLoading?: boolean;
  // --- 初始化搜索
  initVal?: string;
  initSearch?: boolean;
}

// 用户名称 迷糊搜索
const UsernameSelect: FC<SelectProps> = props => {
  const {
    dispatch, Wrap, wrapProps, searchLoading, pathname, selectLabel, selectValue, onSelect,
    search, initVal = '', initSearch = true, ...rest
  } = props;
  const [list, setList] = useState([] as any[]);

  const handleSearch = (nickName: string) => {
    if (!nickName) return
    const payload = { nickName }
    setSearchList([]) // 再次输入后清空列表 
    dispatch({
      type: 'search/requestUsernameList',
      payload,
      success: (list: any[]) => {
        const searchList = list.map(item => ({
          label: item[selectLabel || 'nickName'],
          value: item[selectValue || 'userId'],
        }))
        setSearchList(searchList)
      }
    })
  }

  // 统一 设置 searchList
  const setSearchList = (searchList: any[]) => {
    pathname ? dispatch({
      type: 'search/updateState',
      payload: {
        [retListKey(pathname)]: searchList // 初始化为 undefined
      }
    }) : setList(searchList)
  }

  // 统一 获取 searchList
  const getSearchList = () => {
    return pathname ? search[retListKey(pathname)] : list
  }

  // 点击选择 返回 所需的 选择项的所有数据 item
  const handleOnSelect = (val: string) => {
    if (!onSelect) return
    const list = getSearchList()
    const res = list.find((item: any) => item.value === val)
    onSelect(res)
  }

  // 页面加载 初始化搜索 
  useEffect(() => {
    const list = getSearchList()
    if (list && list.length > 0) { // 缓存已存在 不触发初始化搜索
      return 
    }
    initSearch && dispatch({
      type: 'search/requestUsernameList',
      payload: { nickName: initVal },
      success: (list: any[]) => {
        const searchList = list.map(item => ({
          label: item[selectLabel || 'nickName'],
          value: item[selectValue || 'userId'],
        }))
        setSearchList(searchList)
      }
    }) 
  }, [])

  return <Select
    Wrap={Wrap}
    wrapProps={wrapProps}
    loading={searchLoading}
    list={getSearchList()}
    onSearch={handleSearch}
    onSelect={handleOnSelect}
    {...rest}
  />
}

export default connect(({ search, loading }: any) => ({
  search,
  searchLoading: loading.effects['search/requestUsernameList']
}))(UsernameSelect);

function retListKey(pathname?: string) {
  return pathname ? `${pathname}_usernameList` : '';
}
