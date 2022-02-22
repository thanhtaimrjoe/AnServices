import request from '@/utils/request';


export const getAllReviewers = (filters) => {
  return request.get('/reviewers', {
    params: filters,
  });
};

export const getReviewerByID = (reviewerId) => {
  return request.get('/reviewers?page=1&size=1000', {
    params: {
        reviewerId,
    },
  });
};
