/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty, Input, message, InputNumber } from 'antd';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsUpdate/BasicStep';
import { normalizeReportForm } from '@/utils/utils';
import { approveStatusRequestMaterial, denyStatusRequestMaterial, getRequestMaterialByID, updateRequestMaterial } from '@/services/requestmaterials';
import Modal from 'antd/lib/modal/Modal';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';

const UpdateRequestMaterial = (props) => {
  const {
    history: {
      location: { state: updateRequestMaterialState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateRequestMaterialState);

  const [currentStep, setCurrentStep] = useState(0);
  const [materialName, setMaterialName] = useState();
  const [unit, setUnit] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(updateRequestMaterialState);

  const steps = [
    {
      title: 'Thông tin chính',
      content: () => <BasicStep materialName={materialName} unit={unit} fullName={fullName} phoneNumber={phoneNumber} />,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateRequestMaterialState);
    getRequestMaterialByID(updateRequestMaterialState.usedMaterialId).then((res) => {
      setMaterialName(res.material.materialName);
      setUnit(res.material.unit);
      setFullName(res.worker.fullName);
      setPhoneNumber(res.worker.phoneNumber);
    });
  }, []);
  
  if (updateRequestMaterialState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  // const onUpdateRequestMaterial = () => {
  //   const update = normalizeReportForm(formData);
  //   return updateRequestMaterial(updateRequestMaterialState.id, update).then(() =>
  //     history.replace('/requestmaterials/list'),
  //   );
  // };
  const onAcceptRequestMaterial = () => {
    const update = normalizeReportForm(formData);
    return approveStatusRequestMaterial(updateRequestMaterialState.usedMaterialId, update).then(() =>
      history.replace('/requestmaterials/list'),
    );
  };
  // const onRejectRequestMaterial = () => {
  //   const update = normalizeReportForm(formData);
  //   return denyStatusRequestMaterial(updateRequestMaterialState.usedMaterialId, update).then(() =>
  //     history.replace('/requestmaterials/list'),
  //   );
  // };

  // const onDeleteRequestMaterial = () => {
  //   return denyStatusRequestMaterial(updateRequestMaterialState.usedMaterialId).then(() =>
  //     history.replace('/requestmaterials/list'),
  //   );
  // };

  const onBackList = () => {
      history.replace('/requestmaterials/list')
  };
  // ====================
  const showModal = () => {
    setVisible(true);
  };

  const showModal1 = () => {
    setVisible1(true);
  };

  const handleOk = (values) => {
    const update = normalizeReportForm(formData);
    // setModalText({ ...values, message: res });
    setConfirmLoading(true);
    return denyStatusRequestMaterial(updateRequestMaterialState.usedMaterialId, updateRequestMaterialState.message, update).then((res) => {
    setModalText({ ...values, message: res });
      
    // history.replace('/requestmaterials/list'),
    });
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };
  const onDenyModal = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        return denyStatusRequestMaterial(values.usedMaterialId, values.message);
      })
      .then(() => {
        form.resetFields();
        setConfirmLoading(false);
        setVisible1(false);
      })
      .catch((info) => {
        console.log('Xác thực không thành công:', info);
      })
      .finally(onBackList);
  };

  const onAdjustedModal = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        return updateRequestMaterial(values.usedMaterialId, values.quantity, values.message);
      })
      .then(() => {
        form.resetFields();
        setConfirmLoading(false);
        setVisible(false);
      })
      .catch((info) => {
        console.log('Xác thực không thành công:', info);
      })
      .finally(onBackList);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisible1(false);
  };

  // ====================

  return (
    <PageContainer>
      <Form
        onFinish={onBackList}
        initialValues={updateRequestMaterialState}
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
            <AsyncButton title="Đồng ý" btnProps={{ type: 'primary' }} onClick={onAcceptRequestMaterial} />
            {/* <AsyncButton title="Từ chối" btnProps={{ type: 'danger' }} onClick={onRejectRequestMaterial} /> */}
            <AsyncButton title="Từ chối" btnProps={{ type: 'danger' }} onClick={showModal1} />
            <AsyncButton title="Điều chỉnh" btnProps={{ type: 'Info' }} onClick={showModal} />
            <Modal
              title="Từ chối"
              visible={visible1}
              onOk={onDenyModal}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <ProFormTextArea
                name="message"
                // label="Lý do từ chối"
                placeholder="Nhập lý do từ chối"
              />
            </Modal>

            <Modal
              title="Điều chỉnh"
              visible={visible}
              onOk={onAdjustedModal}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              // className=''
            >
              <div>
                <ProForm.Item
                  name="quantity"
                  label="Số lượng"
                  rules={[
                    {
                    required: true,
                    type: 'integer',
                    message: 'Vui lòng nhập số lượng',
                    },
                    // {
                    //   pattern: '/^\d*$/',
                    //   type: 'integer',
                    //   message: "Chỉ nhập số"
                    // }
                  ]}
                  
                >
                <InputNumber placeholder='Nhập số lượng' style={{ width: '450px' }} min={1}/>
                </ProForm.Item>
                <ProFormTextArea
                name="message"
                label="Ghi chú"
                placeholder="Nhập ghi chú cho thợ"
                row={6}
                width={450}
              />
              </div>
              
            </Modal>
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateRequestMaterial;
