// import React from 'react';
import React from 'react';

import { Input, Row, Col, Image } from 'antd';
import ProForm from '@ant-design/pro-form';

const BasicStep = ({image, id, name, gender, dateOfBirth, address, workHistory, email, phone}) => {
  return (
    <div bordered={false} style={{ width: '200%', marginBottom: '4em' }}>
      <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Image
            width={150}
            src={image} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={id}
            label="id"
            initialValue={id}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name={name}
            label="Reviewer Name"
            initialValue={name}

          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      {/* <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={gender}
            label="Gender"
            initialValue={gender}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name={dateOfBirth}
            label="Date Of Birth"
            initialValue={dateOfBirth}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={address}
            label="Address"
            initialValue={address}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name={workHistory}
            label="Work History"
            initialValue={workHistory}
          >
            <Input.TextArea rows={1} readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={email}
            label="Email"
            initialValue={email}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name={phone}
            label="Phone"
            initialValue={phone}
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
