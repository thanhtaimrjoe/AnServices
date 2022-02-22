import request from '@/utils/request';

// export const AccountLogin = (account) => {
//   return request.post('/accounts/login', 
//   {Headers: { 
//     'Accept': 'application/json',
//     'Content-Type': 'application/json;charset=UTF-8',}}, 
//     {
//           body: JSON.stringify(account),
//   });
// };  

export const AccountLogin = (User) => {
  return request.post('/User/LoginStaff', {
    data: User,
  });
};

export async function login(body, options) {
  return request('/User/LoginStaff', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
