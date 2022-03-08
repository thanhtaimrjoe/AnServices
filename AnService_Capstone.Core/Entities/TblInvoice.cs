using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblInvoice
    {
        public int InvoiceId { get; set; }
        public int RequestServiceId { get; set; }
        public decimal? TotalCost { get; set; }
        public DateTime? InvoiceDateCreate { get; set; }

        public virtual TblRequestService RequestService { get; set; }
    }
}
