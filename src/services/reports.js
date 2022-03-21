import request from '@/utils/request';

export const getAllReportByServiceRequestID = (ServiceRequestId) => {
    return request.get(`/Report/GetAllReportByServiceRequestID?ServiceRequestId=${ServiceRequestId}`);
  };