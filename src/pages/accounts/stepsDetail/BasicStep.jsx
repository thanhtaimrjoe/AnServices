// import React from 'react';
import React from 'react';

import { Input, Row, Col } from 'antd';
import ProForm from '@ant-design/pro-form';
import CommonSelect from '@/components/CommonSelect/CommonSelect';

const BasicStep = ({ createDate, status }) => {
  return (
    <div bordered={false} style={{ width: '200%', marginBottom: '4em' }}>
      <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="fullName"
            label="Tên khách hàng"
          >
            <Input readOnly placeholder='Không có'/>
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="phoneNumber"
            label="Số điện thoại"
          >
            <Input readOnly placeholder='Không có'/>
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="address"
            label="Địa chỉ"
          >
            <Input readOnly placeholder='Không có'/>
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="email"
            label="Email"
          >
            <Input readOnly placeholder='Không có'/>
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={createDate}
            initialValue={createDate}
            label="Ngày tạo"
          >
            <Input readOnly placeholder='Không có' />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            // name={status}
            // initialValue={status}
            label="Trạng thái tài khoản"
          >
            {/* <CommonSelect.SelectStatusOfCustomer disabled /> */}
            {status === 4 ? (<Input readOnly value={"Đang hoạt động"} placeholder='Không có' />) : (<Input readOnly value={"Đã bị chặn"} placeholder='Không có' />)}
          </ProForm.Item>
        </Col>
      </Row>
      </div>
    </div>
  );
};
export default BasicStep;
