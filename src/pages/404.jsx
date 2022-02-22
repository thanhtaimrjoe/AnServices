import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Trở về đăng nhập
      </Button>
    }
  />
);

export default NoFoundPage;
