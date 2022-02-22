import request from '@/utils/request';

export const createCampaignApplies = (prod) => {
  return request.post(`/campaign-applies`, {
    data: prod,
  });
};

export const deleteCampaignApplies = (campaignappliesId) => {
  return request.delete(`/campaign-applies/${campaignappliesId}`);
};

export const updateCampaignApplies = (campaignappliesId, prod) => {
  return request.put(`/campaign-applies/${campaignappliesId}`, {
    data: prod.update,
  });
};

export const updateCampaignAppliesStatus = (campaignappliesId, prod) => {
  return request.put(`/campaign-applies/${campaignappliesId}/accept-status`, {
    data: prod.update,
  });
};

export const completeCampaignAppliesStatus = (campaignappliesId, prod) => {
  return request.put(`/campaign-applies/${campaignappliesId}/complete-status`, {
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

export const getAllCampaignApplies = (filters) => {
  return request.get('/campaign-applies?page=1&size=100', {
    params: filters,
  });
};

export const getCampaignAppliesById = (campaignappliesId) => {
  return request.get(`/campaign-applies/${campaignappliesId}`);
};

export const getCampaignAppliesByName = (campaignappliesName) => {
  return request.get('/campaign-applies?page=1&size=1000', {
    params: {
      campaignappliesName,
    },
  });
};

export const getDate1 = () => {
  return request.get('/campaign-applies?page=1&size=100', { useCache: true });
};

export const getReviewerByName = (filters) => {
  return request.get('/reviewers', {
    params: filters,
  });
};

export const getReviewerById = (reviewerId) => {
  return request.get(`/reviewers/${reviewerId}`);
};

export const getPlatformById = (campaignappliesId) => {
  return request.get(`/platform-mapping-reviewers?reviewerid=${campaignappliesId}`);
  
};
