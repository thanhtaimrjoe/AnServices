/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { DatePicker, Input, Select, Spin } from 'antd';
import { useIntl } from 'umi';
import React, { useEffect, useState } from 'react';
import {
  buildRequestServiceDateOption,
  buildWorkerNameOption,
  buildWorkerTypeJobOption,
  buildNumberOption,
  buildRequestServiceStatusOption,

  
} from './utils';

import { getAllRequestService, GetAllRequestServiceStatusOrDate, getAllService, getRequestServiceDate, getRequestServiceStatus } from '@/services/requestservices';
import { getAllWorkers } from '@/services/workers';
import { getAllTypeJob } from '@/services/typejobs';

const { Option } = Select;

const buildOptionsDefault = (storeData = []) =>
  storeData?.map((d) => (
    <Option value={d.id} key={d.id}>
      {d.name?.trim()}
    </Option>
  ));
const normalizeResDefault = (res) => res;

const normalizeRes = (res) => {
  return res?.data;
};
const CommonSelect = ({
  value,
  buildOptions,
  onSearch,
  getLsPromotion,
  normalizeRes,
  placeholder,
  getRes,
  fetchOnFirst,
  onFinishFetch,
  initOptions,
  onSelectItem,
  ...props
}) => {
  const [optionData, setOptionData] = useState(initOptions ?? []);
  const [fetchingData, setFetchingData] = useState(false);
  const { formatMessage } = useIntl();
  useEffect(() => {
    if (fetchOnFirst) {
      setFetchingData(true);
      Promise.resolve(onSearch())
        .then((res) => {
          return normalizeRes(res);
        })
        .then((data) => {
          setOptionData(data);
          return data;
        })
        .then((data) => onFinishFetch(data))
        .then(() => setFetchingData(false));
    }
  }, [fetchOnFirst, onSearch, normalizeRes]);

  const options = buildOptions(optionData);
  return (
    <Select
      showSearch
      value={value}
      loading={fetchingData}
      placeholder={formatMessage({
        id: placeholder !== undefined ? placeholder : 'Vui lòng chọn giá trị',
      })}
      defaultActiveFirstOption={false}
      showArrow
      filterOption={false}
      // onSearch={(val) => {
      //   changeSearch(val);
      // }}
      notFoundContent={fetchingData ? <Spin size="small" /> : null}
      filterOption={(input, option) =>
        option.input >= 0
      }
      {...props}
      onChange={(selectedValue, data) => {
        props.onChange(selectedValue, data);
        onSelectItem(selectedValue, optionData);
      }}
    >
      {options}
    </Select>
  );
};
// ==============================================================================
// CUSTOMER
const SelectStatusOfCustomer = (props) => {
  return (
    <CommonSelect
      placeholder="Trạng thái tài khoản"
      fetchOnFirst
      options={[
        {
          value: 4,
          label: 'Đang hoạt động',
        },
        {
          value: 10,
          label: 'Đã bị chặn',
        },
      ]}
      {...props}
    />
  );
};

// WORKER
const SelectWorkerByTypeJob = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn nghề của thợ"
      fetchOnFirst
      // onSearch={getAllWorkers}
      options={[
        {
          value: 1,
          label: 'Thợ nhôm - kính',
        },
        {
          value: 2,
          label: 'Thợ cơ khí',
        },
        {
          value: 3,
          label: 'Thợ sơn',
        },
        {
          value: 4,
          label: 'Thợ xây',
        },
        {
          value: 5,
          label: 'Thợ điện nước',
        },
        {
          value: 6,
          label: 'Thợ điện lạnh',
        },
        {
          value: 7,
          label: 'Thợ thạch cao',
        },
      ]}
      {...props}
    />
  );
};

const SelectWorkerTypeJob = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn nghề của thợ"
      fetchOnFirst
      buildOptions={buildWorkerTypeJobOption}
      onSearch={getAllWorkers}
      {...props}
    />
  );
};

const SelectWorkerName = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn thợ"
      fetchOnFirst
      buildOptions={buildWorkerNameOption}
      onSearch={getAllWorkers}
      {...props}
    />
  );
};

const SelectWorkerPhoneNumber = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn thợ"
      fetchOnFirst
      buildOptions={buildNumberOption}
      onSearch={getAllWorkers}
      {...props}
    />
  );
};

