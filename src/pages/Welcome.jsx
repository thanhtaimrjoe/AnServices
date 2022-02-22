import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';

export default () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Text strong>
          Xin chào, {localStorage.getItem('USERNAME')}. <SmileTwoTone />
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
