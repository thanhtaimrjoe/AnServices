import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Form, Typography, Space, Result, Button } from 'antd';
import BasicStep from './stepsCreate/BasicStep';
import { useHistory } from 'umi';
import { normalizeReportForm } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { createMason } from '@/services/masons';
import AsyncButton from '@/components/AsyncButton';
import { RollbackOutlined } from '@ant-design/icons';

const CreateMason = (props) => {
  const {
    history: {
      location: {
        query: { type },
      },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [masonType, setMasonType] = useState(+type);
  const [createdMason, setCreatedMason] = useState(null);

  useEffect(() => {
    form.setFieldsValue({ product_type_id: +type });
  }, []);

  const onCreateMason = (values) => {
    const createMasonData = normalizeReportForm(values);
    return createMason(createMasonData).then((res) => {
      console.log("test1", values);
      console.log("test111", res);
      console.log("test12", createMasonData.update);
      // setCreatedMason({ ...values, userID : res });
      history.replace('/masons/list')
    });
  };

  const onBackList = () => {
    history.replace('/masons/list')
};

  // if (createdMason !== null) {
  //   return (
  //     <ProCard>
  //       <Result
  //         status="Thành công"
  //         title="Tạo mới thợ thành công"
  //         subTitle={
  //           <Space direction="vertical">
  //             <Typography level={5}>{`Thợ tên: ${createdMason.fullName}`}</Typography>
  //             {/* <Typography level={5}>{`Số điện thoại: ${createdMason.phoneNumber}`}</Typography>
  //             <Typography level={5}>{`Số điện thoại: ${createdMason.address}`}</Typography>
  //             <Typography level={5}>{`Số điện thoại: ${createdMason.email}`}</Typography> */}
  //             {/* <Typography level={5}>{`Số điện thoại: ${createdMason.typeJob.typeJobName}`}</Typography> */}
  //           </Space>
  //         }
  //         extra={[
  //           // <Button key="buy" onClick={() => setCreatedMason(null)}>
  //           //   Tiếp tục thêm thợ mới
  //           // </Button>,
  //           <Button
  //             type="primary"
  //             key="console"
  //             onClick={() => history.replace('/masons/list')}
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
          render: (_, dom) => 
          <FooterToolbar>
            <AsyncButton title="Trở về" btnProps={{ type: 'default', icon: <RollbackOutlined /> }}  onClick={onBackList}  />
            {dom}

            {/* <CheckOutlined /> */}
          </FooterToolbar>, 
        }}
        onFinish={onCreateMason}
        colon
        form={form}
        name="createReportInfo"
        layout="vertical"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <ProCard bordered title="Thông tin thợ">
            <BasicStep masonType={masonType} onChangeProductType={setMasonType}/>
          </ProCard>
        </Space>
      </ProForm>
    </PageContainer>
  );
};

export default CreateMason;

