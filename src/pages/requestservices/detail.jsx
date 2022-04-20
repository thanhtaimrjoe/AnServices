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
  Table,
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
  cancelServiceRequest,
  completeServiceRequest,
  getAllServiceRequestDetailsByServiceRequestID,
  getRepairDetailByServiceRequestID,
  getServiceRequestByID,
  getTest,
  reworkRequestDetail,
  surveyingServiceRequest,
} from '@/services/requestservices';
import {
  denyStatusRequestMaterial,
  getAllMaterialByRequestDetailID,
  updateRequestMaterial,
  approveStatusRequestMaterial,
  getRequestMaterialByID,
  getAllMaterialByServiceRequestID,
} from '@/services/requestmaterials';
import { getAllWorkers, getWorkerByServiceID } from '@/services/workers';
import { getContractByServiceRequestID, getContractListByUserID } from '@/services/contracts';
import ProForm, { ProFormTextArea, ProFormDatePicker } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import {
  CheckOutlined,
  CloseOutlined,
  FieldTimeOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  RollbackOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { getAllReportByServiceRequestID } from '@/services/reports';
import storage from '../firebase/firebase';
import { createContract } from '@/services/contracts';
import CommonSelect from '@/components/CommonSelect/CommonSelect';
import { createInvoice, getInfomationInvoiceByServiceRequestID } from '@/services/invoice';
import { getInformationPromotionByID } from '@/services/promotion';
import axios from 'axios';
import { sendEmail } from '@/services/invoice';

const DetailServiceRequest = (props) => {
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
  const [customerPhone, setCustomerPhone] = useState();
  const [customerAddress, setCustomerAddress] = useState();
  const [serviceRequestPackage, setServiceRequestPackage] = useState();
  const [serviceRequestDescription, setServiceRequestDescription] = useState();
  const [userID, setUserID] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [serviceRequestReference, setServiceRequestReference] = useState();
  const [serviceDescription, setServiceDescription] = useState();
  const [serviceRequestCreateDate, setServiceRequestCreateDate] = useState();
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
  const [sendContractConfirmLoading, setSendContractConfirmLoading] = React.useState(false);
  const [sendInvoiceConfirmLoading, setSendInvoiceConfirmLoading] = React.useState(false);
  const [staffCoordinatorConfirmLoading, setStaffCoordinatorConfirmLoading] = React.useState(false);
  const [okConfirmLoading, setOkConfirmLoading] = React.useState(false);
  const [sendInvoiceToCustomerConfirmLoading,setSendInvoiceToCustomerConfirmLoading] = React.useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [staffCoordinator, setStaffCoordinator] = useState([]);
  const [mainStaffCoordinator, setMainStaffCoordinator] = useState();
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visibleInvoice, setVisibleInvoice] = React.useState(false);
  const [visibleConfirmContract, setVisibleConfirmContract] = React.useState(false);
  const [visibleSendInvoiceToCustomer, setVisibleSendInvoiceToCustomer] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [disableInvoice, setDisableInvoice] = React.useState(true);
  const [disableStaffCoordinator, setDisableStaffCoordinator] = React.useState(true);
  const [disableRejectServicerRequest, setDisableRejectServicerRequest] = React.useState(true);
  const [disableCompleteServicerRequest, setDisableCompleteServicerRequest] = React.useState(true);
  const [disableSurveyingServicerRequest, setDisableSurveyingServicerRequest] = React.useState(true);
  const [disableCreateContract, setDisableCreateContract] = React.useState(true);
  const [disableWaitForPayAndCompletedServicerRequest,setDisableWaitForPayAndCompletedServicerRequest] = React.useState(false);
  const [updatePriceRequestDetailsData, setUpdatePriceRequestDetailsData] = useState([]);
  const [updateNameAndPriceRequestDetailsData, setUpdateNameAndPriceRequestDetailsData] = useState([]);
  const { RangePicker } = DatePicker;
  const [totalPrice, setTotalPrice] = useState([]);
  const [invoiceTotalPrice, setInvoiceTotalPrice] = useState([]);
  const [promotionValueRecord, setPromotionValueRecord] = useState();
  const [newRequestServiceState, setNewRequestServiceState] = useState();

  const [getAllWorkerByTypeJob, setGetAllWorkerByTypeJob] = useState([]);


  // Invoice
  const [contractStartDate, setContractStartDate] = useState();
  const [contractEndDate, setContractEndDate] = useState();
  const [contractDeposit, setContractDeposit] = useState();
  const [contractDeposit1, setContractDeposit1] = useState();
  const [contractTotalPrice, setContractTotalPrice] = useState();
  const [contractTotalPrice1, setContractTotalPrice1] = useState();
  const [contractDetails, setContractDetails] = useState([]);
  const [promotionValue, setPromotionValue] = useState([]);

  // Upload file to Firebase
  const [file, setFile] = useState('');
  const [Url, setUrl] = useState('');
  const upload = async () => {
    try {
      const fileName = Date.now() + file.name;
      // const fileName = file.name;

      await storage.ref(`/files/${fileName}`).put(file);

      const url = await storage.ref('files').child(fileName).getDownloadURL();
      if (url) {
        message.success(`Tải ${file.name} lên thành công`);
        setUrl(url);
        return url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Upload images to API with form-data
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileImageInvoice, setFileImageInvoice] = useState();
  const [fileImageName, setFileImageName] = useState();

  const saveImageInvoice = (e) => {
    let validate = true;

    const isJpgOrPng =
      e.file.originFileObj.type === 'image/jpeg' || e.file.originFileObj.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ có thể chọn hình với đuôi .JPG/PNG! Vui lòng chọn hình khác');
      validate = false;
    }
    const isLt2M = e.file.originFileObj.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Hình phải nhỏ hơn 2MB! Vui lòng chọn hình khác');
      validate = false;
    }

    if (e.file.originFileObj == null) {
      message.error('Vui lòng chọn hình');
      validate = false;
    }

    if (validate) {
      message.success('Hình hợp lệ');
      setFileImageInvoice(e.file.originFileObj);
      setFileImageName(e.file.originFileObj.name);
    }
  };

  const uploadImageInvoice = async (e) => {
    setSendInvoiceToCustomerConfirmLoading(true);
    setTimeout(() => {
      setSendInvoiceToCustomerConfirmLoading(false);
    }, 2000);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    let formImageData = new FormData();
    // formImageData.append('UserID', updateRequestServiceState.customer.userId);
    formImageData.append('UserID', 90);
    formImageData.append('files', fileImageInvoice);
    try {
      await axios
        .post(
          `https://anservice-capstone.conveyor.cloud/api/User/SendEmail?userID=${updateRequestServiceState.customer.userId}`,
          formImageData,
          config,
        )
        .then((res) => {
          if (res.status === 200) {
            message.success('Đã gửi hoá đơn cho khách thành công');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    } catch (error) {
      message.error('Gửi hoá đơn cho khách không thành công');
    }
  };

  function getBase64(img) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview = async (img) => {
    const imgs = img;
    // if (!imgs.thumbUr) {
    imgs.preview = await getBase64(imgs.originFileObj);
    // }

    setPreviewImage(imgs.preview);
    setPreviewVisible(true);
    setPreviewTitle(imgs.originFileObj.name);
  };

  // ======================================

  const steps = [
    {
      title: 'Thông tin chung',
      content: () => (
        <BasicStep
        customerName={customerName}
        customerPhone={customerPhone}
        customerAddress={customerAddress}
        userID={userID}
        fullName={fullName}
        phoneNumber={phoneNumber}
        address={address}
        serviceRequestDescription={serviceRequestDescription}
        requestServiceCreateDate={serviceRequestCreateDate}
        serviceRequestReference={serviceRequestReference}
        serviceRequestPackage={serviceRequestPackage}
        />
      ),
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(updateRequestServiceState);
    getServiceRequestByID(updateRequestServiceState.serviceRequestId).then((res) => {
      setNewRequestServiceState(res);
      setCustomerName(res.customerName);
      setCustomerPhone(res.customerPhone);
      setCustomerAddress(res.customerAddress);
      setServiceRequestPackage(res.serviceRequestPackage);
      setServiceRequestDescription(res.serviceRequestDescription);
      setUserID(res.customer.userId);
      setFullName(res.customer.fullName);
      setPhoneNumber(res.customer.phoneNumber);
      setAddress(res.customer.address);
      setServiceRequestReference(res.serviceRequestReference);
      setServiceRequestCreateDate(res.serviceRequestCreateDate.split('T', 1));
      setServiceRequestCreateDate(moment(res.serviceRequestCreateDate).format('DD/MM/YYYY'));

      if (res.serviceRequestStatus === 15) {
        setDisableRejectServicerRequest(false);
        setDisableCreateContract(false);
      }

      if (res.serviceRequestStatus === 2) {
        setDisableSurveyingServicerRequest(false);
        setDisableRejectServicerRequest(false);
      }

      if (res.serviceRequestStatus === 14) {
        setDisableCompleteServicerRequest(false);
      }

      if (res.serviceRequestStatus === 13 || res.serviceRequestStatus === 14) {
        setDisableWaitForPayAndCompletedServicerRequest(true);
        getInfomationInvoiceByServiceRequestID(updateRequestServiceState.serviceRequestId).then(
          (respones) => {
            if (respones.status === 404) {
              message.warning('Yêu cầu này chưa có hoá đơn');
            } else {
              setContractStartDate(moment(respones.contractStartDate).format('DD/MM/YYYY'));
              setContractEndDate(moment(respones.contractEndDate).format('DD/MM/YYYY'));
              setContractDeposit(respones.contractDeposit * 100);
              setContractDeposit1(respones.contractDeposit);
              setContractTotalPrice(
                respones.contractTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              );
              setContractTotalPrice1(respones.contractTotalPrice);
              setContractDetails(respones.details);
              if (respones.promotionID === 0) {
                setPromotionValue(0);
              } else {
                getInformationPromotionByID(respones.promotionID).then((record) => {
                  setPromotionValue(record.promotionValue);
                });
              }
            }
          },
        );
      }
    });
  }, [newRequestServiceState]);

  // Data cho chi tiết dịch vụ table
  const [requestServiceRecord, setRequestServiceDetail] = useState([]);
  const [staffCoordinatorRecord, setStaffCoordinatorRecord] = useState([]);
  useEffect(() => {
    getAllServiceRequestDetailsByServiceRequestID(updateRequestServiceState.serviceRequestId)
      // getTest(updateRequestServiceState.serviceRequestId)
      .then((record) => {
        setRequestServiceDetail(record);
        setIsLoad(true);
        let result = 0;
        let tmp = true;
        record.map((e) => {
          if (
            e.requestDetailStatus === 9 ||
            e.requestDetailStatus === 2 ||
            e.requestDetailStatus === 6
          ) {
            tmp = false;
          }
          if (e.requestDetailStatus === 11) {
            result += e.requestDetailPrice;
          }
          // if (e.requestDetailStatus === 11 || e.requestDetailStatus === 16) {
          //   if (e.requestDetailStatus === 11) {
          //     result += e.requestDetailPrice;
          //   }
          //   tmp = true;
          // }
          // else {
          //   tmp = false;
          // }
        });
        if (tmp) {
          setDisableInvoice(false);
        }
        setInvoiceTotalPrice(result);
      })
      .catch(setIsLoad(false));

    getRepairDetailByServiceRequestID(updateRequestServiceState.serviceRequestId).then((record) => {
      setStaffCoordinatorRecord(record);
    });

    if (updateRequestServiceState.promotionId === 0) {
      setPromotionValueRecord(0);
    } else {
      getInformationPromotionByID(updateRequestServiceState.promotionId).then((record) => {
        setPromotionValueRecord(record.promotionValue);
      });
    }
  }, []);

  const [requestMaterialRecord, setRequestMaterialRecord] = useState([]);
  const [contractRecord, setContractRecord] = useState([]);
  const [imgReportRecord, setImgReportRecord] = useState([]);
  const [reportRequestService, setReportRequestService] = useState([]);
  const [priorityData, setPriorityData] = useState();
  const [messageDataRecord, setMessageDataRecord] = useState();
  const [quantityNewDataRecord, setQuantityNewDataRecord] = useState();
  const [materialIdDataRecord, setMaterialIdDataRecord] = useState();
  const [contractIDRecord, setContractIDRecord] = useState();

  // ====================
  // tạo hợp đồng
  const [contractUrl, setContractUrl] = useState();
  const createContractFile =
    'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2Fmau-hop-dong-thi-cong-xay-dung.docx?alt=media&token=070b2352-1ae8-42a4-9850-182a8910a5a6';
  // ====================

  useEffect(() => {
    // Data cho danh sách thợ và hợp đồng
    if (isLoad && updateRequestServiceState) {
      getContractListByUserID(updateRequestServiceState.customer.userId).then((record) => {
        setContractRecord(record);
        record.map((item) => {
          if (item.serviceRequestId === updateRequestServiceState.serviceRequestId) {
            setContractIDRecord(item.contractId);
            if (item.contractStatus === 3) {
              setDisableStaffCoordinator(false);
            }
          }
        });
      });
    }
    // Data cho chi tiết vật tư yêu cầu
    if (isLoad && updateRequestServiceState) {
      getAllMaterialByServiceRequestID(updateRequestServiceState.serviceRequestId).then(
        (record) => {
          setRequestMaterialRecord(record);
        },
      );
    }

    if (isLoad && updateRequestServiceState) {
      getAllReportByServiceRequestID(updateRequestServiceState.serviceRequestId).then((record) => {
        setReportRequestService(record);
      });
    }

    // Dữ liệu hợp đồng (trong chi tiết yêu cầu dịch vụ)
    if (isLoad && updateRequestServiceState) {
      getContractByServiceRequestID(updateRequestServiceState.serviceRequestId).then((record) => {
        if(record.status === 404) {
          setContractStartDateData1(null);
            setContractEndDateData1(null);
            setContractDepositData1(null);
            setContractTotalPriceData1(null);
        } else {
            // mới sửa
            // setContractStartDateData1(record.contractStartDate.split('T', 1));
            // setContractEndDateData1(record.contractEndDate.split('T', 1));
            // setContractStartDateData(record.contractStartDate.split('T', 1));
            // setContractEndDateData(record.contractEndDate.split('T', 1));
  
            // setContractStartDateData1(moment(record.contractStartDate).format('DD/MM/YYYY'));
            // setContractEndDateData1(moment(record.contractEndDate).format('DD/MM/YYYY'));
            // setContractStartDateData(moment(record.contractStartDate).format('DD/MM/YYYY'));
            // setContractEndDateData(moment(record.contractEndDate).format('DD/MM/YYYY'));
  
            setContractStartDateData1(record.contractStartDate);
            setContractEndDateData1(record.contractEndDate);
            setContractDepositData1(record.contractDeposit);
            setContractTotalPriceData1(record.contractTotalPrice);
            setContractDepositData(record.contractDeposit);
            setContractStartDateData(record.contractStartDate);
            setContractEndDateData(record.contractEndDate);
          }
      });
    } else console.log('Lỗi');

    // load worker by service id
    if (requestServiceRecord.length > 0) {
      const requestServiceRecordTmp = requestServiceRecord;

      requestServiceRecordTmp.map((item) => {
        const items = item;
        getWorkerByServiceID(item.serviceId).then((record) => {
          items.worker = record;
          record.map((item1, index) => {
            items.worker[index].task = item1.tblRepairDetails.length;
          })
        });
      });
      setRequestServiceDetail(requestServiceRecordTmp);
    }
  }, [isLoad]);

  // ===========================================

  const images = updateRequestServiceState.tblMedia.map((img, index) => {
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

  const onRejectorCancelServiceRequest = () => {
    // const update = normalizeReportForm(formData);
    return cancelServiceRequest(updateRequestServiceState.serviceRequestId).then(
      () => history.replace('/requestservices/list'),
      message.success(
        `Yêu cầu '${updateRequestServiceState.serviceRequestDescription}' đã được từ chối thành công`,
      ),
    );
  };

  const onReworkServiceRequest = (value) => {
    // const update = normalizeReportForm(formData);
    return reworkRequestDetail(value.requestDetailId).then(
      (res) => window.location.reload(),
      message.success(`Dịch vụ ${value?.service?.serviceName} đã được yêu cầu làm lại`),
    );
  };

  const onSurveyingServiceRequest = () => {
    // const update = normalizeReportForm(formData);
    return surveyingServiceRequest(updateRequestServiceState.serviceRequestId).then(
      () => history.replace('/requestservices/list'),
      message.success(
        `Yêu cầu '${updateRequestServiceState.serviceRequestDescription}' đã được goi khảo sát thành công`,
      ),
    );
  };

  const onCompleteServiceRequest = () => {
    // const update = normalizeReportForm(formData);
    return completeServiceRequest(updateRequestServiceState.serviceRequestId).then(
      () => history.replace('/requestservices/list'),
      message.success(`Yêu cầu '${updateRequestServiceState.serviceRequestDescription}' hoàn thành`),
    );
  };

  const onBackList = () => {
    history.replace('/requestservices/list');
  };

  const onStaffCoordinator = (values, updateWorkerState) => {
    console.log('firstvalues', updateWorkerState)
    let validate = true;
    if (!mainStaffCoordinator || mainStaffCoordinator === 'undefined') {
      validate = false;
      message.warning('Chưa chọn thợ chính');
    }
    if (!priorityData) {
      validate = false;
      message.warning('Chưa chọn độ ưu tiên');
    }
    // if (staffCoordinator.length === 0) {
    //   validate = false;
    //   message.warning('Chưa chọn thợ phụ');
    // }
    if(validate) {
      setStaffCoordinatorConfirmLoading(true);
      setTimeout(() => {
        setStaffCoordinatorConfirmLoading(false);
      }, 2000);

      const assignWorker = {
        requestDetailID: values,
        priority: priorityData,
        mainWorker: mainStaffCoordinator,
        workerList: staffCoordinator,
      };
      // const createServiceRequestData = normalizeReportForm(formData);
      return assignWorkerToRequest(assignWorker)
        .then(() => {
          // requestServiceRecord.resetFields();
          message.success(`Điều phối thợ cho yêu cầu '${updateWorkerState.service.serviceName}' thành công`)
          setPriorityData(null);
          setMainStaffCoordinator(null);
          setStaffCoordinator([]);
        })
        .catch((info) => {
          console.log('Xác thực không thành công:', info);
        })
        .finally();
    }
  };

  const { Option } = Select;

  function onChange(value, requestDetailId, index) {
    if (updatePriceRequestDetailsData[index]) {
      updatePriceRequestDetailsData[index].requestDetailPrice = value;
      setUpdatePriceRequestDetailsData([...updatePriceRequestDetailsData]);
    } else {
      setUpdatePriceRequestDetailsData([
        ...updatePriceRequestDetailsData,
        {
          requestDetailID: requestDetailId,
          requestDetailPrice: value,
        },
      ]);
    }
  }

  const result = updatePriceRequestDetailsData.reduce(
    (item, index) => (item = item + index.requestDetailPrice),
    0,
  );

  const usedServivesPrice = contractDetails.reduce(
    (item, index) => (item = item + index.requestDetailPrice),
    0,
  );
  const contractDepositPrice = contractTotalPrice1 * contractDeposit1;
  const promotionValuePrice = usedServivesPrice * promotionValue;
  const VATPrice = usedServivesPrice * 0.1;
  const officialPrice = usedServivesPrice - contractDepositPrice - promotionValuePrice + VATPrice;

  const usedServivesPriceFormat = usedServivesPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const contractDepositPriceFormat = contractDepositPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const promotionValuePriceFormat = promotionValuePrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const VATPriceFormat = VATPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const officialPriceFormat = officialPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  function onChangeStartDateToEndDate(value, date) {
    console.log('changed', value);
    console.log('changed2', date);
    console.log('changeddate', contractStartDateData1);
    console.log('changeddateend', contractEndDateData1);

    console.log('changed22', date[0]);
    setContractStartDateData(date[0]);
    setContractEndDateData(date[1]);
  }

  // mới sửa
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
    // console.log(`selected ${value}`);
  }

  function handleChange(value) {
    setStaffCoordinator([...value]);
  }

  const onAcceptRequestMaterial = (values, updateRequestMaterialState) => {
    console.log('updateRequestMaterialState', updateRequestMaterialState);
    setOkConfirmLoading(true);
    setTimeout(() => {
      setOkConfirmLoading(false);
    }, 2000);

    const update = normalizeReportForm(formData);
    return approveStatusRequestMaterial(values, update).then(() => {
      message.success(`Đã đồng ý yêu cầu vật tư '' thành công `)
      window.location.reload(true);
    });
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

  const showModalInvoice = () => {
    setVisibleInvoice(true);
  };

  const showModalConfirmContract = () => {
    setVisibleConfirmContract(true);
  };

  const showModalSendInvoiceToCustomer = () => {
    setVisibleSendInvoiceToCustomer(true);
  };

  const onDenyModal = () => {
    if (messageDataRecord === undefined) {
      form
        .validateFields()
        .then((res) => {
          setConfirmLoading(true);
          return denyStatusRequestMaterial(materialIdDataRecord, 'Không có ghi chú');
        })
        .then(() => {
          form.resetFields();
          setConfirmLoading(false);
          setVisible1(false);
          message.success(`Đã từ chối yêu cầu vật tư '' thành công `)

          window.location.reload(true);
        })
        .catch((info) => {
          console.log('Xác thực không thành công:', info);
        })
        .finally();
    } else {
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
          message.success(`Đã từ chối yêu cầu vật tư '' thành công `)
          window.location.reload(true);
        })
        .catch((info) => {
          console.log('Xác thực không thành công:', info);
        })
        .finally();
    }
  };

  const onAdjustedModal = () => {
    if (messageDataRecord === undefined) {
      form
        .validateFields()
        .then((res) => {
          setConfirmLoading(true);
          return updateRequestMaterial(
            materialIdDataRecord,
            quantityNewDataRecord,
            'Không có ghi chú',
          );
        })
        .then(() => {
          form.resetFields();
          setConfirmLoading(false);
          setVisible(false);
          message.success(`Đã điều chỉnh yêu cầu vật tư '' thành công `)
          window.location.reload(true);
        })
        .catch((info) => {
          console.log('Xác thực không thành công:', info);
        })
        .finally();
    } else {
      form
        .validateFields()
        .then((res) => {
          setConfirmLoading(true);
          return updateRequestMaterial(
            materialIdDataRecord,
            quantityNewDataRecord,
            messageDataRecord,
          );
        })
        .then(() => {
          form.resetFields();
          setConfirmLoading(false);
          setVisible(false);
          message.success(`Đã điều chỉnh yêu cầu vật tư '' thành công `)
          window.location.reload(true);
        })
        .catch((info) => {
          console.log('Xác thực không thành công:', info);
        })
        .finally();
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setVisible1(false);
    setVisible2(false);
    setVisibleInvoice(false);
    setVisibleSendInvoiceToCustomer(false);
    setVisibleConfirmContract(false);
  };

  const handleCancelpreviewImage = () => {
    setPreviewVisible(false);
  };

  const onCreateContract = async () => {
    setSendContractConfirmLoading(true);
    setTimeout(() => {
      setSendContractConfirmLoading(false);
    }, 2000);
    let validate = true;
    const filesFormats = ['application/pdf'];
    const isRightFormat = filesFormats.includes(file.type);
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (file.length === 0) {
      message.warning('Vui lòng chọn file hợp đồng!');
      validate = false;
    } else if (!isRightFormat) {
      message.error('Bạn chỉ có thể tải lên file pdf. Vui lòng chọn lại!');
      validate = false;
    } else if (!isLt2M) {
      message.error('File phải nhỏ hơn 2MB! Vui lòng chọn lại!');
      validate = false;
    }
    if (!contractStartDateData) {
      validate = false;
      message.warning('Chưa chọn ngày bắt đầu thi công');
    }
    if (!contractEndDateData) {
      validate = false;
      message.warning('Chưa chọn ngày kết thúc thi công');
    }
    if(validate) {
      const returnUrl = await upload();
      if (returnUrl) {
        const createContractValues = {
          userId: userID,
          username: customerName,
          contractUrl: returnUrl,
          requestId: updateRequestServiceState.serviceRequestId,
          contractStartDate: contractStartDateData,
          contractEndDate: contractEndDateData,
          contractDeposit: contractDepositData,
          contractTotalPrice: result,
          updatePriceRequestDetails: updatePriceRequestDetailsData,
        };
        const createContractData = normalizeReportForm(createContractValues);
        return createContract(createContractData)
          .then((res) => {
            setConfirmLoading(true);
            message.success('Gửi hợp đồng thành công');
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
          }).then(() => {
            setConfirmLoading(false);
            setVisibleConfirmContract(false); 
          })
          .catch((info) => {
            console.log('Xác thực không thành công:', info);
          })
          .finally();
      }
    }
  };

  const onCreateInvoice = () => {
    setSendInvoiceConfirmLoading(true);
    setTimeout(() => {
      setSendInvoiceConfirmLoading(false);
    }, 2000);

    const createInvoiceData = {
      serviceRequestID: updateRequestServiceState.serviceRequestId,
      contractID: contractIDRecord,
      promotionID: updateRequestServiceState.promotionId,
    };
    return createInvoice(createInvoiceData).then((res) => {
      if (res.status === 400) {
        message.error('Hoá đơn này gửi thất bại, vui lòng thử lại');
      } else {
        message.success(
          `Hoá đơn cho yêu cầu '${updateRequestServiceState.serviceRequestDescription}' đã được gửi`,
        );
        setDisableInvoice(true);
        onBackList();
      }
    });
  };

  function onOpenNewWindown() {
    window.open(contractUrl);
  }

  const enableContractForm = () => {
    setDisable(false);
    setContractTotalPriceData1(null);
  };

  const onSendInvoiceToCustomer = () => {
    setSendInvoiceToCustomerConfirmLoading(true);
    setTimeout(() => {
      setSendInvoiceToCustomerConfirmLoading(false);
    }, 2000);
    // try {
    //   sendEmail(newRequestServiceState.serviceRequestId).then((res) => {
    //     console.log('resstatus', res);
    //     if (res.status === 200 || res.status === 204) {
    //       message.success('Đã gửi hoá đơn cho khách thành công');
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 2000);
    //     }
    //   });
    // } catch (error) {
    //   message.error('Gửi hoá đơn cho khách không thành công');
    // }

    sendEmail(updateRequestServiceState.serviceRequestId).then((res) => {
      console.log('resstatus', res)
      if (res.status === 400) {
        message.error('Gửi hoá đơn cho khách không thành công. Vui lòng thử lại');
      } else {
        message.success(`Đã gửi hoá đơn cho khách '${customerName}' thành công`);
        setTimeout(() => {
          window.location.reload()
          }, 2000);
      }
    })
  };

  // =====================================
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
        return <div>{record?.service?.serviceName}</div>;
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'serviceDescription',
      search: false,
      render: (text, record) => {
        // return <div>{record?.service?.serviceDescription}</div>;
        return <div>Xem Chi Tiết Trong File Hợp Đồng</div>;
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
        16: {
          text: 'Làm lại yêu cầu',
          status: 'Success',
        },
      },
    },
    {
      title: '',
      key: 'typeServiceDecription',
      // width: 200,
      render: (text, record) => {
        const typeServiceDecription = { ...record };
        return (
          <Space>
            {typeServiceDecription.requestDetailStatus === 9 && (
              <a>{text?.service?.typeServiceNavigation?.typeServiceDecription}</a>
            )}
          </Space>
        );
      },
    },
    {
      title: 'Giá trị sửa chữa',
      dataIndex: 'requestDetailPrice',
      search: false,
      render: (text, record, index) => {
        return { record } ? (
          // Có giá trị
          <InputNumber
            disabled={disable}
            placeholder="Nhập giá"
            defaultValue={record.requestDetailPrice}
            min={0}
            style={{ width: 150 }}
            formatter={(value) => `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\s\VND?|(,*)/g, '')}
            onChange={(value) => onChange(value, record.requestDetailId, index)}
          />
        ) : (
          // Không giá trị
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
    {
      title: '',
      key: 'action',
      render: (text, record) => {
        const updateStatus = { ...record };
        return (
          <Space>
            {updateStatus.requestDetailStatus === 12 &&
              updateRequestServiceState.serviceRequestReference === null && (
                <a onClick={() => onReworkServiceRequest(record)}>Làm lại yêu cầu này</a>
              )}
          </Space>
        );
      },
    },
  ];

  // ĐIỀU PHỐI THỢ
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
      render: (text, record) => {
        // console.log('record03', record);
        // record.tblRepairDetails.map((e) => console.log('record04', e));
        return (
          <CommonSelect.SelectRequestServicePriority
            style={{ width: "100%" }}
            onChange={onChangePriority}
          />
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
        // const filteredOptions = getAllWorkerByTypeJob.filter(o => !staffCoordinator.includes(o));
        console.log('staffCoordinator1', getAllWorkerByTypeJob)
        console.log('staffCoordinator', staffCoordinator)
        // getWorkerByServiceId(updateWorkerState.serviceId);
        return (
          <Space size="middle">
            <Select
              allowClear
              style={{ width: 200 }}
              placeholder="Chọn thợ chính"
              onChange={handleChangeMainWorker}
            >
              {/* Lấy tất cả thợ */}
              {record.worker &&
                record.worker.map((option) => (
                  <Option key={option.userId}>{option.fullName}</Option>
                ))} 
            </Select>
            <Select
              mode="tags"
              allowClear
              style={{ width: 200 }}
              placeholder="Chọn thợ phụ"
              onChange={handleChange}
            >
              {/* Lấy tất cả thợ */}
              {record.worker &&
                record.worker.map((option) => (
                  <Option value={option.userId} key={option.userId}>
                    {option.fullName}
                    <br/>
                    Đang làm ở {option.task} công trình
                  </Option>
                ))}
            </Select>
            {/* {record.serviceRequestId === newRequestServiceState.serviceRequestId && (
              <Button
              loading={staffCoordinatorConfirmLoading}
              disabled={disableStaffCoordinator}
              onClick={() => onStaffCoordinator(updateWorkerState.requestDetailId)}
              onChange={handleChange && handleChangeMainWorker}
              state={updateWorkerState}
              type="primary"
              >
                Điều phối thợ
              </Button>
            )} */}

            {/* LẤY TẤT CẢ THỢ */}
            {record?.requestDetailStatus !== 11 && record?.requestDetailStatus !== 16 && (
              <Button
                // loading={staffCoordinatorConfirmLoading}
                disabled={disableStaffCoordinator}
                onClick={() => onStaffCoordinator(updateWorkerState.requestDetailId, updateWorkerState)}
                onChange={handleChange && handleChangeMainWorker}
                state={updateWorkerState}
                type="primary"
              >
                Điều phối thợ
              </Button>
            )}
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
            {newRequestServiceState && (record.serviceRequestId === newRequestServiceState.serviceRequestId) &&
              newRequestServiceState.serviceRequestStatus === 15 && (
                <a onClick={enableContractForm}>Sửa hợp đồng</a>
              )}
            {newRequestServiceState && (record.serviceRequestId !== newRequestServiceState.serviceRequestId) &&
              record.serviceRequestId !== newRequestServiceState.serviceRequestReference && (
                <div>Hợp đồng của yêu cầu khác</div>
              )}

            {newRequestServiceState && (record.serviceRequestId === newRequestServiceState.serviceRequestReference) && (
              <div style={{ color: 'red' }}>Hợp đồng của yêu cầu làm lại</div>
            )}
            {/* {(record.serviceRequestId === newRequestServiceState.serviceRequestReference &&
            newRequestServiceState.serviceRequestStatus === 15) && (
              <a onClick={enableContractForm}>Lập hợp đồng mới</a>
            )} */}
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
        return <div>{record?.status?.statusName}</div>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      search: false,
      render: (text, record) => {
        const updateRequestMaterialState = { ...record };
        return (
          <Space size="middle">
            {record?.status?.statusId !== 3 && record?.status?.statusId !== 1 && (
              <Space>
                <Button
                  type="primary"
                  // loading={okConfirmLoading}
                  onClick={() => onAcceptRequestMaterial(updateRequestMaterialState.usedMaterialId, updateRequestMaterialState)}
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
              <ProForm.Item name="message" label="Ghi chú" row={6}>
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
                <ProForm.Item name="message" label="Ghi chú" row={6}>
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

  const INVOICE = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'requestDetailId',
      search: false,
      render: (text, object, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Tên dịch vụ đã sử dụng',
      dataIndex: 'serviceName',
      key: 'serviceName',
      search: false,
      render: (text, record, index) => {
        return <div>{record.service.serviceName}</div>;
      },
    },
    {
      title: 'Giá dịch vụ đã sử dụng',
      dataIndex: 'requestDetailPrice',
      key: 'requestDetailPrice',
      search: false,
      render: (text, record, index) => {
        return (
          <div>
            {record.requestDetailPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ
          </div>
        );
      },
    },
  ];

  const CONFIRMCONTRACT = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'requestDetailId',
      search: false,
      render: (text, object, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      key: 'serviceName',
      search: false,
      render: (text, record, index) => {
        return <div>{record.service.serviceName}</div>;
      },
    },
    {
      title: 'Giá dịch vụ',
      dataIndex: 'requestDetailPrice',
      key: 'requestDetailPrice',
      search: false,
      render: (text, record, index) => {
          updatePriceRequestDetailsData.map((e) => {
            if(record.requestDetailId === e.requestDetailID)
            {
              return(
                <div>
                  {e.requestDetailPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ
                </div>
              )
            }
          })
      },
    },
  ];

  return (
    <PageContainer title="">
      <Form
        onFinish={onBackList}
        initialValues={newRequestServiceState}
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
          <div className={styles.title}>Danh sách hợp đồng</div>
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
            <Button
              type="primary"
              style={{ marginLeft: '250px', width: '50%' }}
              disabled={disableCreateContract}
            >
              <a onClick={enableContractForm} href={createContractFile}>
                Lập hợp đồng sửa chữa & báo giá
              </a>
            </Button>
          </Row>

          <Divider style={{ marginBottom: 32 }} />

          {/* UPLOAD HỢP ĐỒNG */}
          <div className={styles.title}>Thông tin tạo hợp đồng</div>
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
              {contractStartDateData1 ? (
                <ProForm.Item
                  name={contractStartDateData1}
                  label="Ngày bắt đầu thi công"
                  // initialValue={moment(contractStartDateData1, 'DD/MM/YYYY')}
                  initialValue={moment(contractStartDateData1, 'YYYY/MM/DD')}
                >
                  <DatePicker
                    disabled={disable}
                    defaultValue={moment(contractStartDateData1, 'YYYY/MM/DD')}
                    // value={moment(contractStartDateData1, 'YYYY-MM-DD')}
                    onChange={onChangeStartDate}
                    disabledDate={(d) => !d || d.isBefore(moment().startOf('day'))}
                    style={{ width: '100%' }}
                    format="DD/MM/YYYY"
                    placeholder={['Chọn ngày kết thúc']}
                  />
                </ProForm.Item>
              ) : (
                <ProForm.Item name="contractStartDate" label="Ngày bắt đầu thi công">
                  <DatePicker
                    disabled={disable}
                    onChange={onChangeStartDate}
                    disabledDate={(d) => !d || d.isBefore(moment().startOf('day'))}
                    style={{ width: '100%' }}
                    format="DD/MM/YYYY"
                    placeholder={['Chọn ngày bắt đầu']}
                  />
                </ProForm.Item>
              )}
            </Col>
            <Col span={12}>
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
                    disabledDate={(d) =>
                      !d 
                      || d.isBefore(moment().startOf('day'))
                      || d.isBefore(moment(contractStartDateData, 'YYYY-MM-DD').startOf('day'))
                    }
                    style={{ width: '100%' }}
                    format="DD/MM/YYYY"
                    placeholder={['Chọn ngày kết thúc']}
                  />
                </ProForm.Item>
              ) : (
                <ProForm.Item name="contractEndDate" label="Ngày kết thúc thi công">
                  <DatePicker
                    disabled={disable}
                    onChange={onChangeEndDate}
                    disabledDate={(d) =>
                      !d 
                      || d.isBefore(moment().startOf('day'))
                      || d.isBefore(moment(contractStartDateData, 'YYYY-MM-DD').startOf('day'))
                    }
                    style={{ width: '100%' }}
                    format="DD/MM/YYYY"
                    placeholder={['Chọn ngày kết thúc']}
                  />
                </ProForm.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
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
                    <Option value={0.2}>20%</Option>
                    <Option value={0.3}>30%</Option>
                    <Option value={0.4}>40%</Option>
                    <Option value={0.5}>50%</Option>
                    <Option value={0.6}>60%</Option>
                    <Option value={0.7}>70%</Option>
                  </Select>
                </ProForm.Item>
              ) : (
                <ProForm.Item name="contractDeposit" label="Đặt cọc">
                  <Select disabled={disable} defaultValue={0} onChange={setContractDepositData}>
                    <Option value={0}>0%</Option>
                    <Option value={0.1}>10%</Option>
                    <Option value={0.2}>20%</Option>
                    <Option value={0.3}>30%</Option>
                    <Option value={0.4}>40%</Option>
                    <Option value={0.5}>50%</Option>
                    <Option value={0.6}>60%</Option>
                    <Option value={0.7}>70%</Option>
                  </Select>
                </ProForm.Item>
              )}
            </Col>
            <Col span={12}>
              <ProForm.Item
                // name={promotionValueRecord}
                // initialValue={promotionValueRecord}
                label="Voucher"
              >
                {promotionValueRecord === 0 ? (<Input disabled={disable} value={"Không có voucher được áp dụng"} readOnly />) : (<Input disabled={disable} value={`Áp dụng voucher giảm ${promotionValueRecord * 100}%`} readOnly />)}
              </ProForm.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {contractTotalPriceData1 ? (
                // Có giá trị
                <ProForm.Item
                  name={contractTotalPriceData1}
                  label="Tổng giá trị hợp đồng (Không bao gồm Thuế Giá Trị Gia Tăng)"
                  initialValue={contractTotalPriceData1}
                >
                  <InputNumber
                    disabled={disable}
                    style={{ width: "100%" }}
                    min={0}
                    formatter={(value) => `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\s\VND?|(,*)/g, '')}
                    onChange={setContractTotalPriceData}
                    readOnly
                  />
                </ProForm.Item>
              ) : (
                // Không giá trị
                <ProForm.Item
                  name={result}
                  label="Tổng giá trị hợp đồng (Không bao gồm Thuế Giá Trị Gia Tăng)"
                  initialValue={result}
                >
                  <InputNumber
                    disabled={disable}
                    style={{ width: "100%" }}
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
                setFile(e.file.originFileObj);
              }}
            >
              <Button disabled={disable} icon={<UploadOutlined />} style={{ width: 250 }}>
                Chọn file
              </Button>
            </Upload>
            <Button
              disabled={disable}
              type="primary"
              style={{ width: '25%' }}
              loading={sendContractConfirmLoading}
              onClick={() => {
                showModalConfirmContract();
              }}
            >
              Gửi hợp đồng
            </Button>
            <Button
              // danger={true}
              disabled={disableInvoice || disableWaitForPayAndCompletedServicerRequest}
              loading={sendInvoiceConfirmLoading}
              type="primary"
              style={{ width: '25%' }}
              onClick={() => {
                onCreateInvoice();
              }}
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

          <Row style={{ justifyContent: 'space-evenly' }}>

            {/* XEM HOÁ ĐƠN */}
            {newRequestServiceState && (newRequestServiceState.serviceRequestStatus === 13 ||
              newRequestServiceState.serviceRequestStatus === 14) && (
              <Row className={styles.invoice}>
                <Button
                  type="primary"
                  style={{ width: '180px' }}
                  onClick={() => showModalInvoice()}
                >
                  Xem hoá đơn
                </Button>
              </Row>
            )}

            {/* GỬI HOÁ ĐƠN CHO KHÁCH */}
            {/* {(newRequestServiceState.serviceRequestStatus === 14) && (
              <Row className={styles.invoice}>
                <Button
                  type="primary"
                  style={{ width: '100%' }}
                  onClick={() => showModalSendInvoiceToCustomer()}
                >
                  <Tooltip title="Gửi hoá đơn qua email cho khách">
                    Gửi hoá đơn cho khách
                  </Tooltip>
                </Button>
              </Row>
            )} */}
          </Row>

          {/* XEM HOÁ ĐƠN */}
          <Modal
            title="Hoá đơn"
            visible={visibleInvoice}
            footer={null}
            onOk={handleCancel}
            // confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText="Đóng"
            okText="Đồng ý"
          >
            <Descriptions>
              <Descriptions.Item
                span={6}
                label="Tên chủ công trình"
                labelStyle={{ fontWeight: '500' }}
              >
                {customerName}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Địa chỉ công trình"
                labelStyle={{ fontWeight: '500' }}
              >
                {customerAddress}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="SĐT chủ công trình"
                labelStyle={{ fontWeight: '500' }}
              >
                {customerPhone}
              </Descriptions.Item>
              <Descriptions.Item span={6} label="Mô tả yêu cầu" labelStyle={{ fontWeight: '500' }}>
                {updateRequestServiceState.serviceRequestDescription}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Ngày bắt đầu thi công"
                labelStyle={{ fontWeight: '500' }}
              >
                {contractStartDate}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Ngày kết thúc thi công"
                labelStyle={{ fontWeight: '500' }}
              >
                {contractEndDate}
              </Descriptions.Item>
              <Descriptions.Item span={6} label="Đặt cọc" labelStyle={{ fontWeight: '500' }}>
                {contractDeposit}%
              </Descriptions.Item>
            </Descriptions>
            <ProTable
              style={{
                marginBottom: 24,
              }}
              pagination={false}
              search={false}
              options={false}
              toolBarRender={false}
              dataSource={contractDetails}
              columns={INVOICE}
            />
            <hr width="80%" align="center" color="black" />
            <Descriptions
              style={{
                marginTop: 24,
              }}
            >
              <Descriptions.Item
                span={6}
                label="Tổng tiền hợp đồng ban đầu"
                labelStyle={{ fontWeight: '500' }}
              >
                {contractTotalPrice} VNĐ
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Tổng tiền dịch vụ đã sử dụng"
                labelStyle={{ fontWeight: '500' }}
              >
                {usedServivesPriceFormat} VNĐ
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Trừ tiền đặt cọc"
                labelStyle={{ fontWeight: '500' }}
              >
                -{contractDepositPriceFormat} VNĐ
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Giảm giá theo voucher"
                labelStyle={{ fontWeight: '500' }}
              >
                -{promotionValuePriceFormat} VNĐ
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Thuế GTGT/VAT (10%)"
                labelStyle={{ fontWeight: '500' }}
              >
                {VATPriceFormat} VNĐ
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Thành tiền"
                labelStyle={{ marginTop: 5, fontWeight: 'bold', color: 'red' }}
              >
                <b style={{ color: 'red' }}>{officialPriceFormat} VNĐ</b>
                <Button
                  loading={sendInvoiceToCustomerConfirmLoading}
                  type="primary"
                  style={{ marginLeft: 100 }}
                  onClick={onSendInvoiceToCustomer}
                >
                  Gửi hoá đơn cho khách
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </Modal>

          {/* XEM LẠI THÔNG TIN HỢP ĐỒNG TRƯỚC KHI GỬI */}
          <Modal
            title="Thông tin hợp đồng"
            visible={visibleConfirmContract}
            // footer={null}
            onOk={onCreateContract}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText="Đóng"
            okText="Xác nhận hợp đồng"
          >
            <Descriptions>
              <Descriptions.Item
                span={6}
                label="Tên chủ hợp đồng"
                labelStyle={{ fontWeight: '500' }}
              >
                {customerName}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="SĐT chủ công trình"
                labelStyle={{ fontWeight: '500' }}
              >
                {customerPhone}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Ngày bắt đầu thi công"
                labelStyle={{ fontWeight: '500' }}
              >
                {contractStartDateData && moment(contractStartDateData).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Ngày kết thúc thi công"
                labelStyle={{ fontWeight: '500' }}
              >
                {contractEndDateData && moment(contractEndDateData).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item span={6} label="Tổng giá trị hợp đồng" labelStyle={{ fontWeight: '500' }}>
                {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND
              </Descriptions.Item>
              <Descriptions.Item span={6} label="Đã đặt cọc" labelStyle={{ fontWeight: '500' }}>
                {contractDepositData && contractDepositData * 100}% 
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Voucher"
                labelStyle={{ fontWeight: '500' }}
              >
                {promotionValueRecord === 0 ? ("Không có voucher được áp dụng") : (`Áp dụng voucher giảm" ${promotionValueRecord* 100}`)}
              </Descriptions.Item>
            </Descriptions>
            <ProTable
              style={{
                marginBottom: 24,
              }}
              pagination={false}
              search={false}
              options={false}
              toolBarRender={false}
              dataSource={requestServiceRecord}
              columns={CONFIRMCONTRACT}
            />
          </Modal>

          {/* GỬI HOÁ ĐƠN CHO KHÁCH */}
          {/* <Modal
            confirmLoading={sendInvoiceToCustomerConfirmLoading}
            title="Gửi hoá đơn cho khách"
            visible={visibleSendInvoiceToCustomer}
            onOk={uploadImageInvoice}
            onCancel={handleCancel}
            cancelText="Đóng"
            okText="Gửi"
          >
            <Descriptions>
              <Descriptions.Item
                span={6}
                label="Tên chủ công trình"
                labelStyle={{ fontWeight: '500' }}
              >
                {customerName}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Địa chỉ công trình"
                labelStyle={{ fontWeight: '500' }}
              >
                {customerAddress}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="SĐT chủ công trình"
                labelStyle={{ fontWeight: '500' }}
              >
                {customerPhone}
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label="Số tiền khách hàng cần thanh toán"
                labelStyle={{ fontWeight: 'bold' }}
              >
                <b style={{ color: 'red' }}>{officialPriceFormat} VNĐ</b>
              </Descriptions.Item>
            </Descriptions>
            <hr width="80%" align="center" color="black" />
            <Descriptions>
              <Descriptions.Item
                span={6}
                label="Chọn hình hoá đơn để gửi cho khách"
                labelStyle={{ fontWeight: 'bold' }}
              />
            </Descriptions>
            <Upload
              maxCount={1}
              listType="picture-card"
              // onPreview={(e) => handlePreview(e)}
              onPreview={handlePreview}
              onChange={(e) => {
                saveImageInvoice(e);
              }}
            >
              {<PlusOutlined />} Chọn hình
            </Upload>
          </Modal> */}

          {/* XEM HÌNH HOÁ ĐƠN SAU KHI UPLOAD  */}
          {/* <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancelpreviewImage}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal> */}

          {/* LÊN ĐẦU TRANG */}
          <BackTop type="primary">
            <div className={styles.style}>UP</div>
          </BackTop>

          {/* LOAD LẠI TRANG */}
          {/* <Button
            type="primary"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            <div className={styles.style}>Tải lại trang</div>
          </Button> */}

          {/* XEM ẢNH & VIDEO */}
          <Modal
            title="Hình ảnh & video"
            visible={visible2}
            onOk={() => handleCancel()}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            {imgReportRecord.length > 0 &&
              imgReportRecord.map((data) => {
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
              title="Đã gọi khảo sát"
              btnProps={{
                type: 'dashed',
                icon: <FieldTimeOutlined />,
                disabled: disableSurveyingServicerRequest,
              }}
              onClick={onSurveyingServiceRequest}
            />

            <AsyncButton
              title="Từ chối"
              btnProps={{
                type: 'danger',
                icon: <CloseOutlined />,
                disabled: disableRejectServicerRequest,
              }}
              onClick={onRejectorCancelServiceRequest}
            />

            <AsyncButton
              title="Hoàn Thành"
              btnProps={{
                type: 'primary',
                icon: <CheckOutlined />,
                disabled: disableCompleteServicerRequest,
              }}
              onClick={onCompleteServiceRequest}
            />
          </FooterToolbar>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default DetailServiceRequest;
