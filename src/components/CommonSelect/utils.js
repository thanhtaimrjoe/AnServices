import React from 'react';
import { Select } from 'antd';

// BRAND
export const buildBrandHashtagOption = (data) =>
data?.map(({ id, hashTag }) => (
  <Select.Option value={hashTag} key={id}>
    {hashTag}
  </Select.Option>
));

export const buildBrandNameOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={name} key={id}>
    {name}
  </Select.Option>
));

export const buildBusinessIdOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id}  -  {name}
  </Select.Option>
));

export const buildIndustryIdOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id}  -  {name}
  </Select.Option>
));

export const buildBusinessNameOption = (data) =>
data?.map(({ id }) => (
  <Select.Option value={id} key={id}>
    {id}
  </Select.Option>
));

export const buildIndustryNameOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id} - {name}
  </Select.Option>
));

// CAMPAIGN
export const buildCampaignNameOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={name} key={id}>
    {name}
  </Select.Option>
));

export const buildRecruitmentDateOption = (data) =>
data?.map(({ id, recruitmentDate }) => (
  <Select.Option value={recruitmentDate} key={id}>
    {recruitmentDate.split('T',1)[0]}
  </Select.Option>
));

export const buildStartDateOption = (data) =>
data?.map(({ id, startDate }) => (
  <Select.Option value={startDate} key={id}>
    {startDate.split('T',1)[0]}
  </Select.Option>
));

export const buildEndDateOption = (data) =>
data?.map(({ id, endDate }) => (
  <Select.Option value={endDate} key={id}>
    {endDate.split('T',1)[0]}
  </Select.Option>
));

export const buildBrandIdOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id}   -   {name}
  </Select.Option>
));

export const buildPlatfromIdOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id}   -   {name}
  </Select.Option>
));

export const buildVoucherIdOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id}   -   {name}
  </Select.Option>
));
// CAMPAIGN APPLY
export const buildCampaignApplyNameOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id}   -   {name}
  </Select.Option>
));

export const buildCampaignApplyDateOption = (data) =>
data?.map(({ id, applyDate }) => (
  <Select.Option value={applyDate} key={id}>
    {applyDate.split('T',1)[0]}
  </Select.Option>
));

export const buildReviewerNameOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id}   -   {name}
  </Select.Option>
));

export const buildCampaignIdOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id}   -   {name}
  </Select.Option>
));

// POST
export const buildCampaignApplyIdOption = (data) =>
data?.map(({ id, name }) => (
  <Select.Option value={id} key={id}>
    {id}   -   {name}
  </Select.Option>
));
// ==================================================================================================================

// MASON
export const buildMasonTypeJobOption = (data) =>
data?.map(({ typeJobId, typeJobName }) => (
  <Select.Option value={typeJobName} key={typeJobId}>
    {typeJobName}
  </Select.Option>
));

export const buildMasonNameOption = (data) =>
data?.map(({ userID, fullName }) => (
  <Select.Option value={userID} key={userID}>
    {fullName}
  </Select.Option>
));

const { Option } = Select;
export const buildNumberOption = (storeData = []) =>
  storeData?.map((data) => (
    <Option value={data.userID} key={data.id}>
      {data.name?.trim()}
    </Option>
  ));
// REQUEST SERVICE

export const buildRequestServiceDateOption = (data) =>
data?.map(({ requestServiceId, requestServiceCreateDate }) => (
  <Select.Option value={requestServiceCreateDate} key={requestServiceId}>
    {requestServiceCreateDate.split('T',1)[0]}
  </Select.Option>
));

export const buildRequestServiceStatusOption = (data) =>
data?.map(({ statusId, statusName }) => (
  <Select.Option value={statusName} key={statusId}>
    {statusName}
  </Select.Option>
));

// ==================================================================================================================


// const SelectStoreOfSupplier = (props) => {
//   const { supplierId } = props;
//   return (
//     <CommonSelect
//       placeholder="select.productPlaceholder"
//       fetchOnFirst
//       // buildOptions={buildProductsOption}
//       onSearch={() => getStoreOfSuppliers(supplierId)}
//       {...props}
//     />
//   );
// };