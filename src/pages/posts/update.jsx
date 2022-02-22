/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsUpdate/BasicStep';
import { normalizeReportForm } from '@/utils/utils';
import { deletePost, updateCampaignAppliesStatus, updatePost, updatePostStatus } from '@/services/posts';
import { getCampaignAppliesById } from '@/services/campaignapplies';
import { createVoucher } from '@/services/vouchers';

const UpdateCampaignApply = (props) => {
  const {
    history: {
      location: { state: updatePostState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updatePostState);
  const [formData1, setFormData1] = useState(updatePostState);
  const [currentStep, setCurrentStep] = useState(0);
  const [createdVoucher, setCreatedVoucher] = useState(updatePostState);

  const steps = [
    {
      title: 'Main information',
      content: () => <BasicStep />,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updatePostState);
    console.log('object1234', updatePostState.campaignApply.campaign.voucherId && updatePostState.campaignApply.reviewerId);
    getCampaignAppliesById(updatePostState.campaignApplyId).then((res) => {
      console.log('object1234id', updatePostState)
      setFormData1(res);
    });
  }, []);

  if (updatePostState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onUpdatePost = () => {
    const update = normalizeReportForm(formData);
    return updatePost(updatePostState.id, update).then(() =>
      history.replace('/posts/list'),
    );
  };

  const onAcceptPost = () => {
    const update = normalizeReportForm(formData1);
    return updateCampaignAppliesStatus(updatePostState.campaignApplyId, update).then(() =>
      history.replace('/campaignapplies/list'), 
      console.log('objectformData', formData1),
    )
  };

  const onRejectPost = () => {
    const update = normalizeReportForm(formData);
    return deletePost(updatePostState.id, update).then(() =>
      history.replace('/posts/list'),
    );
  };

  const onCreateVoucher = (values) => {
    const update = normalizeReportForm(formData1);
    return createVoucher({"reviewerId": updatePostState.campaignApply.reviewerId, "voucherId": updatePostState.campaignApply.campaign.voucherId}, update).then((res) => {
      // setCreatedVoucher({ "reviewerId": updatePostState.campaignApply.reviewerId, "voucherId": updatePostState.campaignApply.campaign.voucherId});
      setCreatedVoucher({ ...values, id: res });
      console.log('values' ,{"reviewerId": updatePostState.campaignApply.reviewerId, "voucherId": updatePostState.campaignApply.campaign.voucherId})
      console.log('values1', createVoucher({"reviewerId": updatePostState.campaignApply.reviewerId, "voucherId": updatePostState.campaignApply.campaign.voucherId}, update))
    });
  };

  // const onCreateVoucher = (values) => {
  //   const createVoucherData = normalizeReportForm(values);
  //   return createCampaign(createVoucherData).then((res) => {
  //     setCreatedCampaign({ ...values, id: res });
  //     history.replace('/posts/list');
  //   });
  // };
  return (
    <PageContainer>
      <Form
        onFinish={onUpdatePost}
        initialValues={updatePostState}
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
            <AsyncButton 
              // title="Approved" btnProps={{ type: 'primary' }} onClick={() => {onAcceptPost(); onCreateVoucher()}} />
               title="Approved" btnProps={{ type: 'primary' }} onClick= {onAcceptPost} /> 

            <AsyncButton 
              isNeedConfirm={{
                title: 'Post rejection confirmation',
                content: 'Do you want to reject this post?',
                okText: 'Confirm',
                cancelText: 'Cancel',
              }}
              title="Reject" btnProps={{ type: 'danger' }} onClick={onRejectPost} />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateCampaignApply;
