import { Tag } from 'antd';
import React from 'react';
import { connect } from 'umi';
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
    <div className={className}>
      {/* <div>Vai trò: {defaultValue()}</div> */}
      {/* <TimeCountDown timeLeft={timeLeft} /> */}
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
