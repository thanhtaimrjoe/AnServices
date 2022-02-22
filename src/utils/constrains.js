import { SelectRequestServiceStatus } from '@/components/CommonSelect/CommonSelect';
import {
  SelectBrandByName,
  SelectCampaignByName,
  SelectStartDate,
  SelectEndDate,
  SelectCampaignApplyDate,
} from '@/components/CommonSelect/CommonSelect';
import { Tag, Button, Space, Input, DatePicker, Select } from 'antd';
import moment, { updateLocale } from 'moment';
import { Link } from 'react-router-dom';
import { SelectRecruitmentStatus } from '@/components/CommonSelect/CommonSelect';
import { SelectFeaturedStatus } from '@/components/CommonSelect/CommonSelect';
import React, { useEffect, useState } from 'react';
import { updateCampaignAppliesStatus } from '@/services/campaignapplies';
import { update } from '@umijs/deps/compiled/lodash';
import { SelectRequestServiceDate } from '@/components/CommonSelect/CommonSelect';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { approveStatusRequestMaterial, denyStatusRequestMaterial } from '@/services/requestmaterials';
import { SelectMasonByTypeJob, SelectMasonTypeJob, SelectMasonName, SelectMasonPhoneNumber } from '@/components/CommonSelect/CommonSelect';
import { SelectRequestServiceDate1 } from '@/components/CommonSelect/CommonSelect';
import { getAllMasons } from '@/services/masons';

// export const { Option } = Select;

// export const GetMason = () => {
//   const [masonRecord, setMasonRecord] = useState([]);
//   useEffect(() => {
//     getAllMasons().then((record) => {
//       setMasonRecord(record);
//   },[]);
//   })
// };
// ACCOUNTS
export const ACCOUNTS = [
  {
    title: 'ID',
    dataIndex: 'id',
    show: false,
    search: false,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    search: false,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    search: false,
  },

  {
    title: 'Email',
    dataIndex: 'email',
    search: false,
  },
];

// BRAND
export const BRAND = [
  {
    title: 'ID',
    dataIndex: 'id',
    search: false,
  },
  {
    title: 'Brand Name',
    dataIndex: 'name',
    renderFormItem: (item, props) => <SelectBrandByName name="" {...props} />,
  },
  {
    title: 'Hashtag',
    dataIndex: 'hashTag',
    search: false,
    // show: false,
    render: (_, { hashTag }) => <p>{hashTag ?? '-'}</p>,
    renderFormItem: (item, props) => <SelectBrandByName name="" {...props} />,
  },
  {
    title: 'Business Name',
    dataIndex: 'businessid',
    search: false,
    show: false,
  },
  {
    title: 'Industry Name',
    dataIndex: 'industryid',
    search: false,
    show: false,
  },
  {
    title: 'Action',
    valueType: 'option',
    render: (text, record) => {
      const updateReport = { ...record };
      // updateReport.cat_id = record.id;
      // return <UpdateBrand brandId={record.id} />
      return <Link to={{ pathname: `/brands/update`, state: updateReport }}>Update</Link>;
    },
  },
];

