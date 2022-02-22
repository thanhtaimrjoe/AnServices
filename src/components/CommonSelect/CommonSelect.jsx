/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { DatePicker, Input, Select, Spin } from 'antd';
import { useIntl } from 'umi';
import React, { useEffect, useState } from 'react';
import {
  buildBrandNameOption,
  buildBrandHashtagOption,
  buildCampaignNameOption,
  buildRecruitmentDateOption,
  buildStartDateOption,
  buildEndDateOption,
  buildBusinessIdOption,
  buildIndustryIdOption,
  buildCampaignApplyNameOption,
  buildCampaignApplyDateOption,
  buildBusinessNameOption,
  buildIndustryNameOption,
  buildReviewerNameOption,
  buildBrandIdOption,
  buildPlatfromIdOption,
  buildVoucherIdOption,
  buildCampaignIdOption,
  buildCampaignApplyIdOption,
  buildRequestServiceDateOption,
  buildMasonNameOption,
  buildMasonTypeJobOption,
  buildNumberOption,
  buildRequestServiceStatusOption,

  
} from './utils';

import { getAllBrand, getAllBusiness, getAllIndustry, getBrandByHashtag, getBrandByName, getBusinessById, getIndustryById } from '@/services/brands';
import { getAllCampaign, getAllPlatforms, getAllVouchers, getCampaignById, getCampaignByName, getDate } from '@/services/campaigns';
import { getAllCampaignApplies, getCampaignAppliesByName, getDate1, getReviewerById, getReviewerByName } from '@/services/campaignapplies';
import { getAllRequestService, GetAllRequestServiceStatusOrDate, getAllService, getRequestServiceDate, getRequestServiceStatus } from '@/services/requestservices';
import { getAllMasons } from '@/services/masons';
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

// BRAND
const SelectBrandByName = (props) => {
  return (
    <CommonSelect
      placeholder="Please select brand name"
      fetchOnFirst
      buildOptions={buildBrandNameOption}
      onSearch={getBrandByName}
      {...props}
    />
  );
};

const SelectBrandByHashtag = (props) => {
  return (
    <CommonSelect
      placeholder="Please select hashtag name"
      fetchOnFirst
      buildOptions={buildBrandHashtagOption}
      onSearch={getBrandByHashtag}
      {...props}
    />
  );
};

const SelectBusinessById = (props) => {
  return (
    <CommonSelect
      placeholder="Please select business"
      fetchOnFirst
      buildOptions={buildBusinessIdOption}
      onSearch={getAllBusiness}
      {...props}
    />
  );
};

const SelectIndustryById = (props) => {
  return (
    <CommonSelect
      placeholder="Please select business"
      fetchOnFirst
      buildOptions={buildIndustryIdOption}
      onSearch={getAllIndustry}
      {...props}
    />
  );
};

const SelectBusinessByName = (props) => {
  return (
    <CommonSelect
      placeholder="Please select business"
      fetchOnFirst
      buildOptions={buildBusinessNameOption}
      onSearch={getBusinessById}
      {...props}
    />
  );
};

const SelectIndustryByName = (props) => {
  return (
    <CommonSelect
      placeholder="Please select business name"
      fetchOnFirst
      buildOptions={buildIndustryNameOption}
      onSearch={getIndustryById}
      {...props}
    />
  );
};
// CAMPAIGN
const SelectCampaignByName = (props) => {
  return (
    <CommonSelect
      placeholder="Please select campaign name"
      fetchOnFirst
      buildOptions={buildCampaignNameOption}
      onSearch={getCampaignByName}
      {...props}
    />
  );
};

const SelectRecruitmentDate = (props) => {
  return (
    <CommonSelect
      placeholder="Please select campaign date"
      fetchOnFirst
      buildOptions={buildRecruitmentDateOption}
      onSearch={getDate}
      {...props}
    />
  );
};

const SelectStartDate = (props) => {
  return (
    <CommonSelect
      placeholder="Please select start date"
      fetchOnFirst
      buildOptions={buildStartDateOption}
      onSearch={getDate}
      {...props}
    />
  );
};

