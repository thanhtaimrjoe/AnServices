/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { deleteBrand } from '@/services/brands';
import { BRAND } from '@/utils/constrains';

const BrandList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };
  const addBrand = () => {
    history.push(`/brands/create`);
  };

  const deleteBrandHandler = () => {
    return deleteBrand(selectedRows[0]).then(() => ref.current?.reload());
  };

  return (
    // <PageContainer content="Thông tin thuộc tính">
    <PageContainer>
      <Card bordered={false} style={{ width: '100%' }}>
        <ResoTable
          scroll={{ x: 600 }}
          tableAlertOptionRender={({ _, __, onCleanSelected }) => [
            <AsyncButton
              isNeedConfirm={{
                title: 'Confirm brand deletion',
                content: 'Do you want to delete this brand?',
                okText: 'Confirm',
                cancelText: 'Cancel',
              }}
              btnProps={{ danger: true, type: 'link' }}
              onClick={() => deleteBrandHandler().then(onCleanSelected)}
              title={`Delete ${selectedRows.length} brand`}
            />,
          ]}
          toolBarRender={() => [
            <Button type="primary" onClick={addBrand} icon={<PlusOutlined />}>
              Add new brand
            </Button>,
          ]}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="id"
          columns={BRAND}
          resource="brands"
        />
      </Card>
    </PageContainer>
  );
};

export default BrandList;
