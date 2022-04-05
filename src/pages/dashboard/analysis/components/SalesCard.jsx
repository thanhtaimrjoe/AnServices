import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { Column } from '@ant-design/charts';
import numeral from 'numeral';
import styles from '../style.less';
import moment from 'moment';
import { dashboard } from '@/services/dashboard';
import React, { useEffect, useState } from 'react';


const { TabPane } = Tabs;
const rankingListData = [];

for (let i = 0; i < 6; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const SalesCard = ({
  salesData,
  completeServiceRequestData,
  cancelServiceRequestData,
  isActive,
  handleYearPickerChange,
  loading,
  selectYear,
  yearPickerValue,
}) => {
  const thisYear = new Date();
  // const sortRevenue = revenueByYearArray.sort(function(a,b){return b-a});

  // useEffect(() => {
  //   dashboard().then((res) => {
      
  //     if (res.completeServiceRequest !== null) {
  //       completeServiceRequestArray.splice(0, 12);
  //       setCompleteServiceRequestArray([
  //         ...completeServiceRequestArray,
  //         res.completeServiceRequest.january,
  //         res.completeServiceRequest.february,
  //         res.completeServiceRequest.march,
  //         res.completeServiceRequest.april,
  //         res.completeServiceRequest.may,
  //         res.completeServiceRequest.june,
  //         res.completeServiceRequest.july,
  //         res.completeServiceRequest.august,
  //         res.completeServiceRequest.september,
  //         res.completeServiceRequest.october,
  //         res.completeServiceRequest.november,
  //         res.completeServiceRequest.december,
  //       ]);
  //     } else {
  //       setCompleteServiceRequestArray([
  //         ...completeServiceRequestArray,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //       ]);
  //     }

  //     if (res.cancelServiceRequest !== null) {
  //       cancelServiceRequestArray.splice(0, 12);
  //       setCancelServiceRequestArray([
  //         ...cancelServiceRequestArray,
  //         res.cancelServiceRequest.january,
  //         res.cancelServiceRequest.february,
  //         res.cancelServiceRequest.march,
  //         res.cancelServiceRequest.april,
  //         res.cancelServiceRequest.may,
  //         res.cancelServiceRequest.june,
  //         res.cancelServiceRequest.july,
  //         res.cancelServiceRequest.august,
  //         res.cancelServiceRequest.september,
  //         res.cancelServiceRequest.october,
  //         res.cancelServiceRequest.november,
  //         res.cancelServiceRequest.december,
  //       ]);
  //     } else {
  //       setCancelServiceRequestArray([
  //         ...cancelServiceRequestArray,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0,
  //       ]);
  //     }
  //   });

  // }, []);

  return (
    <Card
      loading={loading}
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <DatePicker
                picker="year"
                style={{
                  width: 256,
                }}
                value={yearPickerValue}
                onChange={handleYearPickerChange}
                defaultValue={moment(thisYear.getFullYear(), 'YYYY')}
                placeholder="Chọn năm"
                disabledDate={
                  (d) => !d || d.isBefore(moment(2021, 'YYYY-MM-DD').startOf('year'))
                  // || d.isAfter(moment(new Date().getFullYear +1 ,"YYYY-MM-DD" ))
                }
              />
            </div>
          }
          size="large"
          tabBarStyle={{
            marginBottom: 24,
          }}
        >
          <TabPane tab="Dịch vụ đã nhận" key="receivedServiceRequest">
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Column
                    height={300}
                    forceFit
                    data={salesData}
                    xField="x"
                    yField="y"
                    xAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    yAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    title={{
                      visible: false,
                      text: 'Không biết là gì 1',
                      style: {
                        fontSize: 14,
                      },
                    }}
                    meta={{
                      x: {
                        alias: ' ',
                      },
                      y: {
                        alias: 'Yêu cầu đã nhận',
                      },
                    }}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>Xếp hạng</h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Dịch vụ đã hoàn thành" key="completeServiceRequest">
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Column
                    height={300}
                    forceFit
                    data={completeServiceRequestData}
                    xField="x"
                    yField="y"
                    xAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    yAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    title={{
                      visible: false,
                      text: 'Không biết là gì 2',
                      style: {
                        fontSize: 14,
                      },
                    }}
                    meta={{
                      x: {
                        alias: ' ',
                      },
                      y: {
                        alias: 'Yêu cầu đã hoàn thành',
                      },
                    }}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>Xếp hạng</h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Dịch vụ đã huỷ" key="cancelServiceRequest">
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Column
                    height={300}
                    forceFit
                    data={cancelServiceRequestData}
                    xField="x"
                    yField="y"
                    xAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    yAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    title={{
                      visible: false,
                      text: 'Không biết là gì 3',
                      style: {
                        fontSize: 14,
                      },
                    }}
                    meta={{
                      x: {
                        alias: ' ',
                      },
                      y: {
                        alias: 'Yêu cầu đã huỷ',
                      },
                    }}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>Xếp hạng</h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
};

export default SalesCard;
