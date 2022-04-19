/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Card, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { banUserByUserID, getAllCustomers } from '@/services/accounts';
import { ACCOUNTS } from '@/utils/constrains';

const AccountList = () => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };
  // const [getAllCustomersData, setGetAllCustomersData] = useState([]);

  // useEffect(() => {
  //   getAllCustomers().then((res) => {
  //     setGetAllCustomersData(res)
  //   })
  // }, [getAllCustomersData])

  const banAccountHandler = () => {
    return banUserByUserID(selectedRows[0]).then((res) => {
      if(res.status === 500) {
        message.error("Chặn người dùng thất bại")
      } else {
        message.success("Chặn người dùng thành công")
        ref.current?.reload()
      }
    });
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
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="userID"
          columns={ACCOUNTS}
          resource="User/GetAllCustomers"
          // dataSource={getAllCustomersData}
        />
      </Card>
    </PageContainer>
  );
};

export default AccountList;
