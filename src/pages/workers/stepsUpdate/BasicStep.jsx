// import React from 'react';
import CommonSelect from '@/components/CommonSelect/CommonSelect';
import ProForm from '@ant-design/pro-form';
import { Col, Input, Row } from 'antd';
import React from 'react';

const BasicStep = ({ typeJobId }) => {
  return (
    <div bordered={false} style={{ width: '200%', marginBottom: '4em' }}>
      <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="fullName"
            label="Tên thợ"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Vui lòng nhập tên thợ',
              },
            ]}
          >
            <Input placeholder='Nhập tên thợ'/>
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
                message: "Vui lòng nhập sđt với 10 chữ số"
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
            name="address"
            label="Địa chỉ"
          >
            <Input placeholder='Nhập địa chỉ'/>
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="email"
            label="Email"
          >
            <Input placeholder="Nhập email nếu có" />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={typeJobId}
            initialValue={typeJobId}
            label="Nhóm thợ"
            rules={[
              {
                pattern: /^[0-9]*$/,
                type: 'integer',
                message: "Chỉ được chọn trên thanh chọn"
              }
            ]}
          >
            <CommonSelect.SelectWorkerByTypeJob />
          </ProForm.Item>
        </Col>
        {/* <Col span={12}>
          <ProForm.Item
            name="typeJobId"
            label="Nhóm thợ"
            rules={[
              {
                pattern: /^[0-9]*$/,
                type: 'integer',
                message: "Chỉ được chọn trên thanh chọn"
              }
            ]}
          >
            <CommonSelect.SelectWorkerByTypeJob />
          </ProForm.Item>
        </Col> */}
      </Row>
      </div>
    </div>
  );
};
export default BasicStep;
