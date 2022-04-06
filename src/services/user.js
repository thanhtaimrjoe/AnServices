import request from '@/utils/request';

export const createUser = (prod) => {
  return request.post(`/users/user`, {
    data: prod,
  });
};
// export const getAllRole = (prod) => {
//   return request.get(`/roles`, {
//     data: prod,
//   });
// };

export const getAllRole = () => {
  return request.get(`/roles`);
};

export const refeshToken = () => {
  return request.get('/users/refresh-token');
}

export const sendEmail = (account) => {
  return request.post('/User/SendEmail', 
  {Headers: { 
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',}}, 
    {
          body: JSON.stringify(account),
  });
};  