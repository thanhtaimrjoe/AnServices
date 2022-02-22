// import React from 'react';
import React, { useEffect } from 'react';

import { Input, Row, Col } from 'antd';
import ProForm from '@ant-design/pro-form';

const BasicStep = ({reviewerId, campaignId}) => {
  return (
    <div bordered={false} style={{ width: '200%', marginBottom: '4em' }}>
      <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="id"
            label="Campaign apply ID"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="applyDate"
            label="Apply Date"
          >
            <Input readOnly/>
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={reviewerId}
            label="Reviewer"
            initialValue={reviewerId}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name={campaignId}
            label="Campaign"
            initialValue={campaignId}
          >
            <Input.TextArea rows={1} readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      </div>
    </div>
  );
};
export default BasicStep;
