/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { CAMPAIGNAPPLY } from '@/utils/constrains';
import { deleteCampaignApplies } from '@/services/campaignapplies';
import './index.css';
// import './index.less';

const CampaignList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };
  const addCampaignApply = () => {
    history.push(`/campaignapplies/create`);
  };

  const deleteCampaignApplyHandler = () => {
    return deleteCampaignApplies(selectedRows[0]).then(() => ref.current?.reload());
  };

  return (
    <PageContainer>
      <Card bordered={false} style={{ width: '100%' }}>
        <ResoTable
          scroll={{ x: 600 }}
          // tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          //   <AsyncButton
          //     isNeedConfirm={{
          //       title: 'Confirm campaign apply deletion',
          //       content: 'Do you want to delete this campaign apply?',
          //       okText: 'Confirm',
          //       cancelText: 'Cancel',
          //     }}
          //     btnProps={{ danger: true, type: 'link' }}
          //     onClick={() => deleteCampaignApplyHandler().then(onCleanSelected)}
          //     title={`Reject ${selectedRows.length} campaign apply`}
          //   />,
          // ]}
                    // className="table-layout"
                    // // columns={this.state.columns}
                    // // dataSource={filteredData}
                    // rowClassName='data-row'
                    // bordered={true}
                    // size={"small"}
                    // onRowDoubleClick={ (record, index, event) => this.handleEditModal(record) }
                    // onRowClick={(record, index, event) => this.handleRowClick(record)}
                    // loading={this.state.loading}
                    // pagination={{ pageSize: 14 }}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="id"
          columns={CAMPAIGNAPPLY}
          resource="campaign-applies"
        />
      </Card>
    </PageContainer>
  );
};

export default CampaignList;
