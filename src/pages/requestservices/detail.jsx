/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
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
  BackTop,
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
import { getAllWorkers, getWorkerByServiceID } from '@/services/workers';
import { getContractByRequestServiceID, getContractListByUserID } from '@/services/contracts';
import ProForm, { ProFormTextArea, ProFormDatePicker } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  RollbackOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { getAllReportByRequestServiceID } from '@/services/reports';
import storage from '../firebase/firebase';
import { createContract } from '@/services/contracts';
import CommonSelect from '@/components/CommonSelect/CommonSelect';
import { createInvoice } from '@/services/invoice';

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
  const [contractStartDateData1, setContractStartDateData1] = useState();
  const [contractEndDateData1, setContractEndDateData1] = useState();
  const [contractTotalPriceData1, setContractTotalPriceData1] = useState();
  const [contractDepositData1, setContractDepositData1] = useState();
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [staffCoordinator, setStaffCoordinator] = useState([]);
  const [mainStaffCoordinator, setMainStaffCoordinator] = useState();
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [disableInvoice, setDisableInvoice] = React.useState(true);
  const [disableStaffCoordinator, setDisableStaffCoordinator] = React.useState(true);

  const [updatePriceRequestDetailsData, setUpdatePriceRequestDetailsData] = useState([]);
  const { RangePicker } = DatePicker;
  const [totalPrice, setTotalPrice] = useState([]);
  const [invoiceTotalPrice, setInvoiceTotalPrice] = useState([]);

  // Scroll
  const scrollToRef = (ref) => window.scrollTo({behavior: "smooth", top: ref.current.offsetTop});
  const myRef = useRef()
  const executeScroll = () => scrollToRef(myRef)
  // Invoice
  
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'select',
  };
  // ======================================

  // Upload file to Firebase
  const [file, setFile] = useState('');
  const [Url, setUrl] = useState('');
  const upload = async () => {
    try {
      const fileName = Date.now() + file.name;
      await storage.ref(`/files/${fileName}`).put(file);

      const url = await storage.ref('files').child(file.name).getDownloadURL();
      if (url) {
        message.success(`Tải ${file.name} lên thành công`);
        setUrl(url);
      }
    } catch (error) {
      console.log(error);
    }

    // storage
    //   .ref(`/files/${fileName}`)
    //   .put(file)
    //   .on('state_changed', () => {
    //     // Getting Download Link
    //     storage
    //       .ref('files')
    //       .child(file.name)
    //       .getDownloadURL()
    //       .then((url) => {
    //         setUrl(url);
    //       });
    //   });
  };
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
  const [requestServiceRecord, setRequestServiceDetail] = useState([]);
  useEffect(() => {
    getAllRequestServiceDetailsByRequestServiceID(updateRequestServiceState.requestServiceId)
      .then((record) => {
        console.log('record01', updateRequestServiceState);
        setRequestServiceDetail(record);
        setIsLoad(true);
        let result = 0;
        record.map((e) => {
          if(e.requestDetailStatus === 11) {
            result += e.requestDetailPrice
            setDisableInvoice(false);
          }
          // if(e.requestDetailStatus === 12) {
          //   setDisableInvoice(false);
          // }
          if(e.requestDetailStatus === 2) {
            setDisableStaffCoordinator(false);
          }
          // if(e.requestDetailStatus === 6 || e.requestDetailStatus === 12) {
          //   setDisableStaffCoordinator(true);
          // }
        })
        setInvoiceTotalPrice(result)
      })
      .catch(setIsLoad(false));
  }, []);

  const [requestMaterialRecord, setRequestMaterialRecord] = useState([]);
  const [workerRecord, setWorkerRecord] = useState([]);
  const [contractRecord, setContractRecord] = useState([]);
  const [imgReportRecord, setImgReportRecord] = useState([]);
  const [reportRequestService, setReportRequestService] = useState([]);
  const [priorityData, setPriorityData] = useState();
  const [messageDataRecord, setMessageDataRecord] = useState();
  const [quantityNewDataRecord, setQuantityNewDataRecord] = useState();
  const [materialIdDataRecord, setMaterialIdDataRecord] = useState();

  // ====================
  // tạo hợp đồng
  const [contractUrl, setContractUrl] = useState();
  // const createContractFile = "https://docs.google.com/document/d/16UhbIyXXBFTlPRNnDiU9rnv4__HEiqsX/edit?usp=sharing&ouid=106209939784621025179&rtpof=true&sd=true"
  const createContractFile =
    'https://firebasestorage.googleapis.com/v0/b/anservice-986ae.appspot.com/o/files%2Fmau-hop-dong-thi-cong-xay-dung.docx?alt=media&token=9aa28548-8563-4f9a-8984-9f142d3ad256';
  // ====================

  const [workerByServiceId, setWorkerByServiceId] = useState([]);

  useEffect(() => {
    if (isLoad && updateRequestServiceState) {
      console.log('kt222', updateRequestServiceState);
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
    if (isLoad && updateRequestServiceState) {
      getAllMaterialByRequestServiceID(updateRequestServiceState.requestServiceId).then(
        (record) => {
          setRequestMaterialRecord(record);
        },
      );
    }
    if (isLoad && updateRequestServiceState) {
      getAllReportByRequestServiceID(updateRequestServiceState.requestServiceId).then((record) => {
        setReportRequestService(record);
      });
    }

    // Dữ liệu hợp đồng (trong chi tiết yêu cầu dịch vụ)
    if (isLoad && updateRequestServiceState) {
      getContractByRequestServiceID(updateRequestServiceState.requestServiceId).then((record) => {
        if (record.length === 0) {
          console.log('recordContract404', record);
          setContractStartDateData1(null);
          setContractEndDateData1(null);
          setContractDepositData1(null);
          setContractTotalPriceData1(null);
        } else {
          console.log('recordContract', record);
          setContractStartDateData1(record.contractStartDate);
          setContractEndDateData1(record.contractEndDate);
          setContractDepositData1(record.contractDeposit);
          setContractTotalPriceData1(record.contractTotalPrice);
        }
      });
    } else console.log('Lỗi');
  }, [isLoad]);

  // ===========================================

  const [images2, setImage2] = useState([]);

  const images = updateRequestServiceState.media.map((img, index) => {
    console.log('test31', index);

    if (!img.mediaUrl.includes('.mp4')) {
      return (
        <Image
          style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
          width={150}
          src={img.mediaUrl}
        ></Image>
      );
    }
    return (
      <video
        controls
        style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
        key={img.mediaId}
        src={img.mediaUrl}
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
    let validate = true;
    if (!mainStaffCoordinator || mainStaffCoordinator === 'undefined') {
      validate = false;
      message.warning('Chưa chọn thợ chính');
    }
    if(!priorityData) {
      validate = false;
      message.warning('Chưa chọn độ ưu tiên');
    }
    if (staffCoordinator.length === 0) {
      validate = false;
      message.warning('Chưa chọn thợ phụ');
    } else {
      const assignWorker = {
        requestDetailID: values,
        priority: priorityData,
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
    }
  };

  const { Option } = Select;

  function onChange(value, requestDetailId, index) {
    console.log('changed', value);
    console.log('changedId', requestDetailId);
    console.log('changedindex', index);
    if (updatePriceRequestDetailsData[index]) {
      console.log('Mảng rỗng');
      updatePriceRequestDetailsData[index].requestDetailPrice = value;
      setUpdatePriceRequestDetailsData([...updatePriceRequestDetailsData]);

    } else {
      setUpdatePriceRequestDetailsData([
        ...updatePriceRequestDetailsData,
        { requestDetailID: requestDetailId, requestDetailPrice: value },
      ]);
    }
  }

  const result = updatePriceRequestDetailsData.reduce((item, index) => (item = item + index.requestDetailPrice), 0);
  // console.log('totalPrice', result);

  function onChangeStartDateToEndDate(value, date) {
    console.log('changed', value);
    console.log('changed2', date);
    console.log('changeddate', contractStartDateData1);
    console.log('changeddateend', contractEndDateData1);

    console.log('changed22', date[0]);
    setContractStartDateData(date[0]);
    setContractEndDateData(date[1]);
  }


  function onChangeStartDate(value, date) {
    setContractStartDateData(date);
  }

  function onChangeEndDate(value, date) {
    setContractEndDateData(date);
  }

  function onChangePriority(value) {
    setPriorityData(value);
  }

  function onChangeMessages(value) {
    setMessageDataRecord(value.target.value);
  }

  function onChangeAdjustedQuantityNew(value) {
    setQuantityNewDataRecord(value);
  }
  
  function handleChangeMainWorker(value) {
    setMainStaffCoordinator(value);
    console.log(`selected ${value}`);
  }

  function handleChange(value) {
    setStaffCoordinator([...value]);
    console.log(`selected ${value}`);
    // console.log('selected1', staffCoordinator);
  }

  const onAcceptRequestMaterial = (values) => {
    const update = normalizeReportForm(formData);
    return approveStatusRequestMaterial(values, update).then(
      () => console.log('abcformAccept', formData),
      console.log('abcvaluesAccept', values),
    );
  };

  const showModalAdjusted = (record) => {
    setMaterialIdDataRecord(record.usedMaterialId);
    setVisible(true);
  };

  const showModalDeny = (record) => {
    setMaterialIdDataRecord(record.usedMaterialId);
    setVisible1(true);
  };

  const showModalLoadImgVideo = (record) => {
    setImgReportRecord(record.tblMedia);
    setVisible2(true);
  };

  const onDenyModal = () => {
    form
      .validateFields()
      .then((res) => {
        setConfirmLoading(true);
        return denyStatusRequestMaterial(materialIdDataRecord, messageDataRecord);
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

  const onAdjustedModal = () => {
    form
      .validateFields()
      .then((res) => {
        setConfirmLoading(true);
        return updateRequestMaterial(materialIdDataRecord, quantityNewDataRecord, messageDataRecord);
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
    setVisible2(false);

  };

  const onCreateContract = () => {
    let validate = true;
    // if (!Url) {
    //   validate = false;
    //   message.warning('Chưa tải hợp đồng lên');
    // }
    const filesFormats = ['application/pdf'];
    const isRightFormat = filesFormats.includes(file.type);
    if (file == null) {
      message.error('Vui lòng chọn tệp');
    }
    if (!isRightFormat) {
      message.error('Bạn chỉ có thể tải lên file pdf');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('File phải nhỏ hơn 2MB!');
    }

    if (!contractStartDateData) {
      validate = false;
      message.warning('Chưa chọn ngày bắt đầu thi công');
    }
    if (!contractEndDateData) {
      validate = false;
      message.warning('Chưa chọn ngày kết thúc thi công');
    }
    if (!validate) {
      console.log('Không gửi được');
    } else {
      upload();
      console.log('Gửi được');
      const createContractValues = {
        userId: userID,
        username: customerName,
        contractUrl: Url,
        requestId: updateRequestServiceState.requestServiceId,
        contractStartDate: contractStartDateData,
        contractEndDate: contractEndDateData,
        contractDeposit: contractDepositData,
        contractTotalPrice: result,
        updatePriceRequestDetails: updatePriceRequestDetailsData,
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
  };

  const onCreateInvoice = () =>  {
    return createInvoice(updateRequestServiceState.requestServiceId, invoiceTotalPrice)
    .then((res) => {
    })
  }

  function onOpenNewWindown() {
    window.open(contractUrl);
  }

  const changeValueDeposit = contractDepositData1 * 100;

  const enableContractForm = () => {
    // console.log('worker1', workerByServiceId);
    setDisable(false);
    setContractTotalPriceData1(null);
  };

  const getWorkerByServiceId = (serviceId) => {
    getWorkerByServiceID(serviceId).then((record) => {
      console.log('workerer', record);
      // record.map((e) => {
      //   console.log("workerer1",e)
      // })
      setWorkerByServiceId(record);
    });
  };

  

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
    // {
    //   title: 'requestDetailId',
    //   dataIndex: 'requestDetailId',
    //   show: false,
    //   search: false,
    //   render: (text, record, index) => {
    //     return <div>{record.requestDetailId}</div>;
    //   },
    // },
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
      title: 'Trạng thái',
      dataIndex: 'requestDetailStatus',
      search: false,
      valueEnum: {
        2: {
          text: 'Chưa xử lý',
          status: 'Default',
        },
        6: {
          text: 'Đang sửa chữa',
          status: 'Processing',
        },
        9: {
          text: 'Chờ KH xác nhận',
          status: 'Warning',
        },
        11: {
          text: 'Hài lòng',
          status: 'Success',
        },
        12: {
          text: 'Không hài lòng',
          status: 'Error',
        },
      },
    },
    {
      title: 'Giá trị sửa chữa',
      dataIndex: 'requestDetailPrice',
      search: false,
      render: (text, record, index) => {
        return (
          <InputNumber
            disabled={disable}
            placeholder="Nhập giá"
            // defaultValue={record.requestDetailPrice}
            min={0}
            style={{ width: 150 }}
            formatter={(value) => `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\s\VND?|(,*)/g, '')}
            onChange={(value) => onChange(value, record.requestDetailId, index)}
          />
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
        return <div>{record?.service?.serviceName}</div>;
      },
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'serviceDescription',
      search: false,
      show: false,
      render: () => {
        return (
          <CommonSelect.SelectRequestServicePriority style={{width:160}} onChange={onChangePriority} />
        );
      },
    },
    {
      title:
        'Thợ nhập vật liệu & báo cáo \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 Thợ phụ \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 Hành động',
      key: 'action',
      disabled: true,
      search: false,
      render: (text, record) => {
        const updateWorkerState = { ...record };
        console.log('abc11', updateWorkerState);
        // getWorkerByServiceId(record.serviceId);

        return (
          <Space size="middle">
            <Select
              allowClear
              style={{ width: 200 }}
              placeholder="Chọn thợ chính"
              onChange={handleChangeMainWorker}
            >
              {/* {workerByServiceId.map((option) => (
                <Option key={option.userId}>{option.fullName}</Option>
              ))} */}
              {workerRecord.map((option) => (
                <Option key={option.userID}>{option.fullName}</Option>
              ))}
            </Select>
            <Select
              mode="tags"
              allowClear
              style={{ width: 200 }}
              placeholder="Chọn thợ phụ"
              onChange={handleChange}
            >
              {/* {workerByServiceId.map((option) => (
                <Option key={option.userId}>{option.fullName}</Option>
              ))} */}
              {workerRecord.map((option) => (
                <Option key={option.userID}>{option.fullName}</Option>
              ))}
            </Select>
            <Button
              disabled={disableStaffCoordinator}
              onClick={() => onStaffCoordinator(updateWorkerState.requestDetailId)}
              onChange={handleChange && handleChangeMainWorker}
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
        setContractUrl(record.contractUrl);
        return (
          <Space size="middle">
            <a onClick={onOpenNewWindown}>Xem hợp đồng</a>
            <a onClick={onOpenNewWindown}>Tải xuống & in</a>
            {record.requestServiceId === updateRequestServiceState.requestServiceId && (
              <a onClick={enableContractForm}>Sửa hợp đồng</a>
            )}
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
    },
    {
      title: 'Số lượng mới',
      dataIndex: 'quantityNew',
      search: false,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      search: false,
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
        // console.log("record01", record);
        return <div>{record?.status?.statusName}</div>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      search: false,
      render: (text, record) => {
        const updateRequestMaterialState = { ...record };
        console.log('abcMate12', updateRequestMaterialState);
        
        return (
          <Space size="middle">
            {record?.status?.statusId !== 3 && record?.status?.statusId !== 1 && (
              <Space>
                <Button
                  type="primary"
                  onClick={() => onAcceptRequestMaterial(updateRequestMaterialState.usedMaterialId)}
                >
                  Đồng ý
                </Button>
                <Button type="danger" onClick={() => showModalDeny(record)}>
                  Từ chối
                </Button>
                <Button type="Info" onClick={() => showModalAdjusted(record)}>
                  Điều chỉnh
                </Button>
              </Space>
            )}
            <Modal
              title="Từ chối"
              visible={visible1}
              onOk={onDenyModal}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <ProForm.Item
                  name="message"
                  label="Ghi chú"
                  row={6}
                >
                  <Input.TextArea
                    placeholder="Nhập lý do từ chối"
                    row={6}
                    style={{ width: '450px' }}
                    onChange={onChangeMessages}
                  />
                </ProForm.Item>
            </Modal>
            <Modal
              title="Điều chỉnh"
              visible={visible}
              onOk={onAdjustedModal}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <div>
                <ProForm.Item
                  name="quantityNew"
                  label="Số lượng"
                  rules={[
                    {
                      required: true,
                      type: 'integer',
                      message: 'Vui lòng nhập số lượng',
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập số lượng"
                    style={{ width: '450px' }}
                    min={1}
                    onChange={onChangeAdjustedQuantityNew}
                  />
                </ProForm.Item>
                <ProForm.Item
                  name="message"
                  label="Ghi chú"
                  row={6}
                >
                  <Input.TextArea
                    placeholder="Nhập ghi chú cho thợ"
                    row={6}
                    style={{ width: '450px' }}
                    onChange={onChangeMessages}
                  />
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
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      search: false,
      render: (text, record) => {
        return <div>{record?.requestDetail.service.serviceName}</div>;
      },
    },
    {
      title: 'Báo cáo kết quả',
      dataIndex: 'reportTitle',
      search: false,
    },
    {
      title: 'Mô tả báo cáo',
      dataIndex: 'reportDescription',
      search: false,
    },
    {
      title: 'Ngày báo cáo',
      dataIndex: 'reportDate',
      search: false,
      render: (text, record) => {
        return <div>{moment(record.reportDate).format('D/M/Y')}</div>;
      },
    },
    {
      title: 'Hình ảnh & video của báo cáo',
      // dataIndex: 'reportDate',
      search: false,
      render: (text, record) => {
        const img = { ...record };
        return (
          <Space size="middle">
            <a onClick={() => showModalLoadImgVideo(record)}>Xem hình ảnh & video</a>
          </Space>
        );
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
          <Divider style={{ marginBottom: 32 }} />

          {/* XEM ẢNH & VIDEO */}
          <div className={styles.title} style={{ marginBottom: '0px' }}>
            Hình ảnh & video của công trình
          </div>
          {images}

          <Divider style={{ marginBottom: 32 }} />

          {/* XEM DANH SÁCH HỢP ĐỒNG */}
          <div className={styles.title} ref={myRef}>Danh sách hợp đồng</div>
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
              <a onClick={enableContractForm} href={createContractFile}>
                Lập hợp đồng sửa chữa & báo giá
              </a>
            </Button>
          </Row>

          <Divider style={{ marginBottom: 32 }} />

          {/* UPLOAD HỢP ĐỒNG */}
          <div className={styles.title}>Thông tin tạo hợp đồng</div>
          <Row gutter={16}>
            <Col span={10}>
              <ProForm.Item
                name={customerName}
                label="Tên chủ hợp đồng"
                initialValue={customerName}
              >
                <Input disabled={disable} readOnly placeholder="Không có" />
              </ProForm.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={10}>
              <ProForm.Item 
                name="contractStartDate&&contractEndDate"
                // name={contractStartDateData1&&contractEndDateData1}
                label="Ngày bắt đầu và kết thúc thi công"
                // initialValue={contractStartDateData1&&contractEndDateData1}
                >
                <RangePicker 
                  disabled={disable}
                  // defaultPickerValue={contractStartDateData1&&contractEndDateData1} 
                  onChange={onChangeStartDateToEndDate} 
                  disabledDate={d => !d || d.isSameOrBefore(moment().startOf('day')) }
                  style={{ width:390 }} format="YYYY-MM-DD"
                  placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                  />
              </ProForm.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={10}>
              {contractStartDateData1 ? (
                <ProForm.Item
                  name={contractStartDateData1}
                  label="Ngày bắt đầu thi công"
                  initialValue={moment(contractStartDateData1, 'YYYY-MM-DD')}
                >
                  <DatePicker
                    disabled={disable}
                    defaultValue={moment(contractStartDateData1, 'YYYY-MM-DD')}
                    onChange={onChangeStartDate}
                    disabledDate={(d) => !d || d.isBefore(moment().startOf('day'))}
                    style={{ width: 390 }}
                    format="YYYY-MM-DD"
                    placeholder={['Chọn ngày kết thúc']}
                  />
                </ProForm.Item>
              ) : (
                <ProForm.Item name="contractStartDate" label="Ngày bắt đầu thi công">
                  <DatePicker
                    disabled={disable}
                    onChange={onChangeStartDate}
                    disabledDate={(d) => !d || d.isBefore(moment().startOf('day'))}
                    style={{ width: 390 }}
                    format="YYYY-MM-DD"
                    placeholder={['Chọn ngày bắt đầu']}
                  />
                </ProForm.Item>
              )}
            </Col>
            <Col span={10}>
              {contractEndDateData1 ? (
                <ProForm.Item
                  name={contractEndDateData1}
                  label="Ngày kết thúc thi công"
                  initialValue={moment(contractEndDateData1, 'YYYY-MM-DD')}
                >
                  <DatePicker
                    disabled={disable}
                    defaultValue={moment(contractEndDateData1, 'YYYY-MM-DD')}
                    onChange={onChangeEndDate}
                    disabledDate={(d) => !d || d.isBefore(moment().startOf('day'))}
                    style={{ width: 390 }}
                    format="YYYY-MM-DD"
                    placeholder={['Chọn ngày kết thúc']}
                  />
                </ProForm.Item>
              ) : (
                <ProForm.Item name="contractEndDate" label="Ngày kết thúc thi công">
                  <DatePicker
                    disabled={disable}
                    onChange={onChangeEndDate}
                    disabledDate={(d) => !d || d.isBefore(moment().startOf('day'))}
                    style={{ width: 390 }}
                    format="YYYY-MM-DD"
                    placeholder={['Chọn ngày kết thúc']}
                  />
                </ProForm.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              {contractDepositData1 ? (
                <ProForm.Item
                  // name="contractDeposit"
                  name={contractDepositData1}
                  label="Đặt cọc"
                  initialValue={contractDepositData1}
                >
                  <Select
                    disabled={disable}
                    defaultValue={contractDepositData1}
                    onChange={setContractDepositData}
                  >
                    <Option value={0}>0%</Option>
                    <Option value={0.1}>10%</Option>
                    <Option value={0.3}>30%</Option>
                    <Option value={0.5}>50%</Option>
                    <Option value={0.7}>70%</Option>
                  </Select>
                </ProForm.Item>
              ) : (
                <ProForm.Item name="contractDeposit" label="Đặt cọc">
                  <Select disabled={disable} defaultValue={0} onChange={setContractDepositData}>
                    <Option value={0}>0%</Option>
                    <Option value={0.1}>10%</Option>
                    <Option value={0.3}>30%</Option>
                    <Option value={0.5}>50%</Option>
                    <Option value={0.7}>70%</Option>
                  </Select>
                </ProForm.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              {contractTotalPriceData1 ? (
                <ProForm.Item
                  name={contractTotalPriceData1}
                  label="Tổng giá trị hợp đồng (Không bao gồm Thuế Giá Trị Gia Tăng)"
                  initialValue={contractTotalPriceData1}
                >
                  <InputNumber
                    disabled={disable}
                    style={{ width: 390 }}
                    min={0}
                    formatter={(value) => `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\s\VND?|(,*)/g, '')}
                    onChange={setContractTotalPriceData}
                    readOnly
                  />
                </ProForm.Item>
              ) : (
                <ProForm.Item
                  name={result}
                  label="Tổng giá trị hợp đồng (Không bao gồm Thuế Giá Trị Gia Tăng)"
                  initialValue={result}
                >
                  <InputNumber
                    disabled={disable}
                    style={{ width: 390 }}
                    // value={result}
                    min={0}
                    formatter={(value) => `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\s\VND?|(,*)/g, '')}
                    onChange={setContractTotalPriceData}
                    readOnly
                  />
                </ProForm.Item>
              )}
            </Col>
          </Row>

          {/* XEM DỊCH VỤ */}
          <div className={styles.title} style={{ marginTop: 50 }}>
            Chi tiết dịch vụ
          </div>
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
            // rowKey="requestDetailId"
            // dataSource={requestServiceRecord.map((e) => e)}
            dataSource={requestServiceRecord}
          />

          <Row style={{ marginTop: '50px', justifyContent: 'space-evenly' }}>
            <Upload
              maxCount={1}
              onChange={(e) => {
                setFile(e.fileList[0]);
              }}
            >
              <Button
                disabled={disable}
                // onChange={(e)=>{setFile(e.target.files[0])}}
                // onChange={(e)=>{console.log("file", e)}}
                icon={<UploadOutlined />}
                style={{ width: 250 }}
                
              >
                Chọn file
              </Button>
            </Upload>
            <Button
              disabled={disable}
              type="primary"
              style={{ width: '25%' }}
              onClick={() => {
                onCreateContract();
              }}
            >
              Gửi hợp đồng
            </Button>
            <Button
              disabled={disableInvoice}
              type="primary"
              style={{ width: '25%' }}
              // onClick={() => {
              //   onCreateInvoice();
              // }}
            >
              Gửi hoá đơn
            </Button>
          </Row>

          {/* <Row>
            <p>
              <a href={Url}>{Url}</a>
            </p>
          </Row> */}

          <Divider style={{ marginBottom: 32 }} />

          <div className={styles.title}>Điều phối thợ</div>
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

          {/* <Divider style={{ marginBottom: 32 }} /> */}

          <BackTop type='primary'>
            <div className={styles.style}>UP</div>
          </BackTop>
          <button onClick={() => executeScroll(myRef)}> Click to scroll </button> 
          {/* XEM ẢNH & VIDEO */}
          <Modal
              title="Hình ảnh & video"
              visible={visible2}
              onOk={() => handleCancel()}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              {imgReportRecord.length > 0 && imgReportRecord.map((data) => {
                console.log('test32', data);
                if (!data?.mediaUrl.includes('.mp4')) {
                  return (
                    <Image
                      style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
                      width={150}
                      src={data?.mediaUrl}
                    ></Image>
                  );
                }
                return (
                  <video
                    controls
                    style={{ width: '150px', height: '200px', paddingLeft: '5px' }}
                    key={data?.mediaId}
                    src={data?.mediaUrl}
                  />
                );
              })}
            </Modal>


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
            <AsyncButton title="Xác nhận" btnProps={{ type: 'primary', icon: <CheckOutlined /> }} />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default DetailRequestService;
