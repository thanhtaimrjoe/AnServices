using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblContract
    {
        public int ContractId { get; set; }
        public int CustomerId { get; set; }
        public int ServiceRequestId { get; set; }
        public string ContractTitle { get; set; }
        public string ContractUrl { get; set; }
        public DateTime? ContractStartDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public decimal? ContractDeposit { get; set; }
        public decimal? ContractTotalPrice { get; set; }
        public int ContractStatus { get; set; }
        public DateTime? ContractCreateDate { get; set; }
        public DateTime? ContractUpdateDate { get; set; }

        public virtual TblStatus ContractStatusNavigation { get; set; }
        public virtual TblUser Customer { get; set; }
        public virtual TblServiceRequest ServiceRequest { get; set; }
        public virtual TblInvoice TblInvoice { get; set; }
    }
}
