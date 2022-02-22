import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Form, Typography, Space, Result, Button } from 'antd';
import BasicStep from './stepsCreate/BasicStep';
import { createAccount } from '@/services/accounts';
import { useHistory } from 'umi';
import { normalizeReportForm } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

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
  const [accountType, setAccountType] = useState(+type);
  const [createdAccount, setCreatedAccount] = useState(null);

  useEffect(() => {
    form.setFieldsValue({ product_type_id: +type });
  }, []);

  // const onCreateAccount = (values) => {
  //   const createAccountData = normalizeReportForm(values);
  //   return createAccount(createAccountData).then((res) => {
  //     setCreatedAccount({ ...values, id: res });
  //   });
  // };

  const onCreateAccount = () => {
    return (
      history.replace('/user/login')
    );
  };

  if (createdAccount !== null) {
    return (
      <ProCard>
        <Result
          status="success"
          title="Tài khoản đã được tạo thành công"
          subTitle={
            <Space direction="vertical">
              <Typography level={5}>{`Username: ${createdAccount.username}`}</Typography>
              <Typography level={5}>{`Phone: ${createdAccount.phone}`}</Typography>
              <Typography level={5}>{`Email: ${createdAccount.email}`}</Typography>
            </Space>
          }
          extra={[
            // <Button key="buy" onClick={() => setCreatedReportAttribute(null)}>
            //   Tiếp tục thêm báo cáo
            // </Button>,
            <Button
              type="primary"
              key="console"
              onClick={() => history.replace('/user/login')}
            >
              Trở về đăng nhập
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
        onFinish={onCreateAccount}
        colon
        form={form}
        name="createReportInfo"
        layout="vertical"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <ProCard bordered title="Account information">
            <BasicStep accountType={accountType} onChangeProductType={setAccountType} />
          </ProCard>
        </Space>
      </ProForm>
    </PageContainer>
  );
};

export default CreateAccount;
