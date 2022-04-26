import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Form, Typography, Space, Result, Button, message } from 'antd';
import BasicStep from './stepsCreate/BasicStep';
import { useHistory } from 'umi';
import { normalizeReportForm } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { createWorker } from '@/services/workers';
import AsyncButton from '@/components/AsyncButton';
import { RollbackOutlined } from '@ant-design/icons';

const CreateWorker = (props) => {
  const {
    history: {
      location: {
        query: { type },
      },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [workerType, setWorkerType] = useState(+type);
  const [createdWorker, setCreatedWorker] = useState(null);

  useEffect(() => {
    form.setFieldsValue({ product_type_id: +type });
  }, []);

  const onCreateWorker = (values) => {
    const createWorkerData = normalizeReportForm(values);
    // setCreatedWorker({ ...values, userID : res });

    return createWorker(createWorkerData).then((res) => {
      // if(res.errorsMsg !== "Create Successfull"){
      //   console.log('record02', res.errorsMsg)
      // }
      if (res.status === 400) {
        message.error('Số điện thoại đã tồn tại');
      } else {
        message.success('Đã tạo tài khoản thợ thành công');
        history.replace('/workers/list');
      }
    });
  };

  const onBackList = () => {
    history.replace('/workers/list');
  };

  // if (createdWorker !== null) {
  //   return (
  //     <ProCard>
  //       <Result
  //         status="Thành công"
  //         title="Tạo mới thợ thành công"
  //         subTitle={
  //           <Space direction="vertical">
  //             <Typography level={5}>{`Thợ tên: ${createdWorker.fullName}`}</Typography>
  //             {/* <Typography level={5}>{`Số điện thoại: ${createdWorker.phoneNumber}`}</Typography>
  //             <Typography level={5}>{`Số điện thoại: ${createdWorker.address}`}</Typography>
  //             <Typography level={5}>{`Số điện thoại: ${createdWorker.email}`}</Typography> */}
  //             {/* <Typography level={5}>{`Số điện thoại: ${createdWorker.typeJob.typeJobName}`}</Typography> */}
  //           </Space>
  //         }
  //         extra={[
  //           <Button key="buy" onClick={() => setCreatedWorker(null)}>
  //             Tiếp tục thêm thợ mới
  //           </Button>,
  //           <Button
  //             type="primary"
  //             key="console"
  //             onClick={() => history.replace('/workers/list')}
  //           >
  //             Trở về danh sách thợ
  //           </Button>,
  //         ]}
  //       />
  //     </ProCard>
  //   );
  // }
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

              {/* <CheckOutlined /> */}
            </FooterToolbar>
          ),
        }}
        onFinish={onCreateWorker}
        colon
        form={form}
        name="createReportInfo"
        layout="vertical"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <ProCard bordered title="Thông tin thợ">
            <BasicStep workerType={workerType} onChangeProductType={setWorkerType} />
          </ProCard>
        </Space>
      </ProForm>
    </PageContainer>
  );
};

export default CreateWorker;
