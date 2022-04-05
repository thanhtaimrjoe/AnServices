import request from '@/utils/request';

export const deletePost = (PostId) => {
  return request.delete(`/posts/${PostId}`);
};

export const removeListServiceRequest = (prod) => {
  return request.delete(`/Service/RemoveListServiceRequest`, {
  data: prod,
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

export const completeServiceRequest = (id) => {
  return request.put(`/Service/CompleteServiceRequest?serviceRequestID=${id}`);
};

export const surveyingServiceRequest = (id) => {
  return request.put(`/Service/SurveyingServiceRequest?serviceRequestID=${id}`);
};

export const getRepairDetailByServiceRequestID = (serviceRequestId) => {
  return request.get(`/RepairDetail/GetRepairDetailByServiceRequestID?requestServiceId=${serviceRequestId}`);
};

export const reworkRequestDetail = (requestDetailId) => {
  return request.put(`/Service/ReworkRequestDetail?requestDetailID=${requestDetailId}`);
};

export const getTest = (serviceRequestId) => {
  return request.get(`/Service/Test?id=${serviceRequestId}`);
};

