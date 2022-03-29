import request from '@/utils/request';

export const getInformationPromotionByID = (promotionID) => {
    return request.get(`/Promotion/GetInformationPromotionByID?promotionID=${promotionID}`);
  };