import React, { FC, useState } from 'react';
import { DatePicker, Select } from 'antd';

const { RangePicker } = DatePicker;

const { Option } = Select;

interface PriceValue {
  type?: string;
  date?: any[];
}

interface mapProps {
  [propname: string]: string | number;
}

interface TypeRangePickerProps {
  value?: any;
  onChange?: (value: PriceValue) => void;
  defaultType?: string;
  defaultKind?: string;
  allowClear?: boolean;
  ranges?: any;
  map: mapProps;
  hideTypeList?: any[]; // 隐藏 年月日时分秒 年月日 年月 类型
}

const TypeRangePicker: FC<TypeRangePickerProps> = (props: any) => {
  const { 
    value = {}, onChange, defaultType = 3, allowClear = false, ranges, defaultKind = 1, map, hideTypeList = [],
    ...rest 
  } = props
  const [kind, setKind] = useState(defaultKind);
  const [type, setType] = useState(defaultType);
  
  const [date, setDate] = useState([]);

  const kindList: any[] = Object.entries(map);
  const typeList = [
    { key: '1', val: '时分秒', format: '' }, // 年月日时分秒
    { key: '2', val: '年月日', format: '' }, // 年月日
    { key: '3', val: '年月', format: '' }, // 年月
    // { key: '4', val: '年', format: '' }, // 年
  ].filter(item => !hideTypeList.includes(item.key))

  const dateType: any = {
    1: 'YYYY-MM-DD HH:mm:ss', // 年月日时分秒
    2: 'YYYY-MM-DD',          // 年月日
    3: 'YYYY-MM',             // 年月
    4: 'YYYY',                // 年
  }

  const pickerMap: any = {
    3: 'month',
    4: 'year',
  }

  const selectedType = value.type || type;
  const format = dateType[selectedType];
  const selectedKind = value.kind || kind;

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange({ date, type, kind, ...value, ...changedValue });
    }
  };

  // 日期文案  选择
  const onDateKindSelect = (whichKind: any) => {
    if (!('kind' in value)) {
      setType(whichKind);
    }
    triggerChange({ kind: whichKind });
  };
  

  // 年月日 时分秒 类型选择
  const onDateTypeSelect = (whichType: any) => {
    if (!('type' in value)) {
      setKind(whichType);
    }
    triggerChange({ type: whichType });
  };

  


  // 日期区间 选择
  const onDateRangeChange = (newVal: any) => {
    if (String(selectedType) === '2') { // 年月日 
      const [start, end] = newVal;
      newVal = [start.startOf('day'), end.endOf('day')]
    }

    if (String(selectedType) === '3') { // 年月
      const [start, end] = newVal;
      newVal = [start.startOf('month').startOf('day'), end.endOf('month').endOf('day')]
    }

    if (!('date' in value)) {
      setDate(newVal);
    }
    triggerChange({ date: newVal });
  }

  

  return <div style={{ display: 'flex' }}>
    {/* 时间文案 选择 */}
    <Select
      style={{ width: 'auto', marginRight: 6 }}
      value={selectedKind}
      onChange={onDateKindSelect}
    >
      {
        map ? kindList.map(([key, val]) => (
          <Option value={key} key={key}>{val}</Option>
        )) : null
      }
    </Select>

    {/* 时间类型选择 时分秒 年月日  */}
    <Select
      style={{ width: 86, marginRight: 6 }}
      value={selectedType}
      onChange={onDateTypeSelect}
    >
      {
        typeList.map(({key, val}) => (
          <Option value={key} key={key}>{val}</Option>
        ))
      }
    </Select>


    <RangePicker
    
      showTime={String(selectedType) === '1'}
      picker={pickerMap[selectedType]}
      format={format}
      value={value.date || date}
      onChange={onDateRangeChange}
      allowClear={allowClear}
      ranges={['1', '2'].includes(String(selectedType)) ? ranges : null}
      {...rest}
    />
  </div>
}

export default TypeRangePicker;
