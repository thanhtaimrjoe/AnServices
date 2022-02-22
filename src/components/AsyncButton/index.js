/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const AsyncButton = ({ onClick, title, btnProps, isNeedConfirm = false }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    if (!onClick) return;
    if (isNeedConfirm) {
      const { title: confirmTitle, icon, content, okText, cancelText, okType } = isNeedConfirm;
      // eslint-disable-next-line consistent-return
      return confirm({
        title: confirmTitle ?? 'Are you sure delete this task?',
        icon: icon ?? <ExclamationCircleOutlined />,
        content: content ?? 'Some descriptions',
        okText: okText ?? 'Xác nhận',
        okType: okType ?? 'danger',
        cancelText: cancelText ?? 'Huỷ',
        onOk() {
          setLoading(true);
          return Promise.resolve(onClick()).finally(() => setLoading(false));
        },
        onCancel() {},
      });
    }
    setLoading(true);
    return Promise.resolve(onClick()).finally(() => setLoading(false));

  };

  //   const renderChildren = React.Children.map(children, (button) => {
  //     if (isValidElement) {
  //       return React.cloneElement(button, { ...button.prop, onClick: handleClick, loading });
  //     }
  //     return button;
  //   });

  return (
    <Button {...btnProps} loading={loading} onClick={handleClick}>
      {title}
    </Button>
  );
};

AsyncButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AsyncButton;
