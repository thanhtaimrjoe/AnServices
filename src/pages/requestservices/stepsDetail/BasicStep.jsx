// import React from 'react';
import CommonSelect from '@/components/CommonSelect/CommonSelect';
import ProForm from '@ant-design/pro-form';
import { Col, Descriptions, Input, Row } from 'antd';
import React from 'react';


const BasicStep = ({ customerName, userID, fullName, phoneNumber, address, 
  serviceName, serviceDescription, servicePrice, 
  requestServiceCreateDate, serviceRequestReference
}) => {
  return (
    <div bordered={false} style={{ width: '200%', marginBottom: '4em' }}>
      <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
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
              name="serviceRequestDescription"
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
        <Row gutter={16}>
          <Col span={12}>
            <ProForm.Item 
              name="serviceRequestPackage" 
              label="Gói"
            >
              <CommonSelect.SelectRequestServicePackage disabled />
            </ProForm.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          {serviceRequestReference && 
            <Col span={12}>
              <Descriptions>
                <Descriptions.Item
                  label="Chú ý"
                  labelStyle={{ fontWeight: 'bold', fontSize:'20px', marginTop:'20px' }}
                  initialValue="Yêu cầu làm lại từ yêu cầu khác"
                ><b style={{ marginTop:'20px', fontSize:'20px' }}>Yêu cầu làm lại từ yêu cầu khác</b></Descriptions.Item>
              </Descriptions>
            </Col>
          }
        </Row>
      </div>
    </div>
  );
};
export default BasicStep;
