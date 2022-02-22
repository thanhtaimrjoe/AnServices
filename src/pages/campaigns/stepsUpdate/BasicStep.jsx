// import React from 'react';
import React, { useEffect, useState } from 'react';

import { Input, Row, Col, Image } from 'antd';
import ProForm from '@ant-design/pro-form';
import { getCampaignById } from '@/services/campaigns';

const BasicStep = ({
    image, applied, linkBrand, hashtag, conditionApply, 
    campaignDecription, workDescription, platformName, voucherId,
    brandId
  }) => {
  const [Record, setRecord] = useState([]);
  useEffect(() => {
    getCampaignById(1).then((record) => {
      console.log("test1", record);
      setRecord(record);
      console.log("applied", record.platformName);


    })
  }, []);
  return (
    <div bordered={false} style={{ width: '200%', marginBottom: '4em' }}>
      <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
        <Row gutter={16}>
        <Col span={12}>
          <Image
            width={150}
            src={image}
          >
          </Image>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item 
            name="id"
            label="ID"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="name"
            label="Campaign name"
          >
            <Input.TextArea rows={2} readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name={conditionApply}
            label="Condition Apply"
            initialValue={conditionApply}
          >
            <Input.TextArea rows={2} readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={applied}
            label="Applied"
            initialValue={applied}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="slot"
            label="Slot"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={hashtag}
            label="Hashtag"
            initialValue={hashtag}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name={linkBrand}
            label="Link Brand"
            initialValue={linkBrand}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="startDate"
            label="Start Date"
            valueType="date"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="endDate"
            label="End Date"
            valueType="date"
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="recruitmentDate"
            label="Recruitment Date"
            valueType="date"
            >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name={platformName}
            label="Platform"
            initialValue={platformName}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={brandId}
            label="Brand Name"
            initialValue={brandId}
          >
            <Input readOnly />
          </ProForm.Item>
        </Col>
        {/* <Col span={12}>
          <ProForm.Item
            name={voucherId}
            label="Voucher"
            initialValue={voucherId}
          >
            <Input.TextArea rows={1} readOnly />
            {/* <CommonSelect.SelectVoucherById disabled /> *
          </ProForm.Item>
        </Col> */}
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name={workDescription}
            label="Work Description"
            initialValue={workDescription}
          >
            <Input.TextArea rows={4} readOnly />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name={campaignDecription}
            label="Campaign Description"
            initialValue={campaignDecription}
          >
            <Input.TextArea rows={4} readOnly />
          </ProForm.Item>
        </Col>
      </Row>
      
      </div>
    </div>
  );
};
export default BasicStep;

