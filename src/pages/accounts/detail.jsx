/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Empty, message } from 'antd';
// import { updateReportAttribute } from '@/services/reportattribute';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './stepsDetail/BasicStep';
import { banUserByUserID, getCustomerById, unbanUserByUserID } from '@/services/accounts';
import moment from 'moment';

import { normalizeReportForm } from '@/utils/utils';
import { LockOutlined, RollbackOutlined, UnlockOutlined } from '@ant-design/icons';

const DetailWorker = (props) => {
  const {
    history: {
      location: { state: updateCustomerState },
    },
  } = props;

  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateCustomerState);
  const [getCustomerByIdState, setGetCustomerByIdState] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [customerCreateDate, setCustomerCreateDate] = useState();
  const [statusRecordData, setStatusRecordData] = useState();
  const [disableBan, setDisableBan] = React.useState(true);
  const [disableUnban, setDisableUnban] = React.useState(true);

  const steps = [
    {
      title: 'Thông tin chính của khách hàng',
      content: () => <BasicStep createDate={customerCreateDate} status={statusRecordData} />,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateWorkerState);
    getCustomerById(updateCustomerState.userID).then((res) => {
      if(res.createDate == null) {
        setCustomerCreateDate()
      }
      if(res.status == null) {
        setStatusRecordData()
      }
      
      setGetCustomerByIdState(res);
      setCustomerCreateDate(res.createDate.split('T', 1));
      setCustomerCreateDate(moment(res.createDate).format('DD/MM/YYYY'));
      setStatusRecordData(res.status);
      if (res.status === 4) {
        setDisableBan(false);
      }
      if (res.status === 10) {
        setDisableUnban(false);
      }
    });
  }, [getCustomerByIdState]);

  if (updateCustomerState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onBackList = () => {
    history.replace('/accounts/list');
  };

  const onBanCustomer = () => {
    return banUserByUserID(updateCustomerState.userID).then((res) => {
      if(res.status === 200) {
        onBackList()
        message.success('Chặn người dùng thành công')
      } else {
        message.error('Chặn người dùng không thành công')
        // setTimeout(() => {
        //   window.location.reload()
        // }, 2000);
      }
      setDisableBan(true)
    });
  };

  const onUnbanCustomer = () => {
    return unbanUserByUserID(updateCustomerState.userID).then((res) => {
      if(res.status === 500) {
        message.error('Gỡ chặn người dùng không thành công')
      } else {
        onBackList()
        message.success('Gỡ chặn người dùng thành công')
      }
      setDisableUnban(true);
    });
  };

  return (
    <PageContainer>
      <Form
        onFinish={onBackList}
        initialValues={updateCustomerState}
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
              title="Chặn người dùng"
              isNeedConfirm={{
                title: 'Xác nhận chặn khách hàng',
                content: 'Bạn có muốn chặn khách hàng này không',
                okText: 'Xác nhận',
                cancelText: 'Huỷ',
              }}
              btnProps={{ type: 'danger', icon: <LockOutlined />, disabled: disableBan }}
              onClick={onBanCustomer}
            />
            <AsyncButton
              title="Gỡ chặn người dùng"
              isNeedConfirm={{
                title: 'Xác nhận gỡ chặn khách hàng',
                content: 'Bạn có muốn gỡ chặn khách hàng này không',
                okText: 'Xác nhận',
                cancelText: 'Huỷ',
              }}
              btnProps={{ type: 'primary', icon: <UnlockOutlined />, disabled: disableUnban }}
              onClick={onUnbanCustomer}
            />
            <AsyncButton
              title="Trở về"
              btnProps={{ type: 'default', icon: <RollbackOutlined /> }}
              onClick={onBackList}
            />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default DetailWorker;
