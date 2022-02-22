/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsUpdate/BasicStep';

import { normalizeReportForm } from '@/utils/utils';
import { getCampaignById, updateCampaign } from '@/services/campaigns';

const UpdateCampaign = (props) => {
  const {
    history: {
      location: { state: updateCampaignState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateCampaignState);

  const [currentStep, setCurrentStep] = useState(0);
  const [image, setImage] = useState();
  const [applied, setApplied] = useState();
  const [linkBrand, setLinkBrand] = useState();
  const [hashtag, setHashTag] = useState();
  const [conditionApply, setConditionApply] = useState();
  const [campaignDecription, setCampaignDecription] = useState();
  const [workDescription, setWorkDescription] = useState();
  const [platformName, setPlatformName] = useState();
  const [voucherName, setVoucherName] = useState();
  const [brandName, setBrandName] = useState();
  const [endDate, setEndDate] = useState();

  
  const steps = [
    {
      title: 'Main information',
      content: () => <BasicStep 
      image={image} applied={applied} linkBrand={linkBrand} 
      hashtag={hashtag} conditionApply={conditionApply} 
      campaignDecription={campaignDecription} workDescription={workDescription} 
      platformName={platformName}  voucherId={voucherName} brandId={brandName} 
      endDate={endDate}
      />,
    },
  ];

  useEffect(() => {
    getCampaignById(updateCampaignState.id).then((res) => {
      setFormData(res);
      setImage(res.image);
      setApplied(res.applied);
      setLinkBrand(res.linkBrand);
      setHashTag(res.hashtag);
      setConditionApply(res.conditionApply);
      setCampaignDecription(res.campaignDecription);
      setWorkDescription(res.workDescription);
      setPlatformName(res.platform.name);
      setVoucherName(res.name);
      setBrandName(res.brand.name);
      setEndDate(res.endDate);
      console.log( 'zxc', res.platform.name);
      console.log( 'abc', res);
    });
    // form.setFieldsValue(updateCampaignState);
  }, []);

  if (updateCampaignState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  // const onUpdateCampaign = () => {
  //   const update = normalizeReportForm(formData);
  //   return updateCampaign(updateCampaignState.id, update).then(() =>
  //     history.replace('/campaigns/list'),
  //   );
  // };

  const onUpdateCampaign = () => {
      history.replace('/campaigns/list');
  };
  return (
    <PageContainer>
      <Form
        onFinish={onUpdateCampaign}
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
            <AsyncButton title="Back to list" btnProps={{ type: 'primary' }} onClick={onUpdateCampaign} />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateCampaign;
