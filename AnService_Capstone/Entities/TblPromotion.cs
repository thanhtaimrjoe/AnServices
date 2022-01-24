using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Entities
{
    public partial class TblPromotion
    {
        public TblPromotion()
        {
            TblPromotionDetails = new HashSet<TblPromotionDetail>();
        }

        public int PromotionId { get; set; }
        public string PromotionCode { get; set; }
        public string PromotionDescription { get; set; }
        public DateTime? PromotionDateExpired { get; set; }
        public int? PromotionStatus { get; set; }

        public virtual ICollection<TblPromotionDetail> TblPromotionDetails { get; set; }
    }
}
