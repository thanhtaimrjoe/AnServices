/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
// import { updateReportAttribute } from '@/services/reportattribute';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsUpdate/BasicStep';

import { normalizeReportForm } from '@/utils/utils';

const UpdateReportAttribute = (props) => {
  const {
    history: {
      location: { state: updateReportState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateReportState);

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Thông tin chính của thợ',
      content: () => <BasicStep />,
    },
  ];

  useEffect(() => {
    form.setFieldsValue(updateReportState);
  }, []);

  if (updateReportState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onUpdateReport = () => {
    // const update = normalizeReportForm(formData);
    // return updateReportAttribute(updateReportState.id, update).then(() =>
      history.replace('/masons/list')
    // );
  };
  return (
    <PageContainer>
      <Form
        onFinish={onUpdateReport}
        initialValues={updateReportState}
        colon
        form={form}
        name="reportInfo"
        layout="vertical"
        onValuesChange={(changedFileds, allValues) =>
          setFormData((prev) => ({ ...prev, ...allValues }))
        }
      >
        <Card bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
          <Row>
            <Typography.Title level={3}>{steps[currentStep].title}</Typography.Title>
          </Row>
          <Row style={{ width: '100%' }}>{steps[currentStep].content()}</Row>
          <FooterToolbar>
            <AsyncButton title="Cập nhật" btnProps={{ type: 'primary' }} /* onClick={onUpdateReport} */ />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateReportAttribute;
