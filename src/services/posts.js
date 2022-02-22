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

export const getAllPost = (filters) => {
  return request.get('/posts?page=1&size=100', {
    params: filters,
  });
};

export const getPostById = (PostId) => {
  return request.get(`/posts/${PostId}`);
};

// export const updatePostStatus = (PostId, prod) => {
//   return request.put(`/posts/${PostId}`, {
//     data: prod.update,
//   });
// };

export const updateCampaignAppliesStatus = (campaignappliesId, prod) => {
  return request.put(`/campaign-applies/${campaignappliesId}/complete-status`, {
    data: prod.update,
  });
};

export const createVoucher = (prod) => {
  return request.post(`/voucher-mapping-reviewers`, {
    data: prod.update,
  });
};