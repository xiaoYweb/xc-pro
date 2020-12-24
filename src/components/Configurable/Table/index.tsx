import React, { FC } from 'react';
import { Table } from 'antd';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export interface SelfTAbleProps {
  rowKey?: string;
  dataSource: any[];
  columns: any[];
  scroll?: any;
  loading?: boolean;
  pageNum?: number;
  pageSize?: number;
  total?: number;
  onChange?: any;
  [propname: string]: any;
}

export interface ColumnProps {
  title?: string;
  dataIndex?: string;
  type?: string;
  format?: string;
  fixed?: string;
  render?: any;
  width?: number | string;
  enumMap?: any;
  payload?: any[];
}


const SelfTable: FC<SelfTAbleProps> = (props) => {
  const { dataSource, rowKey, columns, pageNum, pageSize, total, loading, onChange, scroll, ...rest } = props;

  // 修复 ui组件bug 数据不超过10条默认出现 竖向滚动轴(未知原因)
  const yScroll = Array.isArray(dataSource) && dataSource.length > 10 ? { y: 500 } : null;

  return <Table
    rowKey={rowKey || 'id'}
    dataSource={dataSource}
    columns={fn(columns)}
    scroll={{ ...yScroll, ...scroll }}
    loading={loading}
    onChange={onChange}
    pagination={[pageNum, pageSize, total].every(x => typeof x !== 'undefined') ? {
      current: pageNum,
      pageSize,
      total,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: totalCount => (
        <span>
          共 {totalCount} 条记录 第 {pageNum} /
          {Math.ceil(totalCount / (pageSize as number))} 页
        </span>
      ),
    } : false}
    {...rest}
  />
}

export default SelfTable;

function fn(columns: any[], rowKey?: string) {
  return columns.map((item: any) => {
    const { type, format, width, dataIndex, enumMap, render, payload = [] } = item;``
    const res = { ...item, ellipsis: !!item.allowEtc === false };

    const nullVal = '--';

    // '' 0 false null undefined 没有自定义的 render 函数 则默认 对 值做 空值处理 '--'
    !render && Object.assign(res, {
      render(val: any) {
        if (!!val) return val;
        if (val === 0) return val;
        if (val === false) return val;
        return nullVal;
      }
    })


    if (type === 'n') {
      Object.assign(res, {
        title: '序号',
        dataIndex: dataIndex || rowKey || 'id',
        width: width || 60,
        render(...r: any[]) {
          return r[2] + 1
        }
      })
    }
    if (type === 'rate') {
      Object.assign(res, {
        render(rate: string) {
          return rate
            ? `${rate}%`
            : nullVal;
        },
      })
    }
    if (type === 'date') {
      Object.assign(res, {
        width: width || 180,
        render: (timestamp: string) => (timestamp
          ? moment(new Date(timestamp)).format(format || DATE_FORMAT)
          : nullVal)
      })
    }
    if (enumMap) {
      Object.assign(res, {
        // width: width || 120,
        render(key: string) {
          return enumMap[key] || nullVal;
        },
      })
    }
    return res
  });
}
