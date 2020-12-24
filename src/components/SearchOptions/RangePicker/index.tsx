import React, { FC } from 'react';
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
  rangeType?: string;
  // ------------------------- 默认向下传递 仅提示用
  renderExtraFooter?: any;
  onChange?: any;
  ranges?:any;
}


const SelfRangePicker: FC<SelfRangePickerProps> = props => {
  const { Wrap, wrapProps, disDate = 31, maxDateRange = 31, allowClear = false, rangeType = '2', ...rest } = props;

  const dateValidator = (_: any, date: any) => {
    if (Array.isArray(date) && date.length === 2
      && date[1].valueOf() - date[0].valueOf() - 100 > maxDateRange * 24 * 3600 * 1000) { // 处理 0.1s 误差
      console.log("dateValidator -> date",
        date[1].valueOf() - date[0].valueOf(),
        moment().valueOf() - moment().subtract(disDate, 'days').valueOf(),
        30 * 24 * 3600 * 1000
      )
      return Promise.reject(`查询时间跨度最大为 ${maxDateRange} 天`)
    }
    return Promise.resolve()
  }

  const insideConfig = {
    rules: [{ validator: dateValidator }]
  };

  Object.assign(insideConfig, {
    initialValue: rangeType === '1'
      ? [moment().subtract(disDate, 'days'), moment()]
      : [moment().subtract(Number(disDate) - 1, 'days').startOf('day'), moment().endOf('day')],
  });
  return <Wrap {...insideConfig} {...wrapProps}>
    <RangePicker {...rest} allowClear={allowClear} />
  </Wrap >
}

export default SelfRangePicker;
