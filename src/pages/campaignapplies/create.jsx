import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Form, Typography, Space, Result, Button } from 'antd';
import BasicStep from './stepsCreate/BasicStep';
import { useHistory } from 'umi';
import { normalizeReportForm } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { createCampaignApplies } from '@/services/campaignapplies';

const CreateCampaignApply = (props) => {
  const {
    history: {
      location: {
        query: { type },
      },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [campaignApplyType, setCampaignApplyType] = useState(+type);
  const [createdCampaignApply, setCreatedCampaignApply] = useState(null);

  useEffect(() => {
    form.setFieldsValue({ product_type_id: +type });
  }, []);

  const onCreateCampaignApply = (values) => {
    const createCampaignApplyData = normalizeReportForm(values);
    return createCampaignApplies(createCampaignApplyData).then((res) => {
      setCreatedCampaignApply({ ...values, id: res });
    });
  };

  if (createdCampaignApply !== null) {
    return (
      <ProCard>
        <Result
          status="success"
          title="Campaign apply successfully created"
          subTitle={
            <Space direction="vertical">
              <Typography level={5}>{`Campaign apply name: ${createdCampaignApply.name}`}</Typography>
            </Space>
          }
          extra={[
            // <Button key="buy" onClick={() => setCreatedReportAttribute(null)}>
            //   Tiếp tục thêm báo cáo
            // </Button>,
            <Button
              type="primary"
              key="console"
              onClick={() => history.replace('/campaignapplies/list')}
            >
              Back to the list of campaign applies
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
        onFinish={onCreateCampaignApply}
        colon
        form={form}
        name="createReportInfo"
        layout="vertical"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <ProCard bordered title="Campaign Information">
            <BasicStep campaignApplyType={campaignApplyType} onChangeProductType={setCampaignApplyType} />
          </ProCard>
        </Space>
      </ProForm>
    </PageContainer>
  );
};

export default CreateCampaignApply;
