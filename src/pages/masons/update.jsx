/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty } from 'antd';
// import { updateReportAttribute } from '@/services/reportattribute';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsUpdate/BasicStep';

import { normalizeReportForm } from '@/utils/utils';
import { getMasonByID, updateMason } from '@/services/masons';
import moment from 'moment';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';

const UpdateReportAttribute = (props) => {
  const {
    history: {
      location: { state: updateMasonState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateMasonState);
  const [requestMaterialCreateDate, setRequestaterialCreateDate] = useState();
  const [typeJobName, setTypeJobName] = useState();
  const [typeJobId, setTypeJobId] = useState();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Thông tin chính của thợ',
      content: () => <BasicStep createDate={requestMaterialCreateDate} typeJobName={typeJobName} typeJobId={typeJobId} />,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateMasonState);
    getMasonByID(updateMasonState.userID).then((res) => {
      setFormData(res);
      setTypeJobName(res.typeJob.typeJobName);
      setTypeJobId(res.typeJob.typeJobId);
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

  const onUpdateMason = () => {
    const update = normalizeReportForm(formData);
    return updateMason(updateMasonState, update).then(() =>
    console.log("test1", formData),
    console.log("test12", update),
    setTypeJobId(updateMasonState.typeJob.typeJobId),
      history.replace('/masons/list')
    );
  };

  const onBackList = () => {
    history.replace('/masons/list')
};
  return (
    <PageContainer>
      <Form
        onFinish={onUpdateMason}
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
            <AsyncButton title="Trở về" btnProps={{ type: 'default', icon: <RollbackOutlined /> }} onClick={onBackList} />
            <AsyncButton title="Cập nhật" btnProps={{ type: 'primary', icon: <CheckOutlined /> }} onClick={onUpdateMason} />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateReportAttribute;
