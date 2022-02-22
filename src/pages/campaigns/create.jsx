import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Form, Typography, Space, Result, Button } from 'antd';
import BasicStep from './stepsCreate/BasicStep';
import { useHistory } from 'umi';
import { normalizeReportForm } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { createCampaign } from '@/services/campaigns';

const CreateBrand = (props) => {
  const {
    history: {
      location: {
        query: { type },
      },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [campaignType, setCampaignType] = useState(+type);
  const [createdCampaign, setCreatedCampaign] = useState(null);

  useEffect(() => {
    form.setFieldsValue({ product_type_id: +type });
  }, []);

  const onCreateCampaign = (values) => {
    const createCampaignData = normalizeReportForm(values);
    return createCampaign(createCampaignData).then((res) => {
      setCreatedCampaign({ ...values, id: res });
    });
  };

  if (createdCampaign !== null) {
    return (
      <ProCard>
        <Result
          status="success"
          title="Campaign successfully created"
          subTitle={
            <Space direction="vertical">
              <Typography level={5}>{`Campaign name: ${createdCampaign.name}`}</Typography>
            </Space>
          }
          extra={[
            // <Button key="buy" onClick={() => setCreatedReportAttribute(null)}>
            //   Tiếp tục thêm báo cáo
            // </Button>,
            <Button
              type="primary"
              key="console"
              onClick={() => history.replace('/campaigns/list')}
            >
              Back to the list of campaigns
            </Button>,
          ]}
        />
      </ProCard>
    );
  }
  return (
    <PageContainer>
      <ProForm
        submitter={{
          searchConfig: {
            submitText: 'Create',
            resetText: 'Reset',
          },
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
        }}
        onFinish={onCreateCampaign}
        colon
        form={form}
        name="createReportInfo"
        layout="vertical"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <ProCard bordered title="Campaign Information">
            <BasicStep campaignType={campaignType} onChangeProductType={setCampaignType} />
          </ProCard>
        </Space>
      </ProForm>
    </PageContainer>
  );
};

export default CreateBrand;
