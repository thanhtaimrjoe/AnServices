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
            <Input placeholder="Input password" />
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
                required: true,
                type: 'string',
                message: 'Please input phone',
              },
              {
                pattern: '^[0-9]*$',
                type: 'integer',
                message: "Only number"
              }
              
            ]}
          >
            <Input placeholder="Input phone" />
            {/* <CommonSelect.SelectCategoryID
              buildOptions={buildCategoriesOption}
              placeholder="Chọn ID danh mục thuộc tính báo cáo"
            /> */}
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input email',
              },
            ]}
          >
            <Input placeholder="Input email" />
          </ProForm.Item>
        </Col>
      </Row>
      </div>
    </div>
  );
};
export default BasicStep;
