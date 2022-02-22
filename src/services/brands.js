import request from '@/utils/request';
import { getImgUrl } from '@/utils/utils';

export const createBrand = (prod) => {
  return request.post(`/brands`, {
    data: prod.update,
  });
};

export const deleteBrand = (BrandId) => {
  return request.delete(`/brands/${BrandId}`);
};

export const updateBrand = (BrandId, prod) => {
  return request.put(`/brands/${BrandId}`, {
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

export const getAllBrand = (filters) => {
  return request.get('/brands?page=1&size=100', {
    params: filters,
  });
};

export const getBrandById = (id) => {
  return request.get(`/brands/${id}`);
};

export const getBrandByHashtag = () => {
  return request.get('/brands?page=1&size=1000', { useCache: true });
};

export const getBrandByName = (brandName) => {
  return request.get('/brands?page=1&size=1000', {
    params: {
      brandName,
    },
  });
};

export const getBusinessById = (bussinessId) => {
  return request.get(`/businesss/${bussinessId}`);
};

export const getAllBusiness = (filters) => {
  return request.get('/businesss', {
    params: filters,
  });
};

export const getIndustryById = (bussinessId) => {
  return request.get(`/industry/${bussinessId}`);
};

export const getAllIndustry = (filters) => {
  return request.get('/industry?page=1&size=100', {
    params: filters,
  });
};

export const uploadImages = (image) => {
  const formData = new FormData();

  // formData.append('file', image);
  formData.append('image', image);

  return request
    .post('/brands', {
      data: formData,
    })
    .then((res) => getImgUrl(res));
};

export const uploadImage = (prod) => {
  return request.post(`/brands`, {
    data: prod.update,
  });
};

// export const getBrandByBusinessId = (businessId) => {
//   return request.get(`/brands?businessid=${businessId}`);
// };