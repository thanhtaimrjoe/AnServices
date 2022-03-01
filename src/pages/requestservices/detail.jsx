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
  Avatar,
  Tooltip,
  Col,
  DatePicker,
} from 'antd';
// import { updateReportAttribute } from '@/services/reportattribute';
import AsyncButton from '@/components/AsyncButton';
import { useHistory, useRequest } from 'umi';
import BasicStep from './stepsDetail/BasicStep';
import styles from './style.less';
import moment from 'moment';
import { normalizeReportForm } from '@/utils/utils';
import {
  assignWorkerToRequest,
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
import { getAllWorkers } from '@/services/workers';
import { getContractListByUserID } from '@/services/contracts';
import ProForm, { ProFormTextArea, ProFormDatePicker } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { CheckOutlined, CloseOutlined, InfoCircleOutlined, LoadingOutlined, PlusOutlined, RollbackOutlined, UploadOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { getAllReportByRequestServiceID } from '@/services/reports';
import storage from '../firebase/firebase';
import { createContract } from '@/services/contracts';

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
  const [contractStartDateData, setContractStartDateData] = useState();
  const [contractEndDateData, setContractEndDateData] = useState();
  const [contractTotalPriceData, setContractTotalPriceData] = useState();
  const [contractDepositData, setContractDepositData] = useState();
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [staffCoordinator, setStaffCoordinator] = useState([]);
  const [mainStaffCoordinator, setMainStaffCoordinator] = useState();
  const [visible1, setVisible1] = React.useState(false);
  const { RangePicker } = DatePicker;
  // const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YY'];
  const dateFormatList = ['DD-MM-YYYY', 'YY-MM-DD'];

// ======================================
  
// Upload file to Firebase
  const [file , setFile] = useState('');
  const [Url, setUrl] = useState('');
  const upload = ()=>{
    const filesFormats = [".doc", ".docx", "application/pdf"];
    console.log("clgfile", file);
    const isRightFormat = filesFormats.includes(file.type);
    console.log("clgformat", isRightFormat);
    if (!isRightFormat) {
      message.error("Bạn chỉ có thể tải lên file doc, docx và pdf");
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File phải nhỏ hơn 2MB!");
      return;
    }
    if(file == null) {
      message.error("Vui lòng chọn tệp khác");
      return;
    }
    storage.ref(`/files/${file.name}`).put(file)
    .on("state_changed", () => {
  
      // Getting Download Link
      storage.ref("files").child(file.name).getDownloadURL()
        .then((url) => {
          setUrl(url);
        })
      });
    message.success(`Tải ${file.name} lên thành công`)
}
// ======================================

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
  const [workerRecord, setWorkerRecord] = useState([]);
  const [contractRecord, setContractRecord] = useState([]);
  const [imgRecord, setImgRecord] = useState([]);
  const [imgReportRecord, setImgReportRecord] = useState([]);
  const [reportRequestService, setReportRequestService] = useState([]);


  // ====================
    // tạo hợp đồng
    const [contractUrl, setContractUrl] = useState();
    // const createContractFile = "https://docs.google.com/document/d/16UhbIyXXBFTlPRNnDiU9rnv4__HEiqsX/edit?usp=sharing&ouid=106209939784621025179&rtpof=true&sd=true"
  const createContractFile = "https://firebasestorage.googleapis.com/v0/b/anservice-986ae.appspot.com/o/files%2Fmau-hop-dong-thi-cong-xay-dung.docx?alt=media&token=9aa28548-8563-4f9a-8984-9f142d3ad256";
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
      getAllWorkers().then((record) => {
        setWorkerRecord(record);
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

// ===========================================

  const images = imgRecord.map((img) => {
    if (!img?.mediaUrl.includes('.mp4')) {
      return (
        <Image
          style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
          width={150}
          src={img?.mediaUrl}
        ></Image>
      );
    }
    return (
      <video
        controls
        style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
        key={img?.mediaId}
        src={img?.mediaUrl}
      />
    );
  });

  const imagesReport = imgReportRecord.map((img) => {
    if (!img?.mediaUrl.includes('.mp4')) {
      return (
        <Image
          style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
          width={150}
          src={img?.mediaUrl}
        ></Image>
      );
    }
    return (
      <video
        controls
        style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
        key={img?.mediaId}
        src={img?.mediaUrl}
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

// ===========================================

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
    const assignWorker = {
      requestDetailID: values,
      mainWorker: mainStaffCoordinator,
      workerList: staffCoordinator,
    };
    // const createRequestServiceData = normalizeReportForm(formData);
    return assignWorkerToRequest(assignWorker)
      .then((res) => {
        console.log('kt5', res);
        console.log('kt55', mainStaffCoordinator);
        console.log('kt56', assignWorker);
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

  function onChange(value) {
    console.log('changed', value);
  }

  function onChangeStartDate(value, date) {
    console.log('changed', value);
    console.log('changed2' ,date);
    console.log('changed22' ,date[0]);
    setContractStartDateData(date[0]);
    setContractEndDateData(date[1]);
  }

  function onChangeEndDate(value, date) {
    console.log('changed', value);
    console.log('changed2' ,date);
    console.log('changed2' ,date[1]);
    setContractEndDateData(date[1]);
  }

  function handleChangeMainWorker(value) {
    setMainStaffCoordinator(value);
    console.log(`selected ${value}`);
    // console.log('selected1', staffCoordinator);
  }

  function handleChange(value) {
    setStaffCoordinator([...value]);
    console.log(`selected ${value}`);
    // console.log('selected1', staffCoordinator);
  }

  function handleChangeQuantity(value) {
    setUpdateQuantity(value);
    console.log(`selected ${value}`);
  }

  function handleChangeMessage(value) {
    setMessageRM(value);
    console.log(`selected ${value}`);
    console.log(`selecte`, messageRM);

  }

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
    form
      .validateFields()
      .then((res) => {
        setConfirmLoading(true);
        return denyStatusRequestMaterial(values, res.message);
      })
      .then(() => {
        form.resetFields();
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

  const onCreateContract = () => {
    const createContractValues = {
      userId: userID,
      username: customerName,
      contractUrl: Url,
      requestId: updateRequestServiceState.requestServiceId,
      contractStartDate: contractStartDateData,
      contractEndDate: contractEndDateData,
      contractDeposit: contractDepositData,
      contractTotalPrice: contractTotalPriceData,
    };
    const createContractData = normalizeReportForm(createContractValues);
    return createContract(createContractData)
    .then((res) => {
      console.log('contract1', res);
      console.log('contract2', createContractData);
      console.log('contract123', contractStartDateData);
      console.log('contract1234', contractEndDateData);
      console.log('contract11', createContractValues);

      setConfirmLoading(true);
    })
    .then(() => {
      // createContractValues.resetFields();
      setConfirmLoading(false);
      setVisible(false);
    })
    .catch((info) => {
      console.log('Xác thực không thành công:', info);
    })
    .finally();
  }
  
  function onOpenNewWindown() {
    window.open(contractUrl);
  }

  function componentDidMount(){
  window.setTimeout(function () {
      this.setState({
          isButtonDisabled: false,
      })
  },5000)
 }
 
// ======================================
  
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
      title: 'Giá trị sửa chữa',
      dataIndex: 'requestDetailPrice',
      search: false,
      render: (text, record) => {
        return (
          <InputNumber 
            placeholder='Nhập giá' 
            defaultValue={record.requestDetailPrice}
            min={0} 
            style={{ width: 150 }} 
            formatter={value => `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\s\VND?|(,*)/g, '')} 
            onChange={onChange}
          >
            {record.statusName}
          </InputNumber>
        );
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      search: false,
      render: (text, record) => {
        const updateWorkerState = { ...record };
        console.log('abc1', record.requestDetailId);
        // console.log("abc11", record.usedMaterialId)
        return (
          <Space size="middle">
            <Button>
              Xác nhận
            </Button>
          </Space>
        );
      },
    },
  ];

  const REQUESTSERVICEDETAIL2 = [
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
      title: 'Độ ưu tiên',
      dataIndex: 'serviceDescription',
      tip: '1 - A, 2 - B, 3 - C, 4 - D, 5 - E',
      search: false,
      show:false,
      render: (text, record) => {
        return (
          <InputNumber 
            placeholder='Nhập độ ưu tiên' 
            // defaultValue={record.requestDetailPrice}
            min={1} 
            max={5}
            style={{ width: 100 }} 
            onChange={onChange}
          >
            {/* {record.statusName} */}
            {/* <Tooltip title="1">
              <InfoCircleOutlined />
          </Tooltip> */}
          </InputNumber>
        );
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'requestDetailStatus',
      search: false,
      render: (text, record) => {
        <div>{record.requestDetailStatus}</div>
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      search: false,
      render: (text, record) => {
        const updateWorkerState = { ...record };
        console.log('abc1', record.requestDetailId);
        // console.log("abc11", record.usedMaterialId)
        return (
          <Space size="middle">
            <Select
              allowClear
              style={{ width: '220px' }}
              placeholder="Chọn thợ chính"
              onChange={handleChangeMainWorker}
            >
              {workerRecord.map((option) => (
                <Option key={option.userID}>{option.fullName}</Option>
              ))}
            </Select>
            <Select
              mode="tags"
              allowClear
              style={{ width: '220px' }}
              placeholder="Chọn thợ phụ"
              onChange={handleChange}
            >
              {workerRecord.map((option) => (
                <Option key={option.userID}>{option.fullName}</Option>
              ))}
            </Select>
            <Button
              onClick={() => onStaffCoordinator(updateWorkerState.requestDetailId)} 
              onChange={handleChange&&handleChangeMainWorker}
              state={updateWorkerState}
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
        const updateRequestSMaterialState = { ...record };
        console.log('abc1', record);
        console.log('abc11', record.usedMaterialId);
        console.log('abc11', record.contractUrl);
        setContractUrl(record.contractUrl);
        return (
          <Space size="middle">
            {/* <Link to={{ pathname: `/requestmaterials/update`, state: updateRequestSMaterialState }}>Chi tiết</Link> */}
            <a onClick={onOpenNewWindown}>Xem hợp đồng</a>
            {/* <a>Xem hợp đồng</a> */}
            <a onClick={onOpenNewWindown}>Tải xuống & in</a>
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
        return <div>{record?.worker?.fullName}</div>;
      },
    },
    {
      title: 'Trạng thái',
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
            {/* <Button onClick={() => onStaffCoordinator(updateRequestMaterialState.requestDetailId)} onChange={handleChange} state={updateRequestMaterialState} type="primary" >Điều phối thợ</Button> */}
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
              onOk={() =>  onAdjustedModal(updateRequestMaterialState.usedMaterialId, updateRequestMaterialState.quantityNew, updateRequestMaterialState.message)}
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
          {/* THÔNG TIN CHUNG */}
          <Row>
            <Typography.Title level={3}>{steps[currentStep].title}</Typography.Title>
          </Row>
          <Row style={{ width: '100%' }}>{steps[currentStep].content()}</Row>
          <Divider style={{ marginBottom: 32, }} />

          {/* XEM ẢNH & VIDEO */}
          <div className={styles.title} style={{marginBottom:'30px'}} >Hình ảnh & video của công trình</div>
          {images}

          <Divider style={{ marginBottom: 32, }} />

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
            dataSource={contractRecord}
          />
          
          <Row>
            <Button type="primary" style={{ marginLeft: '250px', width: '50%' }}>
              <a href={createContractFile}>Lập hợp đồng sửa chữa & báo giá</a>
            </Button>
          </Row>

          <Divider style={{ marginBottom: 32, }} />

           {/* UPLOAD HỢP ĐỒNG */}
          <div className={styles.title}>Thông tin tạo hợp đồng</div>
          <Row gutter={16}>
            <Col span={10}>
              <ProForm.Item 
                name={customerName} 
                label="Tên chủ hợp đồng"
                initialValue={customerName}
                >
                <Input readOnly placeholder='Không có'/>
              </ProForm.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <ProForm.Item 
                name="contractStartDate&&contractEndDate"
                label="Ngày bắt đầu và kết thúc thi công"
                >
                <RangePicker onChange={onChangeStartDate}  style={{ width:390 }} format="YYYY-MM-DD"/>
              </ProForm.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={10}>
              <ProForm.Item 
                name="contractStartDate"
                label="Ngày bắt đầu thi công"
                >
                <DatePicker onChange={onChangeStartDate} style={{ width:390 }} 
                format="YYYY-MM-DD"
                // format="DD-MM-YYYY"
                />
              </ProForm.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <ProForm.Item 
                name="contractEndDate"
                label="Ngày kết thúc thi công"
                >
                <DatePicker onChange={onChangeEndDate} style={{ width:390 }} 
                // format={dateFormatList}
                format="YYYY-MM-DD"
                />
              </ProForm.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={10}>
              <ProForm.Item 
                name="contractDeposit"
                label="Đã đặt cọc"
              >
                <Select defaultValue="0" onChange={setContractDepositData}>
                  <Option value="0">0%</Option>
                  <Option value="0.1">10%</Option>
                  <Option value="0.3">30%</Option>
                  <Option value="0.5">50%</Option>
                  <Option value="0.7">70%</Option>
                </Select>
              </ProForm.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <ProForm.Item 
                // name="contractTotalPrice"
                name="contractTotalPrice"
                label="Tổng giá trị hợp đồng"
              >
                <InputNumber 
                  style={{ width:390 }}
                  min={0} 
                  formatter={value => `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\s\VND?|(,*)/g, '')} 
                  onChange={setContractTotalPriceData}
                  />
              </ProForm.Item>
            </Col>
          </Row>
          <Row style={{ marginTop:'50px' }}>
            {/* <Upload maxCount={1}>
              <Button type="file" onChange={(e)=>{setFile(e.target.files[0])}} icon={<UploadOutlined />} style={{ marginLeft: '8em', width: '145%' }}>
                Chọn file
              </Button>
            </Upload> */}
            <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
            
            {/* <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}/> */}
            <Button type="primary" style={{ width: '30%', marginLeft: '4em', }} onClick={upload}>
              Tải File lên FireBase
            </Button>
            <Button type="primary" style={{ width: '30%', marginLeft: '4em', }} onClick={onCreateContract}>
            {/* <Button type="primary" style={{ width: '30%', marginLeft: '4em', }} onClick={() => {upload();onCreateContract();}}> */}
              Gửi hợp đồng
            </Button>
            {/* <button onClick={upload}>Upload</button> */}
          </Row>

          <Row>
            <p><a href={Url}>{Url}</a></p>
          </Row>

          <Divider style={{ marginBottom: 32, }} />

          {/* XEM DỊCH VỤ */}
          <div className={styles.title} >Chi tiết dịch vụ</div>
          <ProTable
            style={{
              marginBottom: 50,
            }}
            pagination={false}
            search={false}
            // loading={loading}
            options={false}
            toolBarRender={false}
            columns={REQUESTSERVICEDETAIL}
            rowKey="requestDetailId"
            // dataSource={requestServiceRecord.map((e) => e)}
            dataSource={requestServiceRecord}
          />
          
          <div className={styles.title} >Điều phối thợ</div>
          <ProTable
            style={{
              marginBottom: 50,
            }}
            pagination={false}
            search={false}
            // loading={loading}
            options={false}
            toolBarRender={false}
            columns={REQUESTSERVICEDETAIL2}
            rowKey="requestDetailId"
            // dataSource={requestServiceRecord.map((e) => e)}
            dataSource={requestServiceRecord}
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
            rowKey="requestDetailId"
          />


          {/* XEM BÁO CÁO */}
          <div className={styles.title}>Chi tiết báo cáo</div>
          <ProTable
            style={{
              marginBottom: 32,
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

          <Divider style={{ marginBottom: 32, }} />

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
            <AsyncButton
            title="Xác nhận"
            btnProps={{ type: 'primary', icon: <CheckOutlined /> }}
            />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default DetailRequestService;
