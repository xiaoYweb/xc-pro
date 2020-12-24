import React, { FC, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

interface SelfRangePickerProps {
  maxDateRange?: number;
  disDate?: number | string;
  Wrap: any;
  wrapProps: object; // wrapProps = { label: '商品编码', name: '', ...}
  allowClear?: boolean;
  format?: string;
  onOpenChange?: any;
  showTime?: boolean;
  // ------------------------- 默认向下传递 仅提示用
  renderExtraFooter?: any;
  onChange?: any;
  ranges?: any;
}


const SelfRangePicker: FC<SelfRangePickerProps> = props => {
  const { Wrap, wrapProps, disDate = 31, maxDateRange = 31, allowClear = false, ...rest } = props;

  const dateValidator = (_: any, date: any) => {
    // 由于选择 日期后默认 为 YYYY-MM-DD 00:00:00 所以 转化为 年月日时  区间显示 会多一天 最大区间未31天时 (12-1 00:00:00 ~ 1-1 00:00:00)刚好是 31天 但是 传递后台 默认查询 的是 12-1 00:00:00 ~ 1-1 23:59:59 所以 将 === 列入 限制范围
    if (Array.isArray(date) && date.length === 2
      && date[1].valueOf() - date[0].valueOf() >= maxDateRange * 24 * 3600 * 1000) { 
      // console.log("dateValidator -> date",
      //   (date[1].valueOf() - date[0].valueOf()) / (24 * 3600 * 1000)
      // )
      return Promise.reject(`查询时间跨度最大为 ${maxDateRange} 天`)
    }
    return Promise.resolve()
  }

  const insideConfig = {
    rules: [{ validator: dateValidator }]
  };

  Object.assign(insideConfig, {
    initialValue: [moment().subtract(Number(disDate) - 1, 'days').startOf('day'), moment().endOf('day')]
  });

  return <Wrap {...insideConfig} {...wrapProps}>
    <RangePicker
      ranges={{
        '今天': [moment().startOf('day').subtract(0, 'days'), moment().endOf('day').subtract(0, 'days')],
        '昨天': [moment().startOf('day').subtract(1, 'days'), moment().endOf('day').subtract(1, 'days')],
        '近7天': [moment().startOf('day').subtract(6, 'days'), moment().endOf('day').subtract(0, 'days')],
        '近31天': [moment().startOf('day').subtract(30, 'days'), moment().endOf('day').subtract(0, 'days')],
        '本月': [moment().startOf('month'), moment().endOf('month')],
      }}
      allowClear={allowClear}
      {...rest}
    />
  </Wrap >

}

export default SelfRangePicker;
