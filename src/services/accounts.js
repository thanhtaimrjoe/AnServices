import request from '@/utils/request';

export const createAccount = (account) => {
  return request.post('/accounts', {
    data: account.update,
  });
};

export const deleteAccount = (accountId) => {
  return request.delete(`/accounts/${accountId}`);
};

// export const updateReportAttribute = (reportId, rpatt) => {
//   return request.put(`/report-attributes/${reportId}`, {
//     data: rpatt.update,
//   });
// };

export const getAllAccounts = (filters) => {
  return request.get('/accounts', {
    params: filters,
  });
};

export const getAccountByID = (id) => {
  return request.get('/accounts?page=1&size=1000', {
    params: {
      id,
    },
  });
};

// export const getReportAttributeByName = (name) => {
//   return request.get('/accounts?page=1&size=1000', {
//     params: {
//       name,
//     },
//   });
// };

// export const getReportAttributeByCode = () => {
//   return request.get('/accounts?page=1&size=1000', { useCache: true });
// };
