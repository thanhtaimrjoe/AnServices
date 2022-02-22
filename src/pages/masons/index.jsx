/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { MASONS } from '@/utils/constrains';
import { removeMason } from '@/services/masons';

const MasonList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentRow, setCurrentRow] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'select',
    
  };
  const addMason = () => {
    history.push(`/masons/create`);
  };

  const deleteMasonHandler = () => {
    return removeMason(selectedRows[0]).then((res) => {ref.current?.reload()
      console.log("test1", res);
    });
  };

  return (
    <PageContainer content="">
      <Card bordered={false} style={{ width: '100%' }}>
        <ResoTable
          scroll={{ x: 600 }}
          tableAlertOptionRender={({ _, __, onCleanSelected }) => [
            <AsyncButton
              isNeedConfirm={{
                title: 'Xác nhận xoá',
                content: 'Bạn có muốn xoá thợ này không?',
                okText: 'Xác nhận',
                cancelText: 'Huỷ',
              }}
              btnProps={{ danger: true, type: 'link' }}
              onClick={() => deleteMasonHandler().then(onCleanSelected)}
              title={`Xoá ${selectedRows.length} thợ`}
             />,
          ]}
          toolBarRender={() => [
            <Button type="primary" onClick={addMason} icon={<PlusOutlined />}>
              Tạo thợ mới
            </Button>,
          ]}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="userID"
          columns={MASONS}
          resource="User/GetAllMason"
        />
      </Card>
      <Drawer
        width={500}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
      </Drawer>
    </PageContainer>
  );
};

export default MasonList;
