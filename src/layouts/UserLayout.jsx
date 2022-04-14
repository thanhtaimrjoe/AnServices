import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useIntl, connect } from 'umi';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        {/* <div className={styles.lang}>
          <SelectLang />
        </div> */}
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                {/* HÌNH BÊN TRÁI CHỮ ANSERVICES Ở NGOÀI MÀN HÌNH LOGIN */}
                <img alt="logo" className={styles.logo} src={"https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/Icon%2Frepair.png?alt=media&token=41e0bb4b-c2c3-4f00-8aac-46df1b316a7a"} />
                <span className={styles.title}>AnServices</span>
              </Link>
              {/* <Link to ="/user/create">
                <div className={styles.signup}>Sign Up For Business</div>
              </Link> */}

            </div>
          </div>
          
          {children}
        </div>
        
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
