import request from '@/utils/request';

export const createPost = (prod) => {
  return request.post(`/posts`, {
    data: prod.update,
  });
};

export const deletePost = (PostId) => {
  return request.delete(`/posts/${PostId}`);
};

export const updatePost = (PostId, prod) => {
  return request.put(`/posts/${PostId}`, {
    data: prod.update,
  });
};

export const createServiceRequest = (prod) => {
  return request.post(`/Service/CreateServiceRequest`, {
    data: prod.update,
  });
};

  export const getAllServiceRequestByUserID = (UserID) => {
    return request.get(`/Service/GetAllServiceRequestByUserID${UserID}`);
  };

  export const getAllService = (filters) => {
      return request.get(`/Service/GetAllService`, {
        params: filters,
      });
    };
  
  export const getAllServiceRequestStatusOrDate = (filters) => {
    return request.get(`/Service/GetAllServiceRequestStatusOrDate`, {
      params: filters,
    });
  };

  export const getAllServiceRequestDetailsByServiceRequestID = (serviceRequestId) => {
    return request.get(`/Service/GetAllServiceRequestDetailsByServiceRequestID?id=${serviceRequestId}`);
  };

  export const getAllServiceRequestByWorkerID = (id) => {
    return request.get(`/Service/GetAllServiceRequestByWorkerID${id}`);
  };

  export const getServiceRequestByID = (serviceRequestId) => {
    return request.get(`/Service/GetServiceRequestByID?id=${serviceRequestId}`);
  };
// export const updatePostStatus = (PostId, prod) => {
//   return request.put(`/posts/${PostId}`, {
//     data: prod.update,
//   });
// };

export const assignWorkerToRequest = (prod) => {
  return request.post(`/Service/AssignWorkerToRequest`, {
    data: prod,
  });
};

export const cancelServiceRequest = (id) => {
  return request.put(`/Service/CancelServiceRequestForStaff?id=${id}`);
};

export const getRepairDetailByServiceRequestID = (serviceRequestId) => {
  return request.get(`/RepairDetail/GetRepairDetailByServiceRequestID?requestServiceId=${serviceRequestId}`);
};