// const SelectWorkerTypeJob = (props) => {
//   return (
//     <CommonSelect
//       placeholder="Vui lòng chọn nhóm thợ"
//       fetchOnFirst
//       buildOptions={buildBusinessIdOption}
//       onSearch={getAllWorkers}
//       {...props}
//     />
//   );
// };


// REQUEST SERVICE

const SelectRequestServiceStatus = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn trạng thái của yêu cầu"
      fetchOnFirst
      // onSearch={getAllRequestService}
      options={[
        {
          value: '1',
          label: 'Đã từ chối',
        },
        {
          value: '2',
          label: 'Chưa xử lý',
        },
        {
          value: '3',
          label: 'Đã đồng ý',
        },
        {
          value: '6',
          label: 'Đang xử lý',
        },
      ]}
      {...props}
    />
  );
};

const SelectRequestServiceDate = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn ngày"
      fetchOnFirst
      buildOptions={buildRequestServiceDateOption}
      onSearch={getRequestServiceDate}
      {...props}
    />
  );
};

const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']
const dateFormatList = ['DD-MM-YYYY', 'YY-MM-DD'];

const locale = {
  localize: {
    month: n => months[n],
    day: n => days[n]
  },
  formatLong: {}
}

const SelectRequestServiceDate1 = (props) => {
  return (
    <Input.Group compact>
      {/* <Input 
        style={{ width: '30%' }} 
        placeholder="Vui lòng nhập ngày gửi yêu cầu"
        fetchOnFirst
        // buildOptions={buildRequestServiceDateOption}
        onSearch={GetAllRequestServiceStatusOrDate}
        {...props}
       /> */}
      <DatePicker 
        style={{ width: '100%' }} 
        placeholder="Vui lòng chọn ngày gửi yêu cầu" 
        locale={locale}
        fetchOnFirst
        // buildOptions={buildRequestServiceDateOption}
        onSearch={GetAllRequestServiceStatusOrDate}
        // format="YYYY-MM-DD"
        format="D/M/YYYY"
        {...props}
      />
    </Input.Group>
  );
};

const SelectRequestServicePriority = (props) => {
  return (
    <CommonSelect
      placeholder="Chọn độ ưu tiên cho công trình"
      fetchOnFirst
      options={[
        {
          value: '1',
          label: 'Thấp',
        },
        {
          value: '2',
          label: 'Trung bình',
        },
        {
          value: '3',
          label: 'Cao',
        },
        {
          value: '4',
          label: 'Rất cao',
        },
      ]}
      {...props}
    />
  );
};
// ==============================================================================
CommonSelect.SelectStatusOfCustomer = SelectStatusOfCustomer;
CommonSelect.SelectWorkerPhoneNumber = SelectWorkerPhoneNumber;
CommonSelect.SelectWorkerName = SelectWorkerName;
CommonSelect.SelectWorkerTypeJob = SelectWorkerTypeJob;
CommonSelect.SelectWorkerByTypeJob = SelectWorkerByTypeJob;
CommonSelect.SelectRequestServiceStatus = SelectRequestServiceStatus;
CommonSelect.SelectRequestServiceDate = SelectRequestServiceDate;
CommonSelect.SelectRequestServiceDate1 = SelectRequestServiceDate1;
CommonSelect.SelectRequestServicePriority = SelectRequestServicePriority;
// ==============================================================================



CommonSelect.defaultProps = {
  onSelectItem: (selectedValue, storeData) => null,
  onSearch: () => [],
  normalizeRes: (res) => res?.data,
  onFinishFetch: (data) => null,
  fetchOnFirst: false,
  buildOptions: buildOptionsDefault,
};

export {
// ==============================================================================
  // CUSTOMER
  SelectStatusOfCustomer,

  // WORKER
  SelectWorkerPhoneNumber,
  SelectWorkerName,
  SelectWorkerTypeJob,
  SelectWorkerByTypeJob,

  // REQUEST SERVICE
  SelectRequestServiceStatus,
  SelectRequestServiceDate,
  SelectRequestServiceDate1,
  SelectRequestServicePriority,

// ==============================================================================
};

export default CommonSelect;
