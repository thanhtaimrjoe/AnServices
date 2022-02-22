using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Entities
{
    public partial class TblContract
    {
        public int ContractId { get; set; }
        public int CustomerId { get; set; }
        public int RequestServiceId { get; set; }
        public string ContractTitle { get; set; }
        public string ContractUrl { get; set; }
        public int ContractStatus { get; set; }
        public DateTime? ContractCreateDate { get; set; }
        public DateTime? ContractUpdateDate { get; set; }

        public virtual TblStatus ContractStatusNavigation { get; set; }
        public virtual TblUser Customer { get; set; }
        public virtual TblRequestService RequestService { get; set; }
    }
}
