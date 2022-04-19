import { Suspense, useEffect, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';
import SalesCard from './components/SalesCard';
import TopSearch from './components/TopSearch';
import ProportionSales from './components/ProportionSales';
import OfflineData from './components/OfflineData';
import { useRequest } from 'umi';
import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';
import { dashboard, dashboardgetArray } from '@/services/dashboard';
import moment from 'moment';

const Analysis = () => {
  const [salesType, setSalesType] = useState('all');
  // const [currentTabKey, setCurrentTabKey] = useState('');
  // const [yearPickerValue, setYearPickerValue] = useState(getTimeDistance('year'));
  const [yearPickerValue, setYearPickerValue] = useState();

  const { loading, data } = useRequest(fakeChartData);
  const [pending, setPending] = useState();
  const [surveying, setSurveying] = useState();
  const [agreed, setAgreed] = useState();
  const [processing, setProcessing] = useState();
  const [payment, setPayment] = useState();
  const [accomplished, setAccomplished] = useState();
  const [cancel, setCancel] = useState();
  const [deny, setDeny] = useState();
  const [satisfiedRequestDetail, setSatisfiedRequestDetail] = useState();
  const [unsatisfiedRequestDetail, setUnsatisfiedRequestDetail] = useState();
  const [reworkRequestDetail, setReworkRequestDetail] = useState();
  const [totalCustomers, setTotalCustomers] = useState();
  const [totalWorkers, setTotalWorkers] = useState();

  const [receivedServiceRequest, setReceivedServiceRequest] = useState();
  const [receivedServiceRequestArray, setReceivedServiceRequestArray] = useState([]);
  const [completeServiceRequestArray, setCompleteServiceRequestArray] = useState([]);
  const [cancelServiceRequestArray, setCancelServiceRequestArray] = useState([]);
  const [revenueByYearArray, setRevenueByYearArray] = useState([]);

  const thisYear = new Date();

  const defaultYearPickerChange = () => {
    const defaultThisYear = thisYear.getFullYear();
    setYearPickerValue(defaultThisYear);
    dashboardgetArray(defaultThisYear).then((res) => {
      if (res.receivedServiceRequest !== null) {
        receivedServiceRequestArray.splice(0, 12);
        setReceivedServiceRequestArray([
          ...receivedServiceRequestArray,
          res.receivedServiceRequest.january,
          res.receivedServiceRequest.february,
          res.receivedServiceRequest.march,
          res.receivedServiceRequest.april,
          res.receivedServiceRequest.may,
          res.receivedServiceRequest.june,
          res.receivedServiceRequest.july,
          res.receivedServiceRequest.august,
          res.receivedServiceRequest.september,
          res.receivedServiceRequest.october,
          res.receivedServiceRequest.november,
          res.receivedServiceRequest.december,
        ]);
      } else {
        receivedServiceRequestArray.splice(0, 12);
        setReceivedServiceRequestArray([
          ...receivedServiceRequestArray,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ]);
      }

      if (res.completeServiceRequest !== null) {
        completeServiceRequestArray.splice(0, 12);
        setCompleteServiceRequestArray([
          ...completeServiceRequestArray,
          res.completeServiceRequest.january,
          res.completeServiceRequest.february,
          res.completeServiceRequest.march,
          res.completeServiceRequest.april,
          res.completeServiceRequest.may,
          res.completeServiceRequest.june,
          res.completeServiceRequest.july,
          res.completeServiceRequest.august,
          res.completeServiceRequest.september,
          res.completeServiceRequest.october,
          res.completeServiceRequest.november,
          res.completeServiceRequest.december,
        ]);
      } else {
        completeServiceRequestArray.splice(0, 12);
        setCompleteServiceRequestArray([
          ...completeServiceRequestArray,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ]);
      }

      if (res.cancelServiceRequest !== null) {
        cancelServiceRequestArray.splice(0, 12);
        setCancelServiceRequestArray([
          ...cancelServiceRequestArray,
          res.cancelServiceRequest.january,
          res.cancelServiceRequest.february,
          res.cancelServiceRequest.march,
          res.cancelServiceRequest.april,
          res.cancelServiceRequest.may,
          res.cancelServiceRequest.june,
          res.cancelServiceRequest.july,
          res.cancelServiceRequest.august,
          res.cancelServiceRequest.september,
          res.cancelServiceRequest.october,
          res.cancelServiceRequest.november,
          res.cancelServiceRequest.december,
        ]);
      } else {
        cancelServiceRequestArray.splice(0, 12);
        setCancelServiceRequestArray([
          ...cancelServiceRequestArray,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ]);
      }

      if (res.revenueOfContractByYear !== null) {
        revenueByYearArray.splice(0, 12);
        setRevenueByYearArray([
          ...revenueByYearArray,
          res.revenueOfContractByYear.january,
          res.revenueOfContractByYear.february,
          res.revenueOfContractByYear.march,
          res.revenueOfContractByYear.april,
          res.revenueOfContractByYear.may,
          res.revenueOfContractByYear.june,
          res.revenueOfContractByYear.july,
          res.revenueOfContractByYear.august,
          res.revenueOfContractByYear.september,
          res.revenueOfContractByYear.october,
          res.revenueOfContractByYear.november,
          res.revenueOfContractByYear.december,
        ]);
      } else {
        revenueByYearArray.splice(0, 12);
        setRevenueByYearArray([...revenueByYearArray, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
    });
  };

  useEffect(() => {
    dashboard().then((res) => {
      setPending(res.serviceStatusStatistics.pending);
      setSurveying(res.serviceStatusStatistics.surveying);
      setAgreed(res.serviceStatusStatistics.agreed);
      setProcessing(res.serviceStatusStatistics.processing);
      setPayment(res.serviceStatusStatistics.payment);
      setAccomplished(res.serviceStatusStatistics.accomplished);
      setCancel(res.serviceStatusStatistics.cancel);
      setDeny(res.serviceStatusStatistics.deny);
      setSatisfiedRequestDetail(res.satisfiedRequestDetail);
      setUnsatisfiedRequestDetail(res.unsatisfiedRequestDetail);
      setReworkRequestDetail(res.reworkRequestDetail);
      setTotalCustomers(res.totalCustomers);
      setTotalWorkers(res.totalWorkers);

      defaultYearPickerChange();
    });

    // return () => {
    //   second
    // }
  }, []);

  const requestServiceTypeData = [
    {
      x: 'DV chưa xử lý',
      y: pending,
    },
    {
      x: 'DV đang khảo sát',
      y: surveying,
    },
    {
      x: 'DV đã đồng ý',
      y: agreed,
    },
    {
      x: 'DV đang xử lý',
      y: processing,
    },
    {
      x: 'DV chờ thanh toán',
      y: payment,
    },
    {
      x: 'DV đã hoàn thành',
      y: accomplished,
    },
    {
      x: 'DV đã từ chối',
      y: deny,
    },
    {
      x: 'DV KH đã huỷ',
      y: cancel,
    },
  ];

  const ratingTypeData = [
    {
      x: 'Hài lòng',
      y: satisfiedRequestDetail,
    },
    {
      x: 'Không hài lòng',
      y: unsatisfiedRequestDetail,
    },
    {
      x: 'Làm lại',
      y: reworkRequestDetail,
    },
  ];

  const accountTypeData = [
    {
      x: 'Khách hàng',
      y: totalCustomers,
    },
    {
      x: 'Thợ',
      y: totalWorkers,
    },
  ];

  const selectYear = (type) => {
    // setYearPickerValue(getTimeDistance(type));
    console.log('recordtype', type);
  };

  const handleYearPickerChange = (value, dateString) => {
    setYearPickerValue(dateString);
    dashboardgetArray(dateString).then((res) => {
      if (res.receivedServiceRequest !== null) {
        receivedServiceRequestArray.splice(0, 12);
        setReceivedServiceRequestArray([
          ...receivedServiceRequestArray,
          res.receivedServiceRequest.january,
          res.receivedServiceRequest.february,
          res.receivedServiceRequest.march,
          res.receivedServiceRequest.april,
          res.receivedServiceRequest.may,
          res.receivedServiceRequest.june,
          res.receivedServiceRequest.july,
          res.receivedServiceRequest.august,
          res.receivedServiceRequest.september,
          res.receivedServiceRequest.october,
          res.receivedServiceRequest.november,
          res.receivedServiceRequest.december,
        ]);
      } else {
        receivedServiceRequestArray.splice(0, 12);
        setReceivedServiceRequestArray([
          ...receivedServiceRequestArray,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ]);
      }

      if (res.completeServiceRequest !== null) {
        completeServiceRequestArray.splice(0, 12);
        setCompleteServiceRequestArray([
          ...completeServiceRequestArray,
          res.completeServiceRequest.january,
          res.completeServiceRequest.february,
          res.completeServiceRequest.march,
          res.completeServiceRequest.april,
          res.completeServiceRequest.may,
          res.completeServiceRequest.june,
          res.completeServiceRequest.july,
          res.completeServiceRequest.august,
          res.completeServiceRequest.september,
          res.completeServiceRequest.october,
          res.completeServiceRequest.november,
          res.completeServiceRequest.december,
        ]);
      } else {
        completeServiceRequestArray.splice(0, 12);
        setCompleteServiceRequestArray([
          ...completeServiceRequestArray,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ]);
      }

      if (res.cancelServiceRequest !== null) {
        cancelServiceRequestArray.splice(0, 12);
        setCancelServiceRequestArray([
          ...cancelServiceRequestArray,
          res.cancelServiceRequest.january,
          res.cancelServiceRequest.february,
          res.cancelServiceRequest.march,
          res.cancelServiceRequest.april,
          res.cancelServiceRequest.may,
          res.cancelServiceRequest.june,
          res.cancelServiceRequest.july,
          res.cancelServiceRequest.august,
          res.cancelServiceRequest.september,
          res.cancelServiceRequest.october,
          res.cancelServiceRequest.november,
          res.cancelServiceRequest.december,
        ]);
      } else {
        cancelServiceRequestArray.splice(0, 12);
        setCancelServiceRequestArray([
          ...cancelServiceRequestArray,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ]);
      }

      if (res.revenueOfContractByYear !== null) {
        revenueByYearArray.splice(0, 12);
        setRevenueByYearArray([
          ...revenueByYearArray,
          res.revenueOfContractByYear.january,
          res.revenueOfContractByYear.february,
          res.revenueOfContractByYear.march,
          res.revenueOfContractByYear.april,
          res.revenueOfContractByYear.may,
          res.revenueOfContractByYear.june,
          res.revenueOfContractByYear.july,
          res.revenueOfContractByYear.august,
          res.revenueOfContractByYear.september,
          res.revenueOfContractByYear.october,
          res.revenueOfContractByYear.november,
          res.revenueOfContractByYear.december,
        ]);
      } else {
        revenueByYearArray.splice(0, 12);
        setRevenueByYearArray([...revenueByYearArray, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
    });
  };

  const isActive = (type) => {
    if (!yearPickerValue) {
      return '';
    }

    const value = getTimeDistance(type);

    if (!value) {
      return '';
    }

    if (!yearPickerValue[0]) {
      return '';
    }

    return '';
  };

  let salesPieData;

  if (salesType === 'requestService') {
    salesPieData = requestServiceTypeData;
  } else {
    // salesPieData = salesType === 'rating' ? ratingTypeData : accountTypeData;
    salesPieData = salesType === 'rating' ? ratingTypeData : requestServiceTypeData;

  }

  // DỊCH VỤ ĐÃ NHẬN
  const salesData = [];
  for (let i = 0; i < 12; i += 1) {
    salesData.push({
      x: `Tháng ${i + 1}`,
      y: receivedServiceRequestArray[i],
    });
  }
  // DỊCH VỤ ĐÃ HOÀN THÀNH
  const completeServiceRequestData = [];
  for (let i = 0; i < 12; i += 1) {
    completeServiceRequestData.push({
    x: `Tháng ${i + 1}`,
        y: completeServiceRequestArray[i],
    });
  }
  
  // DỊCH VỤ ĐÃ TỪ CHỐI
  const cancelServiceRequestData = [];
  for (let i = 0; i < 12; i += 1) {
    cancelServiceRequestData.push({
      x: `Tháng ${i + 1}`,
      y: cancelServiceRequestArray[i],
    });
  }
  console.log('cancelServiceRequestArray', cancelServiceRequestArray)

  console.log('cancelServiceRequestData', cancelServiceRequestData)

  // TỔNG DOANH SỐ
  const RevenuByYearData = [];
  for (let i = 0; i < revenueByYearArray.length; i += 1) {
    RevenuByYearData.push({
      x: `${i + 1}`,
      y: revenueByYearArray[i],
    });
  }

 //
  const handleChangeSalesType = (e) => {
    setSalesType(e.target.value);
  };

  // const handleTabChange = (key) => {
  //   setCurrentTabKey(key);
  // };

  // const activeKey = currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || '';
  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} RevenuByYearData={RevenuByYearData || []} />
        </Suspense>

        <Suspense fallback={null}>
          <SalesCard
            // yearPickerValue={yearPickerValue}
            salesData={salesData || [] }
            completeServiceRequestData={completeServiceRequestData || [] }
            cancelServiceRequestData={cancelServiceRequestData || []}
            isActive={isActive}
            // handleQuarterPickerChange={handleYearPickerChange}
            handleYearPickerChange={handleYearPickerChange}
            loading={loading}
            selectYear={selectYear}
          />
        </Suspense>

        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
                // dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                // dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row>

        {/* <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense> */}
      </>
    </GridContent>
  );
};

export default Analysis;
