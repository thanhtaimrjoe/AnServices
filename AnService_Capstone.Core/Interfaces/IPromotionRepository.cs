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

        public Task<bool> InsertPromotionDetail(int userID, int promotionID);
    }
}
