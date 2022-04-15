using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces.Services
{
    public interface IPromotionService
    {
        public Task<IEnumerable<TblPromotion>> GetAllPromotionByUserID(int userID);

        public Task<IEnumerable<TblPromotion>> GetAllPromotionValidByUserID(int userID);

        public Task<TblPromotion> GetInformationPromotionByID(int promotionID);
    }
}
