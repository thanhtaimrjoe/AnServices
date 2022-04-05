import { Space, Tag } from 'antd';
import React from 'react';
import { connect } from 'umi';
import HeaderSearch from '../HeaderSearch';
import TimeCountDown from '../TimeCountdown/TimeCountDown';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout, timeLeft } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const defaultValue = () => {
    const role = localStorage.getItem('ACCOUNT_ROLE')?.split(',');
    const RoleList = [];
    role?.map((roleItem, index) => {
      RoleList.push(
        <Tag key={index} color="#62A33C" >
          {roleItem}
        </Tag>,
      );
    });
    return RoleList;
  };

  return (
    <Space className={className}>
      {/* <div>Vai trò: {defaultValue()}</div> */}
      {/* <TimeCountDown timeLeft={timeLeft} /> */}
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Tìm trang"
        // defaultValue="Quản lý tài khoản khách hàng"
        options={[
          {
            label: <a href="/accounts/list">Quản lý tài khoản khách hàng</a>,
            value: 'Quản lý tài khoản khách hàng',
          },
          {
            label: <a href="/workers/list">Quản lý tài khoản thợ</a>,
            value: 'Quản lý tài khoản thợ',
          },
          {
            label: <a href="/requestservices/list">Quản lý dịch vụ yêu cầu</a>,
            value: 'Quản lý dịch vụ yêu cầu',
          },
        ]} // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
    </Space>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