const SelectEndDate = (props) => {
  return (
    <CommonSelect
      placeholder="Please select end date"
      fetchOnFirst
      buildOptions={buildEndDateOption}
      onSearch={getDate}
      {...props}
    />
  );
};

const SelectRecruitmentStatus = (props) => {
  return (
    <CommonSelect
      placeholder="Please select recruitment status"
      fetchOnFirst
      options={[
        {
          value: '0',
          label: 'Recruiting',
        },
        {
          value: '1',
          label: 'Closed',
        },
      ]}
      {...props}
    />
  );
};

const SelectFeaturedStatus = (props) => {
  return (
    <CommonSelect
      placeholder="Please select featured status"
      fetchOnFirst
      options={[
        {
          value: '0',
          label: 'New Campaign',
        },
        {
          value: '1',
          label: 'Featured Campaign',
        },
      ]}
      {...props}
    />
  );
};

const SelectBrandById = (props) => {
  return (
    <CommonSelect
      placeholder="Please select brand"
      fetchOnFirst
      buildOptions={buildBrandIdOption}
      onSearch={getAllBrand}
      {...props}
    />
  );
};

const SelectPlatformById = (props) => {
  return (
    <CommonSelect
      placeholder="Please select platform"
      fetchOnFirst
      buildOptions={buildPlatfromIdOption}
      onSearch={getAllPlatforms}
      {...props}
    />
  );
};

const SelectVoucherById = (props) => {
  return (
    <CommonSelect
      placeholder="Please select voucher"
      fetchOnFirst
      buildOptions={buildVoucherIdOption}
      onSearch={getAllVouchers}
      {...props}
    />
  );
};


// CAMPAIGN APPLIES
const SelectCampaignApplyByName = (props) => {
  return (
    <CommonSelect
      placeholder="Please select campaign apply name"
      fetchOnFirst
      buildOptions={buildCampaignApplyNameOption}
      onSearch={getCampaignAppliesByName}
      {...props}
    />
  );
};

const SelectCampaignApplyDate = (props) => {
  return (
    <CommonSelect
      placeholder="Please select campaign apply date"
      fetchOnFirst
      buildOptions={buildCampaignApplyDateOption}
      onSearch={getDate1}
      {...props}
    />
  );
};

const SelectCampaignApplyStatus = (props) => {
  return (
    <CommonSelect
      placeholder="Please select campaign apply status"
      fetchOnFirst
      onSearch={getAllCampaignApplies}
      options={[
        {
          value: '0',
          label: 'Applying',
        },
        {
          value: '1',
          label: 'InChange',
        },
        {
          value: '2',
          label: 'Complete',
        },
      ]}
      {...props}
    />
  );
};

const SelectReviewerName = (props) => {
  return (
    <CommonSelect
      placeholder="Please select reviewer id"
      fetchOnFirst
      buildOptions={buildReviewerNameOption}
      // onSearch={getReviewerById}
      onSearch={getReviewerByName}
      {...props}
    />
  );
};

const SelectCampaignName = (props) => {
  return (
    <CommonSelect
      placeholder="Please select campaign id"
      fetchOnFirst
      buildOptions={buildCampaignIdOption}
      onSearch={getAllCampaign}
      {...props}
    />
  );
};

// POST
const SelectCampaignApplyName = (props) => {
  return (
    <CommonSelect
      placeholder="Please select campaign apply id"
      fetchOnFirst
      buildOptions={buildCampaignApplyIdOption}
      onSearch={getAllCampaignApplies}
      {...props}
    />
  );
};


// ==============================================================================
// MASONS
const SelectMasonByTypeJob = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn nghề của thợ"
      fetchOnFirst
      // onSearch={getAllMasons}
      options={[
        {
          value: '1',
          label: 'Thợ nhôm - kính',
        },
        {
          value: '2',
          label: 'Thợ cơ khí',
        },
        {
          value: '3',
          label: 'Thợ sơn',
        },
        {
          value: '4',
          label: 'Thợ xây',
        },
        {
          value: '5',
          label: 'Thợ điện nước',
        },
        {
          value: '6',
          label: 'Thợ điện lạnh',
        },
        {
          value: '7',
          label: 'Thợ thạch cao',
        },
      ]}
      {...props}
    />
  );
};

