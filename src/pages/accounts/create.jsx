import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Form, Typography, Space, Button, Result } from 'antd';
import BasicStep from './stepsCreate/BasicStep';
import { createCustomerAccount } from '@/services/accounts';
import { useHistory } from 'umi';
import { normalizeReportForm } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import AsyncButton from '@/components/AsyncButton';
import { RollbackOutlined } from '@ant-design/icons';

const CreateAccount = (props) => {
  const {
    history: {
      location: {
        query: { type },
      },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  // const [accountType, setAccountType] = useState(+type);

  useEffect(() => {
    form.setFieldsValue({ product_type_id: +type });
  }, []);

  const onCreateAccount = (values) => {
    const createAccountData = normalizeReportForm(values);
    return createCustomerAccount(createAccountData).then((res) => {
      // setCreatedAccount({ ...values, id: res });
      history.replace('/accounts/list');
    });
  };

  const onBackList = () => {
    history.replace('/accounts/list');
  };

  return (
    <PageContainer>
      <ProForm
        submitter={{
          searchConfig: {
            submitText: 'Tạo',
            resetText: 'Làm mới',
          },
          render: (_, dom) => (
            <FooterToolbar>
              <AsyncButton
                title="Trở về"
                btnProps={{ type: 'default', icon: <RollbackOutlined /> }}
                onClick={onBackList}
              />
              {dom}
            </FooterToolbar>
          ),
        }}
        onFinish={onCreateAccount}
        colon
        form={form}
        name="createReportInfo"
        layout="vertical"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <ProCard bordered title="Thông tin khách hàng">
            <BasicStep />
          </ProCard>
        </Space>
      </ProForm>
    </PageContainer>
  );
};

export default CreateAccount;
