import { SelectRequestServiceStatus } from '@/components/CommonSelect/CommonSelect';
import { Button, Space } from 'antd';
import moment, { updateLocale } from 'moment';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { SelectWorkerByTypeJob } from '@/components/CommonSelect/CommonSelect';
import { SelectRequestServiceDate } from '@/components/CommonSelect/CommonSelect';


// ACCOUNTS
export const ACCOUNTS = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    search: false,
    render: (text, object, index) => {
      return <div>{index+1}</div>
    }
  },
  {
    title: 'Mã khách hàng',
    dataIndex: 'userID',
    show: false,
    search: false,
  },
  {
    title: 'Tên tài khoản',
    dataIndex: 'userName',
    show: false,
    search: false,
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (text, record) => {
      return <Link to={{ pathname: `/accounts/detail`, state: record }}>{record.fullName}</Link>;
    },
  },
  {
    id:'accounts.sdt',
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    search: false,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    search: false,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    valueEnum: {
      4: {
        text: 'Đang hoạt động',
        status: 'Success',
      },
      10: {
        text: 'Đã bị chặn',
        status: 'Error',
      },
    },
  },
  {
    title: 'Hành động',
    key: 'action',
    search: false,
    render: (text, record) => {
      const updateCustomerState = { ...record };
      return (
      <Space size="middle">
        <a><Link to={{ pathname: `/accounts/detail`, state: updateCustomerState }}>Chi tiết</Link></a>
        {/* <a><Link to={{ pathname: `/accounts/update`, state: updateCustomerState }}>Cập nhật</Link></a> */}
      </Space>
      )
    },
  },
];

// =========================================================================
// WORKER
export const WORKERS = [
  {
    title: 'STT',
    dataIndex: 'index',
    search: false,
    render: (text, record, index) => {
      return <div>{index+1}</div>
    }
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
      return <Link to={{ pathname: `/workers/detail`, state: record }}>{record.fullName}</Link>;
    },
    // renderFormItem: (item, props) => <SelectWorkerName name="" {...props} />,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    // renderFormItem: (item, props) => <SelectWorkerPhoneNumber name="" {...props} />,
  },

  {
    title: 'Email',
    dataIndex: 'email',
    show: false,
    search: false,
  },
  {
    title: 'Nhóm Thợ',
    key: 'typeJobId',
    dataIndex: 'typeJobId',
    render: (text, record) => {
      return <div>{record.typeJob.typeJobName}</div>
    },
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
        {/* <a><Link to={{ pathname: `/workers/detail`, state: updateWorkerState }}>Chi tiết</Link></a> */}
        <a><Link to={{ pathname: `/workers/update`, state: updateWorkerState }}>Cập nhật</Link></a>
      </Space>
      )
    },
  },
];

