import request from '@/utils/request';

export const getAllWorkers = (filters) => {
  return request.get('/User/GetAllWorker', {
    params: {
      filters,
    },
  });
};

export async function rule(params, options) {
  return request('/User/GetAllWorker', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export const getWorkerById = (id) => {
  return request.get(`/User/GetWorkerById?id=${id}`);
};

export const createWorker = (prod) => {
  return request.post(`/User/CreateWorkerAccount`, {
    data: prod.update,
  });
};

export const updateWorker = (prod) => {
  return request.put(`/User/UpdateWorker`, {
    data: prod,
  });
};

export const removeWorker = (accountId) => {
  return request.put(`/User/RemoveWorker?id=${accountId}`);
};

export const getWorkerByServiceID = (serviceID) => {
  return request.get(`/User/GetWorkerByServiceID?id=${serviceID}`, {
  });
};