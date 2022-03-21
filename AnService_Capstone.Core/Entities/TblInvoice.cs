using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblInvoice
    {
        public int InvoiceId { get; set; }
        public int ServiceRequestId { get; set; }
        public int ContractId { get; set; }
        public decimal? TotalCost { get; set; }
        public decimal? TotalCostUpdate { get; set; }
        public DateTime? InvoiceDateCreate { get; set; }
        public DateTime? InvoiceDateUpdate { get; set; }
        public int? PromotionId { get; set; }

        public virtual TblContract Contract { get; set; }
        public virtual TblPromotion Promotion { get; set; }
    }
}
