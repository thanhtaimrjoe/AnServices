import request from '@/utils/request';

export const getAllCustomers = (filters) => {
  return request.get('/User/GetAllCustomers', {
    params: filters,
  });
};

export const createCustomerAccount = (prop) => {
  return request.post('/User/CreateCustomerAccount', {
    data: prop.update,
  });
};

export const getCustomerById = (id) => {
  return request.get('/User/GetCustomerById', {
    params: {
      id,
    },
  });
};

export const banUserByUserID = (id) => {
  return request.put(`/User/BanUserByUserID?id=${id}`);
};

export const unbanUserByUserID = (id) => {
  return request.put(`/User/UnBanUserByUserID?id=${id}`);
};

// export const deleteAccount = (accountId) => {
//   return request.delete(`/accounts/${accountId}`);
// }; ?page=1&size=100

// export const updateReportAttribute = (reportId, rpatt) => {
//   return request.put(`/report-attributes/${reportId}`, {
//     data: rpatt.update,
//   });
// };




