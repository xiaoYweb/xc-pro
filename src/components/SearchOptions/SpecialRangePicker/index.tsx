import React, { FC } from 'react';
import SpecialRangePicker from '@/components/Customize/SpecialRangePicker';
import moment from 'moment';

interface mapProps {
  [propname: string]: string | number;
}
interface SpecialRangePickerProps {
  value?: any;
  onChange?: any;
  allowClear?: boolean;
  Wrap?: any;
  wrapProps?: any;
  disDate?: number;
  maxDateRange?: number;
  type?: string;
  kind?: string;
  // -----------------
  ranges?: any;
  map: mapProps;
  hideTypeList?: any[]; // 隐藏 年月日时分秒 年月日 年月 类型
  initialValue?: any; 
}

const SpecialRangePickerOption: FC<SpecialRangePickerProps> = props => {
  const {
    value = {}, onChange, allowClear = false, map,
    Wrap, wrapProps, disDate = 31, maxDateRange = 31, kind = '1', type = '3', ...rest
  } = props;

  const initialValue = {
    kind,
    type,
    date: [moment().subtract(disDate - 1, 'days').startOf('day'), moment().endOf('day')]
  }

  const dateValidator = (_: any, value: any) => {
    const { date } = value || {};
    if (Array.isArray(date) && date.length === 2
      && date[1].valueOf() - date[0].valueOf() - 100 > maxDateRange * 24 * 3600 * 1000) { // 处理 0.1s 误差
      return Promise.reject(`查询时间跨度最大为 ${maxDateRange} 天`)
    }
    return Promise.resolve()
  }

  return <Wrap
    name="specialRangePicker"
    labelCol={{ span: 0 }}
    wrapperCol={{ span: 24 }}
    initialValue={initialValue}
    rules={[{ validator: dateValidator }]}
    {...wrapProps}
  >
    <SpecialRangePicker
      value={value}
      onChange={onChange}
      allowClear={allowClear}
      map={map}
      ranges={{
        '今天': [moment().startOf('day').subtract(0, 'days'), moment().endOf('day').subtract(0, 'days')],
        '昨天': [moment().startOf('day').subtract(1, 'days'), moment().endOf('day').subtract(1, 'days')],
        '近7天': [moment().startOf('day').subtract(6, 'days'), moment().endOf('day').subtract(0, 'days')],
        '近31天': [moment().startOf('day').subtract(30, 'days'), moment().endOf('day').subtract(0, 'days')],
        '本月': [moment().startOf('month'), moment().endOf('day')],
      }}
      {...rest}
    />
  </Wrap>
}

export default SpecialRangePickerOption;
