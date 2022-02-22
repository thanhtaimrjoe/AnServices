import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, notification, Tabs, message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage, useModel } from 'umi';
import { AccountLogin } from '@/services/login';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = ({ history, ...props }) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('User');
  const intl = useIntl();

  const handleSubmit = (values) => {
    const data = { username: values.userName, password: values.Password };
    console.log(data)
    AccountLogin(data).then((res) => {
      console.log('roledata', data);
      console.log('rolelogin', res);
      // console.log('rolelogin', res.userRole);
      if (res.status === 400) {
        const defaultLoginFailureMessage = intl.formatMessage({
          id: 'pages.login.400',
          defaultMessage: 'Vui lòng nhập tài khoản hoặc mật khẩu',
        });
        message.error(defaultLoginFailureMessage);

        // notification.open({ message: 'Sai mật khẩu' });
      }
      if (res.status === 404) {
        const defaultLoginFailureMessage = intl.formatMessage({
          id: 'pages.login.404',
          defaultMessage: 'Sai tài khoản hoặc mật khẩu',
        });
        message.error(defaultLoginFailureMessage);

        // notification.open({ message: 'Sai tài khoản hoặc mật khẩu' });
      }
      if(res.userRole === "Staff") {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Đăng nhập thành công',
        });
        message.success(defaultLoginSuccessMessage);
        if (res.token) {
          localStorage.setItem('USER_ID', res.id);
          localStorage.setItem('USER_TOKEN', res.token);
          localStorage.setItem('EXPIRED', res.expired);
          localStorage.setItem('ACCOUNT_ROLE', res.userRole);
          localStorage.setItem('USERNAME', res.fullName);
          history.push('/welcome');
        } 
      } 
      else {
        // notification.open({ message:'Tài khoản của bạn không đủ quyền để đăng nhập'})
        // const defaultLoginFailureMessage = intl.formatMessage({
        //   id: 'pages.login.failure',
        //   defaultMessage: 'Đăng nhập thất bại, vui lòng nhập lại',
        // });
        // message.error(defaultLoginFailureMessage);
        localStorage.removeItem('USER_TOKEN', res.token);
        // history.push('User/LoginStaff')
        history.push('login')

      }

    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          searchConfig: { submitText: 'Đăng nhập' },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane key="User" />
        </Tabs>

        {status === 'error' && loginType === 'User' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: 'Sai tài khoản hoặc mật khẩu',
            })}
          />
        )}
        {type === 'User' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'Tên người dùng',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Vui lòng nhập tên người dùng!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="Password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.Password.placeholder',
                defaultMessage: 'Nhập mật khẩu',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.Password.required"
                      defaultMessage="Vui lòng nhập mật khẩu!"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {/* {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="Lỗi mã xác minh" />
        )} */}
        {/* {type === 'mobile' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              name="mobile"
              placeholder={intl.formatMessage({
                id: 'pages.login.phoneNumber.placeholder',
                defaultMessage: '手机号',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.phoneNumber.required"
                      defaultMessage="请输入手机号！"
                    />
                  ),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: (
                    <FormattedMessage
                      id="pages.login.phoneNumber.invalid"
                      defaultMessage="手机号格式错误！"
                    />
                  ),
                },
              ]}
            />
          </>
        )} */}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <a
            style={{
              float: 'right',
            }}
          ></a>
        </div>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
