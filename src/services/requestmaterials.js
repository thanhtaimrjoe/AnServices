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

  export const getAllMaterialByRequestServiceID = (requestServiceID) => {
    return request.get(`/Material/GetAllMaterialByRequestServiceID?id=${requestServiceID}`);
  };

export const getRequestMaterialByID = (id) => {
  return request.get(`/Material/GetRequestMaterialByID?id=${id}`);
};

export const getAllRequestMaterial = (filters) => {
  return request.get('/Material/GetAllRequestMaterial?page=1&size=100', {
    params: filters,
  });
};

export const getAllMaterialByRequestDetailID = (requestDetailId) => {
  return request.get(`/Material/GetAllMaterialByRequestDetailID?id=${requestDetailId}`);
};
export const updateRequestMaterial = (id, quantityNew, message, prod) => {
  return request.put(
    `/Material/UpdateRequestMaterial?id=${id}&quantityNew=${quantityNew}&message=${message}`,
    {
      data: prod,
    },
  );
};

export const denyStatusRequestMaterial = (id, message, prod) => {
  return request.put(
    `/Material/DenyRequestMaterial?id=${id}&message=${message}`,
    {
      data: prod,
    },
  );
};

export const approveStatusRequestMaterial = (id, prod) => {
  return request.put(
    `/Material/ApproveRequestMaterial?id=${id}`,
    {
      data: prod.update,
    },
  );
};

// export const denyStatusRequestMaterial = (prod, id, message) => {
//   return request.post(`/Material/UpdateStatusRequestMaterial?id=${id}&message=${message}`, {
//     data: prod.update,
//   });
// };

// export const approveStatusRequestMaterial = (prod, id) => {
//     return request.post(`/Material/ApproveRequestMaterial?id=${id}}`, {
//       data: prod.update,
//     });
//   };