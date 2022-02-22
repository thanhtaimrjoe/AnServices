import request from '@/utils/request';

export const getAllReportByRequestServiceID = (requestServiceId) => {
    return request.get(`/Report/GetAllReportByRequestServiceID?RequestServiceId=${requestServiceId}`);
  };