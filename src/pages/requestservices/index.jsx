/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Card, DatePicker, message, notification, Space, Table, Tabs } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
// import { SERVICEREQUEST } from '@/utils/constrains';
import { removeListServiceRequest, getAllServiceRequestStatusOrDate } from '@/services/requestservices';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import moment from 'moment';
import { Link } from 'umi';
import { SelectRequestServiceStatus } from '@/components/CommonSelect/CommonSelect';


const ServiceRequestList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'select',
  };
  // const [getAllServiceRequestStatusOrDateData, setGetAllServiceRequestStatusOrDateData] = useState([]);


  // useEffect(() => {
  //   getAllServiceRequestStatusOrDate().then((res) => {
  //     setGetAllServiceRequestStatusOrDateData(res)
  //   })
  // }, [getAllServiceRequestStatusOrDateData])

  const [getDateString, setGetDateString] = useState();


  function onChange(date, dateString) {
    console.log('firstdate', date);
    console.log('firstdateString', dateString);
    setGetDateString(dateString)
  }

  // SERVICE REQUEST
const SERVICEREQUEST = [
  {
    title: 'STT',
    dataIndex: 'index',
    search: false,
    render: (text, object, index) => {
      return <div>{index + 1}</div>;
    },
  },
  {
    title: 'Mã dịch vụ',
    dataIndex: 'serviceRequestId',
    // key: 'serviceRequestId',
    show: false,
    search: false,
  },
  {
    title: 'Yêu cầu',
    dataIndex: 'serviceRequestDescription',
    key: 'serviceRequestDescription',
    search: false,
    render: (text, record) => {
      return (
        <Link to={{ pathname: `/requestservices/detail`, state: record }}>
          {record.serviceRequestDescription}
        </Link>
      );
    },
  },
  {
    title: 'Ngày nhận',
    dataIndex: 'serviceRequestCreateDate',
    key: 'serviceRequestCreateDate',
    // search: false,
    // render: (_, { requestServiceCreateDate }) => <p>{requestServiceCreateDate ?? '-'}</p>,
    render: (text, record) => {
      return <div>{moment(record.serviceRequestCreateDate).format('D/M/Y')}</div>;
    },
    // renderFormItem: (item, props) => {
    //   return <SelectRequestServiceDate {...props} />;
    // }

    renderFormItem: (item, props) => {
      return (
        <DatePicker
          style={{ width: '100%' }}
          placeholder="Vui lòng chọn ngày gửi yêu cầu"
          // format={'DD/MM/YYYY'}
          // defaultValue={moment('00:00:00', 'HH:mm:ss')}
          onChange={onChange}
        />
      );
    },
  },
  {
    title: 'Gói',
    dataIndex: 'serviceRequestPackage',
    key: 'serviceRequestPackage',
    // show: false,
    search: false,
    tip: 'Gói 1: Chỉ thuê nhân công, vật tư có sẵn - Gói 2: Thuê cả nhân công và vật tư',
    valueEnum: {
      1: {
        text: 'Gói 1',
      },
      2: {
        text: 'Gói 2',
      },
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'serviceRequestStatus',
    key: 'serviceRequestStatus',
    valueEnum: {
      2: {
        text: 'Chưa xử lý',
        status: 'Default',
      },
      15: {
        text: 'Đã khảo sát',
        color: 'geekblue',
      },
      3: {
        text: 'Đã đồng ý',
        color: 'lime',
      },
      6: {
        text: 'Đang xử lý',
        status: 'Processing',
      },
      17: {
        text: 'Chờ gửi hoá đơn',
        color: 'yellow',
      },
      14: {
        text: 'Chờ thanh toán',
        status: 'Warning',
      },
      13: {
        text: 'Đã hoàn thành',
        status: 'Success',
      },
      1: {
        text: 'Đã từ chối',
        status: 'Error',
      },
      8: {
        text: 'KH đã huỷ',
        status: 'Error',
      },
    },
    renderFormItem: (item, props) => {
      return <SelectRequestServiceStatus {...props} />;
    },
  },
  {
    title: 'Hành động',
    search: false,
    render: (text, record) => {
      const updateRequestServiceState = { ...record };
      return (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <a>
            <Link to={{ pathname: `/requestservices/detail`, state: updateRequestServiceState }}>
              Chi tiết
            </Link>
          </a>
        </Space>
      );
    },
  },
];

  const deleteServiceRequestHandler = () => {
    return removeListServiceRequest(selectedRows).then(() => {ref.current?.reload(); 
      notification.success({
        description: `Đã xoá yêu cầu thành công`,
        message: 'Thành công',
      });
    });
  };

  return (
    <PageContainer>
      <Card bordered={false} style={{ width: '100%' }}>
         <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Tất cả yêu cầu" key="1">
            <ResoTable
              searchButton={false}
              scroll={{ x: 600 }}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xoá',
                    content: 'Bạn có muốn xoá yêu cầu này không?',
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
                  title={`Xoá ${selectedRows.length} yêu cầu`}
                />,
              ]}
              rowSelection={rowSelection}
              actionRef={ref}
              rowKey="serviceRequestId"
              columns={SERVICEREQUEST}
              resource="Service/GetAllServiceRequestStatusOrDate"
              // dataSource={getAllServiceRequestStatusOrDateData}

            />
          </TabPane>
          <TabPane tab="Yêu cầu chưa xử lý" key="2">
            <ResoTable
              toolBarRender={false}
              search={false}
              scroll={{ x: 600 }}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xoá',
                    content: 'Bạn có muốn xoá yêu cầu này không?',
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
                  title={`Xoá ${selectedRows.length} yêu cầu`}
                />,
              ]}
              rowSelection={rowSelection}
              actionRef={ref}
              rowKey="serviceRequestId"
              columns={SERVICEREQUEST}
              resource="Service/GetAllServiceRequestStatusOrDate?ServiceRequestStatus=2"
            />
          </TabPane>
          <TabPane tab="Yêu cầu đã kháo sát" key="3">
            <ResoTable
              toolBarRender={false}
              search={false}
              scroll={{ x: 600 }}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xoá',
                    content: 'Bạn có muốn xoá yêu cầu này không?',
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
                  title={`Xoá ${selectedRows.length} yêu cầu`}
                />,
              ]}
              rowSelection={rowSelection}
              actionRef={ref}
              rowKey="serviceRequestId"
              columns={SERVICEREQUEST}
              resource="Service/GetAllServiceRequestStatusOrDate?serviceRequestStatus=15"
            />
          </TabPane>
          <TabPane tab="Yêu cầu đã đồng ý" key="4">
          <ResoTable
              toolBarRender={false}
              search={false}
              scroll={{ x: 600 }}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xoá',
                    content: 'Bạn có muốn xoá yêu cầu này không?',
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
                  title={`Xoá ${selectedRows.length} yêu cầu`}
                />,
              ]}
              rowSelection={rowSelection}
              actionRef={ref}
              rowKey="serviceRequestId"
              columns={SERVICEREQUEST}
              resource="Service/GetAllServiceRequestStatusOrDate?serviceRequestStatus=3"
            />
          </TabPane>
          <TabPane tab="Yêu cầu đang xử lý" key="5">
          <ResoTable
              toolBarRender={false}
              search={false}
              scroll={{ x: 600 }}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xoá',
                    content: 'Bạn có muốn xoá yêu cầu này không?',
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
                  title={`Xoá ${selectedRows.length} yêu cầu`}
                />,
              ]}
              rowSelection={rowSelection}
              actionRef={ref}
              rowKey="serviceRequestId"
              columns={SERVICEREQUEST}
              resource="Service/GetAllServiceRequestStatusOrDate?serviceRequestStatus=6"
            />
          </TabPane>
          <TabPane tab="Yêu cầu đang chờ gửi hoá đơn" key="6">
          <ResoTable
              toolBarRender={false}
              search={false}
              scroll={{ x: 600 }}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xoá',
                    content: 'Bạn có muốn xoá yêu cầu này không?',
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
                  title={`Xoá ${selectedRows.length} yêu cầu`}
                />,
              ]}
              rowSelection={rowSelection}
              actionRef={ref}
              rowKey="serviceRequestId"
              columns={SERVICEREQUEST}
              resource="Service/GetAllServiceRequestStatusOrDate?serviceRequestStatus=17"
            />
          </TabPane>
          <TabPane tab="Yêu cầu chờ KH thanh toán" key="7">
            <ResoTable
              toolBarRender={false}
              search={false}
              scroll={{ x: 600 }}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xoá',
                    content: 'Bạn có muốn xoá yêu cầu này không?',
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
                  title={`Xoá ${selectedRows.length} yêu cầu`}
                />,
              ]}
              rowSelection={rowSelection}
              actionRef={ref}
              rowKey="serviceRequestId"
              columns={SERVICEREQUEST}
              resource="Service/GetAllServiceRequestStatusOrDate?serviceRequestStatus=14"
            />
          </TabPane>
          <TabPane tab="Yêu cầu đã hoàn thành" key="8">
            <ResoTable
              toolBarRender={false}
              search={false}
              scroll={{ x: 600 }}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xoá',
                    content: 'Bạn có muốn xoá yêu cầu này không?',
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
                  title={`Xoá ${selectedRows.length} yêu cầu`}
                />,
              ]}
              rowSelection={rowSelection}
              actionRef={ref}
              rowKey="serviceRequestId"
              columns={SERVICEREQUEST}
              resource="Service/GetAllServiceRequestStatusOrDate?serviceRequestStatus=13"
            />
          </TabPane>
          <TabPane tab="Yêu cầu đã từ chối" key="9">
            <ResoTable
              toolBarRender={false}
              search={false}
              scroll={{ x: 600 }}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xoá',
                    content: 'Bạn có muốn xoá yêu cầu này không?',
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
                  title={`Xoá ${selectedRows.length} yêu cầu`}
                />,
              ]}
              rowSelection={rowSelection}
              actionRef={ref}
              rowKey="serviceRequestId"
              columns={SERVICEREQUEST}
              resource="Service/GetAllServiceRequestStatusOrDate?serviceRequestStatus=1"
            />
          </TabPane>
        </Tabs>
         {/* <ResoTable 
          // search={false}
          scroll={{ x: 600 }}
          tableAlertOptionRender={({ _, __, onCleanSelected }) => [
            <AsyncButton
              isNeedConfirm={{
                title: 'Xác nhận xoá',
                content: 'Bạn có muốn xoá yêu cầu này không?',
                okText: 'Xác nhận',
                cancelText: 'Huỷ',
              }}
              btnProps={{ danger: true, type: 'link' }}
              onClick={() => deleteServiceRequestHandler().then(onCleanSelected)}
              title={`Xoá ${selectedRows.length} yêu cầu`}
            />,
          ]}
                    // toolBarRender={() => [
                    //   <Button type="primary" onClick={addServiceRequest} icon={<PlusOutlined />}>
                    //   <Button type="primary" icon={<PlusOutlined />}>
                    //     Tạo mới yêu cầu cho khách
                    //   </Button>,
                    // ]}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="serviceRequestId"
          columns={SERVICEREQUEST}
          resource="Service/GetAllServiceRequestStatusOrDate"
        /> */}
      </Card>
    </PageContainer>
  );
};

export default ServiceRequestList;
