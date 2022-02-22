/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { deleteAccount } from '@/services/accounts';
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

  const deleteAccountHandler = () => {
    return deleteAccount(selectedRows[0]).then(() => ref.current?.reload());
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
                title: 'Confirm account deletion',
                content: 'Do you want to delete this account?',
                okText: 'Confirm',
                cancelText: 'Cancel',
              }}
              btnProps={{ danger: true, type: 'link' }}
              onClick={() => deleteAccountHandler().then(onCleanSelected)}
              title={`Delete ${selectedRows.length} account`}
            />,
          ]}
          toolBarRender={() => [
            <Button type="primary" onClick={addAccount} icon={<PlusOutlined />}>
              Add new account
            </Button>,
          ]}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="id"
          columns={ACCOUNTS}
          resource="accounts"
        />
      </Card>
    </PageContainer>
  );
};

export default AccountList;
