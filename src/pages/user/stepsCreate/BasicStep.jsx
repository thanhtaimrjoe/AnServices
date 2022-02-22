import React from 'react';

// import CommonSelect from '@/components/CommonSelect/CommonSelect';
import { Input, Row, Col } from 'antd';
// import { buildCategoriesOption } from '@/components/CommonSelect/utils';
import ProForm from '@ant-design/pro-form';

const BasicStep = () => {
  return (
    <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input username',
              },
            ]}
          >
            <Input placeholder="Input username" />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input password',
              },
            ]}
          >
            <Input.Password placeholder="Input password" />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="password"
            label="Confirm Password"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input password',
              },
            ]}
          >
            <Input.Password placeholder="Input password" />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="email"
            label="Email"
            rules={[
              {
                required: false,
                type: 'string',
                message: 'Please input email',
              },
            ]}
          >
            <Input placeholder="Input email" />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: false,
                type: 'string',
                message: 'Please input phone',
              },
            ]}
          >
            <Input placeholder="Input phone" />
          </ProForm.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicStep;
