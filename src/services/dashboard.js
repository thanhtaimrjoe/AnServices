import request from '@/utils/request';

// Dịch vụ đã đã nhận trong năm theo từng tháng
// Trạng thái tất cả dịch vụ
export const dashboard = (filters) => {
  return request.get(`/Service/Dashboard`, {
    params: filters,
  });
};

export const dashboardgetArray = (year) => {
  return request.get(`/Service/Dashboard?year=${year}`);
};

export const dashboardByQuarterAndYear = (quarter, year) => {
  return request.get(`/Service/Dashboard?quarter=${quarter}&year=${year}`);
};

// export const dashboardByQuarterAndYear = (quarter, year, filters) => {
//   return request.get(`/Service/Dashboard?quarter=${quarter}&year=${year}`, {
//     params: filters,
//   });
// };
