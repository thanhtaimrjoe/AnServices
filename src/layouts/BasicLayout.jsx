/* eslint-disable no-var */
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';
import moment from 'moment';
import { refeshToken } from '@/services/user';

// var timeout;
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null);
  });

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  const waitTime = 300000;
  const [timeLeft, setTimeLeft] = useState(waitTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  // document.onmousemove = () => {
  //   clearTimeout(timeout);
  //   setTimeLeft(waitTime);
  //   timeout = setTimeout(() => {
  //     localStorage.removeItem('ID');
  //     localStorage.removeItem('USER_TOKEN');
  //     localStorage.removeItem('EXPIRES');
  //     localStorage.removeItem('ACCOUNT_ROLE');
  //     localStorage.removeItem('USERNAME');
  //     document.location.replace('/user/login');
  //   }, waitTime);
  // };
  setInterval(() => {
    const timeNow = moment(new Date()).format('D/M/Y , HH: mm: ss');
    const timeExpires = moment(new Date(localStorage.getItem('EXPIRES'))).format(
      'D/M/Y , HH: mm: ss',
    );

    if (moment(timeNow).isSame(timeExpires)) {
      refeshToken().then((res) => {
        localStorage.setItem('EXPIRES', res.expires);
        localStorage.setItem('USER_TOKEN', res.token);
      });
    }
  }, 1000);
  const menuDataRef = useRef([]);
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /** Init variables */

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );
  const { formatMessage } = useIntl();
  return (
    <ProLayout
      // logo={logo}
      formatMessage={formatMessage}
      {...props}
      {...settings}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/welcome')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          // <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          <Link to={('/welcome')}>{route.breadcrumbName}</Link>

        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent timeLeft={timeLeft} />}
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
