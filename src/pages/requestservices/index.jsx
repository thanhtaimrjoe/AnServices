/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Table, Tabs } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { SERVICEREQUEST } from '@/utils/constrains';
import { cancelServiceRequest } from '@/services/requestservices';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';

const ServiceRequestList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'select',
  };

  const addServiceRequest = () => {
    // history.push(`/requeservices/create`);
    history.push(`/requestservices/list`);
  };

  const deleteServiceRequestHandler = () => {
    return cancelServiceRequest(selectedRows[0]).then(() => ref.current?.reload());
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
              resource="Service/GetAllServiceRequestStatusOrDate?serviceRequestStatus=2"
            />
          </TabPane>
          <TabPane tab="Yêu cầu đang xử lý" key="3">
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
          <TabPane tab="Yêu cầu đã từ chối" key="5">
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
          <TabPane tab="Yêu cầu chờ xác nhận" key="6">
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
              resource="Service/GetAllServiceRequestStatusOrDate?serviceRequestStatus=9"
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
