/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty, message } from 'antd';
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
  const [typeJobIdRecord, setTypeJobIdRecord] = useState();
  const [typeJobId, setTypeJobId] = useState();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Thông tin chính của thợ',
      content: () => (
        <BasicStep
          createDate={requestMaterialCreateDate}
          typeJobName={typeJobName}
          typeJobId={typeJobId}
        />
      ),
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateWorkerState);
    getWorkerById(updateWorkerState.userID).then((res) => {
      setFormData(res);
      setTypeJobName(res.typeJob.typeJobName);
      setTypeJobIdRecord(res.typeJob.typeJobId);
      setTypeJobId(res.typeJob.typeJobId);
      setRequestaterialCreateDate(res.createDate.split('T', 1));
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

    // setTypeJobId(update.update.typeJobId);
    let validate = true;
    // if (!update.update.fullName && update.update.fullName === "" && update.update.fullName === undefined) {
    if (update.update.fullName.length === 0 || update.update.fullName === undefined) {
      validate = false;
    }
    if (update.update.phoneNumber.length === 0 || update.update.phoneNumber === undefined) {
      validate = false;
    }
    if(!update.update.phoneNumber.match(/(0[3|5|7|8|9])+([0-9]{8})\b/)) {
      validate = false;
    }
    if(validate === true) {
      const createContractValues = {
        workerId: update.update.userID,
        workerName: update.update.fullName,
        workerPhoneNumber: update.update.phoneNumber,
        workerAddress: update.update.address,
        workerEmail: update.update.email,
        // typeJob: update.update.typeJobId,
        typeJob: {typeJobId},

      };
      return updateWorker(createContractValues).then((res) => {
        if(res.status === 400) {
          message.error("Số điện thoại đã tồn tại vui lòng kiểm tra lại")
        }
        else {
          // setTypeJobId(updateWorkerState.typeJob.typeJobId)
          console.log('record03', createContractValues)
          history.replace('/workers/list');
        }
      });
    }

  };

  const onBackList = () => {
    history.replace('/workers/list');
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
