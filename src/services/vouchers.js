import request from '@/utils/request';

export const createVoucher = (prod) => {
  return request.post(`/voucher-mapping-reviewers`, {
    data: prod.update,
  });
};
