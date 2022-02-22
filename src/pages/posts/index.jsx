/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { POST } from '@/utils/constrains';
import { deletePost } from '@/services/posts';

const BrandList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };
  const addPost = () => {
    history.push(`/posts/create`);
  };

  const deletePostHandler = () => {
    return deletePost(selectedRows[0]).then(() => ref.current?.reload());
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
          //       title: 'Confirm post deletion',
          //       content: 'Do you want to delete this post?',
          //       okText: 'Confirm',
          //       cancelText: 'Cancel',
          //     }}
          //     btnProps={{ danger: true, type: 'link' }}
          //     onClick={() => deletePostHandler().then(onCleanSelected)}
          //     title={`Delete ${selectedRows.length} post`}
          //   />,
          // ]}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="id"
          columns={POST}
          resource="posts"
        />
      </Card>
    </PageContainer>
  );
};

export default BrandList;