// SERVICE REQUEST
export const SERVICEREQUEST = [
  {
    title: 'STT',
    dataIndex: 'index',
    search: false,
    render: (text, object, index) => {
      return <div>{index+1}</div>
    }
  },
  {
    title: 'Mã dịch vụ',
    dataIndex: 'serviceRequestId',
    // key: 'serviceRequestId',
    show: false,
    search: false,
  },
  {
    title: 'Yêu cầu',
    dataIndex: 'serviceRequestDescription',
    key: 'serviceRequestDescription',
    search: false,
    render: (text, record) => {
      return <Link to={{ pathname: `/requestservices/detail`, state: record }}>{record.serviceRequestDescription}</Link>;
    },
  },
  {
    title: 'Ngày nhận',
    dataIndex: 'serviceRequestCreateDate',
    key: 'serviceRequestCreateDate',
    // search: false,
    // render: (_, { requestServiceCreateDate }) => <p>{requestServiceCreateDate ?? '-'}</p>,
    render: (text, record) => {
      return <div>{moment(record.serviceRequestCreateDate).format('D/M/Y')}</div>;
    },

    renderFormItem: (item, props) => {
      return <SelectRequestServiceDate {...props} />;
    }
  },
  {
    title: 'Gói',
    dataIndex: 'serviceRequestPackage',
    key: 'serviceRequestPackage',
    // show: false,
    search: false,
    tip:'Gói 1: Chỉ thuê nhân công, vật tư có sẵn - Gói 2: Thuê cả nhân công và vật tư',
    valueEnum: {
      1: {
        text: 'Gói 1',
      },
      2: {
        text: 'Gói 2',
      },
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'serviceRequestStatus',
    key: 'serviceRequestStatus',
    valueEnum: {
      2: {
        text: 'Chưa xử lý',
        status: 'Default',
      },
      15: {
        text: 'Đã khảo sát',
        color: 'geekblue',
      },
      3: {
        text: 'Đã đồng ý',
        color: 'lime',
      },
      6: {
        text: 'Đang xử lý',
        status: 'Processing',
      },
      17: {
        text: 'Chờ gửi hoá đơn',
        color: 'yellow',
      },
      14: {
        text: 'Chờ thanh toán',
        status: 'Warning',
      },
      13: {
        text: 'Đã hoàn thành',
        status: 'Success',
      },
      1: {
        text: 'Đã từ chối',
        status: 'Error',
      },
      8: {
        text: 'KH đã huỷ',
        status: 'Error',
      },
    },
    renderFormItem: (item, props) => {
      return <SelectRequestServiceStatus {...props} />;
    },
  },
  {
    title: 'Hành động',
    search: false,
    render: (text, record) => {
      const updateRequestServiceState = { ...record };
      return (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <a><Link to={{ pathname: `/requestservices/detail`, state: updateRequestServiceState }}>Chi tiết</Link></a>
      </Space>
      )
    },
  },
];

// REQUEST MATERIAL
export const REQUESTMATERIAL = [
  {
    title: 'ID',
    dataIndex: 'usedMaterialId',
    show: false,
    search: false,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    show: false,
    search: false,
  },
  {
    title: 'Yêu cầu',
    dataIndex: 'requestServiceDescription',
    search: false,
    // render: (text, record) => {
    //   return <div>{record.requestServiceStatus.statusId}</div>;
    // },
    // render: (text, record) => {
    //   // const updateReport = { ...record };
    //   // updateReport.id = record.id;
    //   console.log('abc123', record.reviewerId)
    //   // return <a href={'/reviewers/detail'} >{record.reviewer.name}</a>
    //   return <Link to={{
    //     pathname: '/reviewers/detail',
    //     state: { reviewerId: record.reviewerId }
    //   }} >
    //     {record.reviewer.name}
    //   </Link>
    // } 
  },
  {
    title: 'Khách hàng',
    dataIndex: 'customerName',
    search: false,
  },
  {
    title: 'Vật liệu',
    dataIndex: 'materialName',
    search: false,
    render: (text, record) => {
      return <div>{record.material.materialName}</div>;
    },
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    search: false,
  },
  {
    title: 'Tên thợ xử lý',
    dataIndex: 'fullName',
    search: false,
    render: (text, record) => {
      return <div>{record.worker.fullName}</div>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    search: false,
    render: (text, record) => {
      const updateRequestSMaterialState = { ...record };
      return (
      <Space size="middle">
        <a><Link to={{ pathname: `/requestmaterials/update`, state: updateRequestSMaterialState }}>Chi tiết</Link></a>
      </Space>
      )
    },
  },
];

// const onChangeRequestMaterialStatus = (values) => {
//   const update = normalizeReportForm(formData);
//   // return updateStatusRequestMaterial({"reviewerId": updateRequestMaterialStatusState.campaignApply.reviewerId, "voucherId": updateRequestMaterialStatusState.campaignApply.campaign.voucherId}, update).then((res) => {
//   return updateStatusRequestMaterial(formData, update).then((res) => {
//     // setCreatedVoucher({ "reviewerId": updatePostState.campaignApply.reviewerId, "voucherId": updatePostState.campaignApply.campaign.voucherId});
//     setChangeRequestMaterialStatus({ ...values, id: res });
//     // console.log('values' ,{"reviewerId": updateRequestMaterialStatusState, "voucherId": updateRequestMaterialStatusState.campaignApply.campaign.voucherId})
//     console.log('values' ,formData)
//     console.log('values1', updateStatusRequestMaterial({"reviewerId": formData, update }))
//     console.log('values' , formData)
  
  // });
// };

// INVOICE
export const INVOICE = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    // show: false,
    search: false,
    
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'date',
    key: 'date',
    // show: false,
    search: false,
    
  },
  {
    title: 'Tổng giá',
    dataIndex: 'totalCost',
    key: 'totalCost',
    search: false,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <a>Chi tiết</a>
        <Button>Xuất hoá đơn</Button>
        {/* <Button>Từ chối</Button> */}
      </Space>
    ),
  },
];
