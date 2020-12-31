import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
} from 'antd';
import { connect, Link } from 'umi';
import moment from 'moment';
import SelfInput from '@/components/SearchOptions/Input';
import SelfSelect from '@/components/SearchOptions/Select';
import SpecialRangePicker from '@/components/SearchOptions/SpecialRangePicker';


const FormItem = Form.Item;
const FormStyle = {
  labelCol: { span: 8 },
  // wrapperCol: { span: 20 },
};
const DATE_FORMAT = 'YYYY-MM-DD';
export const testMap = { // 公司类型
  1: '自营',
  2: '供应商',
}
const timeType = {
  1: '创建时间', // create_time
  2: '交易时间', // receipt_time
  3: '支付时间', // pay_time
  4: '结算时间', // settlement_time
}

// 系统配置 / 公司管理
const Temp = (props: any) => {
  const [updateCount, setUpdateCount] = useState(0);
  const [form] = Form.useForm();
  const { getFieldsValue, setFieldsValue, resetFields, validateFields } = form;
  const {
    dispatch,
    formData,
  } = props;





  // 缓存 formData 数据
  useEffect(() => {
    setFieldsValue(formData);
    return () => {
      const formData = getFieldsValue();
      formData &&
        dispatch({
          type: 'temp/updateState',
          payload: {
            formData,
          },
        });
    };
  }, []);

  // 获取列表数据
  useEffect(() => {
    validateFields()
      .then(options => {
        const { specialDate, ...rest } = options;
        const { kind, date } = specialDate || {}
        const payload = {
          type: kind,
          ...rest,
        };

        Array.isArray(date) && date.length > 0 && Object.assign(payload, {
          startCreateTime: date[0].format(DATE_FORMAT),
          endCreateTime: date[1].format(DATE_FORMAT),
        })
        console.log('payload --> ', payload)
      })
      .catch(() => { });
  }, [updateCount]);


  const handleBtnClick = () => {

  }

  const handleSearch = () => {
    setUpdateCount(c => c + 1)
  }

  return <>
    <Form {...FormStyle} className="mb-20" form={form}>
      <Row>
        <Col span={20}>
          <Row>
            <Col span={6}>
              <SelfInput Wrap={FormItem} wrapProps={{
                label: '输入框', name: 'key1'
              }} />
            </Col>
            <Col span={6}>
              <SelfSelect Wrap={FormItem} wrapProps={{
                label: '选择框', name: 'type'
              }} map={testMap} />
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={12}>
              <SpecialRangePicker Wrap={FormItem} wrapProps={{
                name: 'specialDate',
                initialValue: {
                  kind: '1',
                  type: '2',
                  date: [moment().startOf('month'), moment().endOf('day')]
                },
              }} map={timeType} 
                // kind="1" type="2" disDate={16} 
                maxDateRange={31} hideTypeList={[]}
              />
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <div className="search-btn-area">
            <Button type="primary" onClick={handleSearch}>查询</Button>
          </div>
        </Col>
      </Row>
    </Form>

  </>
}

export default connect(({ loading, temp }: any) => ({
  tableLoading: loading.effects['temp/requestGetList'],
  ...temp,
}))(Temp);
