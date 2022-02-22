/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Form,
  Typography,
  Row,
  Empty,
  Divider,
  Input,
  Select,
  Button,
  Descriptions,
  Image,
  message,
  Upload,
  Space,
  InputNumber,
} from 'antd';
// import { updateReportAttribute } from '@/services/reportattribute';
import AsyncButton from '@/components/AsyncButton';
import { useHistory, useRequest } from 'umi';
import BasicStep from './stepsDetail/BasicStep';
import styles from './style.less';
import moment from 'moment';
import { normalizeReportForm } from '@/utils/utils';
import {
  AssignMasonToRequest,
  cancelRequestService,
  getAllRequestServiceDetailsByRequestServiceID,
  getRequestServiceByID,
} from '@/services/requestservices';
import {
  denyStatusRequestMaterial,
  getAllMaterialByRequestDetailID,
  updateRequestMaterial,
  approveStatusRequestMaterial,
  getRequestMaterialByID,
  getAllMaterialByRequestServiceID,
} from '@/services/requestmaterials';
import { getAllMasons } from '@/services/masons';
import { getContractListByUserID } from '@/services/contracts';
import ProForm, { ProFormTextArea } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { CloseOutlined, RollbackOutlined, UploadOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { getAllReportByRequestServiceID } from '@/services/reports';

const DetailRequestService = (props) => {
  const {
    history: {
      location: { state: updateRequestServiceState },
    },
  } = props;

  
  
  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(updateRequestServiceState);
  const [currentStep, setCurrentStep] = useState(0);
  const [customerName, setCustomerName] = useState();
  const [userID, setUserID] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [serviceName, setServiceName] = useState();
  const [serviceDescription, setServiceDescription] = useState();
  const [servicePrice, setServicePrice] = useState();
  const [requestServiceCreateDate, setRequestServiceCreateDate] = useState();

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [staffCoordinator, setStaffCoordinator] = useState([]);
  const [visible1, setVisible1] = React.useState(false);
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  const steps = [
    {
      title: 'Thông tin chung',
      content: () => (
        <BasicStep
          customerName={customerName}
          userID={userID}
          fullName={fullName}
          phoneNumber={phoneNumber}
          address={address}
          serviceName={serviceName}
          serviceDescription={serviceDescription}
          servicePrice={servicePrice}
          requestServiceCreateDate={requestServiceCreateDate}
        />
      ),
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateRequestServiceState);
    getRequestServiceByID(updateRequestServiceState.requestServiceId).then((res) => {
      console.log('test', updateRequestServiceState);
      setCustomerName(res.customerName);
      setUserID(res.user.userID);
      setFullName(res.user.fullName);
      setPhoneNumber(res.user.phoneNumber);
      setAddress(res.user.address);
      setRequestServiceCreateDate(res.requestServiceCreateDate.split('T', 1));
      setRequestServiceCreateDate(moment(res.requestServiceCreateDate).format('DD/MM/YYYY'));
    });
  }, [updateRequestServiceState]);

  // Data cho chi tiết dịch vụ table
  const [requestServiceRecord, setRequestServiceRecord] = useState([]);
  useEffect(() => {
    getAllRequestServiceDetailsByRequestServiceID(updateRequestServiceState.requestServiceId)
      .then((record) => {
        console.log('kt2', record);
        setRequestServiceRecord(record);
        setIsLoad(true);
      }).catch(setIsLoad(false));
  }, []);

  const [requestMaterialRecord, setRequestMaterialRecord] = useState([]);
  const [masonRecord, setMasonRecord] = useState([]);
  const [contractRecord, setContractRecord] = useState([]);
  const [imgRecord, setImgRecord] = useState([]);
  const [imgReportRecord, setImgReportRecord] = useState([]);
  const [reportRequestService, setReportRequestService] = useState([]);


  // ====================
  const [messageRM, setMessageRM] = useState();
  const [updateQuantity, setUpdateQuantity] = useState();

  useEffect(() => {
    if (isLoad && requestServiceRecord) {
      requestServiceRecord.forEach((item) => {
        // Data cho img & video cho dịch vụ
        getRequestServiceByID(item.requestServiceId).then((record) => {
          console.log('test29', record);
          console.log('test2', record?.media);
          setImgRecord(record?.media);
        });
        // Data cho img & video cho báo cáo
        getAllReportByRequestServiceID(item.requestServiceId).then((record) => {
          record.map((e) => setImgReportRecord(e?.tblMedia))
        });
      });
    } 
    // Data cho danh sách thợ và hợp đồng
    if (isLoad && updateRequestServiceState) {
      getAllMasons().then((record) => {
        setMasonRecord(record);
      });
      getContractListByUserID(updateRequestServiceState.user.userID).then((record) => {
        setContractRecord(record);
      });
    }
    // Data cho chi tiết vật tư yêu cầu
    if (isLoad && requestServiceRecord !== null) {
      getAllMaterialByRequestServiceID(updateRequestServiceState.requestServiceId).then((record) => {
        console.log('kt11', updateRequestServiceState);
        console.log('kt111', requestServiceRecord);
        console.log('kt1', record);
        console.log('kt12', record.message);
        setRequestMaterialRecord(record);
      });
    }
    if (isLoad && requestServiceRecord !== null) {
      getAllReportByRequestServiceID(updateRequestServiceState.requestServiceId).then((record) => {
        setReportRequestService(record);
      });
    }
    else console.log('Lỗi');
  }, [isLoad]);

  const images = imgRecord.map((image) => {
    if (!image?.mediaUrl.includes('.mp4')) {
      return (
        <Image
          style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
          width={150}
          src={image?.mediaUrl}
        ></Image>
      );
    }
    return (
      <video
        controls
        style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
        key={image?.mediaId}
        src={image?.mediaUrl}
      />
    );
  });

  const imagesReport = imgReportRecord.map((image) => {
    if (!image?.mediaUrl.includes('.mp4')) {
      return (
        <Image
          style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
          width={150}
          src={image?.mediaUrl}
        ></Image>
      );
    }
    return (
      <video
        controls
        style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
        key={image?.mediaId}
        src={image?.mediaUrl}
      />
    );
  });

  if (updateRequestServiceState == null) {
    return (
      <PageContainer>
        <Empty />
      </PageContainer>
    );
  }

  const onRejectorCancelRequestService = () => {
    // const update = normalizeReportForm(formData);
    return cancelRequestService(updateRequestServiceState.requestServiceId).then(() =>
      history.replace('/requestservices/list'),
    );
  };

  const onBackList = () => {
    history.replace('/requestservices/list');
  };

  const onStaffCoordinator = (values) => {
    const assignMason = {
      requestDetailID: values,
      masonList: staffCoordinator,
    };
    // const createRequestServiceData = normalizeReportForm(formData);
    return AssignMasonToRequest(assignMason)
      .then((res) => {
        console.log('kt5', res);
        console.log('kt55', staffCoordinator);
        console.log('kt7', requestServiceRecord);
        setConfirmLoading(true);
      })
      .then(() => {
        // requestServiceRecord.resetFields();
        setConfirmLoading(false);
        setVisible(false);
      })
      .catch((info) => {
        console.log('Xác thực không thành công:', info);
      })
      .finally();
  };

  const { Option } = Select;

  function handleChange(value) {
    setStaffCoordinator([...value]);
    console.log(`selected ${value}`);
    console.log('selected1', staffCoordinator);
  }

  function handleChangeQuantity(value) {
    setUpdateQuantity(value);
    console.log(`selected ${value}`);
    console.log(`selecte`, updateQuantity);
  }

  function handleChangeMessage(value) {
    setMessageRM(value);
    console.log(`selected ${value}`);
    console.log(`selecte`, messageRM);
  }

  const uploadImg = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // const handleUpload = () => {
  //   const { fileList } = this.state;
  //   const formDataFile = new FormData();
  //   fileList.forEach(file => {
  //     formDataFile.append('files[]', file);
  //   });
  //   this.setState({
  //     uploading: true,
  //   });
  //   // You can use any AJAX library you like
  //   fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
  //     method: 'POST',
  //     body: formDataFile,
  //   })
  //     .then(res => res.json())
  //     .then(() => {
  //       this.setState({
  //         fileList: [],
  //       });
  //       message.success('upload successfully.');
  //     })
  //     .catch(() => {
  //       message.error('upload failed.');
  //     })
  //     .finally(() => {
  //       this.setState({
  //         uploading: false,
  //       });
  //     });
  // };

  const onAcceptRequestMaterial = (values) => {
    const update = normalizeReportForm(formData);
    return approveStatusRequestMaterial(values, update).then(() =>
      console.log('abcformAccept', formData),
      console.log('abcvaluesAccept', values),
    );
  };

  const showModal = () => {
    setVisible(true);
  };

  const showModal1 = () => {
    setVisible1(true);
  };

  const onDenyModal = (values) => {
    requestMaterialRecord
      .validateFields()
      .then((res) => {
        setConfirmLoading(true);
        return denyStatusRequestMaterial(values, res.message);
      })
      .then(() => {
        requestMaterialRecord.resetFields();
        setConfirmLoading(false);
        setVisible1(false);
      })
      .catch((info) => {
        console.log('Xác thực không thành công:', info);
      })
      .finally();
  };

  const onAdjustedModal = (usedMaterialId, message1, quantityNew) => {
    console.log("firstmessageRM", messageRM)
    console.log("firstmessage", message1)
    console.log("firstupdateQuantity", updateQuantity)
    console.log("firstquantityNew", quantityNew)
    form
      .validateFields()
      .then((res) => {
        setConfirmLoading(true);
        console.log('valuesRes', res)
        console.log('valuesRecord', requestMaterialRecord)
        return updateRequestMaterial(usedMaterialId, message1, quantityNew);
        // return updateRequestMaterial(res.usedMaterialId, res.message, res.quantityNew);
      })
      .then(() => {
        form.resetFields();
        setConfirmLoading(false);
        setVisible(false);
      })
      .catch((info) => {
        console.log('Xác thực không thành công:', info);
      })
      .finally();
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setVisible(false);
    setVisible1(false);
  };


  
  const REQUESTSERVICEDETAIL = [
    {
      title: 'STT',
      dataIndex: 'index',
      search: false,
      render: (text, object, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      search: false,
      render: (text, record) => {
        console.log('record1', record);
        return <div>{record?.service?.serviceName}</div>;
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'serviceDescription',
      search: false,
      render: (text, record) => {
        return <div>{record?.service?.serviceDescription}</div>;
      },
    },
    {
      title: 'Đơn giá dự kiến',
      dataIndex: 'serviceDescription',
      search: false,
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'serviceDescription',
      search: false,
    },
    {
      title: 'Hành động',
      key: 'action',
      search: false,
      render: (text, record) => {
        const updateMasonState = { ...record };
        console.log('abc1', record.requestDetaiId);
        // console.log("abc11", record.usedMaterialId)
        return (
          <Space size="middle">
            <Select
              mode="tags"
              allowClear
              style={{ width: '220px' }}
              placeholder="Chọn thợ làm việc"
              onChange={handleChange}
            >
              {masonRecord.map((option) => (
                <Option key={option.userID}>{option.fullName}</Option>
              ))}
            </Select>
            <Button
              onClick={() => onStaffCoordinator(updateMasonState.requestDetaiId)}
              onChange={handleChange}
              state={updateMasonState}
              type="primary"
            >
              Điều phối thợ
            </Button>
          </Space>
        );
      },
    },
  ];

  const CONTRACT = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'contractId',
      search: false,
      render: (text, object, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Tên hợp đồng',
      dataIndex: 'contractTitle',
      key: 'contractTitle',
      search: false,
    },
    {
      title: 'Trạng thái hợp đồng',
      dataIndex: 'contractStatus',
      key: 'contractStatus',
      search: false,
      valueEnum: {
        2: {
          text: 'Đang chờ KH chấp thuận',
          status: 'processing',
        },
        3: {
          text: 'Đã chấp thuận',
          status: 'Success',
        },
        7: {
          text: 'Yêu cầu sửa lại',
          status: 'Warning',
        },
      },
    },
    {
      title: 'Ngày tạo hợp đồng',
      dataIndex: 'contractCreateDate',
      key: 'contractCreateDate',
      search: false,
      render: (text, record) => {
        return <div>{moment(record.contractCreateDate).format('D/M/Y')}</div>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      search: false,
      render: (text, record) => {
        // const updateRequestSMaterialState = { ...record };
        console.log('abc1', record);
        console.log('abc11', record.usedMaterialId);
        console.log('abc11', record.contractUrl);
        return (
          <Space size="middle">
            {/* <Link to={{ pathname: `/requestmaterials/update`, state: updateRequestSMaterialState }}>Chi tiết</Link> */}
            {/* <a onClick={window.open(record.contractUrl)}>Xem hợp đồng</a> */}
            <a>Xem hợp đồng</a>
            <a>Tải xuống & in</a>
          </Space>
        );
      },
    },
  ];

  const REQUESTMATERIALDETAIL = [
    {
      title: 'STT',
      dataIndex: 'index',
      search: false,
      render: (text, object, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      search: false,
      render: (text, record) => {
        return <div>{record?.serviceName}</div>;
      },
    },
    {
      title: 'Vật liệu cần cung cấp',
      dataIndex: 'materialName',
      search: false,
      render: (text, record) => {
        return <div>{record?.material?.materialName}</div>;
      },
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      search: false,
      render: (text, record) => {
        return <div>{record?.material?.unit}</div>;
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      search: false,
      render: (text, record) => {
        return <div>{record?.quantity}</div>;
      },
    },
    {
      title: 'Số lượng mới',
      dataIndex: 'quantityNew',
      search: false,
      render: (text, record) => {
        return <div>{record?.quantityNew}</div>;
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      search: false,
      render: (text, record) => {
        return <div>{record?.note}</div>;
      },
    },
    {
      title: 'Người gửi yêu cầu',
      dataIndex: 'serviceDescription',
      search: false,
      render: (text, record) => {
        return <div>{record?.mason?.fullName}</div>;
      },
    },
    {
      title: 'Trạng thái hợp đồng',
      dataIndex: 'statusName',
      // key: 'statusName',
      search: false,
      // valueEnum: {
      //   2: {
      //     text: 'Đang chờ KH chấp thuận',
      //     status: 'processing',
      //   },
      //   3: {
      //     text: 'Đã chấp thuận',
      //     status: 'Success',
      //   },
      //   7: {
      //     text: 'Yêu cầu sửa lại',
      //     status: 'Warning',
      //   },
      // },
      render: (text, record) => {
        return <div>{record?.status?.statusName}</div>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      search: false,
      render: (text, record) => {
        const updateRequestMaterialState = { ...record };
        // const onHandleMessage = (message) => {
        //   updateRequestMaterialState.message = message;
        //   console.log("message123", message)
        //   // setMessageRM();
        // }
        console.log('abcMate2', record);
        console.log('abcMate12', updateRequestMaterialState);
        setMessageRM(record.message)
        setUpdateQuantity(record.quantityNew)

        return (
          <Space size="middle">
            {/* <Button onClick={() => onStaffCoordinator(updateRequestMaterialState.requestDetaiId)} onChange={handleChange} state={updateRequestMaterialState} type="primary" >Điều phối thợ</Button> */}
            <Button type="primary" onClick={() => onAcceptRequestMaterial(updateRequestMaterialState.usedMaterialId)} state={updateRequestMaterialState}>
              Đồng ý
            </Button>
            <Button type="danger" onClick={showModal1}>
              Từ chối
            </Button>
            <Button type="Info" onClick={showModal}>
              Điều chỉnh
            </Button>
            <Modal
              title="Từ chối"
              visible={visible1}
              onOk={() => onDenyModal(updateRequestMaterialState.usedMaterialId, updateRequestMaterialState.message)}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <ProFormTextArea
                name={record.message}
                placeholder="Nhập lý do từ chối"
              />
            </Modal>
            <Modal
              title="Điều chỉnh"
              visible={visible}
              onOk={() => onAdjustedModal(updateRequestMaterialState.usedMaterialId, updateRequestMaterialState.quantityNew, updateRequestMaterialState.message)}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <div>
                <ProForm.Item
                  name={updateRequestMaterialState.quantityNew}
                  initialValue={updateRequestMaterialState.quantityNew}
                  label="Số lượng"
                  rules={[
                    {
                      required: true,
                      type: 'integer',
                      message: 'Vui lòng nhập số lượng',
                    },
                  ]}
                >
                  <InputNumber placeholder="Nhập số lượng" style={{ width: '450px' }} min={1} onChange={handleChangeQuantity} state={updateRequestMaterialState} />
                </ProForm.Item>
                <ProForm.Item
                  name={updateRequestMaterialState.message}
                  initialValue={updateRequestMaterialState.message}
                  label="Ghi chú"
                  // onValuesChange={handleChangeMessage}
                  row={6}
                >
                  <Input.TextArea placeholder="Nhập ghi chú cho thợ" row={6} style={{ width: '450px' }} state={updateRequestMaterialState} onChange={handleChangeMessage}/>
                </ProForm.Item>
              </div>
            </Modal>
          </Space>
        );
      },
    },
  ];

  const REPORTREQUESTSERVICE = [
    {
      title: 'STT',
      dataIndex: 'index',
      search: false,
      render: (text, object, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Báo cáo kết quả',
      dataIndex: 'reportTitle',
      search: false,
      render: (text, record) => {
        return <div>{record?.reportTitle}</div>;
      },
    },
    {
      title: 'Mô tả báo cáo',
      dataIndex: 'reportDescription',
      search: false,
      render: (text, record) => {
        return <div>{record?.reportDescription}</div>;
      },
    },
    {
      title: 'Ngày báo cáo',
      dataIndex: 'reportDate',
      search: false,
      render: (text, record) => {
        return <div>{moment(record.reportDate).format('D/M/Y')}</div>;
      },
    },
  ];
    // const state1 = {
    //   fileList: [],
    //   uploading: false,
    // };
    // const { uploading, fileList } = this.state;
    // const properties = {
    //   onRemove: file => {
    //     this.setState(state => {
    //       const index = state.fileList.indexOf(file);
    //       const newFileList = state.fileList.slice();
    //       newFileList.splice(index, 1);
    //       return {
    //         fileList: newFileList,
    //       };
    //     });
    //   },
    //   beforeUpload: file => {
    //     this.setState(state => ({
    //       fileList: [...state.fileList, file],
    //     }));
    //     return false;
    //   },
    //   fileList,
    // };

  return (
    <PageContainer title="">
      <Form
        onFinish={onBackList}
        initialValues={updateRequestServiceState}
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
          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          {/* XEM ẢNH & VIDEO */}
          <div className={styles.title}>Hình ảnh & video của công trình</div>
          {images}

          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          {/* XEM CHI TIẾT HỢP ĐỒNG */}
          <div className={styles.title}>Chi tiết hợp đồng</div>
          <ProTable
            style={{
              marginBottom: 24,
            }}
            pagination={false}
            search={false}
            // loading={loading}
            options={false}
            toolBarRender={false}
            columns={CONTRACT}
            rowKey="contractId"
            dataSource={contractRecord.map((e) => e)}
          />
          <Row>
            <Button type="primary" style={{ marginLeft: '250px', width: '50%' }}>
              Lập hợp đồng sửa chữa & báo giá
            </Button>
          </Row>
          {/* <Row style={{ width: '100%' }}>{stepsProDescriptions[currentStepProdescription].content()}</Row> */}

          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          {/* XEM DỊCH VỤ */}
          <div className={styles.title}>Chi tiết dịch vụ</div>
          <ProTable
            style={{
              marginBottom: 24,
            }}
            pagination={false}
            search={false}
            // loading={loading}
            options={false}
            toolBarRender={false}
            columns={REQUESTSERVICEDETAIL}
            rowKey="requestDetaiId"
            dataSource={requestServiceRecord.map((e) => e)}
          />

          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          {/* <Row>
            <Upload {...uploadImg} maxCount={1}>
              <Button icon={<UploadOutlined />} style={{ marginLeft: '2em', width: '105%' }}>
                Chọn file
              </Button>
            </Upload>
          </Row>
          <Row>
            <Upload {...properties}>
              <Button icon={<UploadOutlined />}>Chọn file</Button>
            </Upload>
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
            {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
          </Row> */}
          <br />
          <Row>
            <Button type="primary" style={{ width: '22%', marginLeft: '2em' }}>
              Gửi hợp đồng
            </Button>
          </Row>

          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          {/* XEM CHI TIẾT VẬT TƯ */}
          <div className={styles.title}>Chi tiết vật tư yêu cầu</div>
          <ProTable
            style={{
              marginBottom: 24,
            }}
            pagination={false}
            search={false}
            // loading={loading}
            options={false}
            toolBarRender={false}
            dataSource={requestMaterialRecord}
            columns={REQUESTMATERIALDETAIL}
            rowKey="requestDetaiId"
          />

          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          {/* XEM BÁO CÁO */}
          <div className={styles.title}>Chi tiết báo cáo</div>
          <ProTable
            style={{
              marginBottom: 24,
            }}
            pagination={false}
            search={false}
            // loading={loading}
            options={false}
            toolBarRender={false}
            dataSource={reportRequestService}
            columns={REPORTREQUESTSERVICE}
            rowKey="reportId"
          />

          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          {/* XEM ẢNH & VIDEO */}
          <div className={styles.title}>Hình ảnh & video của báo cáo</div>
          {imagesReport}
          
          <FooterToolbar>
            <AsyncButton
              title="Trở về"
              btnProps={{ type: 'default', icon: <RollbackOutlined /> }}
              onClick={onBackList}
            />
            <AsyncButton
              title="Từ chối"
              btnProps={{ type: 'danger', icon: <CloseOutlined /> }}
              onClick={onRejectorCancelRequestService}
            />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default DetailRequestService;
