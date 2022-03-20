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
        }

        public int PromotionId { get; set; }
        public int CustomerId { get; set; }
        public string PromotionCode { get; set; }
        public string PromotionDescription { get; set; }
        public decimal? PromotionValue { get; set; }
        public bool? PromotionActive { get; set; }
        public DateTime? PromotionDateExpired { get; set; }

        public virtual TblUser Customer { get; set; }
        public virtual ICollection<TblInvoice> TblInvoices { get; set; }
    }
}
