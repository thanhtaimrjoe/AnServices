/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
// import { updateReportAttribute } from '@/services/reportattribute';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsUpdate/BasicStep';

import { normalizeReportForm } from '@/utils/utils';
import { getWorkerById, updateWorker } from '@/services/workers';
import moment from 'moment';
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
  const [requestMaterialCreateDate, setRequestaterialCreateDate] = useState();
  const [typeJobName, setTypeJobName] = useState();
  const [typeJobId1, setTypeJobId] = useState();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Thông tin chính của thợ',
      content: () => <BasicStep createDate={requestMaterialCreateDate} typeJobName={typeJobName} typeJobId={typeJobId1} />,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateWorkerState);
    getWorkerById(updateWorkerState.userID).then((res) => {
      setFormData(res);
      setTypeJobName(res.typeJob.typeJobName);
      setTypeJobId(res.typeJob.typeJobId);
      setRequestaterialCreateDate(res.createDate.split('T',1));
      setRequestaterialCreateDate(moment(res.requestServiceCreateDate).format('DD/MM/YYYY'));
    });
  }, []);

  if (updateWorkerState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onUpdateWorker = () => {
    const update = normalizeReportForm(formData);
    const createContractValues = {
      workerId: formData.userID,
      workerName: formData.fullName,
      workerPhoneNumber: formData.phoneNumber,
      workerAddress: formData.address,
      workerEmail: formData.email,
      typeJobId: typeJobId1,
    };
    return updateWorker(createContractValues).then((res) => {
    console.log("test1", formData);
    console.log("test12", update);
    console.log("test13", res);
    console.log("test14", createContractValues);

    // setTypeJobId(updateWorkerState.typeJob.typeJobId)
      history.replace('/workers/list')
    });
  };

  const onBackList = () => {
    history.replace('/workers/list')
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
            <AsyncButton title="Trở về" btnProps={{ type: 'default', icon: <RollbackOutlined /> }} onClick={onBackList} />
            <AsyncButton title="Cập nhật" btnProps={{ type: 'primary', icon: <CheckOutlined /> }} onClick={onUpdateWorker} />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateReportAttribute;
