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

// export const updateBrand = (BrandId, prod) => {
//   return request.put(
//     `/brands/${BrandId}?id=${BrandId}&brand-name=${prod.brand_name}&brand-code=${prod.brand_code}`,
//     {
//       data: prod,
//     },
//   );
// };

export const createRequestService = (prod) => {
  return request.post(`/Service/CreateRequestService`, {
    data: prod.update,
  });
};

export const getAllRequestService = (filters) => {
  return request.get(`/Service/GetAllRequestService?page=1&size=100`, {
    params: filters,
  });
};

  export const getAllRequestServiceByUserID = (UserID) => {
    return request.get(`/Service/GetAllRequestServiceByUserID${UserID}`);
  };

  export const getAllService = (filters) => {
      return request.get(`/Service/GetAllService?page=1&size=100`, {
        params: filters,
      });
    };
  
  export const GetAllRequestServiceStatusOrDate = (filters) => {
    return request.get(`/Service/GetAllRequestServiceStatusOrDate?page=1&size=100`, {
      params: filters,
    });
  };

  export const getAllRequestServiceDetailsByRequestServiceID = (requestServiceId) => {
    return request.get(`/Service/GetAllRequestServiceDetailsByRequestServiceID?id=${requestServiceId}`);
  };

  export const getAllRequestServiceByMasonID = (MasonID) => {
    return request.get(`/Service/GetAllRequestServiceByMasonID${MasonID}`);
  };

  export const getRequestServiceDate = () => {
    return request.get(`/Service/GetAllRequestService?page=1&size=100`, { useCache: true });
  };

  export const getRequestServiceByID = (RequestServiceID) => {
    return request.get(`/Service/GetRequestServiceByID?id=${RequestServiceID}`);
  };
// export const updatePostStatus = (PostId, prod) => {
//   return request.put(`/posts/${PostId}`, {
//     data: prod.update,
//   });
// };

export const AssignMasonToRequest = (prod) => {
  return request.post(`/Service/AssignMasonToRequest`, {
    data: prod,
  });
};

export const getRequestServiceStatus = (status) => {
  return request.get(`/Service/GetRequestServiceStatus?status=${status}`, {
  });
};

export const cancelRequestService = (id) => {
  return request.put(`/Service/CancelRequestServiceForStaff?id=${id}`);
};
