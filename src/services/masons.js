import request from '@/utils/request';

export const getAllMasons = (filters) => {
  return request.get('/User/GetAllMason', {
    params: {
      filters,
    },
  });
};

export const getMasonByID = (id) => {
  return request.get(`/User/GetMasonById?id=${id}`);
};

export const createMason = (prod) => {
  return request.post(`/User/CreateMasonAccount`, {
    data: prod.update,
  });
};

// export const createMason = prod => {
//   try {
//     console.log("resp", prod)
//     const response = fetch('https://anservice-capstone.conveyor.cloud/api/User/CreateMasonAccount',
//     {
//       method: 'POST',
//       headers: { 
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         fullName: prod.update.fullName,
//         phoneNumber: prod.update.phoneNumber,
//         address: prod.update.address,
//         email: prod.update.email,
//         typeJobId: prod.update.typeJobId,
//       }), 
//     });
//     console.log('res', response);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const updateMason = (masonId, prod) => {
  // return request.put(`/User/UpdateMason${masonId}`, {
  return request.put(`/User/UpdateMason`, {
    data: prod.update,
  });
};

// export const updateMason = prod => {
//   try {
//     console.log("resp", prod)
//     const response = fetch('https://anservice-capstone.conveyor.cloud/api/User/UpdateMason',
//     {
//       method: 'PUT',
//       headers: { 
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         fullName: prod.update.fullName,
//         phoneNumber: prod.update.phoneNumber,
//         address: prod.update.address,
//         email: prod.update.email,
//         typeJobId: prod.update.typeJob.typeJobId,
//       }), 
//     });
//     console.log('res', response);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const removeMason = (accountId) => {
  return request.put(`/User/RemoveMason?id=${accountId}`);
};
