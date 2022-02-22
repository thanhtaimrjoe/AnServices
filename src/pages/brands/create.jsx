import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Form, Typography, Space, Result, Button } from 'antd';
import BasicStep from './stepsCreate/BasicStep';
import { createBrand } from '@/services/brands';
import { useHistory } from 'umi';
import { normalizeReportForm } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

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
  const [createdBrand, setCreatedBrand] = useState(null);

  useEffect(() => {
    form.setFieldsValue({ product_type_id: +type });
  }, []);

  const onCreateBrand = (values) => {
    const createBrandData = normalizeReportForm(values);
    return createBrand(createBrandData).then((res) => {
      setCreatedBrand({ ...values, id: res });
      console.log('abcc',values)
      console.log('abcc',res)
      console.log('abcc',createBrandData)
    });
  };

  if (createdBrand !== null) {
    return (
      <ProCard>
        <Result
          status="success"
          title="Brand successfully created"
          subTitle={
            <Space direction="vertical">
              <Typography level={5}>{`Brand name: ${createdBrand.name}`}</Typography>
              <Typography level={5}>{`Hashtag: ${createdBrand.hashTag}`}</Typography>
            </Space>
          }
          extra={[
            // <Button key="buy" onClick={() => setCreatedReportAttribute(null)}>
            //   Tiếp tục thêm báo cáo
            // </Button>,
            <Button
              type="primary"
              key="console"
              onClick={() => history.replace('/brands/list')}
            >
              Back to the list of brands
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
        onFinish={onCreateBrand}
        colon
        form={form}
        name="createReportInfo"
        layout="vertical"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <ProCard bordered title="Brand Information">
            <BasicStep />
          </ProCard>
        </Space>
      </ProForm>
    </PageContainer>
  );
};

export default CreateBrand;
