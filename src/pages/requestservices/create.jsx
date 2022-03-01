import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Form, Typography, Space, Result, Button } from 'antd';
import BasicStep from './stepsCreate/BasicStep';
import { useHistory } from 'umi';
import { normalizeReportForm } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { createRequestService } from '@/services/requestservices';

const CreateRequestService = (props) => {
  const {
    history: {
      location: {
        query: { type },
      },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [requestServiceType, setCreateRequestServiceType] = useState(+type);
  const [createdRequestService, setCreatedRequestService] = useState(null);

  useEffect(() => {
    form.setFieldsValue({ product_type_id: +type });
  }, []);

  const onCreateRequestService = (values) => {
    const createRequestServiceData = normalizeReportForm(values);
    return createRequestService(createRequestServiceData).then((res) => {
      setCreatedRequestService({ ...values, id: res });
    });
  };

  if (createdRequestService !== null) {
    return (
      <ProCard>
        <Result
          status="Thành công"
          title="Tạo yêu cầu cho khách hàng"
          subTitle={
            <Space direction="vertical">
              <Typography level={5}>{`Tên khách hàng: ${createdRequestService.customerName}`}</Typography>
              <Typography level={5}>{`Số điện thoại: ${createdRequestService.customerPhone}`}</Typography>
              <Typography level={5}>{`Địa chỉ: ${createdRequestService.customerAddress}`}</Typography>
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
        onFinish={onCreateRequestService}
        colon
        form={form}
        name="createReportInfo"
        layout="vertical"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <ProCard bordered title="Thông tin yêu cầu">
            <BasicStep requestServiceType={requestServiceType} onChangerequestServiceType={setCreateRequestServiceType} />
          </ProCard>
        </Space>
      </ProForm>
    </PageContainer>
  );
};

export default CreateRequestService;
