/* eslint-disable no-useless-escape */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
import moment from 'moment';
import { parse } from 'querystring';
import request from './request';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
};

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const getTableData = (resource, options) => {
  // return {
  //   total: data.length,
  //   list: data,
  // };
  return request.get(`/${resource}`, options).then((res) => ({
    total: res?.metadata?.total ?? res.length,
    list: res.data ?? res,
    data: res.data ?? res,
    success: true,
  }));
};
export const getImgUrl = (imageName) =>
  `https://${window.__RUNTIME_CONFIG__.S3_BUCKETNAME}.s3.${window.__RUNTIME_CONFIG__.S3_REGION}.amazonaws.com${window.__RUNTIME_CONFIG__.S3_DIRECTORY}/${imageName}`;

export const buildParamsWithPro = ({ current, pageSize, ...keywords }, sorter = {}) => {
  // build filters
  const search = {};
  if (!!keywords) {
    Object.entries(keywords).forEach(([key, value]) => {
      if (value) {
        search[`${key}`] = value;
      }
    });
  }
  // build sort
  let sort;
  if (sorter && sorter.field) {
    sort = `${sorter.field},${sorter.order === 'ascend' ? 'ascend' : 'descend'}`;
  }

  return {
    page: current,
    size: pageSize,
    sort,
    ...search,
  };
};

// get Cookie
export const setCookie = (cname, cvalue, expireDay = 10) => {
  const d = new Date();
  d.setTime(d.getTime() + expireDay * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const getCurrentStore = () => localStorage.getItem('CURRENT_STORE');
export const getCurrentArticleType = () => localStorage.getItem('CURRENT_ARTICLE_TYPE');

// set Cookie
export const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
// delete all cookies
export const deleteAllCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

export const removeUserInfo = () => setLocalStorage('USER_INFO', null);
export const setUserInfo = (userInfo) => setLocalStorage('USER_INFO', userInfo);
export const getUserInfo = () => getLocalStorage('USER_INFO');

export const removeAppToken = () => setLocalStorage('APP_TOKEN', null);
export const setAppToken = (token) => setLocalStorage('APP_TOKEN', token);
export const getAppToken = () => getLocalStorage('APP_TOKEN');

export const removeLocalStorage = (key) => localStorage.removeItem(key);

// set localstorage
export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

// get localstorage
export const getLocalStorage = (name) => {
  const value = localStorage.getItem(name);
  return JSON.parse(value);
};
//

export const daysInWeek = [
  'Thứ hai',
  'Thứ ba',
  'Thứ tư',
  'Thứ năm',
  'Thứ sáu',
  'Thứ bảy',
  'Chủ nhật',
];

export const DATE_FORMAT = 'DD/MM/YYYY';

export const convertStrToDate = (string, format = DATE_FORMAT) => {
  return moment(string, format);
};
export const normalizeProductForm = (formData) => {
  const update = { ...formData } || {};
  return {
    ...update,
  };
};

export const convertDateToStr = (date, format = DATE_FORMAT) => {
  return moment(date).format(format).toString();
};

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export const normalizeImg = ([firstImg]) => {
  const { response } = firstImg || {};
  return response;
};

export const renderDayMenu = (dayFilter = []) => dayFilter?.map((dayIndex) => daysInWeek[dayIndex]);
export const normalizeBrandForm = (formData) => {
  const update = { ...formData } || {};
  return {
    ...update,
    display_order: 1,
  };
};

export const normalizeReportForm = (formData) => {
  const update = { ...formData } || {};
  return {
    update,
    display_order: 1,
  };
};
