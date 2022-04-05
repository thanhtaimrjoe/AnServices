import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Space, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import styles from '../style.less';
import { Pie, G2 } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';
import {
  dashboard,
} from '@/services/dashboard';

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
  const [receivedServiceRequestArray, setReceivedServiceRequestArray] = useState([]);

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

      if(res.revenueByYear !== null) {
        revenueByYearArray.splice(0,12);
        setRevenueByYearArray([...revenueByYearArray, 
          res.revenueByYear.january, 
          res.revenueByYear.february, 
          res.revenueByYear.march, 
          res.revenueByYear.april, 
          res.revenueByYear.may, 
          res.revenueByYear.june, 
          res.revenueByYear.july, 
          res.revenueByYear.august, 
          res.revenueByYear.september, 
          res.revenueByYear.october, 
          res.revenueByYear.november, 
          res.revenueByYear.december, 
        ]);
      } else {
        setRevenueByYearArray([...revenueByYearArray, 
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
      }

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
    });

    

  }, []);

  const totalService = satisfiedRequestDetail + unsatisfiedRequestDetail;
  const persentSatisfiedRequestDetail = (satisfiedRequestDetail / totalService) * 100;
  const persentUnsatisfiedRequestDetail = (unsatisfiedRequestDetail / totalService) * 100;

  // REVENUE
  let revenuOfYear = 0;
  const max = Math.max(...revenueByYearArray);
  const position = revenueByYearArray.indexOf(max) +1;
  revenueByYearArray.forEach(element => {
    revenuOfYear += element;
  });

  // CONTRACT
  let contractOfYear = 0;
  const maxContract = Math.max(...receivedServiceRequestArray);
  const positionMaxContract = receivedServiceRequestArray.indexOf(maxContract) +1;
  receivedServiceRequestArray.forEach(element => {
    contractOfYear += element;
  });

  //
  const G = G2.getEngine('canvas');

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

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps} >
        <ChartCard
          style={{height:"200px"}}
          bordered={false}
          title="Tổng doanh số"
          action={
            <Tooltip title="Mô tả doanh thu theo từng tháng trong năm">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={() => `${numeral(revenuOfYear).format('0,0')} VND`}
          footer={<Field label={`Tháng ${position} có doanh thu cao nhất với:`} value={`${numeral(max).format('0,0')} VND`} />}
          contentHeight={46}
        >
          {/* <Trend
            flag="up"
            style={{
              marginRight: 16,
            }}
          >
            周同比
            <span className={styles.trendText}>12%</span>
          </Trend>
          <Trend flag="down">
            日同比
            <span className={styles.trendText}>11%</span>
          </Trend> */}

          <TinyArea
            color="#975FE4"
            xField="x"
            height={46}
            forceFit
            yField="y"
            smooth
            data={revenueByYearArray}
          />
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps} >
        <ChartCard
          style={{height:"200px"}}
          bordered={false}
          title="Hợp đồng đã tạo trong năm"
          loading={loading}
          total={() => `${numeral(contractOfYear).format('0,0')}`}
          footer={<Field label={`Tháng ${positionMaxContract} có nhiều hợp đồng nhất với:`} value={`${numeral(maxContract).format('0,0')} hợp đồng`} />}
          contentHeight={46}
        >
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          style={{height:"200px"}}
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
            <Space style={{flexDirection:'column', alignItems:'flex-start' }}>
              <Field label="Số dịch vụ áp dụng voucher trong tháng:" value={numeral(promotionIsUsedInMonth).format('0,0')} />
              <Field label="Số dịch vụ áp dụng voucher trong năm:" value={numeral(promotionIsUsedInYear).format('0,0')} /> 
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
          style={{height:"200px"}}
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
            <Space style={{flexDirection:'column', alignItems:'flex-start' }}>
              <Field label="Số khách hàng mới trong tháng:" value={numeral(amountOfNewCustomersInMonth).format('0,0')} />
              <Field label="Số khách hàng bị chặn:" value={numeral(amountOfBanCustomers).format('0,0')} />
              <Field label="Số khách hàng bị chặn trong tháng:" value={numeral(amountOfBanCustomersInMonth).format('0,0')} />
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
          style={{height:"200px"}}
          bordered={false}
          loading={loading}
          title="Tổng số thợ"
          // action={
          //   <Tooltip title="Mô tả chỉ số">
          //     <InfoCircleOutlined />
          //   </Tooltip>
          // }
          total={numeral(totalWorkers).format('0,0')}
          footer={
            <Space style={{flexDirection:'column', alignItems:'flex-start' }}>
              <Field label="Số thợ mới trong tháng:" value={numeral(amountOfNewWorkersInMonth).format('0,0')} />
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

      {/* <Col {...topColResponsiveProps}>
        <ChartCard
          style={{height:"180px"}}
          bordered={false}
          loading={loading}
          title="Số lượng thanh toán"
          action={
            <Tooltip title="Mô tả chỉ số">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(6560).format('0,0')}
          footer={<Field label="Tỷ lệ chuyển đổi" value="60%" />}
          contentHeight={46}
        >
          <TinyColumn xField="x" height={46} forceFit yField="y" data={RevenuByYearData} />
        </ChartCard>
      </Col> */}

      {/* <Col {...topColResponsiveProps}>
        <ChartCard
          style={{height:"180px"}}
          loading={loading}
          bordered={false}
          title="Hiệu quả hoạt động điều hành"
          action={
            <Tooltip title="Mô tả chỉ số">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total="78%"
          footer={
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <Trend
                flag="up"
                style={{
                  marginRight: 16,
                }}
              >
                Tuần trên tuần
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                Ngày qua ngày
                <span className={styles.trendText}>11%</span>
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <Progress
            height={46}
            percent={0.78}
            color="#13C2C2"
            forceFit
            size={8}
            marker={[
              {
                value: 0.8,
                style: {
                  stroke: '#13C2C2',
                },
              },
            ]}
          />
        </ChartCard>
      </Col> */}


      {/* <Col {...topColResponsiveProps}>
        <Pie {...config} />
      </Col> */}
    </Row>
  );
};

export default IntroduceRow;
