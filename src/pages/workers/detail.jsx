/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
// import { updateReportAttribute } from '@/services/reportattribute';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsDetail/BasicStep';
import { getWorkerById } from '@/services/workers';
import moment from 'moment';

import { normalizeReportForm } from '@/utils/utils';
import { RollbackOutlined } from '@ant-design/icons';

const DetailWorker = (props) => {
  const {
    history: {
      location: { state: updateWorkerState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateWorkerState);
  const [currentStep, setCurrentStep] = useState(0);

  const [workerCreateDate, setWorkerCreateDate] = useState();
  const [typeJob, setTypeJob] = useState();


  const steps = [
    {
      title: 'Thông tin chính của thợ',
      content: () => <BasicStep createDate={workerCreateDate} typeJobName={typeJob} />,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateWorkerState);
    getWorkerById(updateWorkerState.userID).then((res) => {
      setTypeJob(res.typeJob.typeJobName);
      setWorkerCreateDate(res.createDate.split('T',1));
      setWorkerCreateDate(moment(res.createDate).format('DD/MM/YYYY'));
    });
  }, []);

  if (updateWorkerState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onBackList = () => {
      history.replace('/workers/list')
  };
  return (
    <PageContainer>
      <Form
        onFinish={onBackList}
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
            <AsyncButton title="Trở về" btnProps={{ type: 'default', icon: <RollbackOutlined /> }} onClick={onBackList}  />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default DetailWorker;
