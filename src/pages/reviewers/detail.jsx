/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsDetail/BasicStep';

import { normalizeReportForm } from '@/utils/utils';
import { getPlatformById, getReviewerById } from '@/services/campaignapplies';

const UpdateCampaign = (props) => {
  const {
    history: {
      location: { state: updateCampaignState, reviewerId },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateCampaignState);
  const [formDatadata, setFormDatadata] = useState(reviewerId);
  const [currentStep, setCurrentStep] = useState(0);
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [address, setAddress] = useState();
  const [workHistory, setWorkHistory] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();

  
  const steps = [
    {
      title: 'Main information',
      content: () => <BasicStep 
      image={image} name={name} gender={gender} dateOfBirth={dateOfBirth}
      address={address} workHistory={workHistory} email={email} phone={phone} id={id}
      />,
    },
  ];

  useEffect(() => {
    getReviewerById(formData.reviewerId).then((res) => {
        console.log('123123' ,formData)
        console.log('123123123' ,res)
      setFormData(res);
      setFormDatadata(res);

      setImage(res.image);
      setName(res.name);
      setGender(res.gender);
      setDateOfBirth(res.dateOfBirth);
      setAddress(res.address);
      setWorkHistory(res.workHistory);
      setEmail(res.email);
      setPhone(res.phone);
      setId(res.id);
    });
    getPlatformById(updateCampaignState.reviewerId).then((res) => {
      console.log('zxczxc1', res.data);

    });
  }, []);

  if (updateCampaignState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onBackCampaignApply = () => {
      history.replace('/campaignapplies/list');
  };
  return (
    <PageContainer>
      <Form
        onFinish={onBackCampaignApply}
        initialValues={updateCampaignState}
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
            <AsyncButton title="Back" btnProps={{ type: 'primary' }} onClick={onBackCampaignApply } />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateCampaign;
