import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Card, Col, DatePicker, Row, Select, Space, Tabs, Tooltip, message } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import styles from '../style.less';
import { Pie, G2 } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';
import { dashboard, dashboardByQuarterAndYear, dashboardgetArray } from '@/services/dashboard';
import moment from 'moment';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import { Column } from '@antv/g2plot';
import ProTable from '@ant-design/pro-table';

const thisYear = new Date();
const { Option } = Select;

const IntroduceRow = ({ loading, RevenuByYearData }) => {
  const [satisfiedRequestDetail, setSatisfiedRequestDetail] = useState();
  const [unsatisfiedRequestDetail, setUnsatisfiedRequestDetail] = useState();
  const [promotionIsUsed, setPromotionIsUsed] = useState();
  const [promotionIsUsedInMonth, setPromotionIsUsedInMonth] = useState();
  const [promotionIsUsedInYear, setPromotionIsUsedInYear] = useState();
  const [amountOfBanCustomers, setAmountOfBanCustomers] = useState();
  const [amountOfBanCustomersInMonth, setAmountOfBanCustomersInMonth] = useState();
  const [amountOfNewCustomersInMonth, setAmountOfNewCustomersInMonth] = useState();
  const [amountOfNewWorkersInMonth, setAmountOfNewWorkersInMonth] = useState();
  const [totalCustomers, setTotalCustomers] = useState();
  const [totalWorkers, setTotalWorkers] = useState();
  const [revenueByYearArray, setRevenueByYearArray] = useState([]);
  const [cancelServiceRequestArray, setCancelServiceRequestArray] = useState([]);

  // PART 1
  // Chọn quý và năm
  const [quarterInYearPickerPart1, setQuarterInYearPickerPart1] = useState();
  const [yearPickerPart1, setYearPickerPart1] = useState(new Date().getFullYear());

  const [disableQuarter2Part1, setDisableQuarter2Part1] = useState(true);
  const [disableQuarter3Part1, setDisableQuarter3Part1] = useState(true);
  const [disableQuarter4Part1, setDisableQuarter4Part1] = useState(true);

  // Lưu vào mảng khi chọn năm
  const [revenueOfContractByYearArrayPart1, setRevenueOfContractByYearArrayPart1] = useState([]);
  const [revenueOfContractByQuarterArrayPart1, setRevenueByQuarterArrayPart1] = useState([]);

  const [revenueOfInvoiceByYearArrayPart1, setRevenueOfInvoiceByYearArrayPart1] = useState([]);
  const [revenueOfInvoiceByQuarterArrayPart1, setRevenueOfInvoiceByQuarterArrayPart1] = useState([]);

  const [receivedServiceRequestArrayPart1, setReceivedServiceRequestArrayPart1] = useState([]);
  const [receivedServiceRequestByQuarterArrayPart1, setReceivedServiceRequestByQuarterArrayPart1] = useState([]);

  const [completeServiceRequestArrayPart1, setCompleteServiceRequestArrayPart1] = useState([]);
  const [completeServiceRequestByQuarterArrayPart1, setCompleteServiceRequestByQuarterArrayPart1] = useState([]);

  const [cancelServiceRequestArrayPart1, setCancelServiceRequestArrayPart1] = useState([]);
  const [cancelServiceRequestByQuarterArrayPart1, setCancelServiceRequestByQuarterArrayPart1] = useState([]);

  const [contractListPart1, setContractListPart1] = useState([]);
  const [invoiceListPart1, setInvoiceListPart1] = useState([]);


  // //////////////////////////////////////////////
  // PART 2
  const [quarterInYearPickerPart2, setQuarterInYearPickerPart2] = useState();
  const [yearPickerPart2, setYearPickerPart2] = useState(new Date().getFullYear());

  // ===========================================================================
  const handleQuarterPickerChangePart1 = (values) => {
    setQuarterInYearPickerPart1(values);

    if (values === undefined) {
      dashboardgetArray(yearPickerPart1).then((res) => {
        if (res.receivedServiceRequest !== null) {
          receivedServiceRequestArrayPart1.splice(0, 12);
          receivedServiceRequestByQuarterArrayPart1.splice(0, 3);
          setReceivedServiceRequestArrayPart1([
            ...receivedServiceRequestArrayPart1,
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

          if (values === 1) {
            receivedServiceRequestByQuarterArrayPart1.splice(0, 3);
            setReceivedServiceRequestArrayPart1([
              ...receivedServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.january,
              res.receivedServiceRequest.february,
              res.receivedServiceRequest.march,
            ]);
          }
          if (values === 2) {
            receivedServiceRequestByQuarterArrayPart1.splice(0, 3);
            setReceivedServiceRequestArrayPart1([
              ...receivedServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.april,
              res.receivedServiceRequest.may,
              res.receivedServiceRequest.june,
            ]);
          }
          if (values === 3) {
            receivedServiceRequestByQuarterArrayPart1.splice(0, 3);
            setReceivedServiceRequestArrayPart1([
              ...receivedServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.july,
              res.receivedServiceRequest.august,
              res.receivedServiceRequest.september,
            ]);
          }
          if (values === 4) {
            receivedServiceRequestByQuarterArrayPart1.splice(0, 3);
            setReceivedServiceRequestArrayPart1([
              ...receivedServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.october,
              res.receivedServiceRequest.november,
              res.receivedServiceRequest.december,
            ]);
          }

        } else {
          receivedServiceRequestArrayPart1.splice(0, 12);
          receivedServiceRequestByQuarterArrayPart1.splice(0, 3);

          setReceivedServiceRequestArrayPart1([
            ...receivedServiceRequestArrayPart1,
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

          setReceivedServiceRequestByQuarterArrayPart1([...receivedServiceRequestByQuarterArrayPart1, 0, 0, 0]);

        }

        if (res.completeServiceRequest !== null) {
          completeServiceRequestArrayPart1.splice(0, 12);
          completeServiceRequestByQuarterArrayPart1.splice(0, 3);

          setCompleteServiceRequestArrayPart1([
            ...completeServiceRequestArrayPart1,
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

          if (values === 1) {
            completeServiceRequestByQuarterArrayPart1.splice(0, 3);
            setCompleteServiceRequestByQuarterArrayPart1([
              ...completeServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.january,
              res.receivedServiceRequest.february,
              res.receivedServiceRequest.march,
            ]);
          }
          if (values === 2) {
            completeServiceRequestByQuarterArrayPart1.splice(0, 3);
            setCompleteServiceRequestByQuarterArrayPart1([
              ...completeServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.april,
              res.receivedServiceRequest.may,
              res.receivedServiceRequest.june,
            ]);
          }
          if (values === 3) {
            completeServiceRequestByQuarterArrayPart1.splice(0, 3);
            setCompleteServiceRequestByQuarterArrayPart1([
              ...completeServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.july,
              res.receivedServiceRequest.august,
              res.receivedServiceRequest.september,
            ]);
          }
          if (values === 4) {
            completeServiceRequestByQuarterArrayPart1.splice(0, 3);
            setCompleteServiceRequestByQuarterArrayPart1([
              ...completeServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.october,
              res.receivedServiceRequest.november,
              res.receivedServiceRequest.december,
            ]);
          }
        } else {
          completeServiceRequestArrayPart1.splice(0, 12);
          completeServiceRequestByQuarterArrayPart1.splice(0, 3);

          setCompleteServiceRequestArrayPart1([
            ...completeServiceRequestArrayPart1,
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
          setCompleteServiceRequestByQuarterArrayPart1([...receivedServiceRequestByQuarterArrayPart1, 0, 0, 0]);

        }

        if (res.cancelServiceRequest !== null) {
          cancelServiceRequestArrayPart1.splice(0, 12);
          cancelServiceRequestByQuarterArrayPart1.splice(0, 3);
          setCancelServiceRequestArrayPart1([
            ...cancelServiceRequestArrayPart1,
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

          if (values === 1) {
            cancelServiceRequestByQuarterArrayPart1.splice(0, 3);
            setCancelServiceRequestByQuarterArrayPart1([
              ...cancelServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.january,
              res.receivedServiceRequest.february,
              res.receivedServiceRequest.march,
            ]);
          }
          if (values === 2) {
            cancelServiceRequestByQuarterArrayPart1.splice(0, 3);
            setCancelServiceRequestByQuarterArrayPart1([
              ...cancelServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.april,
              res.receivedServiceRequest.may,
              res.receivedServiceRequest.june,
            ]);
          }
          if (values === 3) {
            cancelServiceRequestByQuarterArrayPart1.splice(0, 3);
            setCancelServiceRequestByQuarterArrayPart1([
              ...cancelServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.july,
              res.receivedServiceRequest.august,
              res.receivedServiceRequest.september,
            ]);
          }
          if (values === 4) {
            cancelServiceRequestByQuarterArrayPart1.splice(0, 3);
            setCancelServiceRequestByQuarterArrayPart1([
              ...cancelServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.october,
              res.receivedServiceRequest.november,
              res.receivedServiceRequest.december,
            ]);
          }
        } else {
          cancelServiceRequestArrayPart1.splice(0, 12);
          cancelServiceRequestByQuarterArrayPart1.splice(0, 3);

          setCancelServiceRequestArrayPart1([
            ...cancelServiceRequestArrayPart1,
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

          setCancelServiceRequestByQuarterArrayPart1([...receivedServiceRequestByQuarterArrayPart1, 0, 0, 0]);

        }

        if (res.revenueOfContractByYear !== null) {
          revenueOfContractByYearArrayPart1.splice(0, 12);
          revenueOfContractByQuarterArrayPart1.splice(0, 3);

          setRevenueOfContractByYearArrayPart1([
            ...revenueOfContractByYearArrayPart1,
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

          

          if (values === 1) {
            revenueOfContractByQuarterArrayPart1.splice(0, 3);
            setRevenueByQuarterArrayPart1([
              ...revenueOfContractByQuarterArrayPart1,
              res.revenueOfContractByYear.january,
              res.revenueOfContractByYear.february,
              res.revenueOfContractByYear.march,
            ]);
          }
          if (values === 2) {
            revenueOfContractByQuarterArrayPart1.splice(0, 3);
            setRevenueByQuarterArrayPart1([
              ...revenueOfContractByQuarterArrayPart1,
              res.revenueOfContractByYear.april,
              res.revenueOfContractByYear.may,
              res.revenueOfContractByYear.june,
            ]);
          }
          if (values === 3) {
            revenueOfContractByQuarterArrayPart1.splice(0, 3);
            setRevenueByQuarterArrayPart1([
              ...revenueOfContractByQuarterArrayPart1,
              res.revenueOfContractByYear.july,
              res.revenueOfContractByYear.august,
              res.revenueOfContractByYear.september,
            ]);
          }
          if (values === 4) {
            revenueOfContractByQuarterArrayPart1.splice(0, 3);
            setRevenueByQuarterArrayPart1([
              ...revenueOfContractByQuarterArrayPart1,
              res.revenueOfContractByYear.october,
              res.revenueOfContractByYear.november,
              res.revenueOfContractByYear.december,
            ]);
          }
        } else {
          revenueOfContractByYearArrayPart1.splice(0, 12);
          revenueOfContractByQuarterArrayPart1.splice(0, 3);
          setRevenueOfContractByYearArrayPart1([
            ...revenueOfContractByYearArrayPart1,
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
          
          setRevenueByQuarterArrayPart1([...revenueOfContractByQuarterArrayPart1, 0, 0, 0]);
        }

        if (res.revenueOfInvoiceByYear !== null) {
          revenueOfInvoiceByYearArrayPart1.splice(0, 12);
          revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);

          setRevenueOfInvoiceByYearArrayPart1([
            ...revenueOfInvoiceByYearArrayPart1,
            res.revenueOfInvoiceByYear.january,
            res.revenueOfInvoiceByYear.february,
            res.revenueOfInvoiceByYear.march,
            res.revenueOfInvoiceByYear.april,
            res.revenueOfInvoiceByYear.may,
            res.revenueOfInvoiceByYear.june,
            res.revenueOfInvoiceByYear.july,
            res.revenueOfInvoiceByYear.august,
            res.revenueOfInvoiceByYear.september,
            res.revenueOfInvoiceByYear.october,
            res.revenueOfInvoiceByYear.november,
            res.revenueOfInvoiceByYear.december,
          ]);

          if (values === 1) {
            revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
            setRevenueOfInvoiceByQuarterArrayPart1([
              ...revenueOfInvoiceByQuarterArrayPart1,
              res.revenueOfInvoiceByYear.january,
              res.revenueOfInvoiceByYear.february,
              res.revenueOfInvoiceByYear.march,
            ]);
          }
          if (values === 2) {
            revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
            setRevenueOfInvoiceByQuarterArrayPart1([
              ...revenueOfInvoiceByQuarterArrayPart1,
              res.revenueOfInvoiceByYear.april,
              res.revenueOfInvoiceByYear.may,
              res.revenueOfInvoiceByYear.june,
            ]);
          }
          if (values === 3) {
            revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
            setRevenueOfInvoiceByQuarterArrayPart1([
              ...revenueOfInvoiceByQuarterArrayPart1,
              res.revenueOfInvoiceByYear.july,
              res.revenueOfInvoiceByYear.august,
              res.revenueOfInvoiceByYear.september,
            ]);
          }
          if (values === 4) {
            revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
            setRevenueOfInvoiceByQuarterArrayPart1([
              ...revenueOfInvoiceByQuarterArrayPart1,
              res.revenueOfInvoiceByYear.october,
              res.revenueOfInvoiceByYear.november,
              res.revenueOfInvoiceByYear.december,
            ]);
          }
        } else {
          revenueOfInvoiceByYearArrayPart1.splice(0, 12);
          revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
          setRevenueOfInvoiceByYearArrayPart1([
            ...revenueOfInvoiceByYearArrayPart1,
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
          
          setRevenueOfInvoiceByQuarterArrayPart1([...revenueOfInvoiceByQuarterArrayPart1, 0, 0, 0]);
        }

        if(res.contractList.length !== 0) {
          setContractListPart1();
          setContractListPart1(res.contractList);
        } else {
          message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
        }

        if(res.invoiceList.length !== 0) {
          setInvoiceListPart1();
          setInvoiceListPart1(res.invoiceList);
        } else {
          message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
        }
       
      });
    } else {
      dashboardByQuarterAndYear(values, yearPickerPart1).then((res) => {
        if (res.receivedServiceRequest !== null) {
          receivedServiceRequestArrayPart1.splice(0, 12);
          receivedServiceRequestByQuarterArrayPart1.splice(0, 12);
          setReceivedServiceRequestArrayPart1([
            ...receivedServiceRequestArrayPart1,
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

          if (values === 1) {
            receivedServiceRequestByQuarterArrayPart1.splice(0, 3);
            setReceivedServiceRequestArrayPart1([
              ...receivedServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.january,
              res.receivedServiceRequest.february,
              res.receivedServiceRequest.march,
            ]);
          }
          if (values === 2) {
            receivedServiceRequestByQuarterArrayPart1.splice(0, 3);
            setReceivedServiceRequestArrayPart1([
              ...receivedServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.april,
              res.receivedServiceRequest.may,
              res.receivedServiceRequest.june,
            ]);
          }
          if (values === 3) {
            receivedServiceRequestByQuarterArrayPart1.splice(0, 3);
            setReceivedServiceRequestArrayPart1([
              ...receivedServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.july,
              res.receivedServiceRequest.august,
              res.receivedServiceRequest.september,
            ]);
          }
          if (values === 4) {
            receivedServiceRequestByQuarterArrayPart1.splice(0, 3);
            setReceivedServiceRequestArrayPart1([
              ...receivedServiceRequestByQuarterArrayPart1,
              res.receivedServiceRequest.october,
              res.receivedServiceRequest.november,
              res.receivedServiceRequest.december,
            ]);
          }

        } else {
          receivedServiceRequestArrayPart1.splice(0, 12);
          receivedServiceRequestByQuarterArrayPart1.splice(0, 3);

          setReceivedServiceRequestArrayPart1([
            ...receivedServiceRequestArrayPart1,
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

          setReceivedServiceRequestByQuarterArrayPart1([...receivedServiceRequestByQuarterArrayPart1, 0, 0, 0]);

        }

        if (res.completeServiceRequest !== null) {
          completeServiceRequestArrayPart1.splice(0, 12);
          setCompleteServiceRequestArrayPart1([
            ...completeServiceRequestArrayPart1,
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
          completeServiceRequestArrayPart1.splice(0, 12);
          setCompleteServiceRequestArrayPart1([
            ...completeServiceRequestArrayPart1,
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
          cancelServiceRequestArrayPart1.splice(0, 12);
          setCancelServiceRequestArrayPart1([
            ...cancelServiceRequestArrayPart1,
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
          cancelServiceRequestArrayPart1.splice(0, 12);
          setCancelServiceRequestArrayPart1([
            ...cancelServiceRequestArrayPart1,
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
          revenueOfContractByYearArrayPart1.splice(0, 12);
          revenueOfContractByQuarterArrayPart1.splice(0, 3);

          setRevenueOfContractByYearArrayPart1([
            ...revenueOfContractByYearArrayPart1,
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

          if (values === 1) {
            revenueOfContractByQuarterArrayPart1.splice(0, 3);
            setRevenueByQuarterArrayPart1([
              ...revenueOfContractByQuarterArrayPart1,
              res.revenueOfContractByYear.january,
              res.revenueOfContractByYear.february,
              res.revenueOfContractByYear.march,
            ]);
          }
          if (values === 2) {
            setRevenueByQuarterArrayPart1([
              ...revenueOfContractByQuarterArrayPart1,
              res.revenueOfContractByYear.april,
              res.revenueOfContractByYear.may,
              res.revenueOfContractByYear.june,
            ]);
          }
          if (values === 3) {
            setRevenueByQuarterArrayPart1([
              ...revenueOfContractByQuarterArrayPart1,
              res.revenueOfContractByYear.july,
              res.revenueOfContractByYear.august,
              res.revenueOfContractByYear.september,
            ]);
          }
          if (values === 4) {
            setRevenueByQuarterArrayPart1([
              ...revenueOfContractByQuarterArrayPart1,
              res.revenueOfContractByYear.october,
              res.revenueOfContractByYear.november,
              res.revenueOfContractByYear.december,
            ]);
          }
        } else {
          revenueOfContractByYearArrayPart1.splice(0, 12);
          revenueOfContractByQuarterArrayPart1.splice(0, 3);
          setRevenueOfContractByYearArrayPart1([
            ...revenueOfContractByYearArrayPart1,
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
          setRevenueByQuarterArrayPart1([...revenueOfContractByQuarterArrayPart1, 0, 0, 0]);
        }

        if (res.revenueOfInvoiceByYear !== null) {
          revenueOfInvoiceByYearArrayPart1.splice(0, 12);
          revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);

          setRevenueOfInvoiceByYearArrayPart1([
            ...revenueOfInvoiceByYearArrayPart1,
            res.revenueOfInvoiceByYear.january,
            res.revenueOfInvoiceByYear.february,
            res.revenueOfInvoiceByYear.march,
            res.revenueOfInvoiceByYear.april,
            res.revenueOfInvoiceByYear.may,
            res.revenueOfInvoiceByYear.june,
            res.revenueOfInvoiceByYear.july,
            res.revenueOfInvoiceByYear.august,
            res.revenueOfInvoiceByYear.september,
            res.revenueOfInvoiceByYear.october,
            res.revenueOfInvoiceByYear.november,
            res.revenueOfInvoiceByYear.december,
          ]);

          if (values === 1) {
            revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
            setRevenueOfInvoiceByQuarterArrayPart1([
              ...revenueOfInvoiceByQuarterArrayPart1,
              res.revenueOfInvoiceByYear.january,
              res.revenueOfInvoiceByYear.february,
              res.revenueOfInvoiceByYear.march,
            ]);
          }
          if (values === 2) {
            revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
            setRevenueOfInvoiceByQuarterArrayPart1([
              ...revenueOfInvoiceByQuarterArrayPart1,
              res.revenueOfInvoiceByYear.april,
              res.revenueOfInvoiceByYear.may,
              res.revenueOfInvoiceByYear.june,
            ]);
          }
          if (values === 3) {
            revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
            setRevenueOfInvoiceByQuarterArrayPart1([
              ...revenueOfInvoiceByQuarterArrayPart1,
              res.revenueOfInvoiceByYear.july,
              res.revenueOfInvoiceByYear.august,
              res.revenueOfInvoiceByYear.september,
            ]);
          }
          if (values === 4) {
            revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
            setRevenueOfInvoiceByQuarterArrayPart1([
              ...revenueOfInvoiceByQuarterArrayPart1,
              res.revenueOfInvoiceByYear.october,
              res.revenueOfInvoiceByYear.november,
              res.revenueOfInvoiceByYear.december,
            ]);
          }
        } else {
          revenueOfInvoiceByYearArrayPart1.splice(0, 12);
          revenueOfInvoiceByQuarterArrayPart1.splice(0, 3);
          setRevenueOfInvoiceByYearArrayPart1([
            ...revenueOfInvoiceByYearArrayPart1,
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
          
          setRevenueOfInvoiceByQuarterArrayPart1([...revenueOfInvoiceByQuarterArrayPart1, 0, 0, 0]);
        }

        if(res.contractList.length !== 0) {
          if(values === 1) {
            setContractListPart1();
            setContractListPart1(res.contractList);
          }
          if(values === 2) {
            setContractListPart1();
            setContractListPart1(res.contractList);
          }
          if(values === 3) {
            setContractListPart1();
            setContractListPart1(res.contractList);
          }
          if(values === 4) {
            setContractListPart1();
            setContractListPart1(res.contractList);
          }
        } else {
          message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
        }

        if(res.invoiceList.length !== 0) {
          if(values === 1) {
            setInvoiceListPart1();
            setInvoiceListPart1(res.invoiceList);
          }
          if(values === 2) {
            setInvoiceListPart1();
            setInvoiceListPart1(res.invoiceList);
          }
          if(values === 3) {
            setInvoiceListPart1();
            setInvoiceListPart1(res.invoiceList);
          }
          if(values === 4) {
            setInvoiceListPart1();
            setInvoiceListPart1(res.invoiceList);
          }
        } else {
          message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
        }
      });
    }
  };

  const handleYearPickerChangePart1 = (values, dateString) => {
    setYearPickerPart1(dateString);
    if (quarterInYearPickerPart1 === undefined) {
      dashboardgetArray(dateString).then((res) => {
        if (res.receivedServiceRequest !== null) {
          receivedServiceRequestArrayPart1.splice(0, 12);
          setReceivedServiceRequestArrayPart1([
            ...receivedServiceRequestArrayPart1,
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
          receivedServiceRequestArrayPart1.splice(0, 12);
          setReceivedServiceRequestArrayPart1([
            ...receivedServiceRequestArrayPart1,
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
          completeServiceRequestArrayPart1.splice(0, 12);
          setCompleteServiceRequestArrayPart1([
            ...completeServiceRequestArrayPart1,
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
          completeServiceRequestArrayPart1.splice(0, 12);
          setCompleteServiceRequestArrayPart1([
            ...completeServiceRequestArrayPart1,
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
          cancelServiceRequestArrayPart1.splice(0, 12);
          setCancelServiceRequestArrayPart1([
            ...cancelServiceRequestArrayPart1,
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
          cancelServiceRequestArrayPart1.splice(0, 12);
          setCancelServiceRequestArrayPart1([
            ...cancelServiceRequestArrayPart1,
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
          revenueOfContractByYearArrayPart1.splice(0, 12);
          setRevenueOfContractByYearArrayPart1([
            ...revenueOfContractByYearArrayPart1,
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
          revenueOfContractByYearArrayPart1.splice(0, 12);
          setRevenueOfContractByYearArrayPart1([
            ...revenueOfContractByYearArrayPart1,
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

        if (res.revenueOfInvoiceByYear !== null) {
          revenueOfInvoiceByYearArrayPart1.splice(0, 12);
          setRevenueOfInvoiceByYearArrayPart1([
            ...revenueOfInvoiceByYearArrayPart1,
            res.revenueOfInvoiceByYear.january,
            res.revenueOfInvoiceByYear.february,
            res.revenueOfInvoiceByYear.march,
            res.revenueOfInvoiceByYear.april,
            res.revenueOfInvoiceByYear.may,
            res.revenueOfInvoiceByYear.june,
            res.revenueOfInvoiceByYear.july,
            res.revenueOfInvoiceByYear.august,
            res.revenueOfInvoiceByYear.september,
            res.revenueOfInvoiceByYear.october,
            res.revenueOfInvoiceByYear.november,
            res.revenueOfInvoiceByYear.december,
          ]);
        } else {
          revenueOfInvoiceByYearArrayPart1.splice(0, 12);
          setRevenueOfInvoiceByYearArrayPart1([
            ...revenueOfInvoiceByYearArrayPart1,
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

        if(res.contractList.length !== 0) {
          setContractListPart1();
          setContractListPart1(res.contractList);
        } else {
          message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
        }

        if(res.invoiceList.length !== 0 && res.contractList !== null) {
          setInvoiceListPart1();
          setInvoiceListPart1(res.invoiceList);
        } else {
          message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
        }

      });
    } else {
      dashboardByQuarterAndYear(quarterInYearPickerPart1, dateString).then((res) => {
        if (res.receivedServiceRequest !== null) {
          receivedServiceRequestArrayPart1.splice(0, 12);
          setReceivedServiceRequestArrayPart1([
            ...receivedServiceRequestArrayPart1,
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
          receivedServiceRequestArrayPart1.splice(0, 12);
          setReceivedServiceRequestArrayPart1([
            ...receivedServiceRequestArrayPart1,
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
          completeServiceRequestArrayPart1.splice(0, 12);
          setCompleteServiceRequestArrayPart1([
            ...completeServiceRequestArrayPart1,
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
          completeServiceRequestArrayPart1.splice(0, 12);
          setCompleteServiceRequestArrayPart1([
            ...completeServiceRequestArrayPart1,
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
          cancelServiceRequestArrayPart1.splice(0, 12);
          setCancelServiceRequestArrayPart1([
            ...cancelServiceRequestArrayPart1,
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
          cancelServiceRequestArrayPart1.splice(0, 12);
          setCancelServiceRequestArrayPart1([
            ...cancelServiceRequestArrayPart1,
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
          revenueOfContractByYearArrayPart1.splice(0, 12);
          setRevenueOfContractByYearArrayPart1([
            ...revenueOfContractByYearArrayPart1,
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
          revenueOfContractByYearArrayPart1.splice(0, 12);
          setRevenueOfContractByYearArrayPart1([
            ...revenueOfContractByYearArrayPart1,
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

        if (res.revenueOfInvoiceByYear !== null) {
          revenueOfInvoiceByYearArrayPart1.splice(0, 12);
          setRevenueOfInvoiceByYearArrayPart1([
            ...revenueOfInvoiceByYearArrayPart1,
            res.revenueOfInvoiceByYear.january,
            res.revenueOfInvoiceByYear.february,
            res.revenueOfInvoiceByYear.march,
            res.revenueOfInvoiceByYear.april,
            res.revenueOfInvoiceByYear.may,
            res.revenueOfInvoiceByYear.june,
            res.revenueOfInvoiceByYear.july,
            res.revenueOfInvoiceByYear.august,
            res.revenueOfInvoiceByYear.september,
            res.revenueOfInvoiceByYear.october,
            res.revenueOfInvoiceByYear.november,
            res.revenueOfInvoiceByYear.december,
          ]);
        } else {
          revenueOfInvoiceByYearArrayPart1.splice(0, 12);
          setRevenueOfInvoiceByYearArrayPart1([
            ...revenueOfInvoiceByYearArrayPart1,
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

        if(res.contractList.length !== 0) {
          setContractListPart1();
          setContractListPart1(res.contractList);
        } else {
          message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
        }

        if(res.invoiceList.length !== 0) {
          setInvoiceListPart1();
          setInvoiceListPart1(res.invoiceList);
        } else {
          message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
        }
      });
    }
  };

  const defaultYearPickerChangePart1 = () => {
    const defaultThisYear = thisYear.getFullYear();
    dashboardgetArray(defaultThisYear).then((res) => {
      if (res.receivedServiceRequest !== null) {
        receivedServiceRequestArrayPart1.splice(0, 12);
        setReceivedServiceRequestArrayPart1([
          ...receivedServiceRequestArrayPart1,
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
        receivedServiceRequestArrayPart1.splice(0, 12);
        setReceivedServiceRequestArrayPart1([
          ...receivedServiceRequestArrayPart1,
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
        completeServiceRequestArrayPart1.splice(0, 12);
        setCompleteServiceRequestArrayPart1([
          ...completeServiceRequestArrayPart1,
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
        completeServiceRequestArrayPart1.splice(0, 12);
        setCompleteServiceRequestArrayPart1([
          ...completeServiceRequestArrayPart1,
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
        cancelServiceRequestArrayPart1.splice(0, 12);
        setCancelServiceRequestArrayPart1([
          ...cancelServiceRequestArrayPart1,
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
        cancelServiceRequestArrayPart1.splice(0, 12);
        setCancelServiceRequestArrayPart1([
          ...cancelServiceRequestArrayPart1,
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
        revenueOfContractByYearArrayPart1.splice(0, 12);
        setRevenueOfContractByYearArrayPart1([
          ...revenueOfContractByYearArrayPart1,
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
        revenueOfContractByYearArrayPart1.splice(0, 12);
        setRevenueOfContractByYearArrayPart1([
          ...revenueOfContractByYearArrayPart1,
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

      if (res.revenueOfInvoiceByYear !== null) {
        revenueOfInvoiceByYearArrayPart1.splice(0, 12);
        setRevenueOfInvoiceByYearArrayPart1([
          ...revenueOfInvoiceByYearArrayPart1,
          res.revenueOfInvoiceByYear.january,
          res.revenueOfInvoiceByYear.february,
          res.revenueOfInvoiceByYear.march,
          res.revenueOfInvoiceByYear.april,
          res.revenueOfInvoiceByYear.may,
          res.revenueOfInvoiceByYear.june,
          res.revenueOfInvoiceByYear.july,
          res.revenueOfInvoiceByYear.august,
          res.revenueOfInvoiceByYear.september,
          res.revenueOfInvoiceByYear.october,
          res.revenueOfInvoiceByYear.november,
          res.revenueOfInvoiceByYear.december,
        ]);
        
      } else {
        revenueOfInvoiceByYearArrayPart1.splice(0, 12);
        setRevenueOfInvoiceByYearArrayPart1([
          ...revenueOfInvoiceByYearArrayPart1,
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

      if(res.contractList.length !== 0) {
        setContractListPart1(res.contractList);
      } else {
        message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
      }

      if(res.invoiceList.length !== 0) {
        setInvoiceListPart1(res.invoiceList);
      } else {
        message.error("Không có thông tin để hiển thị cho danh sách hợp đồng")
      }
    });
  };

  console.log('revenueOfInvoiceByYearArrayPart1', revenueOfInvoiceByYearArrayPart1);
  // ===========================================================================

  const defaultYearPickerChange = () => {
    const defaultThisYear = thisYear.getFullYear();
    dashboardgetArray(defaultThisYear).then((res) => {
      console.log('record02dashboardgetArray', res);

      if (res.receivedServiceRequest !== null) {
        receivedServiceRequestArrayPart1.splice(0, 12);
        setReceivedServiceRequestArrayPart1([
          ...receivedServiceRequestArrayPart1,
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
        receivedServiceRequestArrayPart1.splice(0, 12);
        setReceivedServiceRequestArrayPart1([
          ...receivedServiceRequestArrayPart1,
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
        completeServiceRequestArrayPart1.splice(0, 12);
        setCompleteServiceRequestArrayPart1([
          ...completeServiceRequestArrayPart1,
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
        completeServiceRequestArrayPart1.splice(0, 12);
        setCompleteServiceRequestArrayPart1([
          ...completeServiceRequestArrayPart1,
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
      setSatisfiedRequestDetail(res.satisfiedRequestDetail);
      setUnsatisfiedRequestDetail(res.unsatisfiedRequestDetail);
      setPromotionIsUsed(res.promotionIsUsed);
      setPromotionIsUsedInMonth(res.promotionIsUsedInMonth);
      setPromotionIsUsedInYear(res.promotionIsUsedInYear);
      setAmountOfBanCustomers(res.amountOfBanCustomers);
      setAmountOfNewCustomersInMonth(res.amountOfNewCustomersInMonth);
      setAmountOfNewWorkersInMonth(res.amountOfNewWorkersInMonth);
      setTotalCustomers(res.totalCustomers);
      setTotalWorkers(res.totalWorkers);
      setAmountOfBanCustomersInMonth(res.amountOfBanCustomersInMonth);

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
        setRevenueByYearArray([...revenueByYearArray, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }

      if (res.receivedServiceRequest !== null) {
        receivedServiceRequestArrayPart1.splice(0, 12);
        setReceivedServiceRequestArrayPart1([
          ...receivedServiceRequestArrayPart1,
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
        setReceivedServiceRequestArrayPart1([
          ...receivedServiceRequestArrayPart1,
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
    });

    defaultYearPickerChangePart1();

    defaultYearPickerChange();

    // console.log('showdisablequarter', moment(new Date()).format('DD/MM/YYYY'));
    // if(moment(new Date()).format('DD/MM/YYYY') < '01/04/2022') {
    //   console.log('showdisablequarter1')
    // }
  }, []);

  const totalService = satisfiedRequestDetail + unsatisfiedRequestDetail;
  const persentSatisfiedRequestDetail = (satisfiedRequestDetail / totalService) * 100;
  const persentUnsatisfiedRequestDetail = (unsatisfiedRequestDetail / totalService) * 100;

  //
  const G = G2.getEngine('canvas');

  const salesData = [];

  for (let i = 0; i < 12; i += 1) {
    salesData.push({
      x: `Tháng ${i + 1}`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }

  const data = [
    {
      sex: 'Hài lòng',
      sold: persentSatisfiedRequestDetail,
    },
    {
      sex: 'Không hài lòng',
      sold: persentUnsatisfiedRequestDetail,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'sold',
    colorField: 'sex',
    radius: 0.66,
    color: ['#00ff80', '#f04864'],
    label: {
      content: (obj) => {
        const group = new G.Group({});
        group.addShape({
          type: 'image',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            img:
              obj.sex === 'Hài lòng'
                ? 'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/imageChart%2Fhappy.png?alt=media&token=2d718ec1-4f0a-497c-b0d4-1014d4268557'
                : 'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/imageChart%2Funhappy.png?alt=media&token=b5d84a33-87de-47cf-ad31-cd6cc743385e',
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 20,
            y: 54,
            text: obj.sex,
            textAlign: 'center',
            textBaseline: 'top',
            fill: obj.sex === 'Hài lòng' ? '#1890ff' : '#f04864',
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const topColResponsiveProps = {
    // xs: 24,
    // sm: 12,
    // md: 12,
    // lg: 12,
    // xl: 6,
    xs: 30,
    sm: 18,
    md: 18,
    lg: 18,
    xl: 12,
    style: {
      marginBottom: 24,
    },
  };

  // PART 1: BẢNG DOANH THU THEO HỢP ĐỒNG VÀ HOÁ ĐƠN
  // REVENUE BY CONTRACT
  let revenueOfContractInYear = 0;
  let max = 0;
  max = Math.max(...revenueOfContractByYearArrayPart1);
  let position = 0;
  position = revenueOfContractByYearArrayPart1.indexOf(max) + 1;

  if (quarterInYearPickerPart1 === 1) {
    max = Math.max(...revenueOfContractByQuarterArrayPart1);
  }
  if (quarterInYearPickerPart1 === 2) {
    max = Math.max(...revenueOfContractByQuarterArrayPart1);
  }
  if (quarterInYearPickerPart1 === 3) {
    max = Math.max(...revenueOfContractByQuarterArrayPart1);
  }
  if (quarterInYearPickerPart1 === 4) {
    max = Math.max(...revenueOfContractByQuarterArrayPart1);
  }

  revenueOfContractByYearArrayPart1.forEach((element) => {
    revenueOfContractInYear += element;
  });

  // CONTRACT
  let contractOfYear = 0;
  let maxContract = 0;
  maxContract = Math.max(...receivedServiceRequestArrayPart1);
  let positionMaxContract = 0;
  positionMaxContract = receivedServiceRequestArrayPart1.indexOf(maxContract) + 1;
  receivedServiceRequestArrayPart1.forEach((element) => {
    contractOfYear += element;
  });

  function onOpenContractWindown(event) {
    window.open(event.contractUrl);
  }

  const CONTRACTLIST = [
    {
      title: 'STT',
      dataIndex: 'index',
      search: false,
      render: (text, object, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Tên hợp động',
      dataIndex: 'contractTitle',
      search: false,
    },
    {
      title: 'Ngày tạo hợp động',
      dataIndex: 'contractCreateDate',
      search: false,
      render: (text, record) => {
        return <div>{moment(record.contractCreateDate).format('D/M/Y')}</div>;
      }
    },
    {
      title: 'Số tiền trong hợp động',
      dataIndex: 'contractTotalPrice',
      search: false,
      render: (text, record) => {
        return <div>{record.contractTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</div>
      }
    },
    {
      title: 'Hành đồng',
      key: 'action',
      render: (text, record) => {
        const viewContract = { ...record };
        return (
          <Space>
            <a onClick={() => onOpenContractWindown(viewContract)}>Xem hợp đồng</a>
          </Space>
        );
      },
    },
  ];

// REVENUE BY INVOICE
  let revenueOfInvoiceInYear = 0;
  let maxRevenueByInvoice = 0;
  maxRevenueByInvoice = Math.max(...revenueOfInvoiceByYearArrayPart1);
  let positionMaxRevenueByInvoice = 0;
  positionMaxRevenueByInvoice = revenueOfInvoiceByYearArrayPart1.indexOf(maxRevenueByInvoice) + 1;

  if (quarterInYearPickerPart1 === 1) {
    maxRevenueByInvoice = Math.max(...revenueOfInvoiceByQuarterArrayPart1);
  }
  if (quarterInYearPickerPart1 === 2) {
    maxRevenueByInvoice = Math.max(...revenueOfInvoiceByQuarterArrayPart1);
  }
  if (quarterInYearPickerPart1 === 3) {
    maxRevenueByInvoice = Math.max(...revenueOfInvoiceByQuarterArrayPart1);
  }
  if (quarterInYearPickerPart1 === 4) {
    maxRevenueByInvoice = Math.max(...revenueOfInvoiceByQuarterArrayPart1);
  }

  revenueOfInvoiceByYearArrayPart1.forEach((element) => {
    revenueOfInvoiceInYear += element;
  });



  // INVOICE
  let invoiceOfYear = 0;
  let maxInvoice = 0;
  maxInvoice = Math.max(...receivedServiceRequestArrayPart1);
  let positionMaxInvoice = 0;
  positionMaxInvoice = receivedServiceRequestArrayPart1.indexOf(maxInvoice) + 1;

  invoiceListPart1.forEach((element) => {
    invoiceOfYear += element;
  });

  console.log('invoiceListPart1', invoiceListPart1)
  console.log('invoiceOfYear', invoiceOfYear)

  // function onOpenContractWindown(event) {
  //   window.open(event.contractUrl);
  // }

  const INVOICELIST = [
    {
      title: 'STT',
      dataIndex: 'index',
      search: false,
      render: (text, object, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Tên chủ công trình',
      dataIndex: 'customerName',
      search: false,
    },
    {
      title: 'Ngày tạo hoá đơn',
      dataIndex: 'contractStartDate',
      search: false,
      render: (text, record) => {
        return <div>{moment(record.invoiceDateCreate).format('D/M/Y')}</div>;
      }
    },
    {
      title: 'Số tiền trong hoá đơn',
      dataIndex: 'contractTotalPrice',
      search: false,
      render: (text, record) => {
        return <div>{record.contractTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</div>
      }
    },
    {
      title: 'Hành đồng',
      key: 'action',
      render: (text, record) => {
        const viewInvoice = { ...record };
        return (
          <Space>
            <a>Xem hoá đơn</a>
          </Space>
        );
      },
    },
  ];

  // ========================================================================================

  return (
    <Card
      loading={loading}
      bordered={false}
      title="Chưa biết để tên gì"
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <Select
                onChange={(e) => handleQuarterPickerChangePart1(e)}
                placeholder="Chọn quý"
                style={{ width: 120, marginRight: 10 }}
                allowClear
              >
                <Option value={1}>Quý 1</Option>
                <Option value={2}>Quý 2</Option>
                <Option value={3}>Quý 3</Option>
                <Option value={4}>Quý 4</Option>
              </Select>

              <DatePicker
                picker="year"
                style={{
                  width: 256,
                }}
                // value={yearPickerValue}
                onChange={handleYearPickerChangePart1}
                defaultValue={moment(thisYear.getFullYear(), 'YYYY')}
                placeholder="Chọn năm"
                disabledDate={(d) =>
                  !d ||
                  d.isBefore(moment(2021, 'YYYY-MM-DD').startOf('year')) ||
                  d.isAfter(moment(thisYear.getFullYear(), 'YYYY-MM-DD').startOf('year'))
                }
              />
            </div>
          }
          size="large"
          tabBarStyle={{
            marginBottom: 24,
          }}
        >
          <TabPane key="receivedServiceRequest">
            <Row gutter={24}>
              {/* TỔNG DOANH SỐ THEO HỢP ĐỒNG */}
              {quarterInYearPickerPart1 ? (
                <Col {...topColResponsiveProps}>
                  <ChartCard
                    style={{ height: '200px' }}
                    bordered={false}
                    title={`Tổng tiền ước tính quý ${quarterInYearPickerPart1} theo HỢP ĐỒNG năm ${yearPickerPart1}`}
                    loading={loading}
                    total={() => `${numeral(revenueOfContractInYear).format('0,0')} VND`}
                    footer={
                      <Space style={{flexDirection:'column', alignItems:'flex-start' }}>
                        <Field
                          label={`Tháng ${position} có số tiền cao nhất với:`}
                          value={`${numeral(max).format('0,0')} VND`}
                        />
                        <Field
                          label={`Hợp đồng đã tạo trong quý ${quarterInYearPickerPart1} năm ${yearPickerPart1}:`}
                          value={`${numeral(contractOfYear).format('0,0')}`}
                        />
                        <Field
                          label={`Trong quý ${quarterInYearPickerPart1} tháng ${positionMaxContract} có nhiều hợp đồng nhất với:`}
                          value={`${numeral(maxContract).format('0,0')}`}
                        />
                      </Space>
                    }
                    contentHeight={46}
                  >
                    <TinyArea
                      style={{
                      //  left: true,
                       marginRight: 70,
                      }}
                      color="#975FE4"
                      xField="x"
                      height={46}
                      forceFit
                      yField="y"
                      smooth
                      data={revenueOfContractByQuarterArrayPart1}
                    />
                  </ChartCard>
                </Col>
              ) : (
                <Col {...topColResponsiveProps}>
                  <ChartCard
                    style={{ height: '200px' }}
                    bordered={false}
                    title={`Tổng tiền ước tính theo HỢP ĐỒNG năm ${yearPickerPart1}`}
                    loading={loading}
                    total={() => `${numeral(revenueOfContractInYear).format('0,0')} VND`}
                    footer={
                      <Space style={{flexDirection:'column', alignItems:'flex-start' }}>
                        <Field
                          label={`Tháng ${position} có số tiền cao nhất với:`}
                          value={`${numeral(max).format('0,0')} VND`}
                        />
                        <Field
                          label={`Hợp đồng đã tạo trong năm ${yearPickerPart1}:`}
                          value={`${numeral(contractOfYear).format('0,0')}`}
                        />
                        <Field
                          label={`Tháng ${positionMaxContract} có nhiều hợp đồng nhất với:`}
                          value={`${numeral(maxContract).format('0,0')}`}
                        />
                      </Space>
                    }
                    contentHeight={46}
                  >
                    <TinyArea
                      color="#975FE4"
                      xField="x"
                      height={46}
                      forceFit
                      yField="y"
                      smooth
                      data={revenueOfContractByYearArrayPart1}
                    />
                  </ChartCard>
                </Col>
              )}

              {/* TỔNG DOANH SỐ THEO HỢP ĐỒNG */}
              {quarterInYearPickerPart1 ? (
                <Col {...topColResponsiveProps}>
                  <ChartCard
                    style={{ height: '200px' }}
                    bordered={false}
                    title={`Tổng tiền ước tính quý ${quarterInYearPickerPart1} theo HOÁ ĐƠN năm ${yearPickerPart1}`}
                    loading={loading}
                    total={() => `${numeral(revenueOfInvoiceInYear).format('0,0')} VND`}
                    footer={
                      <Space style={{flexDirection:'column', alignItems:'flex-start' }}>
                        <Field
                          label={`Tháng ${positionMaxRevenueByInvoice} có số tiền cao nhất với:`}
                          value={`${numeral(maxRevenueByInvoice).format('0,0')} VND`}
                        />
                        <Field
                          label={`Hoá đơn đã xuất trong quý ${quarterInYearPickerPart1} năm ${yearPickerPart1}:`}
                          value={`${numeral(invoiceOfYear).format('0,0')}`}
                        />
                        <Field
                          label={`Trong quý ${quarterInYearPickerPart1} tháng ${positionMaxInvoice} có nhiều hoá đơn nhất với:`}
                          value={`${numeral(maxInvoice).format('0,0')}`}
                        />
                      </Space>
                      
                      
                    }
                    contentHeight={46}
                  >
                    <TinyArea
                      style={{
                      //  left: true,
                       marginRight: 70,
                      }}
                      color="#975FE4"
                      xField="x"
                      height={46}
                      forceFit
                      yField="y"
                      smooth
                      data={revenueOfInvoiceByYearArrayPart1}
                    />
                  </ChartCard>
                </Col>
              ) : (
                <Col {...topColResponsiveProps}>
                  <ChartCard
                    style={{ height: '200px' }}
                    bordered={false}
                    title={`Tổng tiền ước tính theo HOÁ ĐƠN năm ${yearPickerPart1}`}
                    loading={loading}
                    total={() => `${numeral(revenueOfInvoiceInYear).format('0,0')} VND`}
                    footer={
                      <Space style={{flexDirection:'column', alignItems:'flex-start' }}>
                        <Field
                          label={`Tháng ${positionMaxRevenueByInvoice} có số tiền cao nhất với:`}
                          value={`${numeral(maxRevenueByInvoice).format('0,0')} VND`}
                        />
                        <Field
                          label={`Hoá đơn đã xuất trong năm ${yearPickerPart1}:`}
                          value={`${numeral(invoiceOfYear).format('0,0')}`}
                        />
                        <Field
                          label={`Tháng ${positionMaxInvoice} có nhiều hoá đơn nhất với:`}
                          value={`${numeral(maxInvoice).format('0,0')}`}
                        />
                      </Space>
                    }
                    contentHeight={46}
                  >
                    <TinyArea
                      color="#975FE4"
                      xField="x"
                      height={46}
                      forceFit
                      yField="y"
                      smooth
                      data={revenueOfInvoiceByYearArrayPart1}
                    />
                  </ChartCard>
                </Col>
              )}
            </Row>

            <div className={styles.title}>DANH SÁCH HỢP ĐỒNG</div>
            <Row gutter={24}>
              <Col span={24}>
                <ProTable
                  style={{
                    marginBottom: 24,
                  }}
                  pagination={{
                    pageSize: 5,
                  }}
                  search={false}
                  options={false}
                  toolBarRender={false}
                  columns={CONTRACTLIST}
                  rowKey="contractId"
                  dataSource={contractListPart1}
                />
              </Col>
            </Row>

            <div className={styles.title}>DANH SÁCH HOÁ ĐƠN</div>
            <Row gutter={24}>
              <Col span={24}>
                <ProTable
                  style={{
                    marginBottom: 24,
                  }}
                  pagination={{
                    pageSize: 5,
                  }}
                  search={false}
                  options={false}
                  toolBarRender={false}
                  columns={INVOICELIST}
                  rowKey="contractId"
                  dataSource={invoiceListPart1}
                />
              </Col>
            </Row>

            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  style={{ height: '200px' }}
                  bordered={false}
                  loading={loading}
                  title="Tổng số dịch vụ áp dụng voucher"
                  // action={
                  //   <Tooltip title="Mô tả chỉ số">
                  //     <InfoCircleOutlined />
                  //   </Tooltip>
                  // }
                  total={numeral(promotionIsUsed).format('0,0')}
                  footer={
                    <Space style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Field
                        label="Số dịch vụ áp dụng voucher trong tháng:"
                        value={numeral(promotionIsUsedInMonth).format('0,0')}
                      />
                      <Field
                        label="Số dịch vụ áp dụng voucher trong năm:"
                        value={numeral(promotionIsUsedInYear).format('0,0')}
                      />
                    </Space>
                  }
                  contentHeight={46}
                >
                  {/* <TinyArea
                    color="#975FE4"
                    xField="x"
                    height={46}
                    forceFit
                    yField="y"
                    smooth
                    data={visitData}
                  /> */}
                </ChartCard>
              </Col>

              <Col {...topColResponsiveProps}>
                <ChartCard
                  style={{ height: '200px' }}
                  bordered={false}
                  loading={loading}
                  title="Tổng số khách hàng"
                  // action={
                  //   <Tooltip title="Mô tả chỉ số">
                  //     <InfoCircleOutlined />
                  //   </Tooltip>
                  // }
                  total={numeral(totalCustomers).format('0,0')}
                  footer={
                    <Space style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Field
                        label="Số khách hàng mới trong tháng:"
                        value={numeral(amountOfNewCustomersInMonth).format('0,0')}
                      />
                      <Field
                        label="Số khách hàng bị chặn:"
                        value={numeral(amountOfBanCustomers).format('0,0')}
                      />
                      <Field
                        label="Số khách hàng bị chặn trong tháng:"
                        value={numeral(amountOfBanCustomersInMonth).format('0,0')}
                      />
                    </Space>
                  }
                  contentHeight={46}
                >
                  {/* <TinyArea
                    color="#975FE4"
                    xField="x"
                    height={46}
                    forceFit
                    yField="y"
                    smooth
                    data={visitData}
                  /> */}
                </ChartCard>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>

    // <Row gutter={24}>

    //   <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       style={{height:"200px"}}
    //       bordered={false}
    //       loading={loading}
    //       title="Tổng số thợ"
    //       // action={
    //       //   <Tooltip title="Mô tả chỉ số">
    //       //     <InfoCircleOutlined />
    //       //   </Tooltip>
    //       // }
    //       total={numeral(totalWorkers).format('0,0')}
    //       footer={
    //         <Space style={{flexDirection:'column', alignItems:'flex-start' }}>
    //           <Field label="Số thợ mới trong tháng:" value={numeral(amountOfNewWorkersInMonth).format('0,0')} />
    //         </Space>

    //     }
    //       contentHeight={46}
    //     >
    //       {/* <TinyArea
    //         color="#975FE4"
    //         xField="x"
    //         height={46}
    //         forceFit
    //         yField="y"
    //         smooth
    //         data={visitData}
    //       /> */}
    //     </ChartCard>
    //   </Col>

    //   {/* <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       style={{height:"180px"}}
    //       bordered={false}
    //       loading={loading}
    //       title="Số lượng thanh toán"
    //       action={
    //         <Tooltip title="Mô tả chỉ số">
    //           <InfoCircleOutlined />
    //         </Tooltip>
    //       }
    //       total={numeral(6560).format('0,0')}
    //       footer={<Field label="Tỷ lệ chuyển đổi" value="60%" />}
    //       contentHeight={46}
    //     >
    //       <TinyColumn xField="x" height={46} forceFit yField="y" data={RevenuByYearData} />
    //     </ChartCard>
    //   </Col> */}

    //   {/* <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       style={{height:"180px"}}
    //       loading={loading}
    //       bordered={false}
    //       title="Hiệu quả hoạt động điều hành"
    //       action={
    //         <Tooltip title="Mô tả chỉ số">
    //           <InfoCircleOutlined />
    //         </Tooltip>
    //       }
    //       total="78%"
    //       footer={
    //         <div
    //           style={{
    //             whiteSpace: 'nowrap',
    //             overflow: 'hidden',
    //           }}
    //         >
    //           <Trend
    //             flag="up"
    //             style={{
    //               marginRight: 16,
    //             }}
    //           >
    //             Tuần trên tuần
    //             <span className={styles.trendText}>12%</span>
    //           </Trend>
    //           <Trend flag="down">
    //             Ngày qua ngày
    //             <span className={styles.trendText}>11%</span>
    //           </Trend>
    //         </div>
    //       }
    //       contentHeight={46}
    //     >
    //       <Progress
    //         height={46}
    //         percent={0.78}
    //         color="#13C2C2"
    //         forceFit
    //         size={8}
    //         marker={[
    //           {
    //             value: 0.8,
    //             style: {
    //               stroke: '#13C2C2',
    //             },
    //           },
    //         ]}
    //       />
    //     </ChartCard>
    //   </Col> */}

    //   {/* <Col {...topColResponsiveProps}>
    //     <Pie {...config} />
    //   </Col> */}
    // </Row>
  );
};

export default IntroduceRow;