// CAMPAIGN
export const CAMPAIGN = [
  {
    title: 'ID',
    dataIndex: 'id',
    search: false,
  },
  {
    title: 'Campaign Name',
    dataIndex: 'name',
    render: (_, { name }) => <p>{name ?? '-'}</p>,
    renderFormItem: (item, props) => <SelectCampaignByName name="" {...props} />,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    search: false,
    show: false,
    render: (record) => {
      <img width={100} alt={record} src={record} />
    }
  },
  {
    title: 'Campaign Decription',
    dataIndex: 'campaignDecription',
    search: false,
    show: false,
  },
  {
    title: 'Hashtag',
    dataIndex: 'hashTag',
    search: false,
    show: false,
  },
  {
    title: 'Link Brand',
    dataIndex: 'linkBrand',
    search: false,
    show: false,
  },
  {
    title: 'Recruitment Date',
    dataIndex: 'recruitmentDate',
    show: false,
    search: false,
    render: (_, { recruitmentDate }) => <p>{recruitmentDate ?? '-'}</p>,
    // renderFormItem: (item, props) => <SelectRecruitmentDate name="" {...props} />,
    render: (text, record) => {
      return <div>{moment(record.recruitmentDate).format('D/M/Y')}</div>;
    },
  },
  {
    title: 'Applied',
    dataIndex: 'applied',
    search: false,
    show: false,
  },
  {
    title: 'Slot',
    dataIndex: 'slot',
    search: false,
    show: false,
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    show: false,
    search: false,
    render: (_, { startDate }) => <p>{startDate ?? '-'}</p>,
    renderFormItem: (item, props) => <SelectStartDate name="" {...props} />,
    render: (text, record) => {
      return <div>{moment(record.startDate).format('D/M/Y')}</div>;
    },
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    show: false,
    search: false,
    render: (_, { endDate }) => <p>{endDate ?? '-'}</p>,
    renderFormItem: (item, props) => <SelectEndDate name="" {...props} />,
    render: (text, record) => {
      return <div>{moment(record.endDate).format('D/M/Y')}</div>;
    },
  },
  {
    title: 'Recruitment Status',
    dataIndex: 'recruitmentStatus',
    search: false,
    valueEnum: {
      0: {
        text: 'Recruiting',
        status: 'Processing',
      },
      1: {
        text: 'Closed',
        status: 'Error',
      },
    },
    valueType: 'select',
    render: (_, { recruitmentStatus }) => (
      <Tag color={recruitmentStatus ? 'red' : 'blue'}>{recruitmentStatus ? 'Closed' : 'Recruiting'}</Tag>
      
    ),
    renderFormItem: (item, props) => {
      return <SelectRecruitmentStatus {...props} />;
    },
  },
  {
    title: 'Featured Status',
    dataIndex: 'featuredstatus',
    // search: false,
    valueEnum: {
      0: {
        text: 'New Campaign',
        status: 'Processing',
      },
      1: {
        text: 'Featured Campaign',
        status: 'Error',
      },
    },
    valueType: 'select',
    render: (_, { featuredstatus }) => (
      <Tag color={featuredstatus ? 'gold' : 'green' }>{featuredstatus ? 'Featured Campaign' : 'New Campaign' }</Tag>
    ),
    renderFormItem: (item, props) => {
      return <SelectFeaturedStatus {...props} />;
    },
  },
  {
    title: 'Action',
    valueType: 'option',
    render: (text, record) => {
      const updateReport = { ...record };
      updateReport.cat_id = record.report_attribute_category_id;
      updateReport.product_type = record.product_type_id;
      // return <UpdateBrand brandId={record.id} />
      return <Link to={{ pathname: `/campaigns/update`, state: updateReport }}>Detail</Link>;
    },
  },
];

