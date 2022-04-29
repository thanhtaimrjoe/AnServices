/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Drawer, message, notification, Row, Space } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
// import { WORKERS } from '@/utils/constrains';
import { removeWorker, rule, getAllWorkers, getWorkerById } from '@/services/workers';
import { Link } from 'react-router-dom';
import { InputWorkerByName, InputWorkerByPhone, SelectWorkerByTypeJob } from '@/components/CommonSelect/CommonSelect';
import moment from 'moment';

const WorkerList = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentRow, setCurrentRow] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const [getAllWorkerData, setGetAllWorkerData] = useState();

  const [getWorkerByIdData, setGetWorkerByIdData] = useState([]);
  const [fullNameData, setFullNameData] = useState();
  const [phoneNumberData, setPhoneNumberData] = useState();
  const [addressData, setAddressData] = useState();
  const [emailData, setEmailData] = useState();
  const [typeJobIDData, setTypeJobID] = useState();
  const [typeJobName, setTypeJobName] = useState();

  const [createDateData, setCreateDateData] = useState();

  // useEffect(() => {
  //   getAllWorkers().then((res) => {
  //     console.log('firstres', res)
  //     setGetAllWorkerData(res);
  //   })
  // }, [getAllWorkerData]);
  const showDrawer = () => {
    setShowDetail(true);
  };

  const GetWorkerById = (id) => {
    getWorkerById(id).then((res) => {
      setGetWorkerByIdData(res);
      setFullNameData(res.fullName);
      setPhoneNumberData(res.phoneNumber);
      setAddressData(res.address);
      setEmailData(res.email);
      setTypeJobID(res.typeJobID);
      setTypeJobName(res.typeJob.typeJobName);
      setCreateDateData(res.createDate.split('T', 1));
      setCreateDateData(moment(res.createDate).format('DD/MM/YYYY'));
    });

    showDrawer();
  };

  const WORKERS = [
    {
      title: 'STT',
      dataIndex: 'index',
      search: false,
      render: (text, record, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Mã của thợ',
      dataIndex: 'userID',
      show: false,
      search: false,
    },
    {
      title: 'Tên thợ',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => {
        return (
          <Space>
            {/* <Link to={{ pathname: `/workers/detail`, state: record }}>{record.fullName}</Link> */}
            <a onClick={() => GetWorkerById(record.userID)} key={record.userID}>
              {record.fullName}
            </a>
          </Space>
        );
      },
      renderFormItem: (item, props) => {
        return <InputWorkerByName {...props} />;
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      renderFormItem: (item, props) => {
        return <InputWorkerByPhone {...props} />;
      },
    },

    {
      title: 'Email',
      dataIndex: 'email',
      show: false,
      search: false,
    },
    {
      title: 'Nhóm Thợ',
      key: 'typeJobID',
      dataIndex: 'typeJobID',
      valueEnum: {
        1: {
          text: 'Thợ nhôm - kính',
        },
        2: {
          text: 'Thợ cơ khí',
        },
        3: {
          text: 'Thợ sơn',
        },
        4: {
          text: 'Thợ xây',
        },
        5: {
          text: 'Thợ điện nước',
        },
        6: {
          text: 'Thợ điện lạnh',
        },
        7: {
          text: 'Thợ thạch cao',
        },
      },
      valueType: 'select',

      renderFormItem: (item, props) => {
        return <SelectWorkerByTypeJob name="" {...props} />;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      search: false,
      render: (text, record) => {
        const updateWorkerState = { ...record };
        return (
          <Space size="middle">
            <a>
              <Link to={{ pathname: `/workers/update`, state: updateWorkerState }}>Cập nhật</Link>
            </a>
          </Space>
        );
      },
    },
  ];

  const addWorker = () => {
    history.push(`/workers/create`);
  };

  const deleteWorkerHandler = () => {
    return removeWorker(selectedRows[0]).then((res) => {
      notification.success({
        description: `Xoá thợ thành công`,
        message: 'Thành công',
      });
      ref.current?.reload();
    });
  };

  return (
    <PageContainer content="">
      <Card bordered={false} style={{ width: '100%' }}>
        <ResoTable
          scroll={{ x: 600 }}
          tableAlertOptionRender={({ _, __, onCleanSelected }) => [
            <AsyncButton
              isNeedConfirm={{
                title: 'Xác nhận xoá',
                content: 'Bạn có muốn xoá thợ này không?',
                okText: 'Xác nhận',
                cancelText: 'Huỷ',
              }}
              btnProps={{ danger: true, type: 'link' }}
              onClick={() => deleteWorkerHandler().then(onCleanSelected)}
              // title={`Xoá ${selectedRows.length} thợ`}
              title={`Xoá thợ này`}
            />,
          ]}
          toolBarRender={() => [
            <Button type="primary" onClick={addWorker} icon={<PlusOutlined />}>
              Tạo thợ mới
            </Button>,
          ]}
          rowSelection={rowSelection}
          actionRef={ref}
          rowKey="userID"
          columns={WORKERS}
          resource="User/GetAllWorker"
          // dataSource={getAllWorkerData}
        />
      </Card>
      <Drawer
        width={640}
        visible={showDetail}
        onClose={() => setShowDetail(false)}
        closable={false}
      >
        <p style={{ fontSize: 30, marginBottom: 24 }}>
          <b>Thông tin chính của thợ</b>
        </p>
        <Row style={{marginBottom: 24}}>
          <Col span={12}>
            <Descriptions>
              <Descriptions.Item label="Tên thợ" labelStyle={{ fontWeight: 'bold' }}>
                {fullNameData}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions>
              <Descriptions.Item label="Số điện thoại" labelStyle={{ fontWeight: 'bold' }}>
                {phoneNumberData}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row style={{marginBottom: 24}}>
          <Col span={12}>
            <Descriptions>
              <Descriptions.Item label="Địa chỉ" labelStyle={{ fontWeight: 'bold' }}>
                {addressData}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions>
              <Descriptions.Item label="Email" labelStyle={{ fontWeight: 'bold' }}>
                {emailData}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row style={{marginBottom: 24}}>
          <Col span={12}>
            <Descriptions>
              <Descriptions.Item label="Ngày tạo" labelStyle={{ fontWeight: 'bold' }}>
                {createDateData}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions>
              <Descriptions.Item label="Nhóm thợ" labelStyle={{ fontWeight: 'bold' }}>
                {typeJobName}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        {/* <Row style={{marginBottom: 24, justifyContent: 'space-evenly'}}>
          <Col>
            <Button type='primary' >Cập nhật thông tin</Button>
          </Col>
        </Row> */}
      </Drawer>
    </PageContainer>
  );
};

export default WorkerList;
