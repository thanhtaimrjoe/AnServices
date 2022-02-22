import request from '@/utils/request';

export const getAllTypeJob = (filters) => {
    return request.get('/TypeJob/GetAll', {
      params: {
        filters,
      }
    });
  };