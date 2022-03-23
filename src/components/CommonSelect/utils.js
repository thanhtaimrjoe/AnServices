import React from 'react';
import { Select } from 'antd';

// ==================================================================================================================

// WORKER
export const buildWorkerTypeJobOption = (data) =>
data?.map(({ typeJobId, typeJobName }) => (
  <Select.Option value={typeJobName} key={typeJobId}>
    {typeJobName}
  </Select.Option>
));

export const buildWorkerNameOption = (data) =>
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
data?.map(({ serviceRequestId, serviceRequestCreateDate }) => (
  <Select.Option value={serviceRequestCreateDate} key={serviceRequestId}>
    {serviceRequestCreateDate.split('T',1)[0]}
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