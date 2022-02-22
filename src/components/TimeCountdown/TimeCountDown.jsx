import { Tag } from 'antd';
import React from 'react';
import { connect } from 'umi';

const TimeCountDown = (props) => {
  const { timeLeft } = props;
  return (
    <div>
      <Tag color={timeLeft < 10000 ? 'red' : 'green'}>
        0{Math.floor((timeLeft / 1000 / 60) % 60)}:
        {Math.floor((timeLeft / 1000) % 60) === 0 ? '00' : Math.floor((timeLeft / 1000) % 60)}
      </Tag>
    </div>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(TimeCountDown);
