/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
import { getBrandById, updateBrand } from '@/services/brands';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsUpdate/BasicStep';

import { normalizeReportForm } from '@/utils/utils';

const UpdateBrand = (props) => {
  const {
    history: {
      location: { state: updateBrandState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateBrandState);
  const [Image, setImage] = useState();
  const [Industry, setIndustry] = useState();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Main information',
      content: () => <BasicStep image={Image} industryId={Industry}/>,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateBrandState);
    getBrandById(updateBrandState.id).then((res) => {
      setFormData(res);
      setImage(res.image);
      setIndustry(res.industryId);
      // console.log("abc123", res.industryId)
    });
  }, []);

  if (updateBrandState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onUpdateBrand = () => {
    const update = normalizeReportForm(formData);
    return updateBrand(updateBrandState.id, update).then(() =>
      history.replace('/brands/list'),
    );
  };
  return (
    <PageContainer>
      <Form
        onFinish={onUpdateBrand}
        initialValues={updateBrandState}
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
            <AsyncButton title="Update" btnProps={{ type: 'primary' }} onClick={onUpdateBrand} />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateBrand;
