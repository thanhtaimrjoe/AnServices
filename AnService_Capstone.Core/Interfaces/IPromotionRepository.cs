using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IPromotionRepository
    {
        public Task<int> InsertPromotion(string inviteCode);

        public Task<bool> GeneratorPromotionCode(int userID, string promotion, string description, double value);

        public Task<IEnumerable<TblPromotion>> GetAllPromotionByUserID(int userID);

        public Task<IEnumerable<TblPromotion>> GetAllPromotionValidByUserID(int userID);

        public Task<TblPromotion> GetInformationPromotionByID(int id);

        public Task<bool> CheckEnteredCode(int userID);

        public Task<bool> UpdateStatusPromotion(int id);
        /*public Task<bool> InsertPromotionDetail(int userID, int promotionID);*/
    }
}
