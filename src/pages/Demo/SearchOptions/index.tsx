import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Popconfirm,
} from 'antd';
import SelfTable, { ColumnProps } from '@/components/Configurable/Table';
import SelfInput from '@/components/SearchOptions/Input';
import SelfSelect from '@/components/SearchOptions/Select';
import RangePicker from '@/components/SearchOptions/RangePicker';
import { connect, Link } from 'umi';

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
// 系统配置 / 公司管理
const Temp = (props: any) => {
  const [updateCount, setUpdateCount] = useState(0);
  const [form] = Form.useForm();
  const { getFieldsValue, setFieldsValue, resetFields, validateFields } = form;
  const {
    list = [],
    total,
    pageNum,
    pageSize,
    dispatch,
    tableLoading,
    formData,
    location: { pathname },
  } = props;



  const columns: ColumnProps[] = [
    { title: '序号', dataIndex: 'id', type: 'n', width: '5%' },
    { title: 'XX名称', dataIndex: 'key1' },
    { title: 'XX类型', dataIndex: 'type', enumMap: testMap },
    { title: 'XX编号', dataIndex: 'key3', },
    { title: '创建时间', dataIndex: 'gmtCreate', type: 'date' },
    { title: '创建人', dataIndex: 'creator' },
    {
      title: '操作',
      fixed: 'right',
      width: 160,
      render({ id }: any) {
        const detailUrl = '/home'
        return (
          <div className="operate-area">
            <Popconfirm title="确认删除" onConfirm={() => handleDelete(id)}>
              <a> 删除 </a>
            </Popconfirm>
            <Popconfirm title="确认作废" onConfirm={() => handleDelete(id)} disabled={String(status) !== '1'}>
              <Button size="small" type="link" style={{ padding: 0 }} disabled={String(status) !== '1'}>
                作废
              </Button>
            </Popconfirm>
            <Link to={detailUrl}>
              <Button size="small" type="link">
                详情
              </Button>
            </Link>
            <Button size="small" type="link" style={{ padding: 0 }} onClick={() => handleDelete(id)}> 导出 </Button>
          </div>
        );
      },
    },
  ];

  // 搜索 设置 pageNum 为 1 重新请求 列表
  const handleSearch = () => {
    pageNum === 1
      ? setUpdateCount(n => n + 1)
      : dispatch({
        type: 'temp/updateState',
        payload: {
          pageNum: 1,
        },
      });
  };

  // 重置
  const handleReset = () => {
    resetFields();
    handleSearch();
  };

  // 页码跳转
  const handlePageChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'temp/updateState',
      payload: {
        pageNum: current,
        pageSize,
      },
    });
  };


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
        const { date, ...rest } = options;
        const payload = {
          ...rest,
          pageNum,
          pageSize,
        };

        Array.isArray(date) && date.length > 0 && Object.assign(payload, {
          startCreateTime: date[0].format(DATE_FORMAT),
          endCreateTime: date[1].format(DATE_FORMAT),
        })

        dispatch({
          type: 'temp/requestGetList',
          payload,
        });
      })
      .catch(() => { });
  }, [pageNum, pageSize, updateCount]);

  // const rowSelection = {
  //   selectedRowKeys: selectedKeys,
  //   onChange: setSelectedKeys,
  // };

  // 删除 
  const handleDelete = (id: string) => {

  }

  const handleBtnClick = () => {

  }

  return <>
    <Form {...FormStyle} className="mb-20" form={form}>
      <Row>
        <Col span={20}>
          <Row>
            <Col span={6}>
              <SelfInput Wrap={FormItem} wrapProps={{
                label: 'XX名称', name: 'key1'
              }} />
            </Col>
            <Col span={6}>
              <SelfSelect Wrap={FormItem} wrapProps={{
                label: 'XX类型', name: 'type'
              }} map={testMap} />
            </Col>
            <Col span={6}>
              <SelfInput Wrap={FormItem} wrapProps={{
                label: 'XX编号', name: 'key2'
              }} />
            </Col>

            <Col span={12}>
              <RangePicker Wrap={FormItem} wrapProps={{
                label: '创建时间', name: 'date', labelCol: { span: 4 }
              }} disDate={30} maxDateRange={365} />
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <div className="search-btn-area">
            <Button type="primary" onClick={handleSearch}>
              查询
              </Button>
            <Button onClick={handleReset}>重置</Button>
          </div>
        </Col>
      </Row>
      <div className="btn-area">
        <div>
          <Button type="primary" onClick={handleBtnClick}>操作</Button>
        </div>
        <div>
          <Button type="primary" onClick={handleBtnClick}>导出</Button>
        </div>
      </div>
    </Form>

    <SelfTable
      rowKey="id"
      dataSource={list}
      columns={columns}
      loading={tableLoading}
      onChange={handlePageChange}
      // rowSelection={rowSelection}
      pageNum={pageNum}
      pageSize={pageSize}
      total={total}
    // scroll={{ x: 1200 }}
    />

  </>
}

export default connect(({ loading, temp }: any) => ({
  tableLoading: loading.effects['temp/requestGetList'],
  ...temp,
}))(Temp);
