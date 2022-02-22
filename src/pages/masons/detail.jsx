/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
// import { updateReportAttribute } from '@/services/reportattribute';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsDetail/BasicStep';
import { getMasonByID } from '@/services/masons';
import moment from 'moment';

import { normalizeReportForm } from '@/utils/utils';
import { RollbackOutlined } from '@ant-design/icons';

const DetailMason = (props) => {
  const {
    history: {
      location: { state: updateMasonState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateMasonState);
  const [currentStep, setCurrentStep] = useState(0);

  const [requestMaterialCreateDate, setRequestaterialCreateDate] = useState();
  const [typeJob, setTypeJob] = useState();


  const steps = [
    {
      title: 'Thông tin chính của thợ',
      content: () => <BasicStep createDate={requestMaterialCreateDate} typeJobName={typeJob} />,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateMasonState);
    getMasonByID(updateMasonState.userID).then((res) => {
      setTypeJob(res.typeJob.typeJobName);
      setRequestaterialCreateDate(res.createDate.split('T',1));
      setRequestaterialCreateDate(moment(res.requestServiceCreateDate).format('DD/MM/YYYY'));
    });
  }, []);

  if (updateMasonState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onBackList = () => {
      history.replace('/masons/list')
  };
  return (
    <PageContainer>
      <Form
        onFinish={onBackList}
        initialValues={updateMasonState}
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

export default DetailMason;
