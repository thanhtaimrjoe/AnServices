using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblInvoice
    {
        public int InvoiceId { get; set; }
        public int RequestServiceId { get; set; }
        public double? TotalCost { get; set; }
        public DateTime? Date { get; set; }
        public string Note { get; set; }

        public virtual TblRequestService RequestService { get; set; }
    }
}
