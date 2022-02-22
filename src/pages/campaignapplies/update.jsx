/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsUpdate/BasicStep';
import { normalizeReportForm } from '@/utils/utils';
import { completeCampaignAppliesStatus, deleteCampaignApplies, getCampaignAppliesById, getCampaignAppliesByName, getPlatformById, updateCampaignApplies, updateCampaignAppliesStatus } from '@/services/campaignapplies';

const UpdateCampaignApply = (props) => {
  const {
    history: {
      location: { state: updateCampaignApplyState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateCampaignApplyState);

  const [currentStep, setCurrentStep] = useState(0);
  const [reviewerName, setReviewerName] = useState();
  const [campaignName, setCampaignName] = useState();


  const steps = [
    {
      title: 'Main information',
      content: () => <BasicStep reviewerId={reviewerName} campaignId={campaignName} />,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateCampaignApplyState);
    getCampaignAppliesById(updateCampaignApplyState.id).then((res) => {
      console.log('object123', res)
      setReviewerName(res.reviewerId);
      setCampaignName(res.campaign.name);
    });
  }, []);
  
  if (updateCampaignApplyState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onUpdateCampaignApply = () => {
    const update = normalizeReportForm(formData);
    return updateCampaignApplies(updateCampaignApplyState.id, update).then(() =>
      history.replace('/campaignapplies/list'),
    );
  };
  const onAcceptCampaignApply = () => {
    const update = normalizeReportForm(formData);
    return updateCampaignAppliesStatus(updateCampaignApplyState.id, update).then(() =>
      history.replace('/campaignapplies/list'),
      console.log('object123', updateCampaignApplyState.id)
    );
  };
  const onCompleteCampaignApply = () => {
    const update = normalizeReportForm(formData);
    return completeCampaignAppliesStatus(updateCampaignApplyState.id, update).then(() =>
      history.replace('/campaignapplies/list'),
      console.log('object1234', updateCampaignApplyState.id)
    );
  };
  const onRejectCampaignApply = () => {
    return deleteCampaignApplies(updateCampaignApplyState.id).then(() =>
      history.replace('/campaignapplies/list'),
    );
  };
  return (
    <PageContainer>
      <Form
        onFinish={onUpdateCampaignApply}
        initialValues={updateCampaignApplyState}
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
            <AsyncButton title="Complete" btnProps={{ type: 'primary' }} onClick={onCompleteCampaignApply} />
            <AsyncButton title="Accept" btnProps={{ type: 'Info' }} onClick={onAcceptCampaignApply} />
            <AsyncButton title="Reject" btnProps={{ type: 'danger' }} onClick={onRejectCampaignApply} />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateCampaignApply;
