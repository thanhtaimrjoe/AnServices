using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services
{
    public class PromotionService : IPromotionService
    {
        private readonly IPromotionRepository _promotionRepository;
        public PromotionService(IPromotionRepository promotionRepository)
        {
            _promotionRepository = promotionRepository;
        }

        public async Task<IEnumerable<TblPromotion>> GetAllPromotionByUserID(int userID)
        {
            var res = await _promotionRepository.GetAllPromotionByUserID(userID);
            return res;
        }

        public async Task<IEnumerable<TblPromotion>> GetAllPromotionValidByUserID(int userID)
        {
            var res = await _promotionRepository.GetAllPromotionValidByUserID(userID);
            return res;
        }

        public async Task<TblPromotion> GetInformationPromotionByID(int promotionID)
        {
            var res = await _promotionRepository.GetInformationPromotionByID(promotionID);
            return res;
        }
    }
}
