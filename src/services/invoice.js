import request from '@/utils/request';

// export const createInvoice = (requestServiceId,totalPrice, prop) => {
//     return request.post(`/Invoice/CreateInvoice?id=${requestServiceId}&totalPrice=${totalPrice}`, {
//       data: prop,
//     });
//   };

  export const createInvoice = (prop) => {
    return request.post(`/Invoice/CreateInvoice`, {
      data: prop,
    });
  };