// CAMPAIGN APPLY
export const CAMPAIGNAPPLY = [
  {
    title: 'ID',
    dataIndex: 'id',
    search: false,
  },
  {
    title: 'Apply Date',
    dataIndex: 'applyDate',
    render: (_, { applyDate }) => <p>{applyDate ?? '-'}</p>,
    renderFormItem: (item, props) => <SelectCampaignApplyDate {...props} />,
    render: (text, record) => {
      return <div>{moment(record.applyDate).format('D/M/Y')}</div>;
    },
  },
  {
    title: 'Reviewer',
    dataIndex: 'reviewerId',
    search: false,
    // show: false,
    render: (text, record) => {
      // const updateReport = { ...record };
      // updateReport.id = record.id;
      console.log('abc123', record)
      // return <a href={'/reviewers/detail'} >{record.reviewer.name}</a>
      // return <Link to={{
      //   pathname: '/reviewers/detail',
      //   state: { reviewerId: record.reviewerId }
      // }} >
      //   {/* {record.reviewer.name} */}
      //   {record.reviewerId}
      // </Link>
      return record.reviewerId
      
    } 
  },
  {
    title: 'Campaign',
    dataIndex: 'campaignId',
    search: false,
    show: false,
  },
  {
    title: 'Campaign Apply Status',
    dataIndex: 'status',
    // search: false,
    valueEnum: {
      0: {
        text: 'Applying',
        status: 'warning',
      },
      1: {
        text: 'InChange',
        status: 'Processing',
      },
      2: {
        text: 'Complete',
        status: 'Success',
      },
    },
    valueType: 'select',
    // render: (_, { status }) => (
    //   <Tag color={status ? 'green'  : 'blue' }>{status ? 'InChange' : 'Applying' }</Tag>
    // ),
    
    renderFormItem: (item, props) => {
      return <SelectRequestServiceStatus {...props} />;
    },
  },
  {
    title: 'Action',
    valueType: 'option',
    render: (text, record) => {
      const updateReport = { ...record };
      updateReport.s = record.id;
      updateReport.product_type = record.status;
      // return <UpdateBrand brandId={record.id} />
      return <Link to={{ pathname: `/campaignapplies/update`, state: updateReport }}>Update</Link>;
      // return <Button type='primary' onClick = {() => { updateCampaignAppliesStatus(record.id, updateReport); }}>Complete</Button>;
    },
  },
  // {
  //   title: 'Action',
  //   valueType: 'option',
  //   render: (record) => {
  //     console.log(record.props.text);
  //     // return <UpdateCampaignApply type='primary' id={record.id}>Accept</UpdateCampaignApply>;
  //     // return <Button type='primary' onClick = {() => { updateCampaignAppliesStatus(record.id); }}>Accept</Button>;
  //     return <Space>
  //       <Button type='primary' onClick = {() => { updateCampaignAppliesStatus(record.props.text.id); }}>Accept</Button>
  //       <Button type='danger' onClick = {() => { deleteCampaignApplies(record.props.text.id) }} >Reject</Button>
        
  //     </Space>
  //   },
  // },
];


// POST
export const POST = [
  {
    title: 'ID',
    dataIndex: 'id',
    search: false,
    // show: false,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    search: false,
    // show: false,
    render: (record) => (
      <img width={100} alt={record} src={record} />
    )
  },
  {
    title: 'Title',
    dataIndex: 'title',
    search: false,
  },
  {
    title: 'URL',
    dataIndex: 'url',
    search: false,
    render: (text, record) =>   <a href={record.url}>{text}</a>
  },
  {
    title: 'Apply Date',
    dataIndex: 'applyDate',
    search: false,
    // render: (_, { applyDate }) => <p>{applyDate ?? '-'}</p>,
    // renderFormItem: (item, props) => <SelectCampaignApplyDate {...props} />,
    render: (text, record) => {
      return <div>{moment(record.applyDate).format('D/M/Y')}</div>;
    },
  },
  {
    title: 'Comfirm Date',
    dataIndex: 'comfirmDate',
    show: false,
    search: false,
    render: (_, { recruitmentDate }) => <p>{recruitmentDate ?? '-'}</p>,
    // renderFormItem: (item, props) => <SelectRecruitmentDate name="" {...props} />,
    render: (text, record) => {
      return <div>{moment(record.recruitmentDate).format('D/M/Y')}</div>;
    },
  },
  {
    title: 'Author',
    dataIndex: 'author',
    search: false,
    show: false,
    valueEnum: {
      0: {
        text: 'Pending',
        status: 'Processing',
      },
      1: {
        text: 'Confirm',
        status: 'Succes',
      },
      2: {
        text: 'Cancel',
        status: 'Error',
      },
    },
    valueType: 'select',
    renderFormItem: (item, props) => {
      return <SelectRecruitmentStatus {...props} />;
    },
  },
  {
    title: 'Campaign Apply ID',
    dataIndex: 'campaignApplyId',
    search: false,
    show: false,
  },
  {
    title: 'Action',
    valueType: 'option',
    render: (text, record) => {
      const updateStatus = { ...record };
      // updateStatus.id = record.id;
      // updateStatus.product_type = record.product_type_id;
      // return <UpdateStatus postId={record.id} />
      return <Link to={{ pathname: `/posts/update`, state: updateStatus }}>Detail</Link>;
    },
  },
];
// =========================================================================
// MASON
export const MASONS = [
  {
    title: 'STT',
    dataIndex: 'index',
    search: false,
    render: (text, object, index) => {
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
      return <Link to={{ pathname: `/masons/detail`, state: record }}>{record.fullName}</Link>;
    },
    // renderFormItem: (item, props) => <SelectMasonName name="" {...props} />,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    // renderFormItem: (item, props) => <SelectMasonPhoneNumber name="" {...props} />,
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
      return <SelectMasonByTypeJob name="" {...props} />;
    },
  },
  {
    title: 'Hành động',
    key: 'action',
    search: false,
    render: (text, record) => {
      const updateMasonState = { ...record };
      return (
      <Space size="middle">
        <a><Link to={{ pathname: `/masons/detail`, state: updateMasonState }}>Chi tiết</Link></a>
        <a><Link to={{ pathname: `/masons/update`, state: updateMasonState }}>Cập nhật</Link></a>
      </Space>
      )
    },
  },
];

