import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Form, Typography, Space, Result, Button } from 'antd';
import BasicStep from './stepsCreate/BasicStep';
import { useHistory } from 'umi';
import { normalizeReportForm } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { createServiceRequest } from '@/services/requestservices';

const CreateServiceRequest = (props) => {
  const {
    history: {
      location: {
        query: { type },
      },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [serviceRequestType, setCreateServiceRequestType] = useState(+type);
  const [createdServiceRequest, setCreatedServiceRequest] = useState(null);

  useEffect(() => {
    form.setFieldsValue({ product_type_id: +type });
  }, []);

  const onCreateServiceRequest = (values) => {
    const createServiceRequestData = normalizeReportForm(values);
    return createServiceRequest(createServiceRequestData).then((res) => {
      setCreatedServiceRequest({ ...values, id: res });
    });
  };

  if (createdServiceRequest !== null) {
    return (
      <ProCard>
        <Result
          status="Thành công"
          title="Tạo yêu cầu cho khách hàng"
          subTitle={
            <Space direction="vertical">
              <Typography level={5}>{`Tên khách hàng: ${createdServiceRequest.customerName}`}</Typography>
              <Typography level={5}>{`Số điện thoại: ${createdServiceRequest.customerPhone}`}</Typography>
              <Typography level={5}>{`Địa chỉ: ${createdServiceRequest.customerAddress}`}</Typography>
            </Space>
          }
          extra={[
            // <Button key="buy" onClick={() => setCreatedReportAttribute(null)}>
            //   Tiếp tục thêm báo cáo
            // </Button>,
            <Button
              type="primary"
              key="console"
              onClick={() => history.replace('/requestservices/list')}
            >
              Trở về danh sách yêu cầu
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
            submitText: 'Tạo',
            resetText: 'Làm mới',
          },
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
        }}
        onFinish={onCreateServiceRequest}
        colon
        form={form}
        name="createReportInfo"
        layout="vertical"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <ProCard bordered title="Thông tin yêu cầu">
            <BasicStep serviceRequestType={serviceRequestType} onChangeServiceRequestType={setCreateServiceRequestType} />
          </ProCard>
        </Space>
      </ProForm>
    </PageContainer>
  );
};

export default CreateServiceRequest;
