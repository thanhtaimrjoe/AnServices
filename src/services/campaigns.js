import request from '@/utils/request';

export const createCampaign = (prod) => {
  return request.post(`/campaigns`, {
    data: prod.update,
  });
};

export const deleteCampaign = (campaignId) => {
  return request.delete(`/campaigns/${campaignId}`);
};

export const updateCampaign = (campaignId, prod) => {
  return request.put(`/campaigns/${campaignId}`, {
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

export const getAllCampaign = (filters) => {
  return request.get('/campaigns?page=1&size=100', {
    params: filters,
  });
};

export const getCampaignById = (campaignId) => {
  return request.get(`/campaigns/${campaignId}`);
};

export const getCampaignByName = (campaignName) => {
  return request.get('/campaigns?page=1&size=1000', {
    params: {
      campaignName,
    },
  });
};

export const getDate = () => {
  return request.get('/campaigns?page=1&size=100', { useCache: true });
};

export const getAllPlatforms = (filters) => {
  return request.get('/platforms?page=1&size=100', {
    params: filters,
  });
};

export const getAllVouchers = (filters) => {
  return request.get('/vouchers?page=1&size=100', {
    params: filters,
  });
};