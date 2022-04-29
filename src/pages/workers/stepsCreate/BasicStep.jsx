import React from 'react';

// import CommonSelect from '@/components/CommonSelect/CommonSelect';
import { Input, Row, Col } from 'antd';
import ProForm from '@ant-design/pro-form';
import CommonSelect from '@/components/CommonSelect/CommonSelect';

const BasicStep = () => {
  return (
    <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="fullName"
            label="Tên đầy đủ"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Vui lòng nhập tên đầy đủ',
              },
            ]}
          >
            <Input placeholder="Nhập tên đầy đủ" />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Vui lòng nhập đúng số điện thoại 10 số"
              }
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
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
                // required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email sai định dạng"
              }
            ]}
          >
            <Input placeholder="Nhập email" defaultValue="@gmail.com"/>
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="address"
            label="Địa chỉ"
          >
            <Input placeholder="Nhập địa chỉ" />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
          <ProForm.Item
            name="typeJobId"
            label="Nhóm thợ"
            rules={[
              {
                required: true,
                type: 'integer',
                message: 'Vui lòng chọn nghề của thợ',
              },
            ]}
          >
            <CommonSelect.SelectWorkerByTypeJob />
          </ProForm.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicStep;
