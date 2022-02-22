// import React from 'react';
import React from 'react';

import { Input, Row, Col } from 'antd';
import ProForm from '@ant-design/pro-form';

const BasicStep = () => {
  return (
    <div bordered={false} style={{ width: '200%', marginBottom: '4em' }}>
      <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="id"
            label="Post ID"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="title"
            label="Title"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
          <ProForm.Item
            name="url"
            label="Link Post"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="applyDate"
            label="Apply Date"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      {/* <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="comfirmDate"
            label="Comfirm Date"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row> */}
      </div>
    </div>
  );
};
export default BasicStep;
