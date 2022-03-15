/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { banUserByUserID, deleteAccount } from '@/services/accounts';
import { ACCOUNTS } from '@/utils/constrains';

const AccountList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };
  const addAccount = () => {
    history.push(`/accounts/create`);
  };

  const banAccountHandler = () => {
    return banUserByUserID(selectedRows[0]).then(() => ref.current?.reload());
  };

  return (
    <PageContainer>
      <Card bordered={false} style={{ width: '100%' }}>
        <ResoTable
          scroll={{ x: 600 }}
          tableAlertOptionRender={({ _, __, onCleanSelected }) => [
            <AsyncButton
              isNeedConfirm={{
                title: 'Xác nhận chặn khách hàng',
                content: 'Bạn có muốn chặn khách hàng này không',
                okText: 'Xác nhận',
                cancelText: 'Huỷ',
              }}
              btnProps={{ danger: true, type: 'link' }}
              onClick={() => banAccountHandler().then(onCleanSelected)}
              title={`Chặn khách hàng này`}
            />,
          ]}
          toolBarRender={() => [
            <Button type="primary" onClick={addAccount} icon={<PlusOutlined />}>
              Tạo tài khoản mới cho khách
            </Button>,
          ]}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="userID"
          columns={ACCOUNTS}
          resource="User/GetAllCustomers"
        />
      </Card>
    </PageContainer>
  );
};

export default AccountList;
