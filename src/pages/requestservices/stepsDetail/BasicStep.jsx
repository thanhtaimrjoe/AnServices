// import React from 'react';
import React, { useEffect, useState } from 'react';

import { Input, Row, Col, Image } from 'antd';
import ProForm from '@ant-design/pro-form';
import { getRequestServiceByID } from '@/services/requestservices';
import { Content } from 'antd/lib/layout/layout';
import ProCard from '@ant-design/pro-card';
// import { getCampaignById } from '@/services/campaigns';

const BasicStep = ({ customerName, userID, fullName, phoneNumber, address, 
  serviceName, serviceDescription, servicePrice, 
  requestServiceCreateDate
}) => {

  // Hàm test
  // const [Record, setRecord] = useState([]);
  // useEffect(() => {
  //   getRequestServiceByID(17).then((record) => {
  //     console.log('test1', record);
  //     setRecord(record);
  //     console.log('test12', record.customerName);
  //   });
  // }, []);
  return (
    <div bordered={false} style={{ width: '200%', marginBottom: '4em' }}>
      <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
        {/* <Row gutter={16}> */}
          {/* <Col span={12}>
          <Image
            width={150}
            src={image}
          >
          </Image>
        </Col> */}
        {/* </Row> */}
        {/* <Row gutter={16}>
          <Col span={12}>
            <ProForm.Item 
              name="requestServiceId" 
              label="Mã dịch vụ">
              <Input readOnly placeholder='Không có'/>
            </ProForm.Item>
          </Col>
        </Row> */}
        <Row gutter={16}>
          <Col span={12}>
            <ProForm.Item 
              name={fullName} 
              label="Tên người dùng"
              initialValue={fullName}
              >
              <Input readOnly placeholder='Không có'/>
            </ProForm.Item>
          </Col>
          <Col span={12}>
            <ProForm.Item 
              name={customerName} 
              label="Tên chủ công trình"
              initialValue={customerName}
              >
              <Input readOnly placeholder='Không có'/>
            </ProForm.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <ProForm.Item 
              name={phoneNumber}
              label="SĐT người dùng" 
              initialValue={phoneNumber}
              >
              <Input readOnly placeholder='Không có'/>
            </ProForm.Item>
          </Col>
          <Col span={12}>
              <ProForm.Item 
              name="customerPhone"
              label="SĐT chủ công trình" 
              >
              <Input readOnly placeholder='Không có'/>
            </ProForm.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <ProForm.Item 
              name={address}
              label="Địa chỉ người dùng" 
              initialValue={address}
            >
              <Input readOnly placeholder='Không có'/>
            </ProForm.Item>
          </Col>
          <Col span={12}>
            <ProForm.Item 
              name="customerAddress"
              label="Địa chỉ chủ công trình" 
            >
              <Input readOnly placeholder='Không có'/>
            </ProForm.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <ProForm.Item
              name="requestServiceDescription"
              label="Mô tả yêu cầu"
            >
              <Input.TextArea rows={1} readOnly placeholder='Không có'/>
            </ProForm.Item>
          </Col>
          <Col span={12}>
            <ProForm.Item 
              // name="requestServiceCreateDate" 
              name={requestServiceCreateDate}
              initialValue={requestServiceCreateDate}
              label="Ngày nhận yêu cầu"
              ValueType="date"
            >
              <Input readOnly placeholder='Không có' />
            </ProForm.Item>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default BasicStep;
