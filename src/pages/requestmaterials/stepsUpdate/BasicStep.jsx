// import React from 'react';
import React, { useEffect, useState } from 'react';

import { Input, Row, Col, Image } from 'antd';
import ProForm from '@ant-design/pro-form';
import { getRequestMaterialByID } from '@/services/requestmaterials';

const BasicStep = ({
  image,
  materialName,
  unit,
  fullName,
  phoneNumber,
}) => {
  const [Record, setRecord] = useState([]);
  useEffect(() => {
    getRequestMaterialByID(2).then((record) => {
      console.log('test1', record);
      setRecord(record);
      console.log('test11', record);
    });
  }, []);
  return (
    <div bordered={false} style={{ width: '200%', marginBottom: '4em' }}>
      <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
        {/* <Row gutter={16}>
          <Col span={12}>
            <Image width={150} src={image}></Image>
          </Col>
        </Row> */}
        <Row gutter={16}>
          <Col span={12}>
            <ProForm.Item name="usedMaterialId" label="ID">
              <Input readOnly />
            </ProForm.Item>
          </Col>
          <Col span={12}>
            <ProForm.Item 
              name={materialName}
              label="Tên vật liệu"
              initialValue={materialName}>
              <Input readOnly />
            </ProForm.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <ProForm.Item
              name={unit}
              label="Đơn vị"
              initialValue={unit}
            >
              <Input readOnly />
            </ProForm.Item>
          </Col>
          <Col span={12}>
            <ProForm.Item 
              name="quantity"
              label="Số lượng"
            >
              <Input readOnly />
            </ProForm.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <ProForm.Item 
              name={fullName} 
              label="Thợ phụ trách" 
              initialValue={fullName}>
              <Input readOnly />
            </ProForm.Item>
          </Col>
          <Col span={12}>
            <ProForm.Item
              name={phoneNumber} 
              label="Số điện thoại" 
              initialValue={phoneNumber}>
              <Input readOnly />
            </ProForm.Item>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default BasicStep;
