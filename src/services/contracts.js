import request from '@/utils/request';

export const createContract = (prod, id, name, url) => {
    return request.post(`/Contract/CreateContract?id=${id}&name=${name}&url=${url}`, {
      data: prod.update,
    }); 
  };

  export const updateBrand = (id, status, prod) => {
    return request.put(`/Contract/UpdateStatusContract?id=${id}&status=${status}`, {
      data: prod.update,
    });
  };

  export const getContractListByUserID = (id) => {
    return request.get(`/Contract/GetContractListByUserID?id=${id}`);
  };

  export const approveContract = (id, prod) => {
    return request.put(`/Contract/ApproveContract?id=${id}`, {
      data: prod.update,
    });
  };
  
  export const denyContract = (id, prod) => {
    return request.put(`/Contract/DenyContract?id=${id}`, {
      data: prod.update,
    });
  };
  
  export const requestUpdateContract = (id, prod) => {
    return request.put(`/Contract/RequestUpdateContract?id=${id}`, {
      data: prod.update,
    });
  };