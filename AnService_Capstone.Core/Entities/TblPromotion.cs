using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblPromotion
    {
        public TblPromotion()
        {
            TblInvoices = new HashSet<TblInvoice>();
            TblPromotionDetails = new HashSet<TblPromotionDetail>();
        }

        public int PromotionId { get; set; }
        public string PromotionCode { get; set; }
        public string PromotionDescription { get; set; }
        public DateTime? PromotionDateExpired { get; set; }

        public virtual ICollection<TblInvoice> TblInvoices { get; set; }
        public virtual ICollection<TblPromotionDetail> TblPromotionDetails { get; set; }
    }
}