const SelectMasonTypeJob = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn nghề của thợ"
      fetchOnFirst
      buildOptions={buildMasonTypeJobOption}
      onSearch={getAllMasons}
      {...props}
    />
  );
};

const SelectMasonName = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn thợ"
      fetchOnFirst
      buildOptions={buildMasonNameOption}
      onSearch={getAllMasons}
      {...props}
    />
  );
};

const SelectMasonPhoneNumber = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn thợ"
      fetchOnFirst
      buildOptions={buildNumberOption}
      onSearch={getAllMasons}
      {...props}
    />
  );
};

// const SelectMasonTypeJob = (props) => {
//   return (
//     <CommonSelect
//       placeholder="Vui lòng chọn nhóm thợ"
//       fetchOnFirst
//       buildOptions={buildBusinessIdOption}
//       onSearch={getAllMasons}
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
          label: 'Đang sửa chữa',
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
        format="D/M/Y"
        {...props}
      />
    </Input.Group>
  );
};

// ==============================================================================
// ==============================================================================
CommonSelect.SelectBrandByHashtag = SelectBrandByHashtag;
CommonSelect.SelectBrandByName = SelectBrandByName;
CommonSelect.SelectCampaignByName = SelectCampaignByName;
CommonSelect.SelectRecruitmentDate = SelectRecruitmentDate;
CommonSelect.SelectStartDate = SelectStartDate;
CommonSelect.SelectEndDate = SelectEndDate;
CommonSelect.SelectBusinessById = SelectBusinessById;
CommonSelect.SelectIndustryById = SelectIndustryById;
CommonSelect.SelectCampaignApplyByName = SelectCampaignApplyByName;
CommonSelect.SelectCampaignApplyDate = SelectCampaignApplyDate;
CommonSelect.SelectCampaignApplyStatus = SelectCampaignApplyStatus;
CommonSelect.SelectBusinessByName = SelectBusinessByName;
CommonSelect.SelectIndustryByName = SelectIndustryByName;
CommonSelect.SelectReviewerName = SelectReviewerName;
CommonSelect.SelectRecruitmentStatus = SelectRecruitmentStatus;
CommonSelect.SelectFeaturedStatus = SelectFeaturedStatus;
CommonSelect.SelectBrandById = SelectBrandById;
CommonSelect.SelectPlatformById = SelectPlatformById;
CommonSelect.SelectVoucherById = SelectVoucherById;
CommonSelect.SelectCampaignName = SelectCampaignName;
CommonSelect.SelectCampaignApplyName = SelectCampaignApplyName;

// ==============================================================================
CommonSelect.SelectMasonPhoneNumber = SelectMasonPhoneNumber;
CommonSelect.SelectMasonName = SelectMasonName;
CommonSelect.SelectMasonTypeJob = SelectMasonTypeJob;
CommonSelect.SelectMasonByTypeJob = SelectMasonByTypeJob;
CommonSelect.SelectRequestServiceStatus = SelectRequestServiceStatus;
CommonSelect.SelectRequestServiceDate = SelectRequestServiceDate;
CommonSelect.SelectRequestServiceDate1 = SelectRequestServiceDate1;

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
  SelectBrandByHashtag,
  SelectBrandByName,
  SelectCampaignByName,
  SelectRecruitmentDate,
  SelectStartDate,
  SelectEndDate,
  SelectBusinessById,
  SelectIndustryById,
  SelectCampaignApplyByName,
  SelectCampaignApplyDate,
  SelectCampaignApplyStatus,
  SelectBusinessByName,
  SelectIndustryByName,
  SelectReviewerName, 
  SelectRecruitmentStatus,
  SelectFeaturedStatus,
  SelectBrandById,
  SelectPlatformById,
  SelectVoucherById,
  SelectCampaignName,
  SelectCampaignApplyName,
// ==============================================================================
SelectMasonPhoneNumber,
  SelectMasonName,
  SelectMasonTypeJob,
  SelectMasonByTypeJob,
  SelectRequestServiceStatus,
  SelectRequestServiceDate,
  SelectRequestServiceDate1,
// ==============================================================================

};

export default CommonSelect;
