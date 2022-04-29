/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty, message, notification } from 'antd';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsUpdate/BasicStep';

import { normalizeReportForm } from '@/utils/utils';
import { updateWorker } from '@/services/workers';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';

const UpdateReportAttribute = (props) => {
  const {
    history: {
      location: { state: updateWorkerState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateWorkerState);

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Thông tin chính của thợ',
      content: () => <BasicStep />,
    },
  ];

  if (updateWorkerState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onBackList = () => {
    history.replace('/workers/list');
  };

  const onUpdateWorker = () => {
    const update = normalizeReportForm(formData);

    let validate = true;
    if (update.update.fullName.length === 0 || update.update.fullName === undefined) {
      validate = false;
    }
    if (update.update.phoneNumber.length === 0 || update.update.phoneNumber === undefined) {
      validate = false;
    }
    if (!update.update.phoneNumber.match(/(0[3|5|7|8|9])+([0-9]{8})\b/)) {
      validate = false;
    }
    if (!update.update.email) {
      console.log('true');
    } else if (
      !update.update.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      validate = false;
      message.error('Vui lòng kiểm tra email đã nhập');
    }
    if (validate === true) {
      const updateWorkerData = {
        workerId: update.update.userID,
        workerName: update.update.fullName,
        workerPhoneNumber: update.update.phoneNumber,
        workerAddress: update.update.address,
        workerEmail: update.update.email,
        typeJobId: update.update.typeJobID,
      };
      return updateWorker(updateWorkerData).then((res) => {
        if (res.status === 400) {
          notification.error({
            description: `Số điện thoại '${updateWorkerData.workerPhoneNumber}' đã tồn tại, vui lòng nhập số khác`,
            message: 'Thất bại',
          });
        }
        if (res.status === 500) {
          notification.error({
            description: `Vui lòng kiểm tra lại thông tin đã gửi`,
            message: 'Thất bại',
          });
        }
        if (res.length > 0) {
          notification.success({
            description: `Cập nhật thông tin thợ '${updateWorkerData.workerName}' thành công`,
            message: 'Thành công',
          });
          onBackList();
        }
      });
    }
  };
  return (
    <PageContainer>
      <Form
        onFinish={onUpdateWorker}
        initialValues={updateWorkerState}
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
            <AsyncButton
              title="Trở về"
              btnProps={{ type: 'default', icon: <RollbackOutlined /> }}
              onClick={onBackList}
            />
            <AsyncButton
              title="Cập nhật"
              btnProps={{ type: 'primary', icon: <CheckOutlined /> }}
              onClick={onUpdateWorker}
            />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateReportAttribute;
