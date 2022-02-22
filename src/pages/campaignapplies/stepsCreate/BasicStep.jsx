import React from 'react';

import { Row, Col, InputNumber } from 'antd';
import ProForm from '@ant-design/pro-form';
import CommonSelect from '@/components/CommonSelect/CommonSelect';
import { buildReviewerNameOption } from '@/components/CommonSelect/utils';

const BasicStep = () => {
  return (
    <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="reviewerId"
            label="Reviewer"
            rules={[
              {
                required: true,
                message: 'Please select reviewer',
              }, {
                pattern: '^[0-9]*$',
                type: 'integer',
                message: "Only number"
              }
            ]}
          >
            <InputNumber placeholder='Input reviewer id' style={{ width: '450px' }}/>
            {/* <CommonSelect.SelectReviewerName
            buildOptions={buildReviewerNameOption}
            placeholder="Please select reviewer id"
            /> */}
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="campaignId"
            label="Campaign ID"
            rules={[
              {
                required: true,
                type: 'integer',
                message: 'Please input campaign',
              },
            ]}
          >
            <InputNumber placeholder='Input campaign id' style={{ width: '450px' }}/>
          </ProForm.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicStep;
