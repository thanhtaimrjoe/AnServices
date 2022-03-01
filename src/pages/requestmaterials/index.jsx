/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { REQUESTMATERIAL } from '@/utils/constrains';
import { normalizeReportForm } from '@/utils/utils';
import { denyStatusRequestMaterial } from '@/services/requestmaterials';

const RequestMaterialList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const deleteRequestServiceHandler = () => {
    return denyStatusRequestMaterial(selectedRows[0]).then(() => ref.current?.reload());
  };

  return (
    // <PageContainer content="Thông tin thuộc tính">
    <PageContainer>
      <Card bordered={false} style={{ width: '100%' }}>
        <ResoTable
          scroll={{ x: 600 }}
          // tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          //   <AsyncButton
          //     isNeedConfirm={{
          //       title: 'Xác nhận xoá',
          //       content: 'Bạn có muốn xoá thợ này không?',
          //       okText: 'Xác nhận',
          //       cancelText: 'Huỷ',
          //     }}
          //     btnProps={{ danger: true, type: 'link' }}
          //     onClick={() => deleteAccountHandler().then(onCleanSelected)}
          //     // title={`Xoá ${selectedRows.length} thợ`}
          //     title={`Xoá thợ này`}

          //   />,
          // ]}
          // toolBarRender={() => [
          //   <Button type="primary" onClick={addAccount} icon={<PlusOutlined />}>
          //     Add new workers
          //   </Button>,
          // ]}
          // rowSelection={rowSelection}
          actionRef={ref}
          rowKey="usedMaterialId"
          columns={REQUESTMATERIAL}
          resource="Material/GetAllRequestMaterial"
          // columns={columns} 
          // dataSource={data}
        />
      </Card>
    </PageContainer>
  );
};

export default RequestMaterialList;
