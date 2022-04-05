import { Card, Radio, Typography } from 'antd';
import { DonutChart } from 'bizcharts';
import numeral from 'numeral';
// import { Donut } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';

const { Text } = Typography;

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="Danh mục"
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        {dropdownGroup}
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
            <Radio.Button value="requestService">Yêu cầu</Radio.Button>
            <Radio.Button value="rating">Đánh giá</Radio.Button>
            <Radio.Button value="account">Tài khoản</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <Text>Thống kê số liệu</Text>
      <DonutChart
        forceFit
        height={340}
        radius={0.8}
        angleField="y"
        colorField="x"
        data={salesPieData}
        legend={{
          visible: false,
        }}
        label={{
          visible: true,
          type: 'spider',
          formatter: (text, item) => {
            // eslint-disable-next-line no-underscore-dangle
            return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
          },
        }}
        statistic={{
          totalLabel: 'Tất cả yêu cầu',
        }}
      />
    </div>
  </Card>
);

export default ProportionSales;
