/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { REQUESTSERVICE } from '@/utils/constrains';
import { cancelRequestService } from '@/services/requestservices';

const RequestServiceList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'select',
  };

  const addRequestService = () => {
    // history.push(`/requeservices/create`);
    history.push(`/requestservices/list`);

  };

  const deleteRequestServiceHandler = () => {
    return cancelRequestService(selectedRows[0]).then(() => ref.current?.reload());
  };

  return (
    <PageContainer>
      <Card bordered={false} style={{ width: '100%' }}>
        <ResoTable
          // searchButton={false}
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
              onClick={() => deleteRequestServiceHandler().then(onCleanSelected)}
              title={`Xoá ${selectedRows.length} yêu cầu`}
            />,
          ]}
          // toolBarRender={() => [
          //   <Button type="primary" onClick={addRequestService} icon={<PlusOutlined />}>
          //   {/* <Button type="primary" icon={<PlusOutlined />}> */}
          //     Tạo mới yêu cầu cho khách
          //   </Button>,
          // ]}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="requestServiceId"
          columns={REQUESTSERVICE}
          resource="Service/GetAllRequestServiceStatusOrDate"
        />
      </Card>
    </PageContainer>
  );
};

export default RequestServiceList;
