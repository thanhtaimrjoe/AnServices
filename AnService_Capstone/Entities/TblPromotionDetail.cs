using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Entities
{
    public partial class TblPromotionDetail
    {
        public int PromotionDetailId { get; set; }
        public int? CustomerId { get; set; }
        public int? PromotionId { get; set; }

        public virtual TblUser Customer { get; set; }
        public virtual TblPromotion Promotion { get; set; }
    }
}
