/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { CAMPAIGN } from '@/utils/constrains';
import { deleteCampaign } from '@/services/campaigns';

const CampaignList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };
  const addCampaign = () => {
    history.push(`/campaigns/create`);
  };

  const deleteCampaignHandler = () => {
    return deleteCampaign(selectedRows[0]).then(() => ref.current?.reload());
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
                title: 'Confirm campaign deletion',
                content: 'Do you want to delete this campaign?',
                okText: 'Confirm',
                cancelText: 'Cancel',
              }}
              btnProps={{ danger: true, type: 'link' }}
              onClick={() => deleteCampaignHandler().then(onCleanSelected)}
              title={`Delete ${selectedRows.length} campaign`}
            />,
          ]}
          toolBarRender={() => [
            <Button type="primary" onClick={addCampaign} icon={<PlusOutlined />}>
              Add new campaign
            </Button>,
          ]}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="id"
          columns={CAMPAIGN}
          resource="campaigns"
        />
      </Card>
    </PageContainer>
  );
};

export default CampaignList;
