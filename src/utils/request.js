/* eslint-disable no-restricted-globals */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { deleteAllCookie, removeLocalStorage, removeUserInfo, removeAppToken } from './utils';
import { setAuthority } from './authority';

const codeMessage = {
  200: 'Thực hiện thành công',
  201: 'Tạo thành công',
  202: 'Một yêu cầu đã vào hàng đợi nền (tác vụ không đồng bộ)',
  204: 'Xóa dữ liệu thành công',
  400: 'Đã xảy ra lỗi trong yêu cầu được yêu cầu và máy chủ không tạo hoặc sửa đổi dữ liệu',
  401: 'Người dùng không có quyền (token, tên người dùng, mật khẩu sai)',
  403: 'Người dùng được phép, nhưng quyền truy cập bị cấm',
  404: 'Không tìm thấy tài nguyên',
  405: 'Phương pháp không được phép',
  406: 'Định dạng được yêu cầu không có sẵn',
  410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn nữa',
  422: 'Khi tạo một đối tượng, đã xảy ra lỗi xác thực',
  500: 'Có lỗi xảy ra. Vui lòng thử lại',
  502: 'Lỗi cổng',
  503: 'Dịch vụ không khả dụng, máy chủ tạm thời quá tải hoặc được bảo trì',
  504: 'Cổng vào đã hết thời gian',
};

const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url, ...params } = response;
    console.log('RES ERR', params);
    notification.error({
      // message: `Request Error ${status}: ${url}`,
      message: `Yêu cầu lỗi ${url}`,

      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Mạng của bạn không bình thường và không thể kết nối với máy chủ',
      message: 'Mạng bất thường',
    });
  }

  return response;
};

const request = extend({
  // eslint-disable-next-line no-undef
  prefix: API_URL,
  errorHandler,
});

request.interceptors.request.use((url, options) => {
  const jwtToken = localStorage.getItem('USER_TOKEN');
  Object.assign(options.headers, {
    Authorization: `Bearer ${jwtToken}`,

  });

  return { url, options };
});

request.interceptors.response.use((response, options) => {
  const { status } = response;
  const { method } = options;
  if (options.responseType === 'blob') {
    return response;
  }
  switch (status) {
    case 200:
      if (method !== 'GET')
        notification.success({
          message: 'Thành Công',
          description: codeMessage[200],
        });
      break;
    case 201:
      if (method !== 'GET')
        notification.success({
          message: 'Thành Công',
          description: codeMessage[201],
        });
      break;
    case 401:
      notification.error({
        message: 'Chưa được cấp phép',
        description: 'Chưa đăng nhập. Vui lòng đăng nhập',
      });
      deleteAllCookie();
      removeLocalStorage('SYSTEM_ROLE');
      location.href = '/user/login';
      setAuthority(null);
      removeAppToken();
      removeUserInfo();
      break;
    case 403:
      notification.error({
        message: response.statusText,
        description: `Yêu cầu của bạn tới ${response.url} đã bị cấm`,
      });
      break;
    case 405:
      notification.error({
        message: response.statusText,
        description: `${response.body.message}`,
      });
      break;
    default:
      break;
  }

  return response;
});

export default request;