// REQUEST SERVICE
export const REQUESTSERVICE = [
  // {
  //   title: 'Image',
  //   dataIndex: 'mediaUrl',
  //   search: false,
  //   show: false,
  //   render: (text, record) => {
  //     <img width={100} alt={record} src={record} />
  //     console.log("record123", record.media)
  //   }
  // },
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
    dataIndex: 'requestServiceId',
    // key: 'requestServiceId',
    show: false,
    search: false,
    
  },
  {
    title: 'Yêu cầu',
    dataIndex: 'requestServiceDescription',
    // key: 'request',
    search: false,
    render: (text, record) => {
      return <Link to={{ pathname: `/requestservices/detail`, state: record }}>{record.requestServiceDescription}</Link>;
    },
  },
  {
    title: 'Ngày nhận yêu cầu',
    dataIndex: 'requestServiceCreateDate',
    // key: 'date',
    // search: false,
    render: (_, { requestServiceCreateDate }) => <p>{requestServiceCreateDate ?? '-'}</p>,
    render: (text, record) => {
      return <div>{moment(record.requestServiceCreateDate).format('D/M/Y')}</div>;
    },
    // renderFormItem: (item, props) => {
    //   return <SelectRequestServiceDate {...props} />;
    // },

    renderFormItem: (item, props) => {
      return <SelectRequestServiceDate1 {...props} />;
    }
    
  },
  {
    title: 'Trạng thái',
    dataIndex: 'RequestServiceStatus',
    // key: 'statusId',
    valueEnum: {
      1: {
        text: 'Đã từ chối',
        status: 'Error',
      },
      2: {
        text: 'Chưa xử lý',
        status: 'Warning',
      },
      3: {
        text: 'Đã đồng ý',
        status: 'Success',
      },
      // 4: {
      //   text: 'Kích hoạt',
      //   status: 'Success',
      // },
      // 5: {
      //   text: 'Không kích hoạt',
      //   status: 'Default',
      // },
      6: {
        text: 'Đang sửa chữa',
        status: 'Processing',
      },
    },
    // valueType: 'select',
    // render: (_, { status }) => (
    //   <Tag color={status ? 'green'  : 'blue' }>{status ? 'InChange' : 'Applying' }</Tag>
    // ),
    render: (text, record) => {
      return <div>{record.requestServiceStatus.statusName}</div>;
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
      return <div>{record.mason.fullName}</div>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    search: false,
    render: (text, record) => {
      const updateRequestSMaterialState = { ...record };
      console.log("abc1", record)
      console.log("abc11", record.usedMaterialId)
